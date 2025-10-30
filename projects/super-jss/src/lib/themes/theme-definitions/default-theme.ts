import { SjPalette, SjTheme } from '../../models/interfaces';
import { DEFAULT_BREAKPOINTS } from '../shared-options/breakpoints';
import { DEFAULT_COLORS } from '../shared-options/colors';
import { DEFAULT_SPACING, SYSTEMIC_SPACING } from '../shared-options/spacing';
import { DEFAULT_TYPOGRAPHY } from '../shared-options/typography';
import { DEFAULT_SURFACES } from '../shared-options/surfaces';

const lightPalette: SjPalette = {
  // Primary
  primary: {
    main: '#0F172A',
    light: '#273555',
    dark: '#050911',
    contrast: DEFAULT_COLORS.white,
  },
  // Secondary
  secondary: {
    main: DEFAULT_COLORS.gray[600],
    light: DEFAULT_COLORS.gray[400],
    dark: DEFAULT_COLORS.gray[900],
    contrast: DEFAULT_COLORS.white,
  },
  // Tertiary (gray family)
  tertiary: {
    main: DEFAULT_COLORS.gray[300],
    light: DEFAULT_COLORS.gray[200],
    dark: DEFAULT_COLORS.gray[400],
    contrast: DEFAULT_COLORS.cyan.contrast,
  },
  // Success
  success: {
    main: '#3caf40',
    light: '#7ee583',
    dark: '#298f2e',
    contrast: DEFAULT_COLORS.gray[900],
  },
  // Info
  info: {
    main: '#8ac8fb',
    light: '#d5eafb',
    dark: '#50a2e5',
    contrast: '#0F172A',
  },
  // Warning
  warning: {
    main: DEFAULT_COLORS.orange[500],
    light: '#FFC673',
    dark: DEFAULT_COLORS.orange[700],
    contrast: DEFAULT_COLORS.gray[900],
  },
  // Error
  error: {
    main: DEFAULT_COLORS.red[500],
    light: '#F79494',
    dark: DEFAULT_COLORS.red[700],
    contrast: DEFAULT_COLORS.white,
  },
  // Dark/neutral/light aligned to greys
  dark: {
    main: DEFAULT_COLORS.gray[800],
    light: DEFAULT_COLORS.gray[600],
    dark: DEFAULT_COLORS.black,
    contrast: DEFAULT_COLORS.white,
  },
  neutral: {
    main: '#B8BFBE',
    light: '#DFF0EC',
    dark: '#77918C',
    contrast: '#050911', // primary.dark
  },
  light: {
    main: DEFAULT_COLORS.gray[200],
    light: DEFAULT_COLORS.gray[50],
    dark: DEFAULT_COLORS.gray[400],
    contrast: DEFAULT_COLORS.gray[900],
  },
};

const darkPalette: SjPalette = {
  primary: {
    main: '#8093C2',
    light: '#94ABE0',
    dark: '#50638F',
    contrast: DEFAULT_COLORS.gray[900],
  },
  secondary: {
    main: '#A8A8A8',
    light: '#F0F0F0',
    dark: '#878787',
    contrast: '#FFFFFF',
  },
  tertiary: {
    main: '#EEEEEE', // gray-200
    light: '#F5F5F5', // gray-100
    dark: '#E0E0E0', // gray-300
    contrast: '#FFFFFF',
  },
  success: {
    main: DEFAULT_COLORS.green[300], // '#81C784'
    light: DEFAULT_COLORS.green[200],
    dark: DEFAULT_COLORS.green[400],
    contrast: '#212121', // dark.dark
  },
  info: {
    main: DEFAULT_COLORS.cyan[700],
    light: DEFAULT_COLORS.cyan[500],
    dark: DEFAULT_COLORS.cyan[900],
    contrast: DEFAULT_COLORS.black,
  },
  warning: {
    main: '#F5A04A',
    light: '#F3C172',
    dark: '#CC733D',
    contrast: DEFAULT_COLORS.gray[900],
  },
  error: {
    main: '#DB4646',
    light: '#F07A6E',
    dark: '#BF3F3F',
    contrast: '#FFFFFF',
  },
  dark: {
    main: '#424242', // gray-800
    light: '#616161', // gray-700
    dark: DEFAULT_COLORS.gray[900],
    contrast: '#FFFFFF',
  },
  neutral: {
    main: '#E0E0E0', // gray-300
    light: '#EEEEEE', // gray-200
    dark: '#BDBDBD', // gray-400
    contrast: '#FFFFFF',
  },
  light: {
    main: '#282828ff', // gray-500
    light: '#070707ff', // gray-400
    dark: '#4f4f4fff', // gray-600
    contrast: '#ffffffff',
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
