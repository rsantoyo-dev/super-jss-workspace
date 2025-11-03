import precomputedPayload from './sj-precomputed.json';
import type {
  SjBreakPoints,
  SjResolvedTheme,
  SjStyle,
} from '../models/interfaces';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type PrecomputedMeta = {
  generatedAt?: string;
  themeSignature?: string;
  totalEntries?: number;
  spacingSteps?: number[];
  responsiveBreakpoints?: string[];
};

const META_KEY = '__meta__';

type PrecomputedPayload = {
  [META_KEY]?: PrecomputedMeta;
  [key: string]: readonly string[] | PrecomputedMeta | undefined;
};

const rawPayload = (precomputedPayload as PrecomputedPayload) || {};

export const SJ_PRECOMPUTED_META: PrecomputedMeta = (rawPayload[META_KEY] ||
  {}) as PrecomputedMeta;

const PRECOMPUTED_CLASS_MAP = new Map<string, readonly string[]>();
for (const [key, value] of Object.entries(rawPayload)) {
  if (key === META_KEY) continue;
  if (!Array.isArray(value)) continue;
  PRECOMPUTED_CLASS_MAP.set(key, Object.freeze([...value]));
}

const DEFAULT_SPACING_STEPS = Array.from({ length: 12 }, (_, i) => i + 1);
const spacingSteps = Array.isArray(SJ_PRECOMPUTED_META.spacingSteps)
  ? SJ_PRECOMPUTED_META.spacingSteps
  : DEFAULT_SPACING_STEPS;

const DEFAULT_RESPONSIVE_BREAKPOINTS = ['sm', 'md', 'lg', 'xl', 'xxl'];
const responsiveBreakpoints = Array.isArray(
  SJ_PRECOMPUTED_META.responsiveBreakpoints
)
  ? (SJ_PRECOMPUTED_META.responsiveBreakpoints as string[])
  : DEFAULT_RESPONSIVE_BREAKPOINTS;

const BREAKPOINT_KEYS: (keyof SjBreakPoints)[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
];

const stylesheetHref = (() => {
  try {
    return new URL('./sj-precomputed.css', import.meta.url).href;
  } catch {
    return null;
  }
})();

let stylesheetAttached = false;
export function ensurePrecomputedStylesheet(doc: Document): void {
  if (stylesheetAttached || !stylesheetHref) return;
  try {
    const existing = doc.querySelector('link[data-sj-precomputed]');
    if (existing) {
      stylesheetAttached = true;
      return;
    }
    const link = doc.createElement('link');
    link.rel = 'stylesheet';
    link.href = stylesheetHref;
    link.setAttribute('data-sj-precomputed', '');
    doc.head.appendChild(link);
    stylesheetAttached = true;
  } catch {
    // ignore DOM failures (SSR / tests)
  }
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
  for (const step of spacingSteps) {
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

type TargetBreakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

function buildKey(
  prop: string,
  value: string | number,
  bp: TargetBreakpoint
): string {
  return `${prop}::${serializeValue(value)}::${bp}`;
}

function collectResponsiveClasses(
  prop: string,
  responsiveValue: Record<string, any>,
  theme: SjResolvedTheme,
  accumulator: Set<string>
): boolean {
  const orderedBreakpoints = BREAKPOINT_KEYS;
  let lastValue: any = undefined;

  for (const bp of orderedBreakpoints) {
    if (Object.prototype.hasOwnProperty.call(responsiveValue, bp)) {
      lastValue = (responsiveValue as any)[bp];
    }
    if (lastValue === undefined) continue;

    const keyBp: TargetBreakpoint =
      bp === 'xs' ? 'base' : (bp as TargetBreakpoint);
    const key = buildKey(prop, lastValue, keyBp);
    const classes = PRECOMPUTED_CLASS_MAP.get(key);
    if (!classes) {
      return false;
    }
    classes.forEach((cls) => accumulator.add(cls));
  }

  return true;
}

function collectPrimitiveClasses(
  prop: string,
  value: string | number,
  accumulator: Set<string>
): boolean {
  const key = buildKey(prop, value, 'base');
  const classes = PRECOMPUTED_CLASS_MAP.get(key);
  if (!classes) return false;
  classes.forEach((cls) => accumulator.add(cls));
  return true;
}

const themeSignatureCache = new WeakMap<SjResolvedTheme, string>();

function getThemeSignature(theme: SjResolvedTheme): string {
  const cached = themeSignatureCache.get(theme);
  if (cached) return cached;
  const signature = buildThemeSignature(theme);
  themeSignatureCache.set(theme, signature);
  return signature;
}

export function canUsePrecomputed(theme: SjResolvedTheme): boolean {
  const expected = SJ_PRECOMPUTED_META.themeSignature;
  if (!expected || PRECOMPUTED_CLASS_MAP.size === 0) return false;
  return getThemeSignature(theme) === expected;
}

export function lookupPrecomputedClasses(
  styles: SjStyle,
  theme: SjResolvedTheme
): string[] | undefined {
  if (!styles || typeof styles !== 'object') return undefined;
  if (!canUsePrecomputed(theme)) return undefined;

  const accumulator = new Set<string>();

  for (const [prop, rawValue] of Object.entries(styles)) {
    if (rawValue === undefined || rawValue === null) continue;

    if (typeof rawValue === 'object' && !Array.isArray(rawValue)) {
      const handled = collectResponsiveClasses(
        prop,
        rawValue as Record<string, any>,
        theme,
        accumulator
      );
      if (!handled) {
        return undefined;
      }
    } else if (typeof rawValue === 'string' || typeof rawValue === 'number') {
      const handled = collectPrimitiveClasses(prop, rawValue, accumulator);
      if (!handled) {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  if (accumulator.size === 0) return undefined;
  return Array.from(accumulator); // order does not matter for class application
}
