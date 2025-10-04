import { SjPalette, SjTheme, DEFAULT_BREAKPOINTS, DEFAULT_COLORS, DEFAULT_SPACING, DEFAULT_TYPOGRAPHY } from 'super-jss';

const lightPalette: SjPalette = {
  primary: {
    main: DEFAULT_COLORS.orange[500],
    light: DEFAULT_COLORS.orange[300],
    dark: DEFAULT_COLORS.orange[700],
    contrast: DEFAULT_COLORS.black,
  },
  secondary: {
    main: DEFAULT_COLORS.teal[500],
    light: DEFAULT_COLORS.teal[300],
    dark: DEFAULT_COLORS.teal[700],
    contrast: DEFAULT_COLORS.white,
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
    main: DEFAULT_COLORS.cyan[500],
    light: DEFAULT_COLORS.cyan[300],
    dark: DEFAULT_COLORS.cyan[700],
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
    main: DEFAULT_COLORS.orange[300],
    light: DEFAULT_COLORS.orange[100],
    dark: DEFAULT_COLORS.orange[500],
    contrast: DEFAULT_COLORS.black,
  },
  secondary: {
    main: DEFAULT_COLORS.teal[200],
    light: DEFAULT_COLORS.teal[100],
    dark: DEFAULT_COLORS.teal[400],
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
    contrast: DEFAULT_COLORS.black,
  },
  info: {
    main: DEFAULT_COLORS.cyan[300],
    light: DEFAULT_COLORS.cyan[100],
    dark: DEFAULT_COLORS.cyan[500],
    contrast: DEFAULT_COLORS.black,
  },
  warning: {
    main: DEFAULT_COLORS.orange[300],
    light: DEFAULT_COLORS.orange[100],
    dark: DEFAULT_COLORS.orange[500],
    contrast: DEFAULT_COLORS.black,
  },
  error: {
    main: DEFAULT_COLORS.red[300],
    light: DEFAULT_COLORS.red[100],
    dark: DEFAULT_COLORS.red[500],
    contrast: DEFAULT_COLORS.black,
  },
  dark: {
    main: DEFAULT_COLORS.gray[200],
    light: DEFAULT_COLORS.gray[50],
    dark: DEFAULT_COLORS.gray[400],
    contrast: DEFAULT_COLORS.black,
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

export const desertTheme: SjTheme = {
  name: 'Desert Light',
  breakpoints: DEFAULT_BREAKPOINTS,
  spacing: DEFAULT_SPACING,
  typography: DEFAULT_TYPOGRAPHY,
  colors: DEFAULT_COLORS,
  palette: lightPalette,
};

export const desertDarkTheme: Partial<SjTheme> = {
  name: 'Desert Dark',
  palette: darkPalette,
};

