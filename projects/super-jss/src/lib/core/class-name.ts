// Compact, semantic, deterministic class-name generator used by the CSS pipeline.
// Goal: produce shorter readable tokens with a tiny hash suffix to ensure
// uniqueness without huge verbose names (tradeoff: slightly less readable,
// much smaller DOM class strings).

const ABBR: Record<string, string> = {
  padding: 'p',
  margin: 'm',
  backgroundColor: 'bg',
  color: 'c',
  width: 'w',
  height: 'h',
  display: 'd',
  fontSize: 'fs',
  fontWeight: 'fw',
  borderRadius: 'br',
  boxShadow: 'bs',
  gap: 'g',
};

function kebabToCompact(s: string): string {
  return s.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
}

function sanitizeForClass(value: any): string {
  if (value === undefined) return 'u';
  return String(value)
    .replace(/\./g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '-');
}

// Simple deterministic 32-bit-ish hash, rendered in base36 and trimmed.
function shortHash(input: string): string {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return (h >>> 0).toString(36);
}

/**
 * Generate an atomic class name for a single property/value pair.
 * variantPrefix may include trailing dash (e.g. 'hover-') and will be preserved.
 */
export function generateAtomicClassName(
  variantPrefix: string,
  propKey: string,
  bp: string | undefined,
  value: any
): string {
  const hint = ABBR[propKey] || kebabToCompact(propKey);
  const bpPart = bp ? `-${bp}` : '';
  const val = sanitizeForClass(value);
  const hash = shortHash(`${propKey}|${bp || ''}|${val}`).slice(0, 5);
  return `${variantPrefix}sj-${hint}${bpPart}-${val}-${hash}`;
}

/** Generate a compact bundle id for a whole style object. */
export function generateBundleId(stylesJson: string): string {
  const h = shortHash(stylesJson).slice(0, 6);
  return `sjb-${h}`;
}
