import * as CSS from 'csstype';

// Defines options for theme colors with main, light, dark, and contrast variants.
export type SjThemeColorOption = {
  main: string;
  light: string;
  dark: string;
  contrast: string;
};

// Represents a color option with different shades and a contrast color.
export type SjColorOption = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string; // Default shade
  600: string;
  700: string;
  800: string;
  900: string;
  contrast: string;
};

// Collection of color options for different color themes.
export type SjColors = {
  blue: SjColorOption;
  indigo: SjColorOption;
  purple: SjColorOption;
  pink: SjColorOption;
  red: SjColorOption;
  orange: SjColorOption;
  yellow: SjColorOption;
  green: SjColorOption;
  teal: SjColorOption;
  cyan: SjColorOption;
  gray: SjColorOption;
  black: string;
  white: string;
};

// Defines the color palette for primary, secondary, and other specific UI elements.
export type SjPalette = {
  primary: SjThemeColorOption;
  secondary: SjThemeColorOption;
  tertiary: SjThemeColorOption;
  success: SjThemeColorOption;
  info: SjThemeColorOption;
  warning: SjThemeColorOption;
  error: SjThemeColorOption;
  dark: SjThemeColorOption;
  neutral: SjThemeColorOption;
  light: SjThemeColorOption;
};

// Typographic styles for various text elements.
export type SjTypography = {
  default?: SjStyle;
  H1?: SjStyle;
  H2?: SjStyle;
  H3?: SjStyle;
  H4?: SjStyle;
  H5?: SjStyle;
  H6?: SjStyle;
  SPAN?: SjStyle;
  P?: SjStyle;
  BODY?: SjStyle;
  STRONG?: SjStyle;
  CAPTION?: SjStyle;
  SMALL?: SjStyle;
  PRE?: SjStyle;
};

// Main theme configuration including breakpoints, spacing, typography, colors, and palette.
export type SjTheme = {
  name?: string;
  breakpoints?: SjBreakPoints;
  spacing?: (factor: number) => string;
  typography?: SjTypography;
  colors?: SjColors;
  palette?: SjPalette;
  components?: {
    surfaces?: {
      padding?: Partial<Record<1 | 2 | 3 | 4, ResponsiveStyle | number>>;
      gap?: Partial<Record<1 | 2 | 3 | 4, ResponsiveStyle | number>>;
      radius?: Partial<
        Record<1 | 2 | 3 | 4, ResponsiveStyle | number | string>
      >;
      border?: Partial<Record<1 | 2 | 3 | 4, ResponsiveStyle | number>>;
    };
  };
};

// DeepPartial utility to allow nested, partial updates of SjTheme
type Primitive = string | number | boolean | bigint | symbol | undefined | null;
export type DeepPartial<T> = T extends Function
  ? T
  : T extends Primitive
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

// Internal resolved theme with all required fields. The library uses this type
// after merging user-provided partial themes with defaults so downstream code
// doesn't need optional chaining everywhere.
export type SjResolvedTheme = Omit<
  SjTheme,
  'breakpoints' | 'spacing' | 'typography' | 'colors' | 'palette' | 'components'
> & {
  breakpoints: SjBreakPoints;
  spacing: (factor: number) => string;
  typography: SjTypography;
  colors: SjColors;
  palette: SjPalette;
  components: Required<Required<SjTheme>['components']>;
};

// Breakpoints for responsive design, typically width thresholds.
export type SjBreakPoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

// Type for responsive styles, allowing different values for different breakpoints.
export type ResponsiveStyle = {
  xs?: string | number;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
  xl?: string | number;
  xxl?: string | number;
};

// Utility type to make all properties of a type accept ResponsiveStyle
type WithResponsive<T> = {
  [P in keyof T]: T[P] | ResponsiveStyle;
};

// Shorthand styles for common CSS properties with responsive support.
export type SjShorthandStyle = {
  //padding margin
  p?: ResponsiveStyle | string | number; // shorthand for padding
  pt?: ResponsiveStyle | string | number; // shorthand for paddingTop
  pr?: ResponsiveStyle | string | number; // shorthand for paddingRight
  pb?: ResponsiveStyle | string | number; // shorthand for paddingBottom
  pl?: ResponsiveStyle | string | number; // shorthand for paddingLeft
  m?: ResponsiveStyle | string | number; // shorthand for margin
  mt?: ResponsiveStyle | string | number; // shorthand for marginTop
  mr?: ResponsiveStyle | string | number; // shorthand for marginRight
  mb?: ResponsiveStyle | string | number; // shorthand for marginBottom
  ml?: ResponsiveStyle | string | number; // shorthand for marginLeft

  // sizes
  w?: ResponsiveStyle | string | number; // shorthand for width
  h?: ResponsiveStyle | string | number; // shorthand for height
  minW?: ResponsiveStyle | string | number; // shorthand for minWidth
  minH?: ResponsiveStyle | string | number; // shorthand for minHeight
  maxW?: ResponsiveStyle | string | number; // shorthand for maxWidth
  maxH?: ResponsiveStyle | string | number; // shorthand for maxHeight

  // borders
  b?: ResponsiveStyle | string | number; // shorthand for border
  bt?: ResponsiveStyle | string | number; // shorthand for borderTop
  br?: ResponsiveStyle | string | number; // shorthand for borderRight
  bb?: ResponsiveStyle | string | number; // shorthand for borderBottom
  bl?: ResponsiveStyle | string | number; // shorthand for borderLeft
  bx?: ResponsiveStyle | string | number; // shorthand for borderLeft and borderRight
  by?: ResponsiveStyle | string | number; // shorthand for borderTop and borderBottom
  bs?: ResponsiveStyle | string | number; // shorthand for borderStyle
  bw?: ResponsiveStyle | string | number; // shorthand for borderWidth
  bc?: ResponsiveStyle | string | number; // shorthand for borderColor
  brad?: ResponsiveStyle | string | number; // shorthand for borderRadius

  // colors
  bg?: ResponsiveStyle | string | number; // shorthand for backgroundColor
  c?: ResponsiveStyle | string | number; // shorthand for color

  //flexbox
  d?: ResponsiveStyle | string | number; // shorthand for display
  fxDir?: ResponsiveStyle | string | number; // shorthand for flexDirection
  fxWrap?: ResponsiveStyle | string | number; // shorthand for flexWrap
  fxFlow?: ResponsiveStyle | string | number; // shorthand for flexFlow
  fxJustify?: ResponsiveStyle | string | number; // shorthand for justifyContent
  fxAItems?: ResponsiveStyle | string | number; // shorthand for alignItems
  fxAContent?: ResponsiveStyle | string | number; // shorthand for alignContent
  fxOrder?: ResponsiveStyle | string | number; // shorthand for order
  fxGrow?: ResponsiveStyle | string | number; // shorthand for flexGrow
  fxShrink?: ResponsiveStyle | string | number; // shorthand for flexShrink
  fxBasis?: ResponsiveStyle | string | number; // shorthand for flexBasis
  fxASelf?: ResponsiveStyle | string | number; // shorthand for alignSelf
};

// Custom shorthand styles extending SjShorthandStyle with additional combined properties.
export type SjShorthandCustomStyle = {
  py?: ResponsiveStyle | string | number; // padding on Y-axis (paddingTop & paddingBottom)
  px?: ResponsiveStyle | string | number; // padding on X-axis (paddingLeft & paddingRight)
  my?: ResponsiveStyle | string | number; // margin on Y-axis (marginTop & marginBottom)
  mx?: ResponsiveStyle | string | number; // margin on X-axis (marginLeft & marginRight)
  bx?: ResponsiveStyle | string | number; // border on X-axis (borderLeft & borderRight)
  by?: ResponsiveStyle | string | number; // border on Y-axis (borderTop & borderBottom)
};
export type SjStyle = WithResponsive<CSS.Properties<string | number>> &
  SjShorthandStyle &
  SjShorthandCustomStyle & {
    [key: string]: ResponsiveStyle | string | number | SjStyle | undefined;
  };
