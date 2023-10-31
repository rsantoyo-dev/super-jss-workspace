export enum Breakpoints {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}
export interface SJssBreakpoints {
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
}

export enum sjColor {
  primary = 'sj-primary',
  primaryLight = 'sj-primary-light',
  primaryDark = 'sj-primary-dark',
  primaryContrast = 'sj-primary-contrast',

  secondary = 'sj-secondary',
  secondaryLight = 'sj-secondary-light',
  secondaryDark = 'sj-secondary-dark',
  secondaryContrast = 'sj-secondary-contrast',

  tertiary = 'sj-tertiary',
  tertiaryLight = 'sj-tertiary-light',
  tertiaryDark = 'sj-tertiary-dark',
  tertiaryContrast = 'sj-tertiary-contrast',

  error = 'sj-error',
  errorLight = 'sj-error-light',
  errorDark = 'sj-error-dark',

  warning = 'sj-warning',
  warningLight = 'sj-warning-light',
  warningDark = 'sj-warning-dark',

  info = 'sj-info',
  infoLight = 'sj-info-light',
  infoDark = 'sj-info-dark',

  success = 'sj-success',
  successLight = 'sj-success-light',
  successDark = 'sj-success-dark',

  textPrimary = 'sj-text-primary',
  textSecondary = 'sj-text-secondary',
  textDisabled = 'sj-text-disabled',


  dark = 'sj-common-dark',
  darkDark = 'sj-common-dark-dark',
  darkLight = 'sj-common-dark-light',

  light = 'sj-common-light',
  lightDark = 'sj-common-light-dark',
  lightLight = 'sj-common-light-light',

  neutral = 'sj-common-neutral',
  neutralDark = 'sj-common-neutral-dark',
  neutralLight = 'sj-common-neutral-light',
}


export interface SJssTheme{
  breakpoints: SJssBreakpoints,
  spacing: (val: number) => string;

  typography: {
    default: SJssStyles,
    H6?: SJssStyles,
    H5?: SJssStyles,
    H4?: SJssStyles,
    H3?: SJssStyles,
    H2?: SJssStyles,
    H1?: SJssStyles,
    P?: SJssStyles,
    SPAN?: SJssStyles,
    STRONG?: SJssStyles,
    BODY1?: SJssStyles,
    BODY2?: SJssStyles,
    CAPTION?: SJssStyles,
  };
  palette: {
    common: {
      dark: SJssColorOption,
      light: SJssColorOption,
      neutral: SJssColorOption
    },
    primary: SJssColorOption,
    secondary: SJssColorOption,
    tertiary: SJssColorOption,
    error: SJssColorOption,
    warning: SJssColorOption,
    info: SJssColorOption,
    success: SJssColorOption,
    text: {
      primary: string,
      secondary: string,
      disabled: string
    }
  }
}

export interface SJssColorOption {
  main: string,
  light: string,
  dark: string,
  contrastText: string,
}

export interface SJssBreakingStyle {
  xs?: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string,
}
type SJssSystemBreakpoints<T> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

type AlignContentT = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItemsT = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
type AlignSelfT = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
type AlignmentBaselineT = 'baseline' | 'middle' | 'central' | 'text-bottom' | 'text-top' | 'bottom' | 'top' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical';
type AllT = 'initial' | 'inherit' | 'unset' | 'revert';
type AnimationDirectionT = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
type AnimationFillModeT = 'none' | 'forwards' | 'backwards' | 'both';
type AnimationPlayStateT = 'paused' | 'running';
type AnimationTimingFunctionT = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string; // string for cubic-bezier and steps
type AnimationIterationCountT = 'number' | 'infinite' | 'initial'  |'inherit';
type AspectRatioT = 'auto' | string;
type BorderStyleT = 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
type BorderCollapseT = 'separate' | 'collapse';
type BorderImageRepeatT = 'stretch' | 'repeat' | 'round' | 'space';
type BorderInlineStyleT = BorderStyleT; // Reusing the BorderStyleT type
type BoxSizingT = 'content-box' | 'border-box';
type BreakValueT = 'auto' | 'avoid' | 'avoid-page' | 'page' | 'column' | 'avoid-column' | 'left' | 'right' | 'recto' | 'verso';
type ClearT = 'none' | 'left' | 'right' | 'both';
type ClipRuleT = 'nonzero' | 'evenodd';
type ColorInterpolationT = 'auto' | 'sRGB' | 'linearRGB';
type ColorInterpolationFiltersT = 'auto' | 'sRGB' | 'linearRGB';
type ColumnFillT = 'balance' | 'auto';
type ColumnRuleStyleT = 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
type ColumnSpanT = 'none' | 'all';
type CssFloatT = 'none' | 'left' | 'right' | 'inline-start' | 'inline-end';
type CursorT = 'auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' | 'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'grab' | 'grabbing' | 'all-scroll' | 'col-resize' | 'row-resize' | 'n-resize' | 'e-resize' | 's-resize' | 'w-resize' | 'ne-resize' | 'nw-resize' | 'se-resize' | 'sw-resize' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' | 'zoom-in' | 'zoom-out';
type DirectionT = 'ltr' | 'rtl';
type DisplayT = 'inline' | 'block' | 'contents' | 'flex' | 'grid' | 'inline-block' | 'inline-flex' | 'inline-grid' | 'inline-table' | 'list-item' | 'run-in' | 'table' | 'table-caption' | 'table-column-group' | 'table-header-group' | 'table-footer-group' | 'table-row-group' | 'table-cell' | 'table-column' | 'table-row' | 'none';
type DominantBaselineT = 'auto' | 'middle' | 'central' | 'text-before-edge' | 'text-after-edge' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical';
type EmptyCellsT = 'show' | 'hide';
type FillRuleT = 'nonzero' | 'evenodd';
type FlexDirectionT = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type FlexWrapT = 'nowrap' | 'wrap' | 'wrap-reverse';
type FloatT = 'left' | 'right' | 'none' | 'inline-start' | 'inline-end';
type FontStretchT = 'ultra-condensed' | 'extra-condensed' | 'condensed' | 'semi-condensed' | 'normal' | 'semi-expanded' | 'expanded' | 'extra-expanded' | 'ultra-expanded';
type FontStyleT = 'normal' | 'italic' | 'oblique';
type FontVariantCapsT = 'normal' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' | 'titling-caps';
type FontWeightT = 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type GridAutoFlowT = 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
type JustifyContentT = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type JustifyItemsT = 'auto' | 'normal' | 'stretch' | JustifyContentT; // JustifyContentT options are also valid for justifyItems
type JustifySelfT = 'auto' | 'normal' | 'stretch' | JustifyContentT; // JustifyContentT options are also valid for justifySelf
type ImageOrientationT = 'from-image' | 'none' | string; // Can also accept angle values like '90deg'
type ImageRenderingT = 'auto' | 'crisp-edges' | 'pixelated';
type LineBreakT = 'auto' | 'loose' | 'normal' | 'strict';
type LineHeightT = 'normal' | string; // Can be a number, percentage, or a length value
type ListStyleT = 'none' | string; // Can be a combination of list-style-type, list-style-position, and list-style-image values
type ListStylePositionT = 'inside' | 'outside';
type ListStyleTypeT = 'disc' | 'circle' | 'square' | 'decimal' | 'lower-roman' | 'upper-roman' | 'lower-alpha' | 'upper-alpha' | 'none' | string; // There are more options, but these are the most common
type MarginT = 'auto' | 'inherit' | 'initial' | 'unset' | string; // This can be a specific value like '16px' or '2em', hence the string type.
type MarkerT = 'none' | 'url' | 'inherit' | 'initial' | 'unset';
type MaskTypeT = 'luminance' | 'alpha';
type ObjectFitT = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
type OverflowT = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';
type OverscrollBehaviorT = 'auto' | 'contain' | 'none';
type PointerEventsT = 'auto' | 'none' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'painted' | 'fill' | 'stroke' | 'all';
type PositionT = 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';
type ResizeT = 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';
type RubyAlignT = 'start' | 'center' | 'space-between' | 'space-around';
type RubyPositionT = 'over' | 'under' | 'inter-character' | 'right';

export type SJStyleAlignContent = SJssSystemBreakpoints<AlignContentT>;
export type SJStyleAlignItems = SJssSystemBreakpoints<AlignItemsT>;
export type SJStyleAlignSelf = SJssSystemBreakpoints<AlignSelfT>;
export type SJStyleAlignmentBaseline = SJssSystemBreakpoints<AlignmentBaselineT>;
export type SJStyleAll = SJssSystemBreakpoints<AllT>;
export type SJStyleAnimationDirection = SJssSystemBreakpoints<AnimationDirectionT>;
export type SJStyleAnimationFillMode = SJssSystemBreakpoints<AnimationFillModeT>;
export type SJStyleAnimationPlayState = SJssSystemBreakpoints<AnimationPlayStateT>;
export type SJStyleAnimationTimingFunction = SJssSystemBreakpoints<AnimationTimingFunctionT>;
export type SJAspectRatio = SJssSystemBreakpoints<AspectRatioT>;
export type SJStyleBorderStyle = SJssSystemBreakpoints<BorderStyleT>;
export type SJStyleBorderCollapse = SJssSystemBreakpoints<BorderCollapseT>;
export type SJStyleBorderImageRepeat = SJssSystemBreakpoints<BorderImageRepeatT>;
export type SJStyleBorderInlineStyle = SJssSystemBreakpoints<BorderInlineStyleT>;
export type SJStyleBoxSizing = SJssSystemBreakpoints<BoxSizingT>;
export type SJStyleBreakValue = SJssSystemBreakpoints<BreakValueT>;
export type SJStyleClear = SJssSystemBreakpoints<ClearT>;
export type SJStyleClipRule = SJssSystemBreakpoints<ClipRuleT>;
export type SJStyleColorInterpolation = SJssSystemBreakpoints<ColorInterpolationT>;
export type SJStyleColorInterpolationFilters = SJssSystemBreakpoints<ColorInterpolationFiltersT>;
export type SJStyleColumnRuleStyle = SJssSystemBreakpoints<ColumnRuleStyleT>;
export type SJStyleColumnSpan = SJssSystemBreakpoints<ColumnSpanT>;
export type SJStyleCssFloat = SJssSystemBreakpoints<CssFloatT>;
export type SJStyleCursor = SJssSystemBreakpoints<CursorT>;
export type SJStyleDirection = SJssSystemBreakpoints<DirectionT>;
export type SJStyleDisplay = SJssSystemBreakpoints<DisplayT>;
export type SJStyleDominantBaseline = SJssSystemBreakpoints<DominantBaselineT>;
export type SJStyleEmptyCells = SJssSystemBreakpoints<EmptyCellsT>;
export type SJStyleFillRule = SJssSystemBreakpoints<FillRuleT>;
export type SJStyleFlexDirection = SJssSystemBreakpoints<FlexDirectionT>;
export type SJStyleFlexWrap = SJssSystemBreakpoints<FlexWrapT>;
export type SJStyleFloat = SJssSystemBreakpoints<FloatT>;
export type SJStyleFontStretch = SJssSystemBreakpoints<FontStretchT>;
export type SJStyleFontStyle = SJssSystemBreakpoints<FontStyleT>;
export type SJStyleFontVariantCaps = SJssSystemBreakpoints<FontVariantCapsT>;
export type SJStyleFontWeight = SJssSystemBreakpoints<FontWeightT>;
export type SJStyleGridAutoFlow = SJssSystemBreakpoints<GridAutoFlowT>;
export type SJStyleJustifyContent = SJssSystemBreakpoints<JustifyContentT>;
export type SJStyleJustifyItems = SJssSystemBreakpoints<JustifyItemsT>;
export type SJStyleJustifySelf = SJssSystemBreakpoints<JustifySelfT>;
export type SJStyleImageOrientation = SJssSystemBreakpoints<ImageOrientationT>;
export type SJStyleImageRendering = SJssSystemBreakpoints<ImageRenderingT>;
export type SJStyleLineBreak = SJssSystemBreakpoints<LineBreakT>;
export type SJStyleLineHeight = SJssSystemBreakpoints<LineHeightT>;
export type SJStyleListStyle = SJssSystemBreakpoints<ListStyleT>;
export type SJStyleListStylePosition = SJssSystemBreakpoints<ListStylePositionT>;
export type SJStyleListStyleType = SJssSystemBreakpoints<ListStyleTypeT>;
export type SJStyleMargin = SJssSystemBreakpoints<MarginT>;
export type SJStyleMarker = SJssSystemBreakpoints<MarkerT>;
export type SJStyleMaskType = SJssSystemBreakpoints<MaskTypeT>;
export type SJStyleObjectFit = SJssSystemBreakpoints<ObjectFitT>;
export type SJStyleOverflow = SJssSystemBreakpoints<OverflowT>;
export type SJStyleOverscrollBehavior = SJssSystemBreakpoints<OverscrollBehaviorT>;
export type SJStylePointerEvents = SJssSystemBreakpoints<PointerEventsT>;
export type SJStylePosition = SJssSystemBreakpoints<PositionT>;
export type SJStyleResize = SJssSystemBreakpoints<ResizeT>;
export type SJStyleRubyAlign = SJssSystemBreakpoints<RubyAlignT>;
export type SJStyleRubyPosition = SJssSystemBreakpoints<RubyPositionT>;

export type SJss = (SJssStyles | SJssStyles[] | undefined);
export interface SJssStyles {

  [key: string]: SJssBreakingStyle | string  | undefined;
  alignContent?: SJStyleAlignContent | AlignContentT
  alignItems?: SJStyleAlignItems | AlignItemsT;
  alignSelf?: SJStyleAlignSelf | AlignSelfT;
  alignmentBaseline?: SJStyleAlignmentBaseline | AlignmentBaselineT;
  all?: SJStyleAll | AllT;
  animation?: SJssBreakingStyle | string;
  animationDelay?: SJssBreakingStyle | string;
  animationDirection?: SJStyleAnimationDirection | AnimationDirectionT;
  animationDuration?: SJssBreakingStyle | string;
  animationFillMode?: SJStyleAnimationFillMode | AnimationFillModeT;
  animationIterationCount?: SJssBreakingStyle | AnimationIterationCountT;
  animationName?: SJssBreakingStyle | string;
  animationPlayState?: SJStyleAnimationPlayState | AnimationPlayStateT;
  animationTimingFunction?: SJStyleAnimationTimingFunction | AnimationTimingFunctionT;
  aspectRatio?: SJAspectRatio | AspectRatioT;
  backfaceVisibility?: SJssBreakingStyle | string;
  background?: SJssBreakingStyle | string;
  backgroundAttachment?: SJssBreakingStyle | string;
  backgroundClip?: SJssBreakingStyle | string;
  backgroundColor?: SJssBreakingStyle | string;
  backgroundImage?: SJssBreakingStyle | string;
  backgroundOrigin?: SJssBreakingStyle | string;
  backgroundPosition?: SJssBreakingStyle | string;
  backgroundPositionX?: SJssBreakingStyle | string;
  backgroundPositionY?: SJssBreakingStyle | string;
  backgroundRepeat?: SJssBreakingStyle | string;
  backgroundSize?: SJssBreakingStyle | string;
  baselineShift?: SJssBreakingStyle | string;
  blockSize?: SJssBreakingStyle | string;
  border?: SJssBreakingStyle | string;
  borderBlockEnd?: SJssBreakingStyle | string;
  borderBlockEndColor?: SJssBreakingStyle | string;
  borderBlockEndStyle?: SJStyleBorderStyle | BorderStyleT;
  borderBlockEndWidth?: SJssBreakingStyle | string;
  borderBlockStart?: SJssBreakingStyle | string;
  borderBlockStartColor?: SJssBreakingStyle | string;
  borderBlockStartStyle?: SJStyleBorderStyle | BorderStyleT;
  borderBlockStartWidth?: SJssBreakingStyle | string;
  borderBottom?: SJssBreakingStyle | string;
  borderBottomColor?: SJssBreakingStyle | string;
  borderBottomLeftRadius?: SJssBreakingStyle | string;
  borderBottomRightRadius?: SJssBreakingStyle | string;
  borderBottomStyle?: SJStyleBorderStyle | BorderStyleT;
  borderBottomWidth?: SJssBreakingStyle | string;
  borderCollapse?: SJStyleBorderCollapse | BorderCollapseT;
  borderColor?: SJssBreakingStyle | string;
  borderImage?: SJssBreakingStyle | string;
  borderImageOutset?: SJssBreakingStyle | string;
  borderImageRepeat?: SJStyleBorderImageRepeat | BorderImageRepeatT;
  borderImageSlice?: SJssBreakingStyle | string;
  borderImageSource?: SJssBreakingStyle | string;
  borderImageWidth?: SJssBreakingStyle | string;
  borderInlineEnd?: SJssBreakingStyle | string;
  borderInlineEndColor?: SJssBreakingStyle | string;
  borderInlineEndStyle?: SJStyleBorderInlineStyle | BorderInlineStyleT;
  borderInlineEndWidth?: SJssBreakingStyle | string;
  borderInlineStart?: SJssBreakingStyle | string;
  borderInlineStartColor?: SJssBreakingStyle | string;
  borderInlineStartStyle?: SJStyleBorderInlineStyle | BorderInlineStyleT;
  borderInlineStartWidth?: SJssBreakingStyle | string;
  borderLeft?: SJssBreakingStyle | string;
  borderLeftColor?: SJssBreakingStyle | string;
  borderLeftStyle?: SJStyleBorderStyle | BorderStyleT;
  borderLeftWidth?: SJssBreakingStyle | string;
  borderRadius?: SJssBreakingStyle | string;
  borderRight?: SJssBreakingStyle | string;
  borderRightColor?: SJssBreakingStyle | string;
  borderRightStyle?: SJStyleBorderStyle | BorderStyleT;
  borderRightWidth?: SJssBreakingStyle | string;
  borderSpacing?: SJssBreakingStyle | string;
  borderStyle?: SJStyleBorderStyle | BorderStyleT;
  borderTop?: SJssBreakingStyle | string;
  borderTopColor?: SJssBreakingStyle | string;
  borderTopLeftRadius?: SJssBreakingStyle | string;
  borderTopRightRadius?: SJssBreakingStyle | string;
  borderTopStyle?: SJStyleBorderStyle | BorderStyleT;
  borderTopWidth?: SJssBreakingStyle | string;
  borderWidth?: SJssBreakingStyle | string;
  bottom?: SJssBreakingStyle | string;
  boxShadow?: SJssBreakingStyle | string;
  boxSizing?: SJStyleBoxSizing | BoxSizingT;
  breakAfter?: SJStyleBreakValue | BreakValueT;
  breakBefore?: SJStyleBreakValue | BreakValueT;
  breakInside?: SJStyleBreakValue | BreakValueT;
  captionSide?: SJssBreakingStyle | string;
  caretColor?: SJssBreakingStyle | string;
  clear?: SJStyleClear | ClearT;
  clip?: SJssBreakingStyle | string;
  clipPath?: SJssBreakingStyle | string;
  clipRule?: SJStyleClipRule | ClipRuleT;
  color?: SJssBreakingStyle | string;
  colorInterpolation?: SJStyleColorInterpolation | ColorInterpolationT;
  colorInterpolationFilters?: SJStyleColorInterpolationFilters | ColorInterpolationFiltersT;
  columnCount?: SJssBreakingStyle | string;
  columnFill?: SJssBreakingStyle | ColumnFillT;
  columnGap?: SJssBreakingStyle | string;
  columnRule?: SJssBreakingStyle | string;
  columnRuleColor?: SJssBreakingStyle | string;
  columnRuleStyle?: SJStyleColumnRuleStyle | ColumnRuleStyleT;
  columnRuleWidth?: SJssBreakingStyle | string;
  columnSpan?: SJStyleColumnSpan | ColumnSpanT;
  columnWidth?: SJssBreakingStyle | string;
  columns?: SJssBreakingStyle | string;
  content?: SJssBreakingStyle | string;
  counterIncrement?: SJssBreakingStyle | string;
  counterReset?: SJssBreakingStyle | string;
  cssFloat?: SJStyleCssFloat | CssFloatT;
  cssText?: SJssBreakingStyle | string;
  cursor?: SJStyleCursor | CursorT;
  direction?: SJStyleDirection | DirectionT;
  display?: SJStyleDisplay | DisplayT;
  dominantBaseline?: SJStyleDominantBaseline | DominantBaselineT;
  emptyCells?: SJStyleEmptyCells | EmptyCellsT;
  fill?: SJssBreakingStyle | string;
  fillOpacity?: SJssBreakingStyle | string;
  fillRule?: SJStyleFillRule | FillRuleT;
  filter?: SJssBreakingStyle | string;
  flex?: SJssBreakingStyle | string;
  flexBasis?: SJssBreakingStyle | string;
  flexDirection?: SJStyleFlexDirection | FlexDirectionT;
  flexFlow?: SJssBreakingStyle | string;
  flexGrow?: SJssBreakingStyle | string;
  flexShrink?: SJssBreakingStyle | string;
  flexWrap?: SJStyleFlexWrap | FlexWrapT;
  float?: SJStyleFloat | FloatT;
  floodColor?: SJssBreakingStyle | string;
  floodOpacity?: SJssBreakingStyle | string;
  font?: SJssBreakingStyle | string;
  fontFamily?: SJssBreakingStyle | string;
  fontFeatureSettings?: SJssBreakingStyle | string;
  fontKerning?: SJssBreakingStyle | string;
  fontSize?: SJssBreakingStyle | string;
  fontSizeAdjust?: SJssBreakingStyle | string;
  fontStretch?: SJStyleFontStretch | FontStretchT;
  fontStyle?: SJStyleFontStyle | FontStyleT;
  fontSynthesis?: SJssBreakingStyle | string;
  fontVariant?: SJssBreakingStyle | string;
  fontVariantCaps?: SJStyleFontVariantCaps | FontVariantCapsT;
  fontVariantEastAsian?: SJssBreakingStyle | string;
  fontVariantLigatures?: SJssBreakingStyle | string;
  fontVariantNumeric?: SJssBreakingStyle | string;
  fontVariantPosition?: SJssBreakingStyle | string;
  fontWeight?: SJStyleFontWeight | FontWeightT;
  gap?: SJssBreakingStyle | string;
  glyphOrientationVertical?: SJssBreakingStyle | string;
  grid?: SJssBreakingStyle | string;
  gridArea?: SJssBreakingStyle | string;
  gridAutoColumns?: SJssBreakingStyle | string;
  gridAutoFlow?: SJStyleGridAutoFlow | GridAutoFlowT;
  gridAutoRows?: SJssBreakingStyle | string;
  gridColumn?: SJssBreakingStyle | string;
  gridColumnEnd?: SJssBreakingStyle | string;
  gridColumnGap?: SJssBreakingStyle | string;
  gridColumnStart?: SJssBreakingStyle | string;
  gridGap?: SJssBreakingStyle | string;
  gridRow?: SJssBreakingStyle | string;
  gridRowEnd?: SJssBreakingStyle | string;
  gridRowGap?: SJssBreakingStyle | string;
  gridRowStart?: SJssBreakingStyle | string;
  gridTemplate?: SJssBreakingStyle | string;
  gridTemplateAreas?: SJssBreakingStyle | string;
  gridTemplateColumns?: SJssBreakingStyle | string;
  gridTemplateRows?: SJssBreakingStyle | string;
  height?: SJssBreakingStyle | string;
  hyphens?: SJssBreakingStyle | string;
  imageOrientation?: SJStyleImageOrientation | ImageOrientationT;
  imageRendering?: SJStyleImageRendering | ImageRenderingT;
  inlineSize?: SJssBreakingStyle | string;
  justifyContent?: SJssBreakingStyle | string;
  justifyItems?: SJStyleJustifyItems | JustifyItemsT;
  justifySelf?: SJStyleJustifySelf | JustifySelfT;
  left?: SJssBreakingStyle | string;
  letterSpacing?: SJssBreakingStyle | string; // This can be a string like "normal", "2px", "0.3em", etc.
  lightingColor?: SJssBreakingStyle | string; // This is typically a color value
  lineBreak?: SJStyleLineBreak | LineBreakT;
  lineHeight?: SJStyleLineHeight | LineHeightT;
  listStyle?: SJStyleListStyle | ListStyleT;
  listStyleImage?: SJssBreakingStyle | string; // This is typically a URL value like "url('path/to/image.png')"
  listStylePosition?: SJStyleListStylePosition | ListStylePositionT;
  listStyleType?: SJStyleListStyleType | ListStyleTypeT;

  margin?: SJStyleMargin | MarginT;
  marginBlockEnd?: SJssBreakingStyle | string;
  marginBlockStart?: SJssBreakingStyle | string;
  marginBottom?: SJssBreakingStyle | string;
  marginInlineEnd?: SJssBreakingStyle | string;
  marginInlineStart?: SJssBreakingStyle | string;
  marginLeft?: SJssBreakingStyle | string;
  marginRight?: SJssBreakingStyle | string;
  marginTop?: SJssBreakingStyle | string;
  marker?: SJStyleMarker | MarkerT;
  markerEnd?: SJssBreakingStyle | string;
  markerMid?: SJssBreakingStyle | string;
  markerStart?: SJssBreakingStyle | string;
  mask?: SJssBreakingStyle | string;
  maskComposite?: SJssBreakingStyle | string;
  maskImage?: SJssBreakingStyle | string;
  maskPosition?: SJssBreakingStyle | string;
  maskRepeat?: SJssBreakingStyle | string;
  maskSize?: SJssBreakingStyle | string;
  maskType?: SJStyleMaskType | MaskTypeT;
  maxBlockSize?: SJssBreakingStyle | string;
  maxHeight?: SJssBreakingStyle | string;
  maxInlineSize?: SJssBreakingStyle | string;
  maxWidth?: SJssBreakingStyle | string;
  minBlockSize?: SJssBreakingStyle | string;
  minHeight?: SJssBreakingStyle | string;
  minInlineSize?: SJssBreakingStyle | string;
  minWidth?: SJssBreakingStyle | string;
  objectFit?: SJStyleObjectFit | ObjectFitT;
  objectPosition?: SJssBreakingStyle | string;
  opacity?: SJssBreakingStyle | string;
  order?: SJssBreakingStyle | string;
  orphans?: SJssBreakingStyle | string;
  outline?: SJssBreakingStyle | string;
  outlineColor?: SJssBreakingStyle | string;
  outlineOffset?: SJssBreakingStyle | string;
  outlineStyle?: SJssBreakingStyle | string;
  outlineWidth?: SJssBreakingStyle | string;
  overflow?: SJStyleOverflow | OverflowT;
  overflowAnchor?: SJssBreakingStyle | string;
  overflowWrap?: SJssBreakingStyle | string;
  overflowX?: SJssBreakingStyle | string;
  overflowY?: SJssBreakingStyle | string;
  overscrollBehavior?: SJStyleOverscrollBehavior | OverscrollBehaviorT;
  overscrollBehaviorBlock?: SJssBreakingStyle | string;
  overscrollBehaviorInline?: SJssBreakingStyle | string;
  overscrollBehaviorX?: SJssBreakingStyle | string;
  overscrollBehaviorY?: SJssBreakingStyle | string;
  padding?: SJssBreakingStyle | string;
  paddingBlockEnd?: SJssBreakingStyle | string;
  paddingBlockStart?: SJssBreakingStyle | string;
  paddingBottom?: SJssBreakingStyle | string;
  paddingInlineEnd?: SJssBreakingStyle | string;
  paddingInlineStart?: SJssBreakingStyle | string;
  paddingLeft?: SJssBreakingStyle | string;
  paddingRight?: SJssBreakingStyle | string;
  paddingTop?: SJssBreakingStyle | string;
  pageBreakAfter?: SJssBreakingStyle | string;
  pageBreakBefore?: SJssBreakingStyle | string;
  pageBreakInside?: SJssBreakingStyle | string;
  paintOrder?: SJssBreakingStyle | string;
  perspective?: SJssBreakingStyle | string;
  perspectiveOrigin?: SJssBreakingStyle | string;
  placeContent?: SJssBreakingStyle | string;
  placeItems?: SJssBreakingStyle | string;
  placeSelf?: SJssBreakingStyle | string;
  pointerEvents?: SJStylePointerEvents | PointerEventsT;
  position?: SJStylePosition | PositionT;
  quotes?: SJssBreakingStyle | string;
  resize?: SJStyleResize | ResizeT;
  right?: SJssBreakingStyle | string;
  rotate?: SJssBreakingStyle | string;
  rowGap?: SJssBreakingStyle | string;
  rubyAlign?: SJStyleRubyAlign | RubyAlignT;
  rubyPosition?: SJStyleRubyPosition | RubyPositionT;
  scale?: SJssBreakingStyle | string;
  scrollBehavior?: SJssBreakingStyle | string;
  shapeRendering?: SJssBreakingStyle | string;
  stopColor?: SJssBreakingStyle | string;
  stopOpacity?: SJssBreakingStyle | string;
  stroke?: SJssBreakingStyle | string;
  strokeDasharray?: SJssBreakingStyle | string;
  strokeDashoffset?: SJssBreakingStyle | string;
  strokeLinecap?: SJssBreakingStyle | string;
  strokeLinejoin?: SJssBreakingStyle | string;
  strokeMiterlimit?: SJssBreakingStyle | string;
  strokeOpacity?: SJssBreakingStyle | string;
  strokeWidth?: SJssBreakingStyle | string;
  tabSize?: SJssBreakingStyle | string;
  tableLayout?: SJssBreakingStyle | string;
  textAlign?: SJssBreakingStyle | string;
  textAlignLast?: SJssBreakingStyle | string;
  textAnchor?: SJssBreakingStyle | string;
  textCombineUpright?: SJssBreakingStyle | string;
  textDecoration?: SJssBreakingStyle | string;
  textDecorationColor?: SJssBreakingStyle | string;
  textDecorationLine?: SJssBreakingStyle | string;
  textDecorationStyle?: SJssBreakingStyle | string;
  textEmphasis?: SJssBreakingStyle | string;
  textEmphasisColor?: SJssBreakingStyle | string;
  textEmphasisPosition?: SJssBreakingStyle | string;
  textEmphasisStyle?: SJssBreakingStyle | string;
  textIndent?: SJssBreakingStyle | string;
  textJustify?: SJssBreakingStyle | string;
  textOrientation?: SJssBreakingStyle | string;
  textOverflow?: SJssBreakingStyle | string;
  textRendering?: SJssBreakingStyle | string;
  textShadow?: SJssBreakingStyle | string;
  textTransform?: SJssBreakingStyle | string;
  textUnderlinePosition?: SJssBreakingStyle | string;
  top?: SJssBreakingStyle | string;
  touchAction?: SJssBreakingStyle | string;
  transform?: SJssBreakingStyle | string;
  transformBox?: SJssBreakingStyle | string;
  transformOrigin?: SJssBreakingStyle | string;
  transformStyle?: SJssBreakingStyle | string;
  transition?: SJssBreakingStyle | string;
  transitionDelay?: SJssBreakingStyle | string;
  transitionDuration?: SJssBreakingStyle | string;
  transitionProperty?: SJssBreakingStyle | string;
  transitionTimingFunction?: SJssBreakingStyle | string;
  translate?: SJssBreakingStyle | string;
  unicodeBidi?: SJssBreakingStyle | string;
  userSelect?: SJssBreakingStyle | string;
  verticalAlign?: SJssBreakingStyle | string;
  visibility?: SJssBreakingStyle | string;
  webkitUserSelect?: SJssBreakingStyle | string;
  whiteSpace?: SJssBreakingStyle | string;
  widows?: SJssBreakingStyle | string;
  width?: SJssBreakingStyle | string;
  willChange?: SJssBreakingStyle | string;
  wordBreak?: SJssBreakingStyle | string;
  wordSpacing?: SJssBreakingStyle | string;
  wordWrap?: SJssBreakingStyle | string;
  writingMode?: SJssBreakingStyle | string;
  zIndex?: SJssBreakingStyle | string;
}
