import { SjPalette, SjTheme } from '../../models/interfaces';
import { DEFAULT_BREAKPOINTS } from '../shared-options/breakpoints';
import { DEFAULT_COLORS } from '../shared-options/colors';
import { DEFAULT_SPACING, SYSTEMIC_SPACING } from '../shared-options/spacing';
import { DEFAULT_TYPOGRAPHY } from '../shared-options/typography';
import { DEFAULT_SURFACES } from '../shared-options/surfaces';

const lightPalette: SjPalette = {
  // Primary (brand teal)
  primary: {
    main: DEFAULT_COLORS.teal[500], // #2C415C
    light: DEFAULT_COLORS.teal[300], // #8AA7BA (focus ring / tints)
    dark: DEFAULT_COLORS.teal[600], // #25374E
    contrast: DEFAULT_COLORS.white,
  },
  // Secondary (neutral mid-gray)
  secondary: {
    main: DEFAULT_COLORS.gray[600],
    light: DEFAULT_COLORS.gray[400],
    dark: DEFAULT_COLORS.gray[700],
    contrast: DEFAULT_COLORS.white,
  },
  // Tertiary (neutral light gray)
  tertiary: {
    main: DEFAULT_COLORS.gray[300],
    light: DEFAULT_COLORS.gray[200],
    dark: DEFAULT_COLORS.gray[400],
    contrast: DEFAULT_COLORS.gray.contrast,
  },
  // Success (AA pairs)
  success: {
    main: DEFAULT_COLORS.green[700], // #166534
    light: DEFAULT_COLORS.green[600], // #15803D
    dark: DEFAULT_COLORS.green[700],
    contrast: DEFAULT_COLORS.white,
  },
  // Info
  info: {
    main: DEFAULT_COLORS.blue[500], // #2563EB
    light: DEFAULT_COLORS.blue[400], // #3B82F6
    dark: DEFAULT_COLORS.blue[500],
    contrast: DEFAULT_COLORS.white,
  },
  // Warning (amber)
  warning: {
    main: DEFAULT_COLORS.orange[500], // #F59E0B
    light: DEFAULT_COLORS.orange[500],
    dark: DEFAULT_COLORS.orange[600], // #D97706
    contrast: DEFAULT_COLORS.gray[900], // #0B1220
  },
  // Error (caution)
  error: {
    main: DEFAULT_COLORS.red[600], // #C61625
    light: DEFAULT_COLORS.red[500], // #EC1B2E
    dark: DEFAULT_COLORS.red[600],
    contrast: DEFAULT_COLORS.white,
  },
  // Dark/neutral/light aligned to semantic neutrals
  dark: {
    main: DEFAULT_COLORS.gray[800], // text
    light: DEFAULT_COLORS.gray[600], // textSubtle
    dark: DEFAULT_COLORS.gray[900],
    contrast: DEFAULT_COLORS.white,
  },
  neutral: {
    main: DEFAULT_COLORS.gray[200], // surface border/base
    light: DEFAULT_COLORS.gray[50], // surfaceAlt/bg
    dark: DEFAULT_COLORS.gray[300],
    contrast: DEFAULT_COLORS.gray[900],
  },
  light: {
    main: DEFAULT_COLORS.white, // surface
    light: DEFAULT_COLORS.gray[50], // bg
    dark: DEFAULT_COLORS.gray[100], // border-adjacent
    contrast: DEFAULT_COLORS.gray[900],
  },
};

const darkPalette: SjPalette = {
  // Brand remains consistent
  primary: {
    main: DEFAULT_COLORS.teal[500],
    light: DEFAULT_COLORS.teal[300],
    dark: DEFAULT_COLORS.teal[600],
    contrast: DEFAULT_COLORS.white,
  },
  secondary: {
    main: DEFAULT_COLORS.gray[400],
    light: DEFAULT_COLORS.gray[300],
    dark: DEFAULT_COLORS.gray[500],
    contrast: DEFAULT_COLORS.gray[900],
  },
  tertiary: {
    main: DEFAULT_COLORS.gray[200],
    light: DEFAULT_COLORS.gray[100],
    dark: DEFAULT_COLORS.gray[300],
    contrast: DEFAULT_COLORS.white,
  },
  success: {
    main: DEFAULT_COLORS.green[600], // #15803D
    light: DEFAULT_COLORS.green[700], // #166534
    dark: DEFAULT_COLORS.green[600],
    contrast: DEFAULT_COLORS.white,
  },
  info: {
    main: DEFAULT_COLORS.blue[400], // #3B82F6
    light: DEFAULT_COLORS.blue[500],
    dark: DEFAULT_COLORS.blue[400],
    contrast: DEFAULT_COLORS.gray[900], // on dark surfaces
  },
  warning: {
    main: DEFAULT_COLORS.orange[600], // #D97706
    light: DEFAULT_COLORS.orange[500],
    dark: DEFAULT_COLORS.orange[600],
    contrast: DEFAULT_COLORS.gray[900],
  },
  error: {
    main: DEFAULT_COLORS.red[600], // #C61625
    light: DEFAULT_COLORS.red[500],
    dark: DEFAULT_COLORS.red[600],
    contrast: DEFAULT_COLORS.white,
  },
  // Neutrals tuned for dark canvas
  dark: {
    main: DEFAULT_COLORS.gray[50], // text
    light: DEFAULT_COLORS.gray[300], // textSubtle
    dark: DEFAULT_COLORS.gray[900],
    contrast: DEFAULT_COLORS.gray[900],
  },
  neutral: {
    main: DEFAULT_COLORS.gray[300],
    light: DEFAULT_COLORS.gray[200],
    dark: DEFAULT_COLORS.gray[400],
    contrast: DEFAULT_COLORS.white,
  },
  light: {
    // Surface shades for dark theme
    main: DEFAULT_COLORS.gray[700], // surfaceAlt
    light: DEFAULT_COLORS.gray[800], // surface
    dark: '#374151', // border
    contrast: DEFAULT_COLORS.gray[50],
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
