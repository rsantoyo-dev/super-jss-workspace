/* eslint-disable no-console */
import { mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import {
  SjBreakPoints,
  SjResolvedTheme,
  SjStyle,
  SjTheme,
} from '../projects/super-jss/src/lib/models/interfaces';
import { CssGenerator } from '../projects/super-jss/src/lib/core/css-generator';
import { defaultTheme } from '../projects/super-jss/src/lib/themes/theme-definitions/default-theme';

const META_KEY = '__meta__';

type BreakpointName = keyof SjBreakPoints;
type TargetBreakpoint = 'base' | Exclude<BreakpointName, 'xs'>;

type PrecomputedRecord = Record<string, string[]> & {
  [META_KEY]?: {
    generatedAt: string;
    themeSignature: string;
    totalEntries: number;
    spacingSteps: number[];
    responsiveBreakpoints: TargetBreakpoint[];
  };
};

function resolveTheme(incoming: SjTheme): SjResolvedTheme {
  const fromDefaults = defaultTheme as Required<SjTheme>;
  return {
    name: incoming.name ?? fromDefaults.name,
    breakpoints: incoming.breakpoints ?? fromDefaults.breakpoints!,
    spacing: incoming.spacing ?? fromDefaults.spacing!,
    typography: incoming.typography ?? fromDefaults.typography!,
    colors: incoming.colors ?? fromDefaults.colors!,
    palette: incoming.palette ?? fromDefaults.palette!,
    components: (incoming.components ?? fromDefaults.components!) as any,
  } as SjResolvedTheme;
}

function stableStringify(value: any): string {
  if (value === null) return 'null';
  const t = typeof value;
  if (t === 'number' || t === 'boolean') {
    return JSON.stringify(value);
  }
  if (t === 'string') {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return '[' + value.map((item) => stableStringify(item)).join(',') + ']';
  }
  if (t === 'object') {
    const keys = Object.keys(value).sort();
    const parts = keys.map(
      (key) => JSON.stringify(key) + ':' + stableStringify(value[key])
    );
    return '{' + parts.join(',') + '}';
  }
  return JSON.stringify(value);
}

function buildThemeSignature(theme: SjResolvedTheme): string {
  const spacingSamples: Record<string, string> = {};
  for (let step = 1; step <= 12; step++) {
    spacingSamples[String(step)] = theme.spacing(step);
  }

  const surfaces = theme.components?.surfaces ?? {};
  const signaturePayload = {
    breakpoints: theme.breakpoints,
    palette: theme.palette,
    spacing: spacingSamples,
    surfaces: {
      padding: surfaces.padding ?? {},
      gap: surfaces.gap ?? {},
      radius: surfaces.radius ?? {},
      border: surfaces.border ?? {},
    },
  };
  return stableStringify(signaturePayload);
}

function serializeValue(value: string | number): string {
  return String(value);
}

function buildKey(
  prop: string,
  value: string | number,
  bp: TargetBreakpoint | 'base'
): string {
  const bpKey = bp === 'base' ? 'base' : bp;
  return `${prop}::${serializeValue(value)}::${bpKey}`;
}

function detectBreakpointFromRule(
  cssRule: string,
  breakpointByMinWidth: Map<
    number,
    TargetBreakpoint | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  >
): 'base' | TargetBreakpoint | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' {
  const mediaMatch = cssRule.match(/@media\s*\(min-width:\s*([0-9.]+)px\)/);
  if (!mediaMatch) {
    return 'base';
  }
  const px = Number(mediaMatch[1]);
  const bp = breakpointByMinWidth.get(px);
  return (bp as any) ?? 'base';
}

function main() {
  const resolvedTheme = resolveTheme(defaultTheme as SjTheme);
  const cssGenerator = new CssGenerator(resolvedTheme);
  const breakpointOrder = Object.keys(
    resolvedTheme.breakpoints
  ) as BreakpointName[];
  const responsiveBreakpoints = breakpointOrder.filter(
    (bp) => bp !== 'xs'
  ) as TargetBreakpoint[];

  const breakpointByMinWidth = new Map<number, BreakpointName>();
  for (const bp of breakpointOrder) {
    breakpointByMinWidth.set(resolvedTheme.breakpoints[bp], bp);
  }

  const results = new Map<string, Set<string>>();
  const atomicCss = new Map<string, string>();

  const spacingProps = [
    'p',
    'px',
    'py',
    'pt',
    'pr',
    'pb',
    'pl',
    'm',
    'mx',
    'my',
    'mt',
    'mr',
    'mb',
    'ml',
    'gap',
  ];
  const spacingSteps = [1, 2, 3, 4, 5, 6, 8, 10, 12];

  const colorProps = ['bg', 'backgroundColor', 'c', 'color'];
  const paletteTokens = [
    'primary.light',
    'primary.main',
    'primary.dark',
    'secondary.light',
    'secondary.main',
    'secondary.dark',
    'tertiary.light',
    'tertiary.main',
    'tertiary.dark',
    'neutral.light',
    'neutral.main',
    'neutral.dark',
    'light.main',
    'dark.main',
    'success.main',
    'info.main',
    'warning.main',
    'error.main',
  ];

  const displayProps = ['d', 'display'];
  const displayValues = [
    'block',
    'inline-block',
    'inline',
    'flex',
    'inline-flex',
    'grid',
    'contents',
    'none',
  ];

  const accumulate = (
    prop: string,
    rawValue: string | number,
    style: SjStyle,
    targetBp: 'base' | TargetBreakpoint
  ) => {
    const cssMap = cssGenerator.generateAtomicCss(style);
    for (const [className, cssRule] of cssMap.entries()) {
      const detected = detectBreakpointFromRule(
        cssRule,
        breakpointByMinWidth as any
      );
      const effectiveBp = detected === 'xs' ? 'base' : (detected as any);
      if (targetBp === 'base') {
        if (effectiveBp !== 'base') continue;
      } else {
        if (effectiveBp !== targetBp) continue;
      }

      const key = buildKey(prop, rawValue, targetBp);
      if (!results.has(key)) {
        results.set(key, new Set<string>());
      }
      results.get(key)!.add(className);

      if (!atomicCss.has(className)) {
        atomicCss.set(className, cssRule);
      }
    }
  };

  for (const prop of spacingProps) {
    for (const step of spacingSteps) {
      accumulate(prop, step, { [prop]: step } as SjStyle, 'base');
      for (const bp of responsiveBreakpoints) {
        const style = { [prop]: { [bp]: step } } as SjStyle;
        accumulate(prop, step, style, bp);
      }
    }
  }

  for (const prop of colorProps) {
    for (const token of paletteTokens) {
      accumulate(prop, token, { [prop]: token } as SjStyle, 'base');
    }
  }

  for (const prop of displayProps) {
    for (const value of displayValues) {
      accumulate(prop, value, { [prop]: value } as SjStyle, 'base');
      for (const bp of responsiveBreakpoints) {
        const style = { [prop]: { [bp]: value } } as SjStyle;
        accumulate(prop, value, style, bp);
      }
    }
  }

  const sortedEntries = Array.from(results.entries())
    .map(
      ([key, set]) =>
        [key, Array.from(set.values()).sort() as string[]] as const
    )
    .sort((a, b) => a[0].localeCompare(b[0]));

  const precomputed: PrecomputedRecord = {
    [META_KEY]: {
      generatedAt: new Date().toISOString(),
      themeSignature: buildThemeSignature(resolvedTheme),
      totalEntries: sortedEntries.length,
      spacingSteps,
      responsiveBreakpoints,
    },
  } as PrecomputedRecord;

  for (const [key, classes] of sortedEntries) {
    precomputed[key] = classes;
  }

  const cssEntries = Array.from(atomicCss.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );
  const cssBundle = cssEntries.map(([, rule]) => rule).join('\n');

  const rootDir = resolve(__dirname, '..');
  const distDir = join(rootDir, 'dist');
  const precomputedDir = join(
    rootDir,
    'projects/super-jss/src/lib/precomputed'
  );

  mkdirSync(distDir, { recursive: true });
  mkdirSync(precomputedDir, { recursive: true });

  const jsonText = JSON.stringify(precomputed, null, 2) + '\n';
  writeFileSync(join(distDir, 'sj-precomputed.json'), jsonText, 'utf8');
  writeFileSync(
    join(distDir, 'sj-precomputed.css'),
    cssBundle.endsWith('\n') ? cssBundle : cssBundle + '\n',
    'utf8'
  );

  writeFileSync(join(precomputedDir, 'sj-precomputed.json'), jsonText, 'utf8');
  writeFileSync(
    join(precomputedDir, 'sj-precomputed.css'),
    cssBundle.endsWith('\n') ? cssBundle : cssBundle + '\n',
    'utf8'
  );

  console.log(
    `Precomputed ${sortedEntries.length} style keys with ${cssEntries.length} atomic rules.`
  );
}

main();
