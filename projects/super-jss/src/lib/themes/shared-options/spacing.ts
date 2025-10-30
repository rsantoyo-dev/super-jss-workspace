/**
 * Default spacing scale converter: maps unitless factors to rem values.
 * Example: 2 -> '2rem'.
 * @param factor Unitless spacing factor.
 * @returns CSS size string in rems.
 */
// Base numeric spacing: factor -> rem string
export const DEFAULT_SPACING = (factor: number): string => `${factor}rem`;

// Systemic spacing helper: map integer steps to a spacing factor (rem units via theme.spacing).
// Scale rule (pixels, always even):
// - Steps 1..5: 2, 4, 6, 8, 10 px (lineal)
// - From step 6: ceil to next even of 10 * 1.25^(n-5) → 12, 16, 20, 26, 32, 40, 50, 62, 78, 98 px...
// Returned factor = px / 16 (so sj.space(3) => 0.5, i.e., 8px)
export const SYSTEMIC_SPACING_STEP = 0.125; // 2px assuming 16px root (kept for reference)

const ceilEven = (x: number): number => Math.ceil(x / 2) * 2;
const roundEven = (x: number): number => Math.round(x / 2) * 2;

/** Returns the systemic spacing for a given step as a rem factor (px/16). */
// Exact mapping for steps 1..10 (px), then smooth growth with geometric progression rounded to even px
const SYSTEMIC_PX_TABLE: Record<number, number> = {
  1: 2,
  2: 4,
  3: 8,
  4: 12,
  5: 16,
  6: 24,
  7: 32,
  8: 40,
  9: 50,
  10: 62,
  11: 78,
  12: 98,
  13: 124,
  14: 156,
  15: 196,
  16: 246,
  17: 308,
  18: 386,
  19: 484,
  20: 606,
};

export const SYSTEMIC_SPACING = (step: number): number => {
  const n = Math.max(1, Math.min(20, Math.round(Number(step) || 0)));
  let px: number;
  if (SYSTEMIC_PX_TABLE[n] !== undefined) {
    px = SYSTEMIC_PX_TABLE[n]!;
  } else {
    // Continue growth from step 10 value (62px), not from 10px base.
    const basePx = SYSTEMIC_PX_TABLE[10]!; // 62px
    px = roundEven(basePx * Math.pow(1.25, n - 10));
  }
  return px / 16;
};

/**
 * Expected mapping (first steps):
 * 1 → 2px  (0.125rem)
 * 2 → 4px  (0.25rem)
 * 3 → 8px  (0.5rem)
 * 4 → 12px (0.75rem)
 * 5 → 16px (1rem)
 * 6  → 24px  (1.5rem)
 * 7  → 32px  (2rem)
 * 8  → 40px  (2.5rem)
 * 9  → 50px  (3.125rem)
 * 10 → 62px  (3.875rem)
 * 11 → ~78px (≈4.875rem)
 * 12 → ~98px (≈6.125rem)
 * ...  geometric growth (×1.25) rounded to even px for 11..20.
 */
