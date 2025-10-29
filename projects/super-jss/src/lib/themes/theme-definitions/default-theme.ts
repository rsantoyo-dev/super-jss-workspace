import { SjPalette, SjTheme } from '../../models/interfaces';
import { DEFAULT_BREAKPOINTS } from '../shared-options/breakpoints';
import { DEFAULT_COLORS } from '../shared-options/colors';
import { DEFAULT_SPACING } from '../shared-options/spacing';
import { DEFAULT_TYPOGRAPHY } from '../shared-options/typography';
import { DEFAULT_SURFACES, DEFAULT_SURFACES_PRESETS } from '../shared-options/surfaces';

const lightPalette: SjPalette = {
  primary: {
    main: DEFAULT_COLORS.blue[500],
    light: DEFAULT_COLORS.blue[300],
    dark: DEFAULT_COLORS.blue[700],
    contrast: DEFAULT_COLORS.white,
  },
  secondary: {
    main: DEFAULT_COLORS.orange[500],
    light: DEFAULT_COLORS.orange[300],
    dark: DEFAULT_COLORS.orange[700],
    contrast: DEFAULT_COLORS.black,
  },
  tertiary: {
    main: DEFAULT_COLORS.red[500],
    light: DEFAULT_COLORS.red[300],
    dark: DEFAULT_COLORS.red[700],
    contrast: DEFAULT_COLORS.white,
  },
  success: {
    main: DEFAULT_COLORS.green[500],
    light: DEFAULT_COLORS.green[300],
    dark: DEFAULT_COLORS.green[700],
    contrast: DEFAULT_COLORS.white,
  },
  info: {
    main: DEFAULT_COLORS.blue[100],
    light: DEFAULT_COLORS.white,
    dark: DEFAULT_COLORS.blue[200],
    contrast: DEFAULT_COLORS.black,
  },
  warning: {
    main: DEFAULT_COLORS.orange[500],
    light: DEFAULT_COLORS.orange[300],
    dark: DEFAULT_COLORS.orange[700],
    contrast: DEFAULT_COLORS.black,
  },
  error: {
    main: DEFAULT_COLORS.red[500],
    light: DEFAULT_COLORS.red[300],
    dark: DEFAULT_COLORS.red[700],
    contrast: DEFAULT_COLORS.white,
  },
  dark: {
    main: DEFAULT_COLORS.gray[800],
    light: DEFAULT_COLORS.gray[600],
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
    main: DEFAULT_COLORS.gray[200],
    light: DEFAULT_COLORS.gray[50],
    dark: DEFAULT_COLORS.gray[400],
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
  spacing: DEFAULT_SPACING,
  typography: DEFAULT_TYPOGRAPHY,
  colors: DEFAULT_COLORS,
  palette: lightPalette,
  components: {
    surfaces: DEFAULT_SURFACES,
    surfacesPresets: DEFAULT_SURFACES_PRESETS,
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
