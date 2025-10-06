import { SjTheme, SjPalette, SjTypography, SjBreakPoints } from 'super-jss';

const palette: SjPalette = {
  primary: {
    main: '#6A1B9A', // deep violet
    light: '#8E24AA',
    dark: '#4A148C',
    contrast: '#FFFFFF',
  },
  secondary: {
    main: '#00ACC1', // cyan
    light: '#26C6DA',
    dark: '#00838F',
    contrast: '#FFFFFF',
  },
  tertiary: {
    main: '#FFC107',
    light: '#FFD54F',
    dark: '#FFA000',
    contrast: '#000000',
  },
  success: {
    main: '#43A047',
    light: '#66BB6A',
    dark: '#2E7D32',
    contrast: '#FFFFFF',
  },
  info: {
    main: '#29B6F6',
    light: '#4FC3F7',
    dark: '#0288D1',
    contrast: '#FFFFFF',
  },
  warning: {
    main: '#FB8C00',
    light: '#FFB74D',
    dark: '#EF6C00',
    contrast: '#000000',
  },
  error: {
    main: '#E53935',
    light: '#EF5350',
    dark: '#C62828',
    contrast: '#FFFFFF',
  },
  dark: {
    main: '#263238', // blue-grey 900
    light: '#455A64',
    dark: '#000000',
    contrast: '#FFFFFF',
  },
  neutral: {
    main: '#90A4AE',
    light: '#CFD8DC',
    dark: '#607D8B',
    contrast: '#000000',
  },
  light: {
    main: '#ECEFF1',
    light: '#FFFFFF',
    dark: '#B0BEC5',
    contrast: '#000000',
  },
};

const typography: SjTypography = {
  default: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  },
};

const breakpoints: SjBreakPoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1600,
  xxl: 2560,
};

const spacing = (factor: number): string => `${factor * 0.75}rem`;

export const midnightVioletTheme: SjTheme = {
  name: 'Midnight Violet',
  palette,
  typography,
  breakpoints,
  spacing,
};

