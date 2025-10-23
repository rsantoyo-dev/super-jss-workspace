// Low-level token map used by the parser (CSS var names or literal values)
export interface Theme {
  [key: string]: string | number;
}

// Parser breakpoints (string with units)
export interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface CompilerOptions {
  theme: Theme;
  breakpoints: Breakpoints;
}

// High-level Headfire theme types (app-level)
export type HfPaletteColor = {
  main: string;
  light?: string;
  dark?: string;
  contrast?: string;
};

export type HfPalette = Record<string, HfPaletteColor> & {
  primary: HfPaletteColor;
  secondary?: HfPaletteColor;
  neutral?: HfPaletteColor;
  light?: HfPaletteColor;
  dark?: HfPaletteColor;
};

export type HfBreakPoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl?: number;
};

export interface HfTheme {
  name?: string;
  palette: HfPalette;
  spacingStepRem?: number; // 1 unit = spacingStepRem rem
  spacingSteps?: number;   // number of steps to expose as tokens
  appBackground?: string;  // fallback background if not inferred
  breakpoints?: HfBreakPoints;
}
