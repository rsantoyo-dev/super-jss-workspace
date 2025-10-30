import { SjPalette, SjTheme, DEFAULT_BREAKPOINTS, DEFAULT_COLORS, DEFAULT_SPACING, DEFAULT_TYPOGRAPHY, SYSTEMIC_SPACING } from 'super-jss';

// Derive info from primary hue (lighter tints) so it stays related
const lightPrimary = {
  main: DEFAULT_COLORS.cyan[700],
  light: DEFAULT_COLORS.cyan[500],
  dark: DEFAULT_COLORS.cyan[900],
  contrast: DEFAULT_COLORS.white,
};
const lightInfo = {
  main: lightPrimary.light,
  light: DEFAULT_COLORS.white,
  dark: lightPrimary.main,
  contrast: DEFAULT_COLORS.black,
};
const lightPalette: SjPalette = {
  primary: lightPrimary,
  secondary: {
    main: DEFAULT_COLORS.teal[500],
    light: DEFAULT_COLORS.teal[300],
    dark: DEFAULT_COLORS.teal[700],
    contrast: DEFAULT_COLORS.white,
  },
  tertiary: {
    main: DEFAULT_COLORS.green[500],
    light: DEFAULT_COLORS.green[300],
    dark: DEFAULT_COLORS.green[700],
    contrast: DEFAULT_COLORS.white,
  },
  success: {
    main: DEFAULT_COLORS.green[500],
    light: DEFAULT_COLORS.green[300],
    dark: DEFAULT_COLORS.green[700],
    contrast: DEFAULT_COLORS.gray[50],
  },
  info: lightInfo,
  warning: {
    main: DEFAULT_COLORS.orange[500],
    light: DEFAULT_COLORS.orange[300],
    dark: DEFAULT_COLORS.orange[700],
    contrast: DEFAULT_COLORS.gray[50],
  },
  error: {
    main: DEFAULT_COLORS.red[500],
    light: DEFAULT_COLORS.red[300],
    dark: DEFAULT_COLORS.red[700],
    contrast: DEFAULT_COLORS.gray[50],
  },
  dark: {
    main: DEFAULT_COLORS.gray[800],
    light: DEFAULT_COLORS.gray[600],
    dark: DEFAULT_COLORS.black,
    contrast: DEFAULT_COLORS.gray[50],
  },
  neutral: {
    main: DEFAULT_COLORS.gray[500],
    light: DEFAULT_COLORS.gray[300],
    dark: DEFAULT_COLORS.gray[700],
    contrast: DEFAULT_COLORS.gray[50],
  },
  light: {
    main: DEFAULT_COLORS.gray[200],
    light: DEFAULT_COLORS.gray[50],
    dark: DEFAULT_COLORS.gray[400],
    contrast: DEFAULT_COLORS.gray[900],
  },
};

const darkPrimary = {
  main: DEFAULT_COLORS.cyan[300],
  light: DEFAULT_COLORS.cyan[100],
  dark: DEFAULT_COLORS.cyan[500],
  contrast: DEFAULT_COLORS.gray[900],
};
const darkInfo = {
  main: darkPrimary.light,
  light: darkPrimary.main,
  dark: darkPrimary.dark,
  contrast: darkPrimary.contrast,
};
const darkPalette: SjPalette = {
  primary: darkPrimary,
  secondary: {
    main: DEFAULT_COLORS.teal[200],
    light: DEFAULT_COLORS.teal[100],
    dark: DEFAULT_COLORS.teal[400],
    contrast: DEFAULT_COLORS.gray[900],
  },
  tertiary: {
    main: DEFAULT_COLORS.green[200],
    light: DEFAULT_COLORS.green[100],
    dark: DEFAULT_COLORS.green[400],
    contrast: DEFAULT_COLORS.gray[900],
  },
  success: {
    main: DEFAULT_COLORS.green[300],
    light: DEFAULT_COLORS.green[100],
    dark: DEFAULT_COLORS.green[500],
    contrast: DEFAULT_COLORS.gray[900],
  },
  info: darkInfo,
  warning: {
    main: DEFAULT_COLORS.orange[300],
    light: DEFAULT_COLORS.orange[100],
    dark: DEFAULT_COLORS.orange[500],
    contrast: DEFAULT_COLORS.gray[900],
  },
  error: {
    main: DEFAULT_COLORS.red[300],
    light: DEFAULT_COLORS.red[100],
    dark: DEFAULT_COLORS.red[500],
    contrast: DEFAULT_COLORS.gray[900],
  },
  dark: {
    main: DEFAULT_COLORS.gray[200],
    light: DEFAULT_COLORS.gray[50],
    dark: DEFAULT_COLORS.gray[400],
    contrast: DEFAULT_COLORS.gray[900],
  },
  neutral: {
    main: DEFAULT_COLORS.gray[700],
    light: DEFAULT_COLORS.gray[800],
    dark: DEFAULT_COLORS.gray[600],
    contrast: DEFAULT_COLORS.gray[50],
  },
  light: {
    main: DEFAULT_COLORS.gray[800],
    light: DEFAULT_COLORS.gray[900],
    dark: DEFAULT_COLORS.gray[700],
    contrast: DEFAULT_COLORS.gray[50],
  },
};

export const oceanTheme: SjTheme = {
  name: 'Ocean Light',
  breakpoints: DEFAULT_BREAKPOINTS,
  // Align with default theme systemic spacing steps (1..20)
  spacing: (factor: number) => {
    const n = Number(factor);
    const rounded = Math.round(n);
    const clamped = Math.max(1, Math.min(20, rounded));
    if (typeof window !== 'undefined' && (window as any).ngDevMode && (n !== rounded || rounded < 1 || rounded > 20)) {
      try {
        // eslint-disable-next-line no-console
        console.warn(`[SJSS] theme.spacing expects integer step 1..20; received ${factor}. Using ${clamped}.`);
      } catch {}
    }
    return DEFAULT_SPACING(SYSTEMIC_SPACING(clamped));
  },
  typography: DEFAULT_TYPOGRAPHY,
  colors: DEFAULT_COLORS,
  palette: lightPalette,
};

export const oceanDarkTheme: Partial<SjTheme> = {
  name: 'Ocean Dark',
  palette: darkPalette,
};
