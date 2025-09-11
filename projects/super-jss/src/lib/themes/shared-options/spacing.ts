/**
 * Default spacing scale converter: maps unitless factors to rem values.
 * Example: 2 -> '2rem'.
 * @param factor Unitless spacing factor.
 * @returns CSS size string in rems.
 */
export const DEFAULT_SPACING = (factor: number): string => `${factor}rem`;
