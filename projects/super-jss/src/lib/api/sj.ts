import * as CSS from 'csstype';
import {
  ResponsiveStyle,
  SjShorthandCustomStyle,
  SjShorthandStyle,
  SjStyle,
} from '../models/interfaces';
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
  [K in keyof CSS.Properties<string | number>]-?: (
    value: Responsive<CSS.Properties<string | number>[K]>
  ) => SjStyle;
};

// Override a few popular props to preserve keyword autocomplete (e.g., 'auto')
type CssOverrides = {
  width: (value: Responsive<CSS.Property.Width<string | number>>) => SjStyle;
  height: (value: Responsive<CSS.Property.Height<string | number>>) => SjStyle;
  maxWidth: (
    value: Responsive<CSS.Property.MaxWidth<string | number>>
  ) => SjStyle;
  minWidth: (
    value: Responsive<CSS.Property.MinWidth<string | number>>
  ) => SjStyle;
  maxHeight: (
    value: Responsive<CSS.Property.MaxHeight<string | number>>
  ) => SjStyle;
  minHeight: (
    value: Responsive<CSS.Property.MinHeight<string | number>>
  ) => SjStyle;
};

type ReservedRootKeys =
  | 'compose'
  | 'hover'
  | 'focus'
  | 'active'
  | 'disabled'
  | 'palette'
  | 'breakpoints'
  | 'sjBox'
  | 'sjCard'
  | 'sjButton'
  | 'options';

type CssFunctions = Omit<
  CssFunctionsBase,
  keyof CssOverrides | ReservedRootKeys
> &
  CssOverrides;

export type SjCssApi = CssFunctions;

export type SjStyleApi = SjCssApi & SjShApi;

export type SjApi = {
  // Blueprints exposed directly
  sjBox: SjBoxApi;
  sjCard: SjCardApi & { variants: typeof SjCardVariants };
  sjButton: SjButtonApi & { variants: typeof SjButtonVariants };

  // Helpers
  compose: (
    ...styles: Array<Partial<SjStyle> | undefined | null | false>
  ) => SjStyle;
  hover: (
    style: SjStyle | Array<Partial<SjStyle> | undefined | null | false>
  ) => SjStyle;
  focus: (
    style: SjStyle | Array<Partial<SjStyle> | undefined | null | false>
  ) => SjStyle;
  active: (
    style: SjStyle | Array<Partial<SjStyle> | undefined | null | false>
  ) => SjStyle;
  disabled: (
    style: SjStyle | Array<Partial<SjStyle> | undefined | null | false>
  ) => SjStyle;

  // Minimal root registries
  palette: typeof SjPaletteTokens;
  breakpoints: typeof SjBreakpointTokens;
};

// Unified root API type: expose css functions and shorthands at root for autocomplete
export type SjRootApi = SjApi & SjCssApiWithOptions & SjShApiWithOptions;

// Small helpers implemented explicitly
const helpers = {
  compose: (
    ...styles: Array<Partial<SjStyle> | undefined | null | false>
  ): SjStyle => {
    const parts = styles.filter((s): s is Partial<SjStyle> => Boolean(s));
    return parts.reduce((acc, s) => Object.assign(acc, s), {} as SjStyle);
  },

  hover: (
    style: SjStyle | Array<Partial<SjStyle> | undefined | null | false>
  ): SjStyle => {
    const merged = Array.isArray(style)
      ? style
          .filter((s): s is Partial<SjStyle> => Boolean(s))
          .reduce((acc, s) => Object.assign(acc, s), {} as SjStyle)
      : style;
    return { '&:hover': merged };
  },
  focus: (
    style: SjStyle | Array<Partial<SjStyle> | undefined | null | false>
  ): SjStyle => {
    const merged = Array.isArray(style)
      ? style
          .filter((s): s is Partial<SjStyle> => Boolean(s))
          .reduce((acc, s) => Object.assign(acc, s), {} as SjStyle)
      : style;
    return { '&:focus': merged };
  },
  active: (
    style: SjStyle | Array<Partial<SjStyle> | undefined | null | false>
  ): SjStyle => {
    const merged = Array.isArray(style)
      ? style
          .filter((s): s is Partial<SjStyle> => Boolean(s))
          .reduce((acc, s) => Object.assign(acc, s), {} as SjStyle)
      : style;
    return { '&:active': merged };
  },
  disabled: (
    style: SjStyle | Array<Partial<SjStyle> | undefined | null | false>
  ): SjStyle => {
    const merged = Array.isArray(style)
      ? style
          .filter((s): s is Partial<SjStyle> => Boolean(s))
          .reduce((acc, s) => Object.assign(acc, s), {} as SjStyle)
      : style;
    return { '&:disabled': merged };
  },
};

// legacy blueprint namespace removed; blueprints are exposed directly at root
const SjBreakpointTokens = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl',
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

// Position tokens
const SjPositionTokens = {
  static: 'static',
  relative: 'relative',
  absolute: 'absolute',
  fixed: 'fixed',
  sticky: 'sticky',
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

// CamelCase option aliases for common flex values (DX-friendly)
const FlexJustifyOptions = {
  flexStart: 'flex-start',
  flexEnd: 'flex-end',
  center: 'center',
  spaceBetween: 'space-between',
  spaceAround: 'space-around',
  spaceEvenly: 'space-evenly',
} as const;

const FlexAlignOptions = {
  flexStart: 'flex-start',
  flexEnd: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
} as const;

// Curated .options for popular props/shorthands
type WithOptions<TFn, TOpts> = TFn & { options: TOpts };

type SjCssApiWithOptions = Omit<
  SjCssApi,
  | 'color'
  | 'backgroundColor'
  | 'display'
  | 'position'
  | 'width'
  | 'height'
  | 'justifyContent'
  | 'alignItems'
  | 'flexDirection'
  | 'flexWrap'
> & {
  color: WithOptions<SjCssApi['color'], typeof SjPaletteTokens>;
  backgroundColor: WithOptions<
    SjCssApi['backgroundColor'],
    typeof SjPaletteTokens
  >;
  display: WithOptions<SjCssApi['display'], typeof SjDisplayTokens>;
  position: WithOptions<SjCssApi['position'], typeof SjPositionTokens>;
  width: WithOptions<SjCssApi['width'], (typeof SjSizingTokens)['width']>;
  height: WithOptions<SjCssApi['height'], (typeof SjSizingTokens)['height']>;
  justifyContent: WithOptions<
    SjCssApi['justifyContent'],
    typeof FlexJustifyOptions
  >;
  alignItems: WithOptions<SjCssApi['alignItems'], typeof FlexAlignOptions>;
  flexDirection: WithOptions<
    SjCssApi['flexDirection'],
    (typeof SjFlexTokens)['direction']
  >;
  flexWrap: WithOptions<SjCssApi['flexWrap'], (typeof SjFlexTokens)['wrap']>;
};

type SjShApiWithOptions = Omit<
  SjShApi,
  'd' | 'fxDir' | 'fxJustify' | 'fxAItems' | 'bg' | 'c'
> & {
  d: WithOptions<SjShApi['d'], typeof SjDisplayTokens>;
  fxDir: WithOptions<SjShApi['fxDir'], (typeof SjFlexTokens)['direction']>;
  fxJustify: WithOptions<SjShApi['fxJustify'], typeof FlexJustifyOptions>;
  fxAItems: WithOptions<SjShApi['fxAItems'], typeof FlexAlignOptions>;
  bg: WithOptions<SjShApi['bg'], typeof SjPaletteTokens>;
  c: WithOptions<SjShApi['c'], typeof SjPaletteTokens>;
};

// Build the base object first; we'll wrap it in a Proxy to expose root style methods
const sjBase: SjApi = {
  // Blueprints at root
  sjBox: sjBox,
  sjCard: Object.assign(sjCard, { variants: SjCardVariants }),
  sjButton: Object.assign(sjButton, { variants: SjButtonVariants }),

  compose: helpers.compose,
  hover: helpers.hover,
  focus: helpers.focus,
  active: helpers.active,
  disabled: helpers.disabled,

  palette: SjPaletteTokens,
  breakpoints: SjBreakpointTokens,
} as SjApi;

// -------- Layout families: sj.flex.*, sj.grid.* --------
// Removed sj.stack() from public API; use root sj.* css/shorthands instead

// Curated option maps for props/shorthands
const optionsMapCss: Record<string, unknown> = {
  color: SjPaletteTokens,
  backgroundColor: SjPaletteTokens,
  display: SjDisplayTokens,
  position: SjPositionTokens,
  width: SjSizingTokens.width,
  height: SjSizingTokens.height,
  justifyContent: FlexJustifyOptions,
  alignItems: FlexAlignOptions,
  flexDirection: SjFlexTokens.direction,
  flexWrap: SjFlexTokens.wrap,
};

const optionsMapSh: Record<string, unknown> = {
  d: SjDisplayTokens,
  fxDir: SjFlexTokens.direction,
  fxJustify: FlexJustifyOptions,
  fxAItems: FlexAlignOptions,
  bg: SjPaletteTokens,
  c: SjPaletteTokens,
};

// Root-level Proxy: if property exists on base, return it; else try shorthand; else treat as CSS prop
const sjProxy: SjRootApi = new Proxy(sjBase as any, {
  get(target, propKey: PropertyKey, receiver) {
    // existing fields/namespaces first (style, flex, grid, button, tokens, etc.)
    if (typeof propKey === 'symbol' || Reflect.has(target, propKey)) {
      return Reflect.get(target, propKey, receiver);
    }
    // if a shorthand exists, return it (typed via SjShApi)
    if (propKey in sh) {
      const bound = (sh as any)[propKey].bind(sh);
      if (typeof propKey === 'string' && propKey in optionsMapSh) {
        try {
          Object.defineProperty(bound, 'options', {
            value: (optionsMapSh as any)[propKey],
            writable: false,
            enumerable: true,
          });
        } catch {
          (bound as any).options = (optionsMapSh as any)[propKey];
        }
      }
      return bound;
    }
    // default: treat as CSS property function
    const fn = (value: any): SjStyle =>
      ({ [propKey as string]: value } as SjStyle);
    if (typeof propKey === 'string' && propKey in optionsMapCss) {
      try {
        Object.defineProperty(fn, 'options', {
          value: (optionsMapCss as any)[propKey],
          writable: false,
          enumerable: true,
        });
      } catch {
        (fn as any).options = (optionsMapCss as any)[propKey];
      }
    }
    return fn as any;
  },
}) as SjRootApi;

export const sj = sjProxy;
export default sjProxy;
