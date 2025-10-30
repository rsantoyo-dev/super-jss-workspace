import {
  SjTheme,
  SjPalette,
  SjTypography,
  SjBreakPoints,
  SjColors,
  DEFAULT_SPACING,
  SYSTEMIC_SPACING,
} from 'super-jss';

const primary = {
  main: '#f1c40f', // gold
  light: '#f39c12', // orange
  dark: '#c0392b', // dark red/brown
  contrast: '#ffffff',
};
const info = {
  main: primary.light,
  light: '#ffffff',
  dark: primary.main,
  contrast: '#000000',
};
const palette: SjPalette = {
  primary,
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
  info,
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

// Align spacing with default systemic scale (steps 1..20)
const spacing = (factor: number): string => {
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
};

export const goldenEmeraldTheme: SjTheme = {
  name: 'Golden Emerald',
  palette,
  breakpoints,
  typography,
  spacing,
};
