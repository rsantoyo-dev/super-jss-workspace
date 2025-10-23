import postcss, { Plugin, Rule, Declaration } from 'postcss';
import { Theme, Breakpoints, CompilerOptions } from './types';
import { defaultDarkTheme } from './themes';

// Replace theme(key) with a concrete value from options.theme, or fallback to the raw key as a CSS var
function resolveThemeFns(value: string, theme: Theme): string {
  return value.replace(/theme\(([^)]+)\)/g, (_m, key: string) => {
    const k = String(key).trim();
    const v = theme[k as keyof Theme];
    return v !== undefined ? String(v) : `var(--${k})`;
  });
}

// Split comma args, ignoring commas inside parentheses
function splitArgs(str: string): string[] {
  const out: string[] = [];
  let depth = 0,
    start = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c === '(') depth++;
    else if (c === ')') depth = Math.max(0, depth - 1);
    else if (c === ',' && depth === 0) {
      out.push(str.slice(start, i).trim());
      start = i + 1;
    }
  }
  const tail = str.slice(start).trim();
  if (tail) out.push(tail);
  return out;
}

// Parse responsive(xs(...), md(...)) into a Map<bp,value> (last wins)
function parseResponsiveCall(argStr: string): Map<string, string> {
  const by = new Map<string, string>();
  for (const entry of splitArgs(argStr)) {
    const m = entry.match(/^(\w+)\(([^)]*)\)$/);
    if (!m) continue;
    by.set(m[1], m[2]);
  }
  return by;
}

// Parse inline tokens like `xs(…) md(…)` without responsive()
function parseInlineBpCalls(value: string): { byBp: Map<string, string>; leftover: string } {
  const byBp = new Map<string, string>();
  let leftover = '';
  const len = value.length;
  let i = 0;
  const isName = (ch: string) => /[a-zA-Z-]/.test(ch);
  const BPS = new Set(['xs', 'sm', 'md', 'lg', 'xl']);
  while (i < len) {
    const ch = value[i];
    if (isName(ch)) {
      let j = i;
      while (j < len && isName(value[j])) j++;
      const name = value.slice(i, j);
      if (value[j] === '(') {
        let k = j + 1,
          depth = 1;
        while (k < len && depth > 0) {
          if (value[k] === '(') depth++;
          else if (value[k] === ')') depth--;
          k++;
        }
        const arg = value.slice(j + 1, k - 1);
        if (BPS.has(name)) byBp.set(name, arg.trim());
        else leftover += value.slice(i, k);
        i = k;
        continue;
      }
      leftover += ch;
      i++;
    } else {
      leftover += ch;
      i++;
    }
  }
  return { byBp, leftover };
}

export function parseAndCompile(cssInput: string, options?: CompilerOptions): string {
  const theme: Theme = options?.theme ?? (defaultDarkTheme as any);
  const breakpoints: Breakpoints = options?.breakpoints ?? {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  };

  const plugin: Plugin = {
    postcssPlugin: 'headfire',
    Declaration(decl) {
      const rule = decl.parent as Rule;
      if (!rule || !('selector' in rule)) return;
      const selector = (rule as any).selector as string;

      // Resolve theme(key) → concrete value or var(--key)
      let value = resolveThemeFns(decl.value, theme);

      // First, try inline tokens xs()/sm()/…; if none, try responsive()
      const inline = parseInlineBpCalls(value);
      let byBp: Map<string, string> | null = null;
      let rootVal: string | undefined;
      if (inline.byBp.size || (inline.leftover && inline.leftover.trim())) {
        byBp = inline.byBp;
        rootVal = inline.byBp.has('xs')
          ? inline.byBp.get('xs')
          : inline.leftover.trim() || undefined;
      } else {
        const m = value.match(/responsive\((.*)\)/);
        if (m) {
          byBp = parseResponsiveCall(m[1]);
          rootVal = byBp.get('xs');
        }
      }

      if (byBp) {
        // Apply root (xs)
        if (rootVal) {
          decl.value = rootVal;
        } else {
          // No root value: remove original declaration
          (decl as Declaration).remove();
        }
        // Emit media blocks for sm→xl
        const order: Array<keyof Breakpoints> = ['sm', 'md', 'lg', 'xl'];
        for (const bp of order) {
          const v = byBp.get(bp as string);
          if (v === undefined) continue;
          const media = postcss.atRule({ name: 'media', params: `(min-width: ${breakpoints[bp]})` });
          const r = postcss.rule({ selector });
          r.append(postcss.decl({ prop: decl.prop, value: v }));
          media.append(r);
          rule.after(media);
        }
        return;
      }

      // No DSL present: keep resolved theme() value
      decl.value = value;
    },
  };

  const result = postcss([plugin]).process(cssInput, { from: undefined });
  return result.css;
}
