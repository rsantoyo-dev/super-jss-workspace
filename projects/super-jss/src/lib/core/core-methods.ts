import {
    ResponsiveStyle,
    SjBreakPoints,
    SjStyle,
    SjTheme,
    SjShorthandStyle, SjShorthandCustomStyle,
} from "../models/interfaces";

/**
 * Determines the current breakpoint based on the screen width and defined breakpoints.
 * @param {SjBreakPoints} breakpoints - The defined breakpoints in the theme.
 * @param {number} screenWidth - The current width of the screen.
 * @returns {string} - The current breakpoint key.
 */

export const getCurrentBreakpoint = (breakpoints:SjBreakPoints,screenWidth: number): string => {
    let bp = 'xs'
    for (const key of Object.keys(breakpoints)) {
        const breakpoint = key as keyof SjBreakPoints;
        bp = breakpoints[breakpoint] <= screenWidth ? breakpoint : bp;
    }
    return bp;
}

/**
 * Resolves the appropriate style for a given screen width from a set of responsive styles.
 * @param {ResponsiveStyle} responsiveStyle - The responsive styles to choose from.
 * @param {SjTheme} sjTheme - The current theme context.
 * @param {number} screenWidth - The current width of the screen.
 * @returns {string | undefined} - The resolved style value.
 */
const getStyleByScreenWidth = (responsiveStyle: ResponsiveStyle, sjTheme:SjTheme, screenWidth: number): string | undefined => {
    let styleInBreakpoint: string | number | undefined;
    let rStyle: ResponsiveStyle = responsiveStyle;
    rStyle['xs'] = rStyle['xs'] === undefined ? 'initial' : rStyle['xs'];
    rStyle = reOrderResponsiveStyle(rStyle);
    Object.keys(rStyle).forEach(key => {
        styleInBreakpoint = (sjTheme.breakpoints[key as keyof SjBreakPoints] <= screenWidth) ?
          rStyle[key as keyof ResponsiveStyle] :
          styleInBreakpoint;
    });
    if(typeof styleInBreakpoint === 'number'){
        styleInBreakpoint = sjTheme.spacing(styleInBreakpoint);
    }
    return styleInBreakpoint;
}

/**
 * Reorders responsive style to ensure 'xs' is always first for priority.
 * @param {ResponsiveStyle} responsiveStyle - The original responsive style object.
 * @returns {ResponsiveStyle} - The reordered responsive style object.
 */
const reOrderResponsiveStyle = (responsiveStyle: ResponsiveStyle): ResponsiveStyle => {
    let reorderedValue: ResponsiveStyle = { xs: responsiveStyle['xs'] };
    Object.keys(responsiveStyle).forEach(key => {
        if (key !== 'xs') {
            reorderedValue[key  as keyof ResponsiveStyle] = responsiveStyle[key as keyof ResponsiveStyle];
        }
    });
    return reorderedValue;
};

// Mapping of shorthand style keys to their corresponding CSS properties.
const shorthandMappings: { [key: string]: keyof CSSStyleDeclaration } = {
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

/**
 * Determines if the given key is a custom shorthand key.
 * @param {string} key - The key to check.
 * @returns {boolean} - True if the key is a custom shorthand key, false otherwise.
 */
const isCustomShorthandKey = (key: string): key is keyof SjShorthandCustomStyle => {
    return key === 'px' || key === 'py' || key === 'mx' || key === 'my' || key === 'bx' || key === 'by';
}

/**
 * Gets the CSS properties that correspond to the given custom shorthand key.
 * @param {keyof SjShorthandCustomStyle} key - The custom shorthand key.
 * @returns {Array<keyof CSSStyleDeclaration>} - The CSS properties that correspond to the given custom shorthand key.
 */

function getCssPropertiesForCustomShorthand(key: keyof SjShorthandCustomStyle): Array<keyof CSSStyleDeclaration> {
    switch (key) {
        case 'px':
            return ['paddingLeft', 'paddingRight'];
        case 'py':
            return ['paddingTop', 'paddingBottom'];
        case 'mx':
            return ['marginLeft', 'marginRight'];
        case 'my':
            return ['marginTop', 'marginBottom'];
        case 'bx':
            return ['borderLeft', 'borderRight'];
        case 'by':
            return ['borderTop', 'borderBottom'];
      // Add more cases as needed for new custom shorthand keys
        default:
            return [];
    }
}

/**
 * Applies a custom shorthand style to the given element.
 * @param element
 * @param key
 * @param sjStyle
 * @param screenWidth
 * @param theme
 */

function applySjCustomShorthand(element: HTMLElement, key: keyof SjShorthandCustomStyle, sjStyle: SjStyle, screenWidth: number, theme: SjTheme): void {
    //let cssProperties: Array<keyof CSSStyleDeclaration>;
    let cssProperties = getCssPropertiesForCustomShorthand(key);
    let cssKey = key as keyof SjShorthandCustomStyle;
    let value = sjStyle[cssKey];
    cssProperties.forEach(cssProperty => {
        const cssDeclaration: Partial<CSSStyleDeclaration> = {
            [cssProperty]: typeof value === 'string' ? value
              : typeof value === 'number' ? theme.spacing(value)
                : getStyleByScreenWidth(value as ResponsiveStyle, theme, screenWidth)
        };
        applyCssStyle(element, cssDeclaration, theme);
    });

}

/**
 * applies a Sjstyle to the given element.
 * @param element
 * @param key
 * @param sjStyle
 * @param screenWidth
 * @param theme
 */
function applySjStyle(element: HTMLElement, key: keyof SjStyle, sjStyle: SjStyle, screenWidth: number, theme: SjTheme): void {
    let cssKey = key as keyof CSSStyleDeclaration | keyof SjShorthandStyle;
    let value = sjStyle[cssKey];
    cssKey = shorthandMappings[cssKey] || cssKey;
    const cssDeclaration: Partial<CSSStyleDeclaration>= {[cssKey]:
          typeof value === 'string' ? value :
            typeof value === 'number' ? theme.spacing(value) :
              getStyleByScreenWidth(value as ResponsiveStyle, theme, screenWidth)
    }
    applyCssStyle(element, cssDeclaration, theme);
}

export const applyResponsiveStyle = (element: HTMLElement, sjStyle: SjStyle, screenWidth: number, theme:SjTheme): void => {
    if (typeof sjStyle === 'object' && sjStyle !== null) {
        Object.keys(sjStyle).forEach(key => {
            isCustomShorthandKey(key) ?
              applySjCustomShorthand(element, key, sjStyle, screenWidth, theme) :
              applySjStyle(element, key as keyof CSSStyleDeclaration | keyof SjShorthandStyle, sjStyle, screenWidth, theme)
        });
    }
};

/**
 * this is the last step in the process of applying styles to the element.
 * Applies a css style to the given html element.
 * @param element
 * @param styleValue
 * @param theme
 */
const applyCssStyle = (element: HTMLElement, styleValue: Partial<CSSStyleDeclaration>, theme:SjTheme): void => {
    Object.keys(styleValue).forEach(key => {
        const cssKey = key as keyof CSSStyleDeclaration;
        // Skip read-only properties
        if (cssKey === 'length' || cssKey === 'parentRule') {
            return;
        }
        // Apply each style property to the element, using type assertion
        let value = styleValue[cssKey];
        if (value !== undefined) {
            value = resolveThemeColor(value as string, theme);
            (element.style as any)[cssKey] = value;
        }
    });
};

/**
 * Resolves a theme color value to a specific color.
 * @param value
 * @param theme
 */
const resolveThemeColor = (value: string, theme: SjTheme): string => {
    const themeKeyParts = value.split('.');
    if (themeKeyParts.length === 1 && value in theme.palette || value in theme.colors) {
        // If only 'primary', 'secondary', etc., use the '.main' shade by default
       // return theme.palette[value as keyof typeof theme.palette].main;
        if (value in theme.colors) {
            const colorObject = theme.colors[value as keyof typeof theme.colors];
            return typeof colorObject === 'object' ? colorObject['500'] : colorObject;
        }

        // If only 'primary', 'secondary', etc., use the '.main' shade by default
        if (value in theme.palette) {
            return theme.palette[value as keyof typeof theme.palette].main;
        }
    } else if (themeKeyParts.length === 2) {
        // For specific shades like 'primary.light'
        const colorCategory = themeKeyParts[0];
        const colorShade = themeKeyParts[1];

        if (colorCategory in theme.colors) {
            const colorObject = theme.colors[colorCategory as keyof typeof theme.colors];
            return typeof colorObject === 'object' ? colorObject[colorShade as keyof typeof colorObject] : colorObject;
        }

        if (colorCategory in theme.palette) {
            const colorObject = theme.palette[colorCategory as keyof typeof theme.palette];
            return colorObject[colorShade as keyof typeof colorObject] || value;
        }
    }

    // Return the original value if it doesn't match the theme structure
    return value;
}

/**
 *  applies typography styles to the given html element.
 * @param el
 * @param theme
 * @param screenWidth
 */
export const applyTypography = (el: HTMLElement, theme: SjTheme, screenWidth: number) => {
    // Loop through each typography style in the theme
  console.log('el.nodeName', el.nodeName, theme.typography[el.nodeName as keyof typeof theme.typography])
    if(theme.typography[el.nodeName as keyof typeof theme.typography]){

        Object.keys(theme.typography).forEach(key => {
            // Set the default style to the default typography style
            const jss: SjStyle = { marginBlockStart: '0', marginBlockEnd: '0', ...theme.typography.default };
            // Get the specific style for the current element if it exists
            const specificStyle: SjStyle | undefined = theme.typography[key as keyof typeof theme.typography];
            // If the current element matches the current typography style, apply the style to the element

            if (el.nodeName === key && specificStyle) {

                applyResponsiveStyle(el, { ...jss, ...specificStyle }, screenWidth, theme);
            }
        });
    }
};
