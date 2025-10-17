export type DensityLevel = 1 | 2 | 3 | 4;

// Normalize various input forms into a 1–4 density level.
export function toDensityLevel(val: any): DensityLevel | undefined {
  if (val === undefined || val === null || val === 'none') return undefined;
  if (val === true || val === '' || val === 'true') return 2;
  if (typeof val === 'number') {
    const n = Math.max(1, Math.min(4, Math.round(val)));
    return n as DensityLevel;
  }
  const m: Record<string, DensityLevel> = {
    compact: 1,
    default: 2,
    comfortable: 3,
    spacious: 4,
  } as const;
  return m[String(val).toLowerCase()];
}

