export interface SJssBreakpoints {
  xs: number | string,
  sm: number | string,
  md: number | string,
  lg: number | string,
  xl: number | string,

}

export interface SJssTheme{
  breakpoints: SJssBreakpoints,
  spacing: (val: number) => string;

  typography: {
    default: SJss,
    H6?: SJss,
    H5?: SJss,
    H4?: SJss,
    H3?: SJss,
    H2?: SJss,
    H1?: SJss,
    P?: SJss,
    SPAN?: SJss,
    STRONG?: SJss,
    BODY1?: SJss,
    BODY2?: SJss,
    CAPTION?: SJss,
  };
  palette: {
    common: {
      black: string,
      white: string,
      gray: SJssColorOption
    },
    primary: SJssColorOption,
    secondary: SJssColorOption,
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

export interface SJss {
  alignContent?: SJssBreakingStyle | string;
  alignItems?: SJssBreakingStyle | string;
  alignSelf?: SJssBreakingStyle | string;
  alignmentBaseline?: SJssBreakingStyle | string;
  all?: SJssBreakingStyle | string;
  animation?: SJssBreakingStyle | string;
  animationDelay?: SJssBreakingStyle | string;
  animationDirection?: SJssBreakingStyle | string;
  animationDuration?: SJssBreakingStyle | string;
  animationFillMode?: SJssBreakingStyle | string;
  animationIterationCount?: SJssBreakingStyle | string;
  animationName?: SJssBreakingStyle | string;
  animationPlayState?: SJssBreakingStyle | string;
  animationTimingFunction?: SJssBreakingStyle | string;
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
  borderBlockEndStyle?: SJssBreakingStyle | string;
  borderBlockEndWidth?: SJssBreakingStyle | string;
  borderBlockStart?: SJssBreakingStyle | string;
  borderBlockStartColor?: SJssBreakingStyle | string;
  borderBlockStartStyle?: SJssBreakingStyle | string;
  borderBlockStartWidth?: SJssBreakingStyle | string;
  borderBottom?: SJssBreakingStyle | string;
  borderBottomColor?: SJssBreakingStyle | string;
  borderBottomLeftRadius?: SJssBreakingStyle | string;
  borderBottomRightRadius?: SJssBreakingStyle | string;
  borderBottomStyle?: SJssBreakingStyle | string;
  borderBottomWidth?: SJssBreakingStyle | string;
  borderCollapse?: SJssBreakingStyle | string;
  borderColor?: SJssBreakingStyle | string;
  borderImage?: SJssBreakingStyle | string;
  borderImageOutset?: SJssBreakingStyle | string;
  borderImageRepeat?: SJssBreakingStyle | string;
  borderImageSlice?: SJssBreakingStyle | string;
  borderImageSource?: SJssBreakingStyle | string;
  borderImageWidth?: SJssBreakingStyle | string;
  borderInlineEnd?: SJssBreakingStyle | string;
  borderInlineEndColor?: SJssBreakingStyle | string;
  borderInlineEndStyle?: SJssBreakingStyle | string;
  borderInlineEndWidth?: SJssBreakingStyle | string;
  borderInlineStart?: SJssBreakingStyle | string;
  borderInlineStartColor?: SJssBreakingStyle | string;
  borderInlineStartStyle?: SJssBreakingStyle | string;
  borderInlineStartWidth?: SJssBreakingStyle | string;
  borderLeft?: SJssBreakingStyle | string;
  borderLeftColor?: SJssBreakingStyle | string;
  borderLeftStyle?: SJssBreakingStyle | string;
  borderLeftWidth?: SJssBreakingStyle | string;
  borderRadius?: SJssBreakingStyle | string;
  borderRight?: SJssBreakingStyle | string;
  borderRightColor?: SJssBreakingStyle | string;
  borderRightStyle?: SJssBreakingStyle | string;
  borderRightWidth?: SJssBreakingStyle | string;
  borderSpacing?: SJssBreakingStyle | string;
  borderStyle?: SJssBreakingStyle | string;
  borderTop?: SJssBreakingStyle | string;
  borderTopColor?: SJssBreakingStyle | string;
  borderTopLeftRadius?: SJssBreakingStyle | string;
  borderTopRightRadius?: SJssBreakingStyle | string;
  borderTopStyle?: SJssBreakingStyle | string;
  borderTopWidth?: SJssBreakingStyle | string;
  borderWidth?: SJssBreakingStyle | string;
  bottom?: SJssBreakingStyle | string;
  boxShadow?: SJssBreakingStyle | string;
  boxSizing?: SJssBreakingStyle | string;
  breakAfter?: SJssBreakingStyle | string;
  breakBefore?: SJssBreakingStyle | string;
  breakInside?: SJssBreakingStyle | string;
  captionSide?: SJssBreakingStyle | string;
  caretColor?: SJssBreakingStyle | string;
  clear?: SJssBreakingStyle | string;
  clip?: SJssBreakingStyle | string;
  clipPath?: SJssBreakingStyle | string;
  clipRule?: SJssBreakingStyle | string;
  color?: SJssBreakingStyle | string;
  colorInterpolation?: SJssBreakingStyle | string;
  colorInterpolationFilters?: SJssBreakingStyle | string;
  columnCount?: SJssBreakingStyle | string;
  columnFill?: SJssBreakingStyle | string;
  columnGap?: SJssBreakingStyle | string;
  columnRule?: SJssBreakingStyle | string;
  columnRuleColor?: SJssBreakingStyle | string;
  columnRuleStyle?: SJssBreakingStyle | string;
  columnRuleWidth?: SJssBreakingStyle | string;
  columnSpan?: SJssBreakingStyle | string;
  columnWidth?: SJssBreakingStyle | string;
  columns?: SJssBreakingStyle | string;
  content?: SJssBreakingStyle | string;
  counterIncrement?: SJssBreakingStyle | string;
  counterReset?: SJssBreakingStyle | string;
  cssFloat?: SJssBreakingStyle | string;
  cssText?: SJssBreakingStyle | string;
  cursor?: SJssBreakingStyle | string;
  direction?: SJssBreakingStyle | string;
  display?: SJssBreakingStyle | string;
  dominantBaseline?: SJssBreakingStyle | string;
  emptyCells?: SJssBreakingStyle | string;
  fill?: SJssBreakingStyle | string;
  fillOpacity?: SJssBreakingStyle | string;
  fillRule?: SJssBreakingStyle | string;
  filter?: SJssBreakingStyle | string;
  flex?: SJssBreakingStyle | string;
  flexBasis?: SJssBreakingStyle | string;
  flexDirection?: SJssBreakingStyle | string;
  flexFlow?: SJssBreakingStyle | string;
  flexGrow?: SJssBreakingStyle | string;
  flexShrink?: SJssBreakingStyle | string;
  flexWrap?: SJssBreakingStyle | string;
  float?: SJssBreakingStyle | string;
  floodColor?: SJssBreakingStyle | string;
  floodOpacity?: SJssBreakingStyle | string;
  font?: SJssBreakingStyle | string;
  fontFamily?: SJssBreakingStyle | string;
  fontFeatureSettings?: SJssBreakingStyle | string;
  fontKerning?: SJssBreakingStyle | string;
  fontSize?: SJssBreakingStyle | string;
  fontSizeAdjust?: SJssBreakingStyle | string;
  fontStretch?: SJssBreakingStyle | string;
  fontStyle?: SJssBreakingStyle | string;
  fontSynthesis?: SJssBreakingStyle | string;
  fontVariant?: SJssBreakingStyle | string;
  fontVariantCaps?: SJssBreakingStyle | string;
  fontVariantEastAsian?: SJssBreakingStyle | string;
  fontVariantLigatures?: SJssBreakingStyle | string;
  fontVariantNumeric?: SJssBreakingStyle | string;
  fontVariantPosition?: SJssBreakingStyle | string;
  fontWeight?: SJssBreakingStyle | string;
  gap?: SJssBreakingStyle | string;
  glyphOrientationVertical?: SJssBreakingStyle | string;
  grid?: SJssBreakingStyle | string;
  gridArea?: SJssBreakingStyle | string;
  gridAutoColumns?: SJssBreakingStyle | string;
  gridAutoFlow?: SJssBreakingStyle | string;
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
  imageOrientation?: SJssBreakingStyle | string;
  imageRendering?: SJssBreakingStyle | string;
  inlineSize?: SJssBreakingStyle | string;
  justifyContent?: SJssBreakingStyle | string;
  justifyItems?: SJssBreakingStyle | string;
  justifySelf?: SJssBreakingStyle | string;
  left?: SJssBreakingStyle | string;
  letterSpacing?: SJssBreakingStyle | string;
  lightingColor?: SJssBreakingStyle | string;
  lineBreak?: SJssBreakingStyle | string;
  lineHeight?: SJssBreakingStyle | string;
  listStyle?: SJssBreakingStyle | string;
  listStyleImage?: SJssBreakingStyle | string;
  listStylePosition?: SJssBreakingStyle | string;
  listStyleType?: SJssBreakingStyle | string;
  margin?: SJssBreakingStyle | string;
  marginBlockEnd?: SJssBreakingStyle | string;
  marginBlockStart?: SJssBreakingStyle | string;
  marginBottom?: SJssBreakingStyle | string;
  marginInlineEnd?: SJssBreakingStyle | string;
  marginInlineStart?: SJssBreakingStyle | string;
  marginLeft?: SJssBreakingStyle | string;
  marginRight?: SJssBreakingStyle | string;
  marginTop?: SJssBreakingStyle | string;
  marker?: SJssBreakingStyle | string;
  markerEnd?: SJssBreakingStyle | string;
  markerMid?: SJssBreakingStyle | string;
  markerStart?: SJssBreakingStyle | string;
  mask?: SJssBreakingStyle | string;
  maskComposite?: SJssBreakingStyle | string;
  maskImage?: SJssBreakingStyle | string;
  maskPosition?: SJssBreakingStyle | string;
  maskRepeat?: SJssBreakingStyle | string;
  maskSize?: SJssBreakingStyle | string;
  maskType?: SJssBreakingStyle | string;
  maxBlockSize?: SJssBreakingStyle | string;
  maxHeight?: SJssBreakingStyle | string;
  maxInlineSize?: SJssBreakingStyle | string;
  maxWidth?: SJssBreakingStyle | string;
  minBlockSize?: SJssBreakingStyle | string;
  minHeight?: SJssBreakingStyle | string;
  minInlineSize?: SJssBreakingStyle | string;
  minWidth?: SJssBreakingStyle | string;
  objectFit?: SJssBreakingStyle | string;
  objectPosition?: SJssBreakingStyle | string;
  opacity?: SJssBreakingStyle | string;
  order?: SJssBreakingStyle | string;
  orphans?: SJssBreakingStyle | string;
  outline?: SJssBreakingStyle | string;
  outlineColor?: SJssBreakingStyle | string;
  outlineOffset?: SJssBreakingStyle | string;
  outlineStyle?: SJssBreakingStyle | string;
  outlineWidth?: SJssBreakingStyle | string;
  overflow?: SJssBreakingStyle | string;
  overflowAnchor?: SJssBreakingStyle | string;
  overflowWrap?: SJssBreakingStyle | string;
  overflowX?: SJssBreakingStyle | string;
  overflowY?: SJssBreakingStyle | string;
  overscrollBehavior?: SJssBreakingStyle | string;
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
  pointerEvents?: SJssBreakingStyle | string;
  position?: SJssBreakingStyle | string;
  quotes?: SJssBreakingStyle | string;
  resize?: SJssBreakingStyle | string;
  right?: SJssBreakingStyle | string;
  rotate?: SJssBreakingStyle | string;
  rowGap?: SJssBreakingStyle | string;
  rubyAlign?: SJssBreakingStyle | string;
  rubyPosition?: SJssBreakingStyle | string;
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
