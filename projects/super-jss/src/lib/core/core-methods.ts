import { SjBreakPoints, SjStyle, SjTheme, ResponsiveStyle } from "../models/interfaces";
import { shorthandMappings } from '../models/mappings';

/**
 * Determines the current breakpoint based on the screen width and defined breakpoints.
 * @param {SjBreakPoints} breakpoints - The defined breakpoints in the theme.
 * @param {number} screenWidth - The current width of the screen.
 * @returns {string} - The current breakpoint key.
 */

export const getCurrentBreakpoint = (breakpoints:SjBreakPoints,screenWidth: number): string => {
    let bp = 'xs'
    for (const key of Object.keys(breakpoints)) {
        const breakpoint = key as keyof SjBreakPoints;
        bp = breakpoints[breakpoint] <= screenWidth ? breakpoint : bp;
    }
    return bp;
}

// Resolve theme color/palette tokens like 'primary.main' or 'blue.500'
export const resolveThemeColor = (value: string, theme: SjTheme): string => {
  const parts = value.split('.');
  if ((parts.length === 1 && value in theme.palette) || value in theme.colors) {
    if (value in theme.colors) {
      const colorObject = theme.colors[value as keyof typeof theme.colors] as any;
      return typeof colorObject === 'object' ? colorObject['500'] : colorObject;
    }
    if (value in theme.palette) {
      return theme.palette[value as keyof typeof theme.palette].main;
    }
  } else if (parts.length === 2) {
    const [category, shade] = parts;
    if (category in theme.colors) {
      const colorObject = theme.colors[category as keyof typeof theme.colors] as any;
      return typeof colorObject === 'object' ? colorObject[shade] ?? value : colorObject;
    }
    if (category in theme.palette) {
      const colorObject = theme.palette[category as keyof typeof theme.palette] as any;
      return colorObject[shade] ?? value;
    }
  }
  return value;
};

// Apply a style object directly to an element, honoring responsive values
export const applyResponsiveStyle = (
  el: HTMLElement,
  styles: SjStyle,
  screenWidth: number,
  theme: SjTheme
) => {
  const currentBp = getCurrentBreakpoint(theme.breakpoints, screenWidth) as keyof SjBreakPoints;
  for (const key in styles) {
    if (!Object.prototype.hasOwnProperty.call(styles, key)) continue;
    if (key.startsWith('&')) continue; // Skip pseudos for inline application

    const cssProp = (shorthandMappings as any)[key] || key;
    const value = (styles as any)[key] as ResponsiveStyle | string | number | undefined;

    let finalValue: string | undefined;
    if (value === undefined) {
      finalValue = undefined;
    } else if (typeof value === 'object' && value !== null) {
      const byBp = value as ResponsiveStyle;
      const raw = (byBp[currentBp] ?? byBp['xs']) as any;
      if (raw === undefined) continue;
      if (typeof raw === 'number') finalValue = theme.spacing(raw);
      else if (typeof raw === 'string') finalValue = resolveThemeColor(raw, theme);
    } else if (typeof value === 'number') {
      finalValue = theme.spacing(value);
    } else {
      finalValue = resolveThemeColor(value as string, theme);
    }

    try {
      (el.style as any)[cssProp] = finalValue as any;
    } catch {
      // Fallback: set as CSS custom property when property is not recognized
      if (finalValue !== undefined) el.style.setProperty(cssProp as string, finalValue);
    }
  }
};

// Apply default + tag-specific typography as inline styles to an element
export const applyTypography = (el: HTMLElement, theme: SjTheme, screenWidth: number) => {
  const nodeName = el.nodeName.toUpperCase();
  const hasType = (theme.typography as any)[nodeName];
  if (!hasType) return;

  const defaults = theme.typography.default || {};
  const specific = (theme.typography as any)[nodeName] || {};
  const jss: SjStyle = { marginBlockStart: '0', marginBlockEnd: '0', ...(defaults as any) };
  applyResponsiveStyle(el, { ...(jss as any), ...(specific as any) } as SjStyle, screenWidth, theme);
};
