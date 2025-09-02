import { SjPalette, SjTheme } from '../../models/interfaces';
import { DEFAULT_BREAKPOINTS } from '../shared-options/breakpoints';
import { DEFAULT_COLORS } from '../shared-options/colors';
import { DEFAULT_SPACING } from '../shared-options/spacing';
import { DEFAULT_TYPOGRAPHY } from '../shared-options/typography';

const lightPalette: SjPalette = {
  primary: {
    main: DEFAULT_COLORS.orange[800],
    light: DEFAULT_COLORS.orange[500],
    dark: DEFAULT_COLORS.orange[900],
    contrast: DEFAULT_COLORS.white,
  },
  secondary: {
    main: DEFAULT_COLORS.yellow[700],
    light: DEFAULT_COLORS.yellow[500],
    dark: DEFAULT_COLORS.yellow[800],
    contrast: DEFAULT_COLORS.black,
  },
  tertiary: {
    main: DEFAULT_COLORS.red[900],
    light: DEFAULT_COLORS.red[500],
    dark: DEFAULT_COLORS.red[700],
    contrast: DEFAULT_COLORS.white,
  },
  success: {
    main: DEFAULT_COLORS.green[500],
    light: DEFAULT_COLORS.green[300],
    dark: DEFAULT_COLORS.green[700],
    contrast: DEFAULT_COLORS.gray[50],
  },
  info: {
    main: DEFAULT_COLORS.cyan[500],
    light: DEFAULT_COLORS.cyan[300],
    dark: DEFAULT_COLORS.cyan[700],
    contrast: DEFAULT_COLORS.gray[50],
  },
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

const darkPalette: SjPalette = {
  primary: {
    main: DEFAULT_COLORS.orange[400],
    light: DEFAULT_COLORS.orange[200],
    dark: DEFAULT_COLORS.orange[600],
    contrast: DEFAULT_COLORS.black,
  },
  secondary: {
    main: DEFAULT_COLORS.yellow[300],
    light: DEFAULT_COLORS.yellow[100],
    dark: DEFAULT_COLORS.yellow[500],
    contrast: DEFAULT_COLORS.black,
  },
  tertiary: {
    main: DEFAULT_COLORS.red[300],
    light: DEFAULT_COLORS.red[100],
    dark: DEFAULT_COLORS.red[500],
    contrast: DEFAULT_COLORS.black,
  },
  success: {
    main: DEFAULT_COLORS.green[300],
    light: DEFAULT_COLORS.green[100],
    dark: DEFAULT_COLORS.green[500],
    contrast: DEFAULT_COLORS.gray[900],
  },
  info: {
    main: DEFAULT_COLORS.cyan[300],
    light: DEFAULT_COLORS.cyan[100],
    dark: DEFAULT_COLORS.cyan[500],
    contrast: DEFAULT_COLORS.gray[900],
  },
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

export const desertTheme: SjTheme = {
  breakpoints: DEFAULT_BREAKPOINTS,
  spacing: DEFAULT_SPACING,
  typography: DEFAULT_TYPOGRAPHY,
  colors: DEFAULT_COLORS,
  palette: lightPalette,
};

export const desertDarkTheme: Partial<SjTheme> = {
  palette: darkPalette,
};
