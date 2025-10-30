import {
  SjTheme,
  SjPalette,
  SjTypography,
  SjBreakPoints,
  DEFAULT_SPACING,
  SYSTEMIC_SPACING,
} from 'super-jss';

const primary = {
  main: '#6A1B9A', // deep violet
  light: '#8E24AA',
  dark: '#4A148C',
  contrast: '#FFFFFF',
};
const info = {
  main: primary.light,
  light: '#FFFFFF',
  dark: primary.main,
  contrast: '#000000',
};
const palette: SjPalette = {
  primary,
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
  info,
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
    fontFamily:
      'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
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

export const midnightVioletTheme: SjTheme = {
  name: 'Midnight Violet',
  palette,
  typography,
  breakpoints,
  spacing,
};
