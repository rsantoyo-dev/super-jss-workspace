// Headfire runtime (PoC): compile DSL in <style data-headfire> to plain CSS
// Design goals: tiny, dependency‑free, and readable. Each helper below does one small job.
(function () {
  // Breakpoints used by responsive(). xs is treated as root (no @media)
  const BPS = Object.freeze({ xs: '0px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px' });
  const ORDER_MIN = ['sm', 'md', 'lg', 'xl'];

  function ensureDefaultThemes(){
    if (document.getElementById('hf-themes')) return;
    const style = document.createElement('style');
    style.id = 'hf-themes';
    style.textContent = `:root[data-hf-theme="dark"]{\n  --primary:#60a5fa;\n  --primary-contrast:#1f2937;\n  --space-2:8px;\n  --space-4:16px;\n  --dark-light:#374151;\n  --dark-main:#1f2937;\n  --dark-contrast:#f9fafb;\n  --app-bg:#0b1020;\n}\n:root[data-hf-theme=\"light\"]{\n  --primary:#3b82f6;\n  --primary-contrast:#ffffff;\n  --space-2:8px;\n  --space-4:16px;\n  --dark-light:#f3f4f6;\n  --dark-main:#e5e7eb;\n  --dark-contrast:#111827;\n  --app-bg:#f3f4f6;\n}`;
    document.head.appendChild(style);
  }
  function ensureDefaultThemeAttr(){
    const root=document.documentElement;
    if(!root.getAttribute('data-hf-theme')) root.setAttribute('data-hf-theme','dark');
  }

  /** Replace theme(key) with var(--key). Accepts nested calls in values. */
  function resolveThemeFns(value) {
    return value.replace(/theme\(([^)]+)\)/g, (_, key) => `var(--${String(key).trim()})`);
  }

  /** Split a comma list, ignoring commas inside parentheses. */
  function splitArgs(str) {
    const out = [];
    let depth = 0, start = 0;
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      if (c === '(') depth++;
      else if (c === ')') depth = Math.max(0, depth - 1);
      else if (c === ',' && depth === 0) { out.push(str.slice(start, i).trim()); start = i + 1; }
    }
    const tail = str.slice(start).trim();
    if (tail) out.push(tail);
    return out;
  }

  /** Parse responsive(xs(...), md(...)) into a map { xs: value, md: value }. Last wins per bp. */
  function parseResponsiveCall(argString) {
    const entries = splitArgs(argString);
    const byBp = new Map();
    for (const part of entries) {
      const m = part.match(/^(\w+)\(([^)]*)\)$/);
      if (!m) continue;
      const bp = m[1];
      const val = m[2];
      byBp.set(bp, val);
    }
    return byBp;
  }

  /** Split a declaration block into [prop, value] pairs (naive but works for simple cases). */
  function splitDecls(body) {
    return body
      .split(';')
      .map(s => s.trim())
      .filter(Boolean)
      .map(line => {
        const idx = line.indexOf(':');
        if (idx < 0) return null;
        return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
      })
      .filter(Boolean);
  }

  /** Compile a single CSS rule body with DSL into rootDecls + mediaDecls. */
  function compileDecls(decls) {
    const root = [];
    const media = []; // { bp, decl }
    for (const [prop, rawValue] of decls) {
      // Resolve theme() first so responsive() sees final values
      const themed = resolveThemeFns(rawValue);
      // 1) Inline tokens: xs(…), sm(…), md(…), lg(…), xl(…)
      const inline = parseInlineBpCalls(themed);
      if (inline.byBp.size || (inline.leftover && inline.leftover.trim())) {
        // xs/root value – prefer explicit xs(), else leftover raw
        if (inline.byBp.has('xs')) {
          root.push(`${prop}: ${inline.byBp.get('xs')};`);
        } else if (inline.leftover && inline.leftover.trim()) {
          root.push(`${prop}: ${inline.leftover.trim()};`);
        }
        for (const bp of ORDER_MIN) {
          if (!inline.byBp.has(bp)) continue;
          media.push({ bp, decl: `${prop}: ${inline.byBp.get(bp)};` });
        }
        continue;
      }
      const respMatch = themed.match(/responsive\((.*)\)/);
      if (respMatch) {
        const byBp = parseResponsiveCall(respMatch[1]);
        // root/xs
        if (byBp.has('xs')) root.push(`${prop}: ${byBp.get('xs')};`);
        // min‑width blocks in ascending order
        for (const bp of ORDER_MIN) {
          if (!byBp.has(bp)) continue;
          media.push({ bp, decl: `${prop}: ${byBp.get(bp)};` });
        }
        continue;
      }
      // Raw value => treat as xs/root
      root.push(`${prop}: ${themed};`);
    }
    return { root, media };
  }

  /** Parse inline breakpoint tokens like `xs(…) md(…)` without responsive(). */
  function parseInlineBpCalls(value) {
    const byBp = new Map();
    let leftover = '';
    const len = value.length;
    let i = 0;
    function isNameChar(ch){ return /[a-zA-Z-]/.test(ch); }
    const BP_NAMES = new Set(['xs','sm','md','lg','xl']);
    while (i < len) {
      const ch = value[i];
      if (isNameChar(ch)) {
        // read function name
        let j = i;
        while (j < len && isNameChar(value[j])) j++;
        const name = value.slice(i, j);
        if (value[j] === '(') {
          // capture balanced parentheses content
          let k = j + 1, depth = 1;
          while (k < len && depth > 0) {
            if (value[k] === '(') depth++;
            else if (value[k] === ')') depth--;
            k++;
          }
          const arg = value.slice(j + 1, k - 1);
          if (BP_NAMES.has(name)) {
            byBp.set(name, arg.trim());
          } else {
            // Not a breakpoint token: keep original chunk as leftover
            leftover += value.slice(i, k);
          }
          i = k;
          continue;
        }
        // plain word, not a call – append and advance
        leftover += ch;
        i++;
      } else {
        leftover += ch;
        i++;
      }
    }
    return { byBp, leftover };
  }

  /** Group media decls by bp and build @media blocks for a selector. */
  function buildMediaBlocks(selector, mediaDecls) {
    const buckets = new Map();
    for (const md of mediaDecls) {
      if (!buckets.has(md.bp)) buckets.set(md.bp, []);
      buckets.get(md.bp).push(md.decl);
    }
    const out = [];
    for (const bp of ORDER_MIN) {
      const list = buckets.get(bp);
      if (!list || !list.length) continue;
      out.push(`@media (min-width: ${BPS[bp]}) {\n  ${selector} { ${list.join(' ')} }\n}`);
    }
    return out;
  }

  /** Parse CSS into simple {selector, body} pairs (single‑level; ignores nested @rules). */
  function parseRules(css) {
    const RULE_RE = /([^{}]+)\{([^{}]*)\}/g;
    const out = [];
    let m;
    while ((m = RULE_RE.exec(css))) {
      const selector = m[1].trim();
      const body = m[2];
      if (selector && body) out.push({ selector, body });
    }
    return out;
  }

  /** Compile full CSS text containing Headfire DSL into plain CSS. */
  function compile(css) {
    const out = [];
    for (const { selector, body } of parseRules(css)) {
      const { root, media } = compileDecls(splitDecls(body));
      if (root.length) out.push(`${selector} { ${root.join(' ')} }`);
      out.push(...buildMediaBlocks(selector, media));
    }
    return out.join('\n');
  }

  /** Gather DSL sources from inline <style data-headfire> and external <link data-headfire>. */
  async function gatherDslSourcesAsync() {
    // Inline <style data-headfire>
    const styleNodes = document.querySelectorAll('style[data-headfire]');
    let src = '';
    styleNodes.forEach(n => { src += `\n${n.textContent || ''}`; });
    // External <link rel="stylesheet" data-headfire>
    const linkNodes = document.querySelectorAll('link[rel="stylesheet"][data-headfire]');
    for (const link of Array.from(linkNodes)) {
      const href = link.getAttribute('href');
      if (!href) continue;
      try {
        const res = await fetch(href);
        if (res.ok) src += `\n${await res.text()}`;
      } catch (_) {
        // Ignore fetch errors silently to avoid blocking page render
      }
    }
    return src;
  }

  /** Ensure a single output <style> exists and write compiled CSS to it. */
  function writeOutput(css) {
    let out = document.querySelector('style[data-headfire-out]');
    if (!out) {
      out = document.createElement('style');
      out.setAttribute('data-headfire-out', '');
      document.head.appendChild(out);
    }
    out.textContent = css;
  }

  /** Entry point: compile and inject once on DOM ready. */
  async function run() {
    ensureDefaultThemes();
    ensureDefaultThemeAttr();
    const src = await gatherDslSourcesAsync();
    if (src.trim()) writeOutput(compile(src));
    document.addEventListener('click',(e)=>{
      const t=e.target; if(!(t instanceof Element)) return;
      if(!t.closest('[data-hf-theme-toggle]')) return;
      const root=document.documentElement; const cur=root.getAttribute('data-hf-theme')||'dark';
      root.setAttribute('data-hf-theme', cur==='dark'?'light':'dark');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
