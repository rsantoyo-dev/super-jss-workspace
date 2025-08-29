// Mapping of shorthand style keys to their corresponding CSS properties.
export const shorthandMappings: { [key: string]: keyof CSSStyleDeclaration } = {
    // Padding and Margin
    p: 'padding',
    pt: 'paddingTop',
    pr: 'paddingRight',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    m: 'margin',
    mt: 'marginTop',
    mr: 'marginRight',
    mb: 'marginBottom',
    ml: 'marginLeft',

    // Sizes
    w: 'width',
    h: 'height',
    minW: 'minWidth',
    minH: 'minHeight',
    maxW: 'maxWidth',
    maxH: 'maxHeight',

    // Borders
    b: 'border',
    bt: 'borderTop',
    br: 'borderRight',
    bb: 'borderBottom',
    bl: 'borderLeft',
    bs: 'borderStyle',
    bw: 'borderWidth',
    bc: 'borderColor',
    brad: 'borderRadius',

    // Colors
    bg: 'backgroundColor',
    c: 'color',

    // Flexbox
    d: 'display',
    fxDir: 'flexDirection',
    fxWrap: 'flexWrap',
    fxFlow: 'flexFlow',
    fxJustify: 'justifyContent',
    fxAItems: 'alignItems',
    fxAContent: 'alignContent',
    fxOrder: 'order',
    fxGrow: 'flexGrow',
    fxShrink: 'flexShrink',
    fxBasis: 'flexBasis',
    fxASelf: 'alignSelf',
};