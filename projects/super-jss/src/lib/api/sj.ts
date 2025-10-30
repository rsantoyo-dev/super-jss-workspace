import * as CSS from 'csstype';
import { sjActiveThemeService } from '../services/sj-theme.service';
import { SYSTEMIC_SPACING } from '../themes/shared-options/spacing';
import {
  ResponsiveStyle,
  SjShorthandCustomStyle,
  SjShorthandStyle,
  SjStyle,
} from '../models/interfaces';
import { sjBox, SjBoxApi } from '../blueprints/box';
import { sjCard, SjCardApi } from '../blueprints/card';
import { sjPaper, SjPaperApi } from '../blueprints/paper';
import { sjButton, SjButtonApi } from '../blueprints/button';
import {
  SjButtonVariants,
  SjCardVariants,
  SjPaperVariants,
} from '../models/variants';

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

// Helper to remove index signatures from a type
type RemoveIndex<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : symbol extends K
    ? never
    : K]: T[K];
};

// Map every CSS property (without index signatures) to a function producing an SjStyle (base)
type CssPropsNoIndex = RemoveIndex<CSS.Properties<string | number>>;
type CssFunctionsBase = {
  [K in keyof CssPropsNoIndex]-?: (
    value: Responsive<CssPropsNoIndex[K]>
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
  | 'hover'
  | 'focus'
  | 'active'
  | 'disabled'
  | 'theme'
  | 'palette'
  | 'breakpoints'
  | 'sjBox'
  | 'sjPaper'
  | 'sjCard'
  | 'sjButton'
  | 'options';

type CssFunctions = Omit<
  CssFunctionsBase,
  keyof CssOverrides | ReservedRootKeys
> &
  CssOverrides;

// Add options to all CSS functions dynamically
type CssFunctionWithOptions<T> = T & { options: Record<string, any> };

type CssFunctionsWithOptions = {
  [K in keyof CssFunctions]: CssFunctionWithOptions<CssFunctions[K]>;
};

export type SjCssApi = CssFunctionsWithOptions;

export type SjStyleApi = SjCssApi & SjShApi;

export type SjApi = {
  // Blueprints exposed directly
  sjBox: SjBoxApi;
  sjPaper: SjPaperApi & { variants: typeof SjPaperVariants };
  sjCard: SjCardApi & { variants: typeof SjCardVariants };
  sjButton: SjButtonApi & { variants: typeof SjButtonVariants };
  // Density tokens for discoverability
  density: {
    options: {
      compact: 1;
      default: 2;
      comfortable: 3;
      spacious: 4;
    };
  };

  // Helpers
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
  // Spacing scale helper (1..20) → numeric factor used by theme.spacing
  space: (n: number) => number;
};

// Unified root API type: expose css functions and shorthands at root for autocomplete
// Use an interface (not just a type alias) so Angular's Template Language
// Service can better surface member completions in templates. Extending the
// constituent types preserves the full shape while improving IDE hints.
export interface SjRootApi
  extends SjApi,
    SjCssApiWithOptions,
    SjShApiWithOptions {}

// Small helpers implemented explicitly
const helpers = {
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

// Border style tokens (common CSS keywords)
const SjBorderStyleTokens = {
  none: 'none',
  hidden: 'hidden',
  dotted: 'dotted',
  dashed: 'dashed',
  solid: 'solid',
  double: 'double',
  groove: 'groove',
  ridge: 'ridge',
  inset: 'inset',
  outset: 'outset',
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
  | 'borderStyle'
  | 'borderColor'
  | 'outlineColor'
  | 'textDecorationColor'
  | 'fill'
  | 'stroke'
  | 'display'
  | 'position'
  | 'width'
  | 'height'
  | 'justifyContent'
  | 'alignItems'
  | 'flexDirection'
  | 'flexWrap'
  | 'padding'
  | 'borderRadius'
  | 'borderWidth'
  | 'gap'
  | 'margin'
> & {
  // Color properties - all get full palette access
  color: WithOptions<SjCssApi['color'], typeof SjPaletteTokens>;
  backgroundColor: WithOptions<
    SjCssApi['backgroundColor'],
    typeof SjPaletteTokens
  >;
  borderColor: WithOptions<SjCssApi['borderColor'], typeof SjPaletteTokens>;
  borderStyle: WithOptions<SjCssApi['borderStyle'], typeof SjBorderStyleTokens>;
  outlineColor: WithOptions<SjCssApi['outlineColor'], typeof SjPaletteTokens>;
  textDecorationColor: WithOptions<
    SjCssApi['textDecorationColor'],
    typeof SjPaletteTokens
  >;
  fill: WithOptions<SjCssApi['fill'], typeof SjPaletteTokens>;
  stroke: WithOptions<SjCssApi['stroke'], typeof SjPaletteTokens>;

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
  padding: WithOptions<
    SjCssApi['padding'],
    {
      compact: any;
      default: any;
      comfortable: any;
      spacious: any;
    }
  >;
  borderRadius: WithOptions<
    SjCssApi['borderRadius'],
    {
      compact: 1;
      default: 2;
      comfortable: 3;
      spacious: 4;
    }
  >;
  borderWidth: WithOptions<
    SjCssApi['borderWidth'],
    {
      compact: 1;
      default: 2;
      comfortable: 3;
      spacious: 4;
    }
  >;
  margin: WithOptions<
    SjCssApi['margin'],
    {
      compact: 1;
      default: 2;
      comfortable: 3;
      spacious: 4;
    }
  >;
};

type SjShApiWithOptions = Omit<
  SjShApi,
  'd' | 'fxDir' | 'fxJustify' | 'fxAItems' | 'bg' | 'c' | 'gap'
> & {
  d: WithOptions<SjShApi['d'], typeof SjDisplayTokens>;
  fxDir: WithOptions<SjShApi['fxDir'], (typeof SjFlexTokens)['direction']>;
  fxJustify: WithOptions<SjShApi['fxJustify'], typeof FlexJustifyOptions>;
  fxAItems: WithOptions<SjShApi['fxAItems'], typeof FlexAlignOptions>;
  bg: WithOptions<SjShApi['bg'], typeof SjPaletteTokens>;
  c: WithOptions<SjShApi['c'], typeof SjPaletteTokens>;
  gap: WithOptions<
    SjShApi['gap'],
    {
      compact: any;
      default: any;
      comfortable: any;
      spacious: any;
    }
  >;
};

// Build the base object first; we'll wrap it in a Proxy to expose root style methods
const sjBase: SjApi = {
  // Blueprints at root
  sjBox: sjBox,
  sjPaper: Object.assign(sjPaper, { variants: SjPaperVariants }),
  sjCard: Object.assign(sjCard, { variants: SjCardVariants }),
  sjButton: Object.assign(sjButton, { variants: SjButtonVariants }),

  density: {
    options: {
      compact: 1,
      default: 2,
      comfortable: 3,
      spacious: 4,
    },
  },

  hover: helpers.hover,
  focus: helpers.focus,
  active: helpers.active,
  disabled: helpers.disabled,

  palette: SjPaletteTokens,
  breakpoints: SjBreakpointTokens,
  space: (n: number) => SYSTEMIC_SPACING(n),
} as SjApi;

// -------- Layout families: sj.flex.*, sj.grid.* --------
// Removed sj.stack() from public API; use root sj.* css/shorthands instead

// Curated option maps for props/shorthands
const densityToken = (n: 1 | 2 | 3 | 4) => ({ __sjDensity: n } as any);
const optionsMapCss: Record<string, unknown> = {
  // Color properties - all get full palette access
  color: SjPaletteTokens,
  backgroundColor: SjPaletteTokens,
  borderColor: SjPaletteTokens,
  outlineColor: SjPaletteTokens,
  textDecorationColor: SjPaletteTokens,
  fill: SjPaletteTokens,
  stroke: SjPaletteTokens,

  display: SjDisplayTokens,
  position: SjPositionTokens,
  width: SjSizingTokens.width,
  height: SjSizingTokens.height,
  justifyContent: FlexJustifyOptions,
  alignItems: FlexAlignOptions,
  flexDirection: SjFlexTokens.direction,
  flexWrap: SjFlexTokens.wrap,
  // flex-flow supports direction and wrap; expose both under options
  flexFlow: {
    direction: SjFlexTokens.direction,
    wrap: SjFlexTokens.wrap,
  },
  borderStyle: SjBorderStyleTokens,
  // Surface-related density mirrors for discoverability under sj.property.options
  padding: {
    compact: densityToken(1),
    default: densityToken(2),
    comfortable: densityToken(3),
    spacious: densityToken(4),
  },
  borderRadius: {
    compact: 1,
    default: 2,
    comfortable: 3,
    spacious: 4,
  },
  borderWidth: {
    compact: 1,
    default: 2,
    comfortable: 3,
    spacious: 4,
  },
};

const optionsMapSh: Record<string, unknown> = {
  d: SjDisplayTokens,
  fxDir: SjFlexTokens.direction,
  fxJustify: FlexJustifyOptions,
  fxAItems: FlexAlignOptions,
  gap: {
    compact: densityToken(1),
    default: densityToken(2),
    comfortable: densityToken(3),
    spacious: densityToken(4),
  },
};

/**
 * Dynamically generates options for any CSS property based on common patterns
 */
function getDynamicOptionsForProperty(
  propName: string
): Record<string, any> | undefined {
  // Color-related properties
  if (propName.includes('color') || propName.includes('Color')) {
    return SjPaletteTokens;
  }

  // Spacing/sizing properties (padding, margin, gap, etc.)
  if (
    propName.includes('padding') ||
    propName.includes('margin') ||
    propName.includes('gap')
  ) {
    return {
      compact: 1,
      default: 2,
      comfortable: 3,
      spacious: 4,
    };
  }

  // Border radius
  if (propName.includes('radius') || propName.includes('Radius')) {
    return {
      compact: 1,
      default: 2,
      comfortable: 3,
      spacious: 4,
    };
  }

  // Display properties
  if (
    propName.includes('display') ||
    propName === 'overflow' ||
    propName === 'visibility'
  ) {
    return SjDisplayTokens;
  }

  // Position properties
  if (
    propName.includes('position') ||
    propName === 'top' ||
    propName === 'right' ||
    propName === 'bottom' ||
    propName === 'left' ||
    propName === 'zIndex'
  ) {
    return SjPositionTokens;
  }

  // Flex properties
  if (
    propName.includes('flex') ||
    propName === 'justifyContent' ||
    propName === 'alignItems'
  ) {
    if (propName.includes('direction')) return SjFlexTokens.direction;
    if (propName.includes('wrap')) return SjFlexTokens.wrap;
    if (propName.includes('justify')) return FlexJustifyOptions;
    if (propName.includes('align')) return FlexAlignOptions;
    return SjFlexTokens;
  }

  // Sizing properties
  if (
    propName === 'width' ||
    propName === 'height' ||
    propName === 'minWidth' ||
    propName === 'maxWidth' ||
    propName === 'minHeight' ||
    propName === 'maxHeight'
  ) {
    return propName.includes('width')
      ? SjSizingTokens.width
      : SjSizingTokens.height;
  }

  // Typography properties
  if (
    propName.includes('font') ||
    propName === 'textAlign' ||
    propName === 'textDecoration' ||
    propName === 'textTransform' ||
    propName === 'letterSpacing' ||
    propName === 'lineHeight'
  ) {
    // For now, return undefined for typography - could be extended later
    return undefined;
  }

  // For any other property, return undefined (no options available)
  return undefined;
}

// Root-level Proxy: if property exists on base, return it; else try shorthand; else treat as CSS prop
const sjProxy: SjRootApi = new Proxy(sjBase as any, {
  get(target, propKey: PropertyKey, receiver) {
    // existing fields/namespaces first (style, flex, grid, button, tokens, etc.)
    if (typeof propKey === 'symbol' || Reflect.has(target, propKey)) {
      return Reflect.get(target, propKey, receiver);
    }
    // Simple runtime theme access: sj.theme -> active resolved theme (or undefined)
    if (propKey === 'theme') {
      try {
        return sjActiveThemeService ? sjActiveThemeService.sjTheme() : undefined;
      } catch {
        return undefined;
      }
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
    } else if (typeof propKey === 'string') {
      // For CSS properties not in optionsMapCss, try dynamic options
      const dynamicOptions = getDynamicOptionsForProperty(propKey);
      if (dynamicOptions) {
        try {
          Object.defineProperty(fn, 'options', {
            value: dynamicOptions,
            writable: false,
            enumerable: true,
          });
        } catch {
          (fn as any).options = dynamicOptions;
        }
      }
    }
    return fn as any;
  },
}) as SjRootApi;

export const sj = sjProxy;
export default sjProxy;
