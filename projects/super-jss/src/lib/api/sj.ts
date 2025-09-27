import * as CSS from 'csstype';
import { ResponsiveStyle, SjShorthandCustomStyle, SjShorthandStyle, SjStyle } from '../models/interfaces';
import { sjBox, SjBoxApi } from '../blueprints/box';
import { sjCard, SjCardApi } from '../blueprints/card';
import { sjButton, SjButtonApi } from '../blueprints/button';
import { SjButtonVariants, SjCardVariants } from '../models/variants';

// Typed palette tokens used in styles (string literals)
const SjPaletteTokens = {
  primary: {
    main: 'primary.main',
    light: 'primary.light',
    dark: 'primary.dark',
    contrast: 'primary.contrast',
  },
  secondary: {
    main: 'secondary.main',
    light: 'secondary.light',
    dark: 'secondary.dark',
    contrast: 'secondary.contrast',
  },
  tertiary: {
    main: 'tertiary.main',
    light: 'tertiary.light',
    dark: 'tertiary.dark',
    contrast: 'tertiary.contrast',
  },
  success: {
    main: 'success.main',
    light: 'success.light',
    dark: 'success.dark',
    contrast: 'success.contrast',
  },
  info: {
    main: 'info.main',
    light: 'info.light',
    dark: 'info.dark',
    contrast: 'info.contrast',
  },
  warning: {
    main: 'warning.main',
    light: 'warning.light',
    dark: 'warning.dark',
    contrast: 'warning.contrast',
  },
  error: {
    main: 'error.main',
    light: 'error.light',
    dark: 'error.dark',
    contrast: 'error.contrast',
  },
  dark: {
    main: 'dark.main',
    light: 'dark.light',
    dark: 'dark.dark',
    contrast: 'dark.contrast',
  },
  neutral: {
    main: 'neutral.main',
    light: 'neutral.light',
    dark: 'neutral.dark',
    contrast: 'neutral.contrast',
  },
  light: {
    main: 'light.main',
    light: 'light.light',
    dark: 'light.dark',
    contrast: 'light.contrast',
  },
} as const;

// Responsive value helper: allow raw or responsive object
type Responsive<T> = T | ResponsiveStyle;

// Map every CSS property to a function producing an SjStyle (base)
type CssFunctionsBase = {
  [K in keyof CSS.Properties<string | number>]-?: (value: Responsive<CSS.Properties<string | number>[K]>) => SjStyle;
};

// Override a few popular props to preserve keyword autocomplete (e.g., 'auto')
type CssOverrides = {
  width: (value: Responsive<CSS.Property.Width<string | number>>) => SjStyle;
  height: (value: Responsive<CSS.Property.Height<string | number>>) => SjStyle;
  maxWidth: (value: Responsive<CSS.Property.MaxWidth<string | number>>) => SjStyle;
  minWidth: (value: Responsive<CSS.Property.MinWidth<string | number>>) => SjStyle;
  maxHeight: (value: Responsive<CSS.Property.MaxHeight<string | number>>) => SjStyle;
  minHeight: (value: Responsive<CSS.Property.MinHeight<string | number>>) => SjStyle;
};

type CssFunctions = Omit<CssFunctionsBase, keyof CssOverrides> & CssOverrides;

// Map shorthand keys to functions as well
type ShorthandFunctions = {
  [K in keyof SjShorthandStyle]-?: (value: SjShorthandStyle[K]) => SjStyle;
} & {
  [K in keyof SjShorthandCustomStyle]-?: (value: SjShorthandCustomStyle[K]) => SjStyle;
};

export type SjCssApi = CssFunctions;

export type SjApi = {
  css: SjCssApi;
  sh: SjShApi;
  flex: SjFlexApi;
  grid: SjGridApi;
  stack: (options?: StackOptions) => SjStyle;
  // Helpers (kept at root, not under css)
  compose: (...styles: Array<Partial<SjStyle> | undefined | null | false>) => SjStyle;
  hover: (style: SjStyle) => SjStyle;
  focus: (style: SjStyle) => SjStyle;
  active: (style: SjStyle) => SjStyle;
  disabled: (style: SjStyle) => SjStyle;
  // Namespaced blueprints access
  presets: SjBlueprints;
  blueprints: SjBlueprints;
  // Literal option registries for IDE autocomplete
  variants: {
    sjCard: typeof SjCardVariants;
    sjButton: typeof SjButtonVariants;
  };
  palette: typeof SjPaletteTokens;
  tokens: {
    palette: typeof SjPaletteTokens;
    breakpoints: typeof SjBreakpointTokens;
    typography: typeof SjTypographyTokens;
    spacing: (factor: number) => number | string;
    flex: typeof SjFlexTokens;
    display: typeof SjDisplayTokens;
    colors: typeof SjColorTokens;
    sizing: typeof SjSizingTokens;
  };
};

export type SjBlueprints = {
  // Canonical names matching blueprint exports
  sjBox: SjBoxApi;
  sjCard: SjCardApi;
  sjButton: SjButtonApi;

};

// Base css proxy: if a real property exists, return it; otherwise return a setter function
const cssTarget: Record<string | symbol, any> = {};
const cssBase = new Proxy(cssTarget, {
  get: (target, propKey: PropertyKey, receiver) => {
    if (typeof propKey === 'symbol' || Reflect.has(target, propKey)) {
      return Reflect.get(target, propKey, receiver);
    }
    return (value: any): SjStyle => ({ [propKey as string]: value } as SjStyle);
  },
});

// Small helpers implemented explicitly and merged into the css proxy
const helpers = {
  compose: (...styles: Array<Partial<SjStyle> | undefined | null | false>): SjStyle => {
    const parts = styles.filter((s): s is Partial<SjStyle> => Boolean(s));
    return parts.reduce((acc, s) => Object.assign(acc, s), {} as SjStyle);
  },

  hover: (style: SjStyle): SjStyle => ({ '&:hover': style }),
  focus: (style: SjStyle): SjStyle => ({ '&:focus': style }),
  active: (style: SjStyle): SjStyle => ({ '&:active': style }),
  disabled: (style: SjStyle): SjStyle => ({ '&:disabled': style }),
};

/** Blueprint namespace used by sj.blueprints/quick/help */
const blueprintNamespace: SjBlueprints = {
  sjBox: sjBox,
  sjCard: sjCard,
  sjButton: sjButton,

};

const cssNamespace = cssBase as SjCssApi;
const SjBreakpointTokens = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl',
} as const;

const SjTypographyTokens = {
  default: 'default',
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  H4: 'H4',
  H5: 'H5',
  H6: 'H6',
  SPAN: 'SPAN',
  P: 'P',
  BODY: 'BODY',
  STRONG: 'STRONG',
  CAPTION: 'CAPTION',
  SMALL: 'SMALL',
  PRE: 'PRE',
} as const;

// Common display values
const SjDisplayTokens = {
  flex: 'flex',
  grid: 'grid',
  block: 'block',
  inline: 'inline',
  inlineBlock: 'inline-block',
  contents: 'contents',
  none: 'none',
} as const;

// Sizing keywords for width/height
const SjSizingTokens = {
  width: {
    auto: 'auto',
    fitContent: 'fit-content',
    maxContent: 'max-content',
    minContent: 'min-content',
  },
  height: {
    auto: 'auto',
    fitContent: 'fit-content',
    maxContent: 'max-content',
    minContent: 'min-content',
  },
} as const;

// Core color scales (shades) tokens matching SjColors
const SjColorTokens = {
  blue: {
    50: 'blue.50', 100: 'blue.100', 200: 'blue.200', 300: 'blue.300', 400: 'blue.400',
    500: 'blue.500', 600: 'blue.600', 700: 'blue.700', 800: 'blue.800', 900: 'blue.900',
    contrast: 'blue.contrast',
  },
  indigo: {
    50: 'indigo.50', 100: 'indigo.100', 200: 'indigo.200', 300: 'indigo.300', 400: 'indigo.400',
    500: 'indigo.500', 600: 'indigo.600', 700: 'indigo.700', 800: 'indigo.800', 900: 'indigo.900',
    contrast: 'indigo.contrast',
  },
  purple: {
    50: 'purple.50', 100: 'purple.100', 200: 'purple.200', 300: 'purple.300', 400: 'purple.400',
    500: 'purple.500', 600: 'purple.600', 700: 'purple.700', 800: 'purple.800', 900: 'purple.900',
    contrast: 'purple.contrast',
  },
  pink: {
    50: 'pink.50', 100: 'pink.100', 200: 'pink.200', 300: 'pink.300', 400: 'pink.400',
    500: 'pink.500', 600: 'pink.600', 700: 'pink.700', 800: 'pink.800', 900: 'pink.900',
    contrast: 'pink.contrast',
  },
  red: {
    50: 'red.50', 100: 'red.100', 200: 'red.200', 300: 'red.300', 400: 'red.400',
    500: 'red.500', 600: 'red.600', 700: 'red.700', 800: 'red.800', 900: 'red.900',
    contrast: 'red.contrast',
  },
  orange: {
    50: 'orange.50', 100: 'orange.100', 200: 'orange.200', 300: 'orange.300', 400: 'orange.400',
    500: 'orange.500', 600: 'orange.600', 700: 'orange.700', 800: 'orange.800', 900: 'orange.900',
    contrast: 'orange.contrast',
  },
  yellow: {
    50: 'yellow.50', 100: 'yellow.100', 200: 'yellow.200', 300: 'yellow.300', 400: 'yellow.400',
    500: 'yellow.500', 600: 'yellow.600', 700: 'yellow.700', 800: 'yellow.800', 900: 'yellow.900',
    contrast: 'yellow.contrast',
  },
  green: {
    50: 'green.50', 100: 'green.100', 200: 'green.200', 300: 'green.300', 400: 'green.400',
    500: 'green.500', 600: 'green.600', 700: 'green.700', 800: 'green.800', 900: 'green.900',
    contrast: 'green.contrast',
  },
  teal: {
    50: 'teal.50', 100: 'teal.100', 200: 'teal.200', 300: 'teal.300', 400: 'teal.400',
    500: 'teal.500', 600: 'teal.600', 700: 'teal.700', 800: 'teal.800', 900: 'teal.900',
    contrast: 'teal.contrast',
  },
  cyan: {
    50: 'cyan.50', 100: 'cyan.100', 200: 'cyan.200', 300: 'cyan.300', 400: 'cyan.400',
    500: 'cyan.500', 600: 'cyan.600', 700: 'cyan.700', 800: 'cyan.800', 900: 'cyan.900',
    contrast: 'cyan.contrast',
  },
  gray: {
    50: 'gray.50', 100: 'gray.100', 200: 'gray.200', 300: 'gray.300', 400: 'gray.400',
    500: 'gray.500', 600: 'gray.600', 700: 'gray.700', 800: 'gray.800', 900: 'gray.900',
    contrast: 'gray.contrast',
  },
  black: 'black',
  white: 'white',
} as const;

// Flex tokens for common literal values (typed, IDE-friendly)
const SjFlexTokens = {
  direction: {
    row: 'row',
    rowReverse: 'row-reverse',
    column: 'column',
    columnReverse: 'column-reverse',
  },
  justify: {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  },
  align: {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    baseline: 'baseline',
  },
  wrap: {
    wrap: 'wrap',
    nowrap: 'nowrap',
    wrapReverse: 'wrap-reverse',
  },
  // Alias: include display here for ergonomics when writing flex/grid code
  display: {
    flex: 'flex',
    grid: 'grid',
    block: 'block',
    inline: 'inline',
    inlineBlock: 'inline-block',
    contents: 'contents',
    none: 'none',
  },
} as const;

// Shorthand namespace (popular, curated)
type Fn<T> = (value: T) => SjStyle;
export type SjShApi = {
  // spacing
  p: Fn<SjShorthandStyle['p']>;
  px: Fn<SjShorthandCustomStyle['px']>;
  py: Fn<SjShorthandCustomStyle['py']>;
  pt: Fn<SjShorthandStyle['pt']>;
  pr: Fn<SjShorthandStyle['pr']>;
  pb: Fn<SjShorthandStyle['pb']>;
  pl: Fn<SjShorthandStyle['pl']>;
  m: Fn<SjShorthandStyle['m']>;
  mx: Fn<SjShorthandCustomStyle['mx']>;
  my: Fn<SjShorthandCustomStyle['my']>;
  mt: Fn<SjShorthandStyle['mt']>;
  mr: Fn<SjShorthandStyle['mr']>;
  mb: Fn<SjShorthandStyle['mb']>;
  ml: Fn<SjShorthandStyle['ml']>;
  gap: Fn<SjStyle['gap']>;
  // color
  bg: Fn<SjShorthandStyle['bg']>;
  c: Fn<SjShorthandStyle['c']>;
  // size
  w: Fn<SjShorthandStyle['w']>;
  h: Fn<SjShorthandStyle['h']>;
  minW: Fn<SjShorthandStyle['minW']>;
  minH: Fn<SjShorthandStyle['minH']>;
  maxW: Fn<SjShorthandStyle['maxW']>;
  maxH: Fn<SjShorthandStyle['maxH']>;
  // radius / borders
  brad: Fn<SjShorthandStyle['brad']>;
  // quick layout
  d: Fn<SjShorthandStyle['d']>;
  fxDir: Fn<SjShorthandStyle['fxDir']>;
  fxJustify: Fn<SjShorthandStyle['fxJustify']>;
  fxAItems: Fn<SjShorthandStyle['fxAItems']>;
};

const sh = {
  // spacing
  p: (v: any) => ({ p: v } as SjStyle),
  px: (v: any) => ({ px: v } as SjStyle),
  py: (v: any) => ({ py: v } as SjStyle),
  pt: (v: any) => ({ pt: v } as SjStyle),
  pr: (v: any) => ({ pr: v } as SjStyle),
  pb: (v: any) => ({ pb: v } as SjStyle),
  pl: (v: any) => ({ pl: v } as SjStyle),
  m: (v: any) => ({ m: v } as SjStyle),
  mx: (v: any) => ({ mx: v } as SjStyle),
  my: (v: any) => ({ my: v } as SjStyle),
  mt: (v: any) => ({ mt: v } as SjStyle),
  mr: (v: any) => ({ mr: v } as SjStyle),
  mb: (v: any) => ({ mb: v } as SjStyle),
  ml: (v: any) => ({ ml: v } as SjStyle),
  gap: (v: any) => ({ gap: v } as SjStyle),
  // color
  bg: (v: any) => ({ bg: v } as SjStyle),
  c: (v: any) => ({ c: v } as SjStyle),
  // size
  w: (v: any) => ({ w: v } as SjStyle),
  h: (v: any) => ({ h: v } as SjStyle),
  minW: (v: any) => ({ minW: v } as SjStyle),
  minH: (v: any) => ({ minH: v } as SjStyle),
  maxW: (v: any) => ({ maxW: v } as SjStyle),
  maxH: (v: any) => ({ maxH: v } as SjStyle),
  // radius / borders
  brad: (v: any) => ({ brad: v } as SjStyle),
  // quick layout
  d: (v: any) => ({ d: v } as SjStyle),
  fxDir: (v: any) => ({ fxDir: v } as SjStyle),
  fxJustify: (v: any) => ({ fxJustify: v } as SjStyle),
  fxAItems: (v: any) => ({ fxAItems: v } as SjStyle),
} as SjShApi;

export const sj: SjApi = {
  css: cssNamespace,
  sh,
  flex: undefined as unknown as SjFlexApi, // assigned below
  grid: undefined as unknown as SjGridApi, // assigned below
  stack: undefined as unknown as (options?: StackOptions) => SjStyle, // assigned below
  compose: helpers.compose,
  hover: helpers.hover,
  focus: helpers.focus,
  active: helpers.active,
  disabled: helpers.disabled,
  presets: blueprintNamespace,
  blueprints: blueprintNamespace,
  variants: {
    sjCard: SjCardVariants,
    sjButton: SjButtonVariants,
  },
  palette: SjPaletteTokens,
  tokens: {
    palette: SjPaletteTokens,
    breakpoints: SjBreakpointTokens,
    typography: SjTypographyTokens,
    spacing: (factor: number) => factor,
    flex: SjFlexTokens,
    display: SjDisplayTokens,
    colors: SjColorTokens,
    sizing: SjSizingTokens,
  },
} as SjApi;

// -------- Layout families: sj.flex.*, sj.grid.*, sj.stack() --------

export type SjFlexApi = {
  // Presets
  row: (overrides?: Partial<SjStyle>) => SjStyle;
  column: (overrides?: Partial<SjStyle>) => SjStyle;
  center: (overrides?: Partial<SjStyle>) => SjStyle; // center both axes
  middle: (overrides?: Partial<SjStyle>) => SjStyle; // column + centered
  between: (overrides?: Partial<SjStyle>) => SjStyle;
  around: (overrides?: Partial<SjStyle>) => SjStyle;
  evenly: (overrides?: Partial<SjStyle>) => SjStyle;
  wrap: (overrides?: Partial<SjStyle>) => SjStyle;
  nowrap: (overrides?: Partial<SjStyle>) => SjStyle;
  grow: (overrides?: Partial<SjStyle>) => SjStyle;
  shrink: (overrides?: Partial<SjStyle>) => SjStyle;
  // Knobs
  direction: (value: Responsive<SjStyle['fxDir']>) => SjStyle;
  align: (value: Responsive<SjStyle['fxAItems']>) => SjStyle;
  justify: (value: Responsive<SjStyle['fxJustify']>) => SjStyle;
  gap: (value: Responsive<SjStyle['gap']>) => SjStyle;
};

const flex: SjFlexApi = {
  row: (overrides: Partial<SjStyle> = {}): SjStyle => ({ d: 'flex', fxDir: 'row', ...overrides }),
  column: (overrides: Partial<SjStyle> = {}): SjStyle => ({ d: 'flex', fxDir: 'column', ...overrides }),
  center: (overrides: Partial<SjStyle> = {}): SjStyle => ({ d: 'flex', fxJustify: 'center', fxAItems: 'center', ...overrides }),
  middle: (overrides: Partial<SjStyle> = {}): SjStyle => ({ d: 'flex', fxDir: 'column', fxJustify: 'center', fxAItems: 'center', ...overrides }),
  between: (overrides: Partial<SjStyle> = {}): SjStyle => ({ d: 'flex', fxJustify: 'space-between', ...overrides }),
  around: (overrides: Partial<SjStyle> = {}): SjStyle => ({ d: 'flex', fxJustify: 'space-around', ...overrides }),
  evenly: (overrides: Partial<SjStyle> = {}): SjStyle => ({ d: 'flex', fxJustify: 'space-evenly', ...overrides }),
  wrap: (overrides: Partial<SjStyle> = {}): SjStyle => ({ d: 'flex', fxWrap: 'wrap', ...overrides }),
  nowrap: (overrides: Partial<SjStyle> = {}): SjStyle => ({ d: 'flex', fxWrap: 'nowrap', ...overrides }),
  grow: (overrides: Partial<SjStyle> = {}): SjStyle => ({ fxGrow: 1, fxShrink: 1, minW: 0, ...overrides }),
  shrink: (overrides: Partial<SjStyle> = {}): SjStyle => ({ fxShrink: 1, ...overrides }),
  direction: (value: any): SjStyle => ({ fxDir: value } as SjStyle),
  align: (value: any): SjStyle => ({ fxAItems: value } as SjStyle),
  justify: (value: any): SjStyle => ({ fxJustify: value } as SjStyle),
  gap: (value: any): SjStyle => ({ gap: value } as SjStyle),
};

export type SjGridApi = {
  container: (overrides?: Partial<SjStyle>) => SjStyle;
  columns: (value: Responsive<SjStyle['gridTemplateColumns']>) => SjStyle;
  rows: (value: Responsive<SjStyle['gridTemplateRows']>) => SjStyle;
  areas: (value: Responsive<SjStyle['gridTemplateAreas']>) => SjStyle;
  autoFlow: (value: Responsive<SjStyle['gridAutoFlow']>) => SjStyle;
  gap: (value: Responsive<SjStyle['gap']>) => SjStyle;
  placeItems: (value: Responsive<SjStyle['placeItems']>) => SjStyle;
  placeContent: (value: Responsive<SjStyle['placeContent']>) => SjStyle;
  placeSelf: (value: Responsive<SjStyle['placeSelf']>) => SjStyle;
  cols: (count: number | ResponsiveStyle) => SjStyle; // repeat(count, 1fr)
};

const normalizeCols = (count: number | ResponsiveStyle): Responsive<SjStyle['gridTemplateColumns']> => {
  if (typeof count === 'number') return `repeat(${count}, 1fr)`;
  const obj: ResponsiveStyle = {};
  for (const k in count) {
    (obj as any)[k] = `repeat(${(count as any)[k]}, 1fr)`;
  }
  return obj as Responsive<SjStyle['gridTemplateColumns']>;
};

const grid: SjGridApi = {
  container: (overrides: Partial<SjStyle> = {}): SjStyle => ({ d: 'grid', ...overrides }),
  columns: (value: any): SjStyle => ({ gridTemplateColumns: value } as SjStyle),
  rows: (value: any): SjStyle => ({ gridTemplateRows: value } as SjStyle),
  areas: (value: any): SjStyle => ({ gridTemplateAreas: value } as SjStyle),
  autoFlow: (value: any): SjStyle => ({ gridAutoFlow: value } as SjStyle),
  gap: (value: any): SjStyle => ({ gap: value } as SjStyle),
  placeItems: (value: any): SjStyle => ({ placeItems: value } as SjStyle),
  placeContent: (value: any): SjStyle => ({ placeContent: value } as SjStyle),
  placeSelf: (value: any): SjStyle => ({ placeSelf: value } as SjStyle),
  cols: (count: number | ResponsiveStyle): SjStyle => ({ gridTemplateColumns: normalizeCols(count) } as SjStyle),
};

export type StackOptions = {
  direction?: Responsive<'row' | 'column'>;
  gap?: Responsive<SjStyle['gap']>;
  align?: Responsive<SjStyle['fxAItems']>;
  justify?: Responsive<SjStyle['fxJustify']>;
};

const stack = (options: StackOptions = {}): SjStyle => {
  const { direction = 'column', gap = 0.5, align, justify } = options as any;
  const style: SjStyle = { d: 'flex', fxDir: direction as any, gap: gap as any } as SjStyle;
  if (align !== undefined) (style as any).fxAItems = align;
  if (justify !== undefined) (style as any).fxJustify = justify;
  return style;
};

// assign to sj
(sj as any).flex = flex;
(sj as any).grid = grid;
(sj as any).stack = stack;

export default sj;
