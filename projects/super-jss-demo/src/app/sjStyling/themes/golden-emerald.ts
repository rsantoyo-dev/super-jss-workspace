import {
  SjTheme,
  SjPalette,
  SjTypography,
  SjBreakPoints,
  SjColors,
} from 'super-jss';

const palette: SjPalette = {
  primary: {
    main: '#f1c40f', // gold
    light: '#f39c12', // orange
    dark: '#c0392b', // dark red/brown
    contrast: '#ffffff',
  },
  secondary: {
    main: '#2ecc71', // emerald
    light: '#a9e8c3ff', // lighter emerald
    dark: '#0b493cff', // darker emerald/teal
    contrast: '#ffffff',
  },
  tertiary: {
    main: '#9C27B0',
    light: '#BA68C8',
    dark: '#7B1FA2',
    contrast: '#FFFFFF',
  },
  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
    contrast: '#FFFFFF',
  },
  info: {
    main: '#00BCD4',
    light: '#4DD0E1',
    dark: '#0097A7',
    contrast: '#FFFFFF',
  },
  warning: {
    main: '#F39C12',
    light: '#FFB74D',
    dark: '#F57C00',
    contrast: '#FFFFFF',
  },
  error: {
    main: '#E74C3C',
    light: '#E57373',
    dark: '#D32F2F',
    contrast: '#FFFFFF',
  },
  dark: {
    main: '#424242',
    light: '#757575',
    dark: '#000000',
    contrast: '#FFFFFF',
  },
  neutral: {
    main: '#9E9E9E',
    light: '#E0E0E0',
    dark: '#616161',
    contrast: '#FFFFFF',
  },
  light: {
    main: '#EEEEEE',
    light: '#FAFAFA',
    dark: '#BDBDBD',
    contrast: '#000000',
  },
};

const typography: SjTypography = {
  default: {
    fontFamily: 'monospace',
  },
};

const breakpoints: SjBreakPoints = {
  xs: 0,
  sm: 550,
  md: 920,
  lg: 1120,
  xl: 1620,
  xxl: 2560,
};

const spacing = (factor: number): string => `${factor * 0.8}rem`;

export const goldenEmeraldTheme: SjTheme = {
  name: 'Golden Emerald',
  palette,
  breakpoints,
  typography,
  spacing,
};
