import { SjBreakPoints, SjResolvedTheme } from '../models/interfaces';

/**
 * Computes the active breakpoint key for a given width.
 * @param breakpoints Theme breakpoints map.
 * @param screenWidth Current viewport width in pixels.
 * @returns Breakpoint key (e.g., 'xs', 'md').
 */
export const getCurrentBreakpoint = (
  breakpoints: SjBreakPoints,
  screenWidth: number
): string => {
  const sortedBreakpoints = Object.entries(breakpoints).sort(
    (a, b) => a[1] - b[1]
  );
  let currentBp = 'xs';
  for (const [key, value] of sortedBreakpoints) {
    if (screenWidth >= value) {
      currentBp = key;
    }
  }
  return currentBp;
};

/**
 * Resolves a theme token (e.g., 'primary.main', 'blue.500') to a CSS color.
 * Falls back to the raw value when the token cannot be resolved.
 * @param value Token or raw color.
 * @param theme Active theme.
 * @returns CSS color string.
 */
export const resolveThemeColor = (
  value: string,
  theme: SjResolvedTheme
): string => {
  const parts = value.split('.');
  if ((parts.length === 1 && value in theme.palette) || value in theme.colors) {
    if (value in theme.colors) {
      const colorObject = theme.colors[
        value as keyof typeof theme.colors
      ] as any;
      return typeof colorObject === 'object' ? colorObject['500'] : colorObject;
    }
    if (value in theme.palette) {
      return theme.palette[value as keyof typeof theme.palette].main;
    }
  } else if (parts.length === 2) {
    const [category, shade] = parts;
    if (category in theme.colors) {
      const colorObject = theme.colors[
        category as keyof typeof theme.colors
      ] as any;
      return typeof colorObject === 'object'
        ? colorObject[shade] ?? value
        : colorObject;
    }
    if (category in theme.palette) {
      const colorObject = theme.palette[
        category as keyof typeof theme.palette
      ] as any;
      return colorObject[shade] ?? value;
    }
  }
  return value;
};

/**
 * Applies a style object directly to an element honoring responsive values.
 * For responsive objects, uses the nearest defined breakpoint value at or below current.
 * @param el Target element.
 * @param styles Style object (may include responsive values).
 * @param screenWidth Current viewport width in pixels.
 * @param theme Active theme used for spacing, colors and breakpoints.
 */
// Note: inline responsive application helpers were removed from core; styles are applied via classes.
