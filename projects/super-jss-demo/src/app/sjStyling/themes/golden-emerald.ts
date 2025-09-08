import { SjTheme, SjPalette, SjTypography, SjBreakPoints, SjColors } from 'super-jss';

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
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '1.5',
    },
    H1: { fontSize: { xs: 2.7, md: 3.7 }, fontWeight: '600', lineHeight: 4 },
    H2: { fontSize: { xs: 2.2, md: 3.2 }, fontWeight: '600', lineHeight: 3.5 },
    H3: { fontSize: { xs: 1.95, md: 2.7 }, fontWeight: '600', lineHeight: 3 },
    H4: { fontSize: { xs: 1.7, md: 2.2 }, fontWeight: '600', lineHeight: 2 },
    H5: { fontSize: { xs: 1.45, md: 1.95 }, fontWeight: '600', lineHeight: 2 },
    H6: { fontSize: { xs: 1.2, md: 1.45 }, fontWeight: '600', lineHeight: 1.5 },
    P: { fontSize: 1.1, fontWeight: 'normal', lineHeight: 1.4 },
    SPAN: { fontSize: 1, fontWeight: 'normal', lineHeight: 1.2 },
    STRONG: { fontSize: 1.1, fontWeight: 'bold', lineHeight: 1.2 },
    BODY: { fontSize: 1.1, fontWeight: 'normal', lineHeight: 1.2 },
    CAPTION: { fontSize: 0.9, fontWeight: 'normal', lineHeight: 1.2 },
    SMALL: { fontSize: 0.85, fontWeight: 'normal', lineHeight: 1.2 },
    PRE: { fontSize: 0.85, fontWeight: 'normal', lineHeight: 1.2 },
};

const breakpoints: SjBreakPoints = {
    xs: 0,
    sm: 550,
    md: 920,
    lg: 1120,
    xl: 1620,
    xxl: 2560
};

const spacing = (factor: number): string => `${factor * 0.5}rem`;

export const goldenEmeraldTheme: Partial<SjTheme> = {
      palette,
      breakpoints,
      typography,
      spacing
};