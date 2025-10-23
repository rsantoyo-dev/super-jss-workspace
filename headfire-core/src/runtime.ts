import { defaultThemesCSS } from './themes';

const BPS = { xs: '0px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px' };
const ORDER = ['sm', 'md', 'lg', 'xl'];
function themeify(v: string): string {
  return v.replace(/theme\(([^)]+)\)/g, (_, k) => `var(--${String(k).trim()})`);
}
function inferUnits(v: string): string {
  const t = v.trim();
  if (
    /^(var\(|calc\(|theme\(|responsive\(|[a-zA-Z-]+\(|\d+\w+|#|rgb|rgba|hsl|hsla)/.test(
      t
    ) ||
    !t
  )
    return v;
  return /^\d+(\.\d+)?$/.test(t) ? v + 'rem' : v;
}
function splitArgs(s: string): string[] {
  const o = [];
  let d = 0,
    b = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '(') d++;
    else if (c === ')') d = Math.max(0, d - 1);
    else if (c === ',' && d === 0) {
      o.push(s.slice(b, i).trim());
      b = i + 1;
    }
  }
  const t = s.slice(b).trim();
  if (t) o.push(t);
  return o;
}
function parseResponsiveArgs(a: string): Map<string, string> {
  const m = new Map();
  for (const e of splitArgs(a)) {
    const r = e.match(/^(\w+)\(([^)]*)\)$/);
    if (r) m.set(r[1], r[2]);
  }
  return m;
}
function parseInlineBpCalls(v: string): {
  byBp: Map<string, string>;
  leftover: string;
} {
  const m = new Map();
  let rest = '';
  let i = 0;
  const n = v.length;
  const isN = (c: string) => /[a-zA-Z-]/.test(c);
  const B = new Set(['xs', 'sm', 'md', 'lg', 'xl']);
  while (i < n) {
    const c = v[i];
    if (isN(c)) {
      let j = i;
      while (j < n && isN(v[j])) j++;
      const name = v.slice(i, j);
      if (v[j] === '(') {
        let k = j + 1,
          d = 1;
        while (k < n && d > 0) {
          if (v[k] === '(') d++;
          else if (v[k] === ')') d--;
          k++;
        }
        const arg = v.slice(j + 1, k - 1);
        if (B.has(name)) m.set(name, arg.trim());
        else rest += v.slice(i, k);
        i = k;
        continue;
      }
      rest += c;
      i++;
    } else {
      rest += c;
      i++;
    }
  }
  return { byBp: m, leftover: rest };
}
function splitDecls(b: string): any[] {
  return b
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((l) => {
      const x = l.indexOf(':');
      if (x < 0) return null;
      return [l.slice(0, x).trim(), l.slice(x + 1).trim()];
    })
    .filter(Boolean);
}
function compileDecls(decls: any[]): {
  root: string[];
  media: { bp: string; decl: string }[];
} {
  const root = [],
    media = [];
  for (const [prop, raw] of decls) {
    const themed = themeify(raw);
    const inline = parseInlineBpCalls(themed);
    if (inline.byBp.size || (inline.leftover && inline.leftover.trim())) {
      if (inline.byBp.has('xs'))
        root.push(`${prop}: ${inferUnits(inline.byBp.get('xs') as string)};`);
      else if (inline.leftover && inline.leftover.trim())
        root.push(`${prop}: ${inferUnits(inline.leftover.trim())};`);
      for (const bp of ORDER) {
        if (!inline.byBp.has(bp)) continue;
        media.push({
          bp,
          decl: `${prop}: ${inferUnits(inline.byBp.get(bp) as string)};`,
        });
      }
      continue;
    }
    const m = themed.match(/responsive\((.*)\)/);
    if (m) {
      const by = parseResponsiveArgs(m[1]);
      if (by.has('xs'))
        root.push(`${prop}: ${inferUnits(by.get('xs') as string)};`);
      for (const bp of ORDER) {
        if (!by.has(bp)) continue;
        media.push({
          bp,
          decl: `${prop}: ${inferUnits(by.get(bp) as string)};`,
        });
      }
      continue;
    }
    root.push(`${prop}: ${inferUnits(themed)};`);
  }
  return { root, media };
}
function buildMedia(sel: string, md: { bp: string; decl: string }[]): string[] {
  const buckets = new Map();
  for (const e of md) {
    if (!buckets.has(e.bp)) buckets.set(e.bp, []);
    buckets.get(e.bp).push(e.decl);
  }
  const out = [];
  for (const bp of ORDER) {
    const list = buckets.get(bp);
    if (!list || !list.length) continue;
    out.push(
      `@media (min-width: ${
        BPS[bp as keyof typeof BPS]
      }) {\n  ${sel} { ${list.join(' ')} }\n}`
    );
  }
  return out;
}
function parseRules(css: string): { selector: string; body: string }[] {
  const R = /([^{}]+)\{([^{}]*)\}/g;
  const a = [];
  let m;
  while ((m = R.exec(css))) {
    const s = m[1].trim(),
      b = m[2];
    if (s && b) a.push({ selector: s, body: b });
  }
  return a;
}
async function gather(): Promise<string> {
  let src = '';
  document.querySelectorAll('style[data-headfire]').forEach((n) => {
    src += `\n${n.textContent || ''}`;
  });
  const links = document.querySelectorAll(
    'link[rel="stylesheet"][data-headfire]'
  );
  for (const el of Array.from(links)) {
    const href = el.getAttribute('href');
    if (!href) continue;
    try {
      const r = await fetch(href);
      if (r.ok) src += `\n${await r.text()}`;
    } catch (_) {}
  }
  return src;
}
function write(css: string): void {
  let out = document.querySelector('style[data-headfire-out]');
  if (!out) {
    out = document.createElement('style');
    out.setAttribute('data-headfire-out', '');
    document.head.appendChild(out);
  }
  out.textContent = css;
}
function compile(css: string): string {
  const out = [];
  for (const { selector, body } of parseRules(css)) {
    const { root, media } = compileDecls(splitDecls(body));
    if (root.length) out.push(`${selector} { ${root.join(' ')} }`);
    out.push(...buildMedia(selector, media));
  }
  return out.join('\n');
}

// Inject default themes
function injectThemes() {
  let themeStyle = document.querySelector('#hf-themes');
  if (!themeStyle) {
    themeStyle = document.createElement('style');
    themeStyle.id = 'hf-themes';
    document.head.appendChild(themeStyle);
  }
  themeStyle.textContent = defaultThemesCSS;
}

export async function run(): Promise<void> {
  injectThemes();
  const s = await gather();
  if (!s.trim()) return;
  write(compile(s));
}
export async function recompile(): Promise<void> {
  const s = await gather();
  if (!s.trim()) return;
  write(compile(s));
}
if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', run);
else run();

// Expose for dev HMR
(window as any).headfireRecompile = recompile;
