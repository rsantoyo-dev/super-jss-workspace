// Headfire PostCSS plugin: compile responsive tokens + theme() in CSS values
// Usage (postcss.config.cjs):
//   module.exports = { plugins: [ require('./headfire-core/postcss')({ breakpoints, theme }) ] }

const postcss = require('postcss');

module.exports = function headfire(options = {}) {
  const breakpoints = Object.assign(
    { xs: '0px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
    options.breakpoints || {}
  );
  const themeMap = options.theme || null;

  function themeify(v) {
    return String(v).replace(/theme\(([^)]+)\)/g, (_, k) => {
      const key = String(k).trim();
      if (themeMap && Object.prototype.hasOwnProperty.call(themeMap, key)) {
        return String(themeMap[key]);
      }
      return `var(--${key})`;
    });
  }

  function splitArgs(s) {
    const out = [];
    let d = 0,
      b = 0;
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (c === '(') d++;
      else if (c === ')') d = Math.max(0, d - 1);
      else if (c === ',' && d === 0) {
        out.push(s.slice(b, i).trim());
        b = i + 1;
      }
    }
    const t = s.slice(b).trim();
    if (t) out.push(t);
    return out;
  }

  function parseResp(a) {
    const m = new Map();
    for (const e of splitArgs(a)) {
      const r = e.match(/^(\w+)\(([^)]*)\)$/);
      if (r) m.set(r[1], r[2]);
    }
    return m;
  }

  function parseInline(v) {
    const by = new Map();
    let rest = '';
    let i = 0;
    const n = v.length;
    const isN = (c) => /[a-zA-Z-]/.test(c);
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
          if (B.has(name)) by.set(name, arg.trim());
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
    return { by, rest };
  }

  const plugin = {
    postcssPlugin: 'headfire',
    Declaration(decl) {
      const rule = decl.parent;
      if (!rule || !('selector' in rule)) return;
      const selector = rule.selector;

      let value = themeify(decl.value);

      // Inline tokens first
      const inl = parseInline(value);
      let byBp = null;
      let rootVal;
      if (inl.by.size || (inl.rest && inl.rest.trim())) {
        byBp = inl.by;
        rootVal = inl.by.has('xs') ? inl.by.get('xs') : (inl.rest || '').trim() || undefined;
      } else {
        const m = value.match(/responsive\((.*)\)/);
        if (m) {
          byBp = parseResp(m[1]);
          rootVal = byBp.get('xs');
        }
      }

      if (!byBp) {
        decl.value = value;
        return;
      }

      if (rootVal) decl.value = rootVal;
      else decl.remove();

      const order = ['sm', 'md', 'lg', 'xl'];
      for (const bp of order) {
        const v = byBp.get(bp);
        if (v === undefined) continue;
        const media = postcss.atRule({ name: 'media', params: `(min-width: ${breakpoints[bp]})` });
        const r = postcss.rule({ selector });
        r.append(postcss.decl({ prop: decl.prop, value: v }));
        media.append(r);
        rule.after(media);
      }
    },
  };
  plugin.postcss = true;
  return plugin;
};

