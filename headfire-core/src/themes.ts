// Flat default themes for compile-time substitution (no CSS variables required)
// Keys match tokens used in theme() calls, e.g., theme(primary), theme(dark-main), theme(space-2)

export const defaultLightTheme = {
  primary: '#3b82f6',
  'primary-contrast': '#ffffff',
  'space-2': '8px',
  'space-4': '16px',
  'dark-light': '#f3f4f6',
  'dark-main': '#e5e7eb',
  'dark-contrast': '#111827',
  'app-bg': '#f3f4f6',
} as const;

export const defaultDarkTheme = {
  primary: '#60a5fa',
  'primary-contrast': '#1f2937',
  'space-2': '8px',
  'space-4': '16px',
  'dark-light': '#374151',
  'dark-main': '#1f2937',
  'dark-contrast': '#f9fafb',
  'app-bg': '#0b1020',
} as const;

// Generate CSS variables for a theme
export function generateThemeCSS(
  theme: Record<string, string>,
  selector = ':root'
) {
  const vars = Object.entries(theme)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');
  return `${selector} {\n${vars}\n}`;
}

// Pre-generated CSS for default themes
export const defaultLightThemeCSS = generateThemeCSS(
  defaultLightTheme,
  ':root[data-hf-theme="light"]'
);
export const defaultDarkThemeCSS = generateThemeCSS(
  defaultDarkTheme,
  ':root[data-hf-theme="dark"]'
);
export const defaultThemesCSS: string = `${defaultDarkThemeCSS}\n${defaultLightThemeCSS}`;

// High-level theme helpers (DRY theme driver)
import type { HfTheme, HfPalette, HfBreakPoints } from './types';

export const DEFAULT_BREAKPOINTS: HfBreakPoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
  xxl: 2560,
};

/**
 * Build a token map from an HfTheme for use with theme() in CSS.
 * Produces keys like primary, primary-contrast, dark-main, dark-light, app-bg,
 * and a few spacing helpers (space-2, space-4).
 */
export function themeToTokenMap(theme: HfTheme): Record<string, string> {
  const tokens: Record<string, string> = {};
  const pal = theme.palette;
  function add(fam: string, shades: any) {
    if (!shades) return;
    if (shades.main) tokens[`${fam}`] = String(shades.main);
    if (shades.contrast) tokens[`${fam}-contrast`] = String(shades.contrast);
    if (shades.light) tokens[`${fam}-light`] = String(shades.light);
    if (shades.dark) tokens[`${fam}-dark`] = String(shades.dark);
  }
  // Common families
  add('primary', (pal as any).primary);
  add('secondary', (pal as any).secondary);
  add('neutral', (pal as any).neutral);
  add('dark', (pal as any).dark);
  add('light', (pal as any).light);
  // App background
  tokens['app-bg'] = String(
    theme.appBackground || (pal.light?.main ?? '#ffffff')
  );
  // Spacing quick helpers (2 and 4 steps by default)
  const step = theme.spacingStepRem ?? 0.25;
  tokens['space-2'] = `${2 * step}rem`;
  tokens['space-4'] = `${4 * step}rem`;
  return tokens;
}

// Example high-level default themes (objects), useful for apps
export const defaultLightThemeObject: HfTheme = {
  name: 'Default Light',
  palette: {
    primary: {
      main: '#3b82f6',
      light: '#93c5fd',
      dark: '#1d4ed8',
      contrast: '#ffffff',
    },
    dark: {
      main: '#e5e7eb',
      light: '#f3f4f6',
      dark: '#d1d5db',
      contrast: '#111827',
    },
    light: {
      main: '#f3f4f6',
      light: '#ffffff',
      dark: '#e5e7eb',
      contrast: '#111827',
    },
    neutral: {
      main: '#6b7280',
      light: '#d1d5db',
      dark: '#374151',
      contrast: '#111827',
    },
  } as HfPalette,
  spacingStepRem: 0.25,
  spacingSteps: 20,
  appBackground: '#f3f4f6',
  breakpoints: DEFAULT_BREAKPOINTS,
};

export const defaultDarkThemeObject: HfTheme = {
  name: 'Default Dark',
  palette: {
    primary: {
      main: '#93c5fd',
      light: '#bfdbfe',
      dark: '#60a5fa',
      contrast: '#1f2937',
    },
    dark: {
      main: '#0b1020',
      light: '#111827',
      dark: '#020617',
      contrast: '#f9fafb',
    },
    light: {
      main: '#1f2937',
      light: '#111827',
      dark: '#374151',
      contrast: '#f9fafb',
    },
    neutral: {
      main: '#9ca3af',
      light: '#e5e7eb',
      dark: '#6b7280',
      contrast: '#111827',
    },
  } as HfPalette,
  spacingStepRem: 0.25,
  spacingSteps: 20,
  appBackground: '#0b1020',
  breakpoints: DEFAULT_BREAKPOINTS,
};

export type HfBreakPoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl?: number;
};

export const DEFAULT_BREAKPOINTS: HfBreakPoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
  xxl: 2560,
};
