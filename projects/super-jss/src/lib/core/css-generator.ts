import {
  SjBreakPoints,
  SjStyle,
  SjTheme,
  ResponsiveStyle,
} from '../models/interfaces';
import { shorthandMappings } from '../models/mappings';
/**
 * Internal: resolve theme color tokens (e.g., palette or colors) to CSS values.
 * Falls back to the raw value when not resolvable.
 */
const resolveThemeColor = (value: string, theme: SjTheme): string => {
  const themeKeyParts = value.split('.');
  if (
    (themeKeyParts.length === 1 && value in theme.palette) ||
    value in theme.colors
  ) {
    if (value in theme.colors) {
      const colorObject = theme.colors[value as keyof typeof theme.colors];
      return typeof colorObject === 'object' ? colorObject['500'] : colorObject;
    }

    if (value in theme.palette) {
      return theme.palette[value as keyof typeof theme.palette].main;
    }
  } else if (themeKeyParts.length === 2) {
    const colorCategory = themeKeyParts[0];
    const colorShade = themeKeyParts[1];

    if (colorCategory in theme.colors) {
      const colorObject =
        theme.colors[colorCategory as keyof typeof theme.colors];
      return typeof colorObject === 'object'
        ? colorObject[colorShade as keyof typeof colorObject]
        : colorObject;
    }

    if (colorCategory in theme.palette) {
      const colorObject =
        theme.palette[colorCategory as keyof typeof theme.palette];
      return colorObject[colorShade as keyof typeof colorObject] || value;
    }
  }

  return value;
};

/**
 * Generates deterministic atomic CSS classes from a SjStyle object.
 * Produces min-width media queries for responsive entries and supports '&' pseudos.
 */
export class CssGenerator {
  constructor(private theme: SjTheme) {}

  /**
   * Generates a map of className -> CSS rule from the provided styles.
   * @param styles Root style object.
   * @returns Map of atomic class rules keyed by class name.
   */
  public generateAtomicCss(styles: SjStyle): Map<string, string> {
    const cssMap = new Map<string, string>();
    this._generate(styles, cssMap);
    return cssMap;
  }

  /**
   * Recursive generator that walks the style tree and builds class rules.
   * @param styles Current style node.
   * @param cssMap Accumulator map of className -> rule.
   * @param pseudoClass Pseudo selector (e.g., ':hover'), including leading colon.
   * @param variantPrefix Prefix added to class names for pseudo variants.
   */
  private _generate(
    styles: SjStyle,
    cssMap: Map<string, string>,
    pseudoClass = '',
    variantPrefix = ''
  ): void {
    for (const key in styles) {
      const value = styles[key as keyof SjStyle];

      if (key.startsWith('&')) {
        const newPseudoClass = key.substring(1);
        const newVariantPrefix = newPseudoClass.replace(/[^a-zA-Z0-9-]/g, '') + '-';
        this._generate(
          value as SjStyle,
          cssMap,
          newPseudoClass,
          newVariantPrefix
        );
      } else {
        const cssProperty = shorthandMappings[key] || key;

        if (typeof value === 'object' && value !== null) {
          // Handle responsive styles: honor theme breakpoint order (xs -> xxl)
          const orderedBps = Object.keys(this.theme.breakpoints) as (keyof SjBreakPoints)[];
          for (const bp of orderedBps) {
            if (!Object.prototype.hasOwnProperty.call(value as any, bp)) continue;
            const className = `${variantPrefix}sj-${this.kebabCase(key)}-${bp}-${this.sanitizeValue((value as any)[bp])}`;
            const bpValue = (value as any)[bp] as string | number | undefined;
            let responsiveValue: string;
            if (
              typeof bpValue === 'string' ||
              typeof bpValue === 'number' ||
              bpValue === undefined
            ) {
              responsiveValue = this.resolveStyleValue(key, bpValue);
            } else {
              // If bpValue is an object (SjStyle or ResponsiveStyle), skip or handle accordingly
              responsiveValue = 'initial';
            }
            const mediaQuery = `@media (min-width: ${this.theme.breakpoints[bp]}px) {\n  .${className}${pseudoClass} { ${this.kebabCase(cssProperty as string)}: ${responsiveValue}; }\n}`;
            cssMap.set(className, mediaQuery);
          }
        } else {
          // Handle non-responsive styles
          const className = `${variantPrefix}sj-${this.kebabCase(
            key
          )}-${this.sanitizeValue(value)}`;
          const resolvedValue = this.resolveStyleValue(key, value);
          const cssRule = `.${className}${pseudoClass} { ${this.kebabCase(
            cssProperty as string
          )}: ${resolvedValue}; }`;
          cssMap.set(className, cssRule);
        }
      }
    }
  }

  /**
   * Normalizes a style value using theme spacing and color resolution.
   * @param key Original style key.
   * @param value Raw style value.
   * @returns CSS-ready string value.
   */
  private resolveStyleValue(
    key: string,
    value: string | number | undefined
  ): string {
    if (value === undefined) {
      return 'initial';
    }
    if (typeof value === 'number') {
      return this.theme.spacing(value);
    }
    return resolveThemeColor(value, this.theme);
  }

  /** Converts camelCase property names to kebab-case. */
  private kebabCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  }

  /** Makes a value safe for use in class names. */
  private sanitizeValue(value: any): string {
    return String(value)
      .replace(/\./g, '_')
      .replace(/[^a-zA-Z0-9_-]/g, '-');
  }
}
