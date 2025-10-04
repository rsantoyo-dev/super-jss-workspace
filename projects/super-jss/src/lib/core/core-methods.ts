import {
  SjBreakPoints,
  SjStyle,
  SjResolvedTheme,
  ResponsiveStyle,
} from '../models/interfaces';
import { shorthandMappings } from '../models/mappings';

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
  let bp = 'xs';
  for (const key of Object.keys(breakpoints)) {
    const breakpoint = key as keyof SjBreakPoints;
    bp = breakpoints[breakpoint] <= screenWidth ? breakpoint : bp;
  }
  return bp;
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
export const applyResponsiveStyle = (
  el: HTMLElement,
  styles: SjStyle,
  screenWidth: number,
  theme: SjResolvedTheme
) => {
  const currentBp = getCurrentBreakpoint(
    theme.breakpoints,
    screenWidth
  ) as keyof SjBreakPoints;
  for (const key in styles) {
    if (!Object.prototype.hasOwnProperty.call(styles, key)) continue;
    if (key.startsWith('&')) continue; // Skip pseudos for inline application

    const cssProp = (shorthandMappings as any)[key] || key;
    const value = (styles as any)[key] as
      | ResponsiveStyle
      | string
      | number
      | undefined;

    let finalValue: string | undefined;
    if (value === undefined) {
      finalValue = undefined;
    } else if (typeof value === 'object' && value !== null) {
      // Responsive object: use the nearest defined breakpoint value <= current
      const byBp = value as ResponsiveStyle;
      const orderedBps = Object.keys(
        theme.breakpoints
      ) as (keyof SjBreakPoints)[];
      const idx = orderedBps.indexOf(currentBp);
      let raw: any = undefined;
      for (let i = idx; i >= 0; i--) {
        const bpKey = orderedBps[i];
        if ((byBp as any)[bpKey] !== undefined) {
          raw = (byBp as any)[bpKey];
          break;
        }
      }
      // If nothing found below, fall back to the first defined (commonly xs)
      if (raw === undefined) {
        for (let i = 0; i < orderedBps.length; i++) {
          const bpKey = orderedBps[i];
          if ((byBp as any)[bpKey] !== undefined) {
            raw = (byBp as any)[bpKey];
            break;
          }
        }
      }
      if (raw === undefined) continue;
      if (typeof raw === 'number') finalValue = theme.spacing(raw);
      else if (typeof raw === 'string')
        finalValue = resolveThemeColor(raw, theme);
    } else if (typeof value === 'number') {
      finalValue = theme.spacing(value);
    } else {
      finalValue = resolveThemeColor(value as string, theme);
    }

    try {
      (el.style as any)[cssProp] = finalValue as any;
    } catch {
      // Fallback: set as CSS custom property when property is not recognized
      if (finalValue !== undefined)
        el.style.setProperty(cssProp as string, finalValue);
    }
  }
};

/**
 * Applies default + tag-specific typography inline to the element.
 * Merges theme.typography.default and theme.typography[tag] and resolves responsiveness.
 * @param el Target element.
 * @param theme Active theme.
 * @param screenWidth Current viewport width in pixels.
 */
export const applyTypography = (
  el: HTMLElement,
  theme: SjResolvedTheme,
  screenWidth: number
) => {
  const nodeName = el.nodeName.toUpperCase();
  const hasType = (theme.typography as any)[nodeName];
  if (!hasType) return;

  const defaults = theme.typography.default || {};
  const specific = (theme.typography as any)[nodeName] || {};
  const jss: SjStyle = {
    marginBlockStart: '0',
    marginBlockEnd: '0',
    ...(defaults as any),
  };
  applyResponsiveStyle(
    el,
    { ...(jss as any), ...(specific as any) } as SjStyle,
    screenWidth,
    theme
  );
};
