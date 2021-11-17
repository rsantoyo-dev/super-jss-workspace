export interface IBreakpoints {
  xs: number | string,
  sm: number | string,
  md: number | string,
  lg: number | string,
  xl: number | string,
}

export interface ITheme {
  breakpoints: IBreakpoints,
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
      gray: IColorOption
    },
    primary: IColorOption,
    secondary: IColorOption,
    error: IColorOption,
    warning: IColorOption,
    info: IColorOption,
    success: IColorOption,
    text: {
      primary: string,
      secondary: string,
      disabled: string

    }
  }
}

export interface IColorOption {
  main: string,
  light: string,
  dark: string,
  contrastText: string,
}

export interface IBreakingStyle {
  xs?: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string,
}

export interface SJss {
  alignContent?: IBreakingStyle | string;
  alignItems?: IBreakingStyle | string;
  alignSelf?: IBreakingStyle | string;
  alignmentBaseline?: IBreakingStyle | string;
  all?: IBreakingStyle | string;
  animation?: IBreakingStyle | string;
  animationDelay?: IBreakingStyle | string;
  animationDirection?: IBreakingStyle | string;
  animationDuration?: IBreakingStyle | string;
  animationFillMode?: IBreakingStyle | string;
  animationIterationCount?: IBreakingStyle | string;
  animationName?: IBreakingStyle | string;
  animationPlayState?: IBreakingStyle | string;
  animationTimingFunction?: IBreakingStyle | string;
  backfaceVisibility?: IBreakingStyle | string;
  background?: IBreakingStyle | string;
  backgroundAttachment?: IBreakingStyle | string;
  backgroundClip?: IBreakingStyle | string;
  backgroundColor?: IBreakingStyle | string;
  backgroundImage?: IBreakingStyle | string;
  backgroundOrigin?: IBreakingStyle | string;
  backgroundPosition?: IBreakingStyle | string;
  backgroundPositionX?: IBreakingStyle | string;
  backgroundPositionY?: IBreakingStyle | string;
  backgroundRepeat?: IBreakingStyle | string;
  backgroundSize?: IBreakingStyle | string;
  baselineShift?: IBreakingStyle | string;
  blockSize?: IBreakingStyle | string;
  border?: IBreakingStyle | string;
  borderBlockEnd?: IBreakingStyle | string;
  borderBlockEndColor?: IBreakingStyle | string;
  borderBlockEndStyle?: IBreakingStyle | string;
  borderBlockEndWidth?: IBreakingStyle | string;
  borderBlockStart?: IBreakingStyle | string;
  borderBlockStartColor?: IBreakingStyle | string;
  borderBlockStartStyle?: IBreakingStyle | string;
  borderBlockStartWidth?: IBreakingStyle | string;
  borderBottom?: IBreakingStyle | string;
  borderBottomColor?: IBreakingStyle | string;
  borderBottomLeftRadius?: IBreakingStyle | string;
  borderBottomRightRadius?: IBreakingStyle | string;
  borderBottomStyle?: IBreakingStyle | string;
  borderBottomWidth?: IBreakingStyle | string;
  borderCollapse?: IBreakingStyle | string;
  borderColor?: IBreakingStyle | string;
  borderImage?: IBreakingStyle | string;
  borderImageOutset?: IBreakingStyle | string;
  borderImageRepeat?: IBreakingStyle | string;
  borderImageSlice?: IBreakingStyle | string;
  borderImageSource?: IBreakingStyle | string;
  borderImageWidth?: IBreakingStyle | string;
  borderInlineEnd?: IBreakingStyle | string;
  borderInlineEndColor?: IBreakingStyle | string;
  borderInlineEndStyle?: IBreakingStyle | string;
  borderInlineEndWidth?: IBreakingStyle | string;
  borderInlineStart?: IBreakingStyle | string;
  borderInlineStartColor?: IBreakingStyle | string;
  borderInlineStartStyle?: IBreakingStyle | string;
  borderInlineStartWidth?: IBreakingStyle | string;
  borderLeft?: IBreakingStyle | string;
  borderLeftColor?: IBreakingStyle | string;
  borderLeftStyle?: IBreakingStyle | string;
  borderLeftWidth?: IBreakingStyle | string;
  borderRadius?: IBreakingStyle | string;
  borderRight?: IBreakingStyle | string;
  borderRightColor?: IBreakingStyle | string;
  borderRightStyle?: IBreakingStyle | string;
  borderRightWidth?: IBreakingStyle | string;
  borderSpacing?: IBreakingStyle | string;
  borderStyle?: IBreakingStyle | string;
  borderTop?: IBreakingStyle | string;
  borderTopColor?: IBreakingStyle | string;
  borderTopLeftRadius?: IBreakingStyle | string;
  borderTopRightRadius?: IBreakingStyle | string;
  borderTopStyle?: IBreakingStyle | string;
  borderTopWidth?: IBreakingStyle | string;
  borderWidth?: IBreakingStyle | string;
  bottom?: IBreakingStyle | string;
  boxShadow?: IBreakingStyle | string;
  boxSizing?: IBreakingStyle | string;
  breakAfter?: IBreakingStyle | string;
  breakBefore?: IBreakingStyle | string;
  breakInside?: IBreakingStyle | string;
  captionSide?: IBreakingStyle | string;
  caretColor?: IBreakingStyle | string;
  clear?: IBreakingStyle | string;
  clip?: IBreakingStyle | string;
  clipPath?: IBreakingStyle | string;
  clipRule?: IBreakingStyle | string;
  color?: IBreakingStyle | string;
  colorInterpolation?: IBreakingStyle | string;
  colorInterpolationFilters?: IBreakingStyle | string;
  columnCount?: IBreakingStyle | string;
  columnFill?: IBreakingStyle | string;
  columnGap?: IBreakingStyle | string;
  columnRule?: IBreakingStyle | string;
  columnRuleColor?: IBreakingStyle | string;
  columnRuleStyle?: IBreakingStyle | string;
  columnRuleWidth?: IBreakingStyle | string;
  columnSpan?: IBreakingStyle | string;
  columnWidth?: IBreakingStyle | string;
  columns?: IBreakingStyle | string;
  content?: IBreakingStyle | string;
  counterIncrement?: IBreakingStyle | string;
  counterReset?: IBreakingStyle | string;
  cssFloat?: IBreakingStyle | string;
  cssText?: IBreakingStyle | string;
  cursor?: IBreakingStyle | string;
  direction?: IBreakingStyle | string;
  display?: IBreakingStyle | string;
  dominantBaseline?: IBreakingStyle | string;
  emptyCells?: IBreakingStyle | string;
  fill?: IBreakingStyle | string;
  fillOpacity?: IBreakingStyle | string;
  fillRule?: IBreakingStyle | string;
  filter?: IBreakingStyle | string;
  flex?: IBreakingStyle | string;
  flexBasis?: IBreakingStyle | string;
  flexDirection?: IBreakingStyle | string;
  flexFlow?: IBreakingStyle | string;
  flexGrow?: IBreakingStyle | string;
  flexShrink?: IBreakingStyle | string;
  flexWrap?: IBreakingStyle | string;
  float?: IBreakingStyle | string;
  floodColor?: IBreakingStyle | string;
  floodOpacity?: IBreakingStyle | string;
  font?: IBreakingStyle | string;
  fontFamily?: IBreakingStyle | string;
  fontFeatureSettings?: IBreakingStyle | string;
  fontKerning?: IBreakingStyle | string;
  fontSize?: IBreakingStyle | string;
  fontSizeAdjust?: IBreakingStyle | string;
  fontStretch?: IBreakingStyle | string;
  fontStyle?: IBreakingStyle | string;
  fontSynthesis?: IBreakingStyle | string;
  fontVariant?: IBreakingStyle | string;
  fontVariantCaps?: IBreakingStyle | string;
  fontVariantEastAsian?: IBreakingStyle | string;
  fontVariantLigatures?: IBreakingStyle | string;
  fontVariantNumeric?: IBreakingStyle | string;
  fontVariantPosition?: IBreakingStyle | string;
  fontWeight?: IBreakingStyle | string;
  gap?: IBreakingStyle | string;
  glyphOrientationVertical?: IBreakingStyle | string;
  grid?: IBreakingStyle | string;
  gridArea?: IBreakingStyle | string;
  gridAutoColumns?: IBreakingStyle | string;
  gridAutoFlow?: IBreakingStyle | string;
  gridAutoRows?: IBreakingStyle | string;
  gridColumn?: IBreakingStyle | string;
  gridColumnEnd?: IBreakingStyle | string;
  gridColumnGap?: IBreakingStyle | string;
  gridColumnStart?: IBreakingStyle | string;
  gridGap?: IBreakingStyle | string;
  gridRow?: IBreakingStyle | string;
  gridRowEnd?: IBreakingStyle | string;
  gridRowGap?: IBreakingStyle | string;
  gridRowStart?: IBreakingStyle | string;
  gridTemplate?: IBreakingStyle | string;
  gridTemplateAreas?: IBreakingStyle | string;
  gridTemplateColumns?: IBreakingStyle | string;
  gridTemplateRows?: IBreakingStyle | string;
  height?: IBreakingStyle | string;
  hyphens?: IBreakingStyle | string;
  imageOrientation?: IBreakingStyle | string;
  imageRendering?: IBreakingStyle | string;
  inlineSize?: IBreakingStyle | string;
  justifyContent?: IBreakingStyle | string;
  justifyItems?: IBreakingStyle | string;
  justifySelf?: IBreakingStyle | string;
  left?: IBreakingStyle | string;
  letterSpacing?: IBreakingStyle | string;
  lightingColor?: IBreakingStyle | string;
  lineBreak?: IBreakingStyle | string;
  lineHeight?: IBreakingStyle | string;
  listStyle?: IBreakingStyle | string;
  listStyleImage?: IBreakingStyle | string;
  listStylePosition?: IBreakingStyle | string;
  listStyleType?: IBreakingStyle | string;
  margin?: IBreakingStyle | string;
  marginBlockEnd?: IBreakingStyle | string;
  marginBlockStart?: IBreakingStyle | string;
  marginBottom?: IBreakingStyle | string;
  marginInlineEnd?: IBreakingStyle | string;
  marginInlineStart?: IBreakingStyle | string;
  marginLeft?: IBreakingStyle | string;
  marginRight?: IBreakingStyle | string;
  marginTop?: IBreakingStyle | string;
  marker?: IBreakingStyle | string;
  markerEnd?: IBreakingStyle | string;
  markerMid?: IBreakingStyle | string;
  markerStart?: IBreakingStyle | string;
  mask?: IBreakingStyle | string;
  maskComposite?: IBreakingStyle | string;
  maskImage?: IBreakingStyle | string;
  maskPosition?: IBreakingStyle | string;
  maskRepeat?: IBreakingStyle | string;
  maskSize?: IBreakingStyle | string;
  maskType?: IBreakingStyle | string;
  maxBlockSize?: IBreakingStyle | string;
  maxHeight?: IBreakingStyle | string;
  maxInlineSize?: IBreakingStyle | string;
  maxWidth?: IBreakingStyle | string;
  minBlockSize?: IBreakingStyle | string;
  minHeight?: IBreakingStyle | string;
  minInlineSize?: IBreakingStyle | string;
  minWidth?: IBreakingStyle | string;
  objectFit?: IBreakingStyle | string;
  objectPosition?: IBreakingStyle | string;
  opacity?: IBreakingStyle | string;
  order?: IBreakingStyle | string;
  orphans?: IBreakingStyle | string;
  outline?: IBreakingStyle | string;
  outlineColor?: IBreakingStyle | string;
  outlineOffset?: IBreakingStyle | string;
  outlineStyle?: IBreakingStyle | string;
  outlineWidth?: IBreakingStyle | string;
  overflow?: IBreakingStyle | string;
  overflowAnchor?: IBreakingStyle | string;
  overflowWrap?: IBreakingStyle | string;
  overflowX?: IBreakingStyle | string;
  overflowY?: IBreakingStyle | string;
  overscrollBehavior?: IBreakingStyle | string;
  overscrollBehaviorBlock?: IBreakingStyle | string;
  overscrollBehaviorInline?: IBreakingStyle | string;
  overscrollBehaviorX?: IBreakingStyle | string;
  overscrollBehaviorY?: IBreakingStyle | string;
  padding?: IBreakingStyle | string;
  paddingBlockEnd?: IBreakingStyle | string;
  paddingBlockStart?: IBreakingStyle | string;
  paddingBottom?: IBreakingStyle | string;
  paddingInlineEnd?: IBreakingStyle | string;
  paddingInlineStart?: IBreakingStyle | string;
  paddingLeft?: IBreakingStyle | string;
  paddingRight?: IBreakingStyle | string;
  paddingTop?: IBreakingStyle | string;
  pageBreakAfter?: IBreakingStyle | string;
  pageBreakBefore?: IBreakingStyle | string;
  pageBreakInside?: IBreakingStyle | string;
  paintOrder?: IBreakingStyle | string;
  perspective?: IBreakingStyle | string;
  perspectiveOrigin?: IBreakingStyle | string;
  placeContent?: IBreakingStyle | string;
  placeItems?: IBreakingStyle | string;
  placeSelf?: IBreakingStyle | string;
  pointerEvents?: IBreakingStyle | string;
  position?: IBreakingStyle | string;
  quotes?: IBreakingStyle | string;
  resize?: IBreakingStyle | string;
  right?: IBreakingStyle | string;
  rotate?: IBreakingStyle | string;
  rowGap?: IBreakingStyle | string;
  rubyAlign?: IBreakingStyle | string;
  rubyPosition?: IBreakingStyle | string;
  scale?: IBreakingStyle | string;
  scrollBehavior?: IBreakingStyle | string;
  shapeRendering?: IBreakingStyle | string;
  stopColor?: IBreakingStyle | string;
  stopOpacity?: IBreakingStyle | string;
  stroke?: IBreakingStyle | string;
  strokeDasharray?: IBreakingStyle | string;
  strokeDashoffset?: IBreakingStyle | string;
  strokeLinecap?: IBreakingStyle | string;
  strokeLinejoin?: IBreakingStyle | string;
  strokeMiterlimit?: IBreakingStyle | string;
  strokeOpacity?: IBreakingStyle | string;
  strokeWidth?: IBreakingStyle | string;
  tabSize?: IBreakingStyle | string;
  tableLayout?: IBreakingStyle | string;
  textAlign?: IBreakingStyle | string;
  textAlignLast?: IBreakingStyle | string;
  textAnchor?: IBreakingStyle | string;
  textCombineUpright?: IBreakingStyle | string;
  textDecoration?: IBreakingStyle | string;
  textDecorationColor?: IBreakingStyle | string;
  textDecorationLine?: IBreakingStyle | string;
  textDecorationStyle?: IBreakingStyle | string;
  textEmphasis?: IBreakingStyle | string;
  textEmphasisColor?: IBreakingStyle | string;
  textEmphasisPosition?: IBreakingStyle | string;
  textEmphasisStyle?: IBreakingStyle | string;
  textIndent?: IBreakingStyle | string;
  textJustify?: IBreakingStyle | string;
  textOrientation?: IBreakingStyle | string;
  textOverflow?: IBreakingStyle | string;
  textRendering?: IBreakingStyle | string;
  textShadow?: IBreakingStyle | string;
  textTransform?: IBreakingStyle | string;
  textUnderlinePosition?: IBreakingStyle | string;
  top?: IBreakingStyle | string;
  touchAction?: IBreakingStyle | string;
  transform?: IBreakingStyle | string;
  transformBox?: IBreakingStyle | string;
  transformOrigin?: IBreakingStyle | string;
  transformStyle?: IBreakingStyle | string;
  transition?: IBreakingStyle | string;
  transitionDelay?: IBreakingStyle | string;
  transitionDuration?: IBreakingStyle | string;
  transitionProperty?: IBreakingStyle | string;
  transitionTimingFunction?: IBreakingStyle | string;
  translate?: IBreakingStyle | string;
  unicodeBidi?: IBreakingStyle | string;
  userSelect?: IBreakingStyle | string;
  verticalAlign?: IBreakingStyle | string;
  visibility?: IBreakingStyle | string;
  webkitUserSelect?: IBreakingStyle | string;
  whiteSpace?: IBreakingStyle | string;
  widows?: IBreakingStyle | string;
  width?: IBreakingStyle | string;
  willChange?: IBreakingStyle | string;
  wordBreak?: IBreakingStyle | string;
  wordSpacing?: IBreakingStyle | string;
  wordWrap?: IBreakingStyle | string;
  writingMode?: IBreakingStyle | string;
  zIndex?: IBreakingStyle | string;
}
