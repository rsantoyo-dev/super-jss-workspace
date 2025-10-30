import { SjPalette, SjTheme } from '../../models/interfaces';
import { DEFAULT_BREAKPOINTS } from '../shared-options/breakpoints';
import { DEFAULT_COLORS } from '../shared-options/colors';
import { DEFAULT_SPACING, SYSTEMIC_SPACING } from '../shared-options/spacing';
import { DEFAULT_TYPOGRAPHY } from '../shared-options/typography';
import { DEFAULT_SURFACES } from '../shared-options/surfaces';

const lightPalette: SjPalette = {
  // Primary: from provided palette (blueish, dark)
  primary: {
    main: '#13284dff',
    light: '#3e6ec2ff',
    dark: '#010815ff',
    contrast: '#e5e9efff',
  },
  // Secondary: magenta/pink accent from provided palette
  secondary: {
    main: '#c53aaeff',
    light: '#e472d1ff',
    dark: '#701060ff',
    contrast: '#f0e8eeff',
  },
  // Tertiary: neutralish (subtle gray accent)
  tertiary: {
    main: DEFAULT_COLORS.gray[600],
    light: DEFAULT_COLORS.gray[400],
    dark: DEFAULT_COLORS.gray[800],
    contrast: DEFAULT_COLORS.white,
  },
  // Success
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
    contrast: DEFAULT_COLORS.white,
  },
  // Info
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
    contrast: DEFAULT_COLORS.white,
  },
  // Warning
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
    contrast: DEFAULT_COLORS.black,
  },
  // Error
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
    contrast: DEFAULT_COLORS.white,
  },
  // Dark/neutral/light aligned to grey scale and backgrounds
  dark: {
    main: DEFAULT_COLORS.gray[900],
    light: DEFAULT_COLORS.gray[800],
    dark: DEFAULT_COLORS.black,
    contrast: DEFAULT_COLORS.white,
  },
  neutral: {
    main: DEFAULT_COLORS.gray[500],
    light: DEFAULT_COLORS.gray[300],
    dark: DEFAULT_COLORS.gray[700],
    contrast: DEFAULT_COLORS.black,
  },
  light: {
    main: DEFAULT_COLORS.gray[100], // paper
    light: DEFAULT_COLORS.gray[50], // near-background
    dark: DEFAULT_COLORS.gray[200],
    contrast: DEFAULT_COLORS.gray[900],
  },
};

const darkPalette: SjPalette = {
  primary: {
    main: DEFAULT_COLORS.blue[700],
    light: DEFAULT_COLORS.blue[500],
    dark: DEFAULT_COLORS.blue[900],
    contrast: DEFAULT_COLORS.white,
  },
  secondary: {
    main: DEFAULT_COLORS.orange[700],
    light: DEFAULT_COLORS.orange[500],
    dark: DEFAULT_COLORS.orange[900],
    contrast: DEFAULT_COLORS.white,
  },
  tertiary: {
    main: DEFAULT_COLORS.red[700],
    light: DEFAULT_COLORS.red[500],
    dark: DEFAULT_COLORS.red[900],
    contrast: DEFAULT_COLORS.white,
  },
  success: {
    main: DEFAULT_COLORS.green[700],
    light: DEFAULT_COLORS.green[500],
    dark: DEFAULT_COLORS.green[900],
    contrast: DEFAULT_COLORS.white,
  },
  info: {
    main: DEFAULT_COLORS.cyan[700],
    light: DEFAULT_COLORS.cyan[500],
    dark: DEFAULT_COLORS.cyan[900],
    contrast: DEFAULT_COLORS.white,
  },
  warning: {
    main: DEFAULT_COLORS.orange[700],
    light: DEFAULT_COLORS.orange[500],
    dark: DEFAULT_COLORS.orange[900],
    contrast: DEFAULT_COLORS.white,
  },
  error: {
    main: DEFAULT_COLORS.red[700],
    light: DEFAULT_COLORS.red[500],
    dark: DEFAULT_COLORS.red[900],
    contrast: DEFAULT_COLORS.white,
  },
  dark: {
    main: DEFAULT_COLORS.gray[900],
    light: DEFAULT_COLORS.gray[800],
    dark: DEFAULT_COLORS.black,
    contrast: DEFAULT_COLORS.white,
  },
  neutral: {
    main: DEFAULT_COLORS.gray[700],
    light: DEFAULT_COLORS.gray[800],
    dark: DEFAULT_COLORS.gray[600],
    contrast: DEFAULT_COLORS.white,
  },
  light: {
    main: DEFAULT_COLORS.gray[800],
    light: DEFAULT_COLORS.gray[900],
    dark: DEFAULT_COLORS.gray[700],
    contrast: DEFAULT_COLORS.white,
  },
};

export const defaultTheme: SjTheme = {
  name: 'Default Light',
  breakpoints: DEFAULT_BREAKPOINTS,
  // Systemic spacing: accepts integer steps 1..20 only (clamps + warns in dev)
  spacing: (factor: number) => {
    const n = Number(factor);
    const rounded = Math.round(n);
    const clamped = Math.max(1, Math.min(20, rounded));
    if (
      typeof window !== 'undefined' &&
      (window as any).ngDevMode &&
      (n !== rounded || rounded < 1 || rounded > 20)
    ) {
      try {
        // eslint-disable-next-line no-console
        console.warn(
          `[SJSS] theme.spacing expects integer step 1..20; received ${factor}. Using ${clamped}.`
        );
      } catch {}
    }
    return DEFAULT_SPACING(SYSTEMIC_SPACING(clamped));
  },
  typography: DEFAULT_TYPOGRAPHY,
  colors: DEFAULT_COLORS,
  palette: lightPalette,
  components: {
    surfaces: DEFAULT_SURFACES,
  },
};

export const defaultDarkTheme: Partial<SjTheme> = {
  name: 'Default Dark',
  palette: darkPalette,
  // Ensure default text color is readable on dark backgrounds
  typography: {
    default: {
      color: 'light.contrast',
    },
  },
};
