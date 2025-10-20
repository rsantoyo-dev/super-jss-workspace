import {
  SjBreakPoints,
  SjStyle,
  SjResolvedTheme,
  ResponsiveStyle,
} from '../models/interfaces';
import { shorthandMappings } from '../models/mappings';
import { generateAtomicClassName } from './class-name';
import { resolveThemeColor } from '../core/core-methods';
// Use core resolver to avoid code duplication and reduce bundle size

/**
 * Generates deterministic atomic CSS classes from a SjStyle object.
 * Produces min-width media queries for responsive entries and supports '&' pseudos.
 */
export class CssGenerator {
  constructor(private theme: SjResolvedTheme) {}

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
        const newVariantPrefix =
          newPseudoClass.replace(/[^a-zA-Z0-9-]/g, '') + '-';
        this._generate(
          value as SjStyle,
          cssMap,
          newPseudoClass,
          newVariantPrefix
        );
      } else {
        // Handle directional shorthands (px/py/mx/my) before generic mapping
        if (key === 'px' || key === 'py' || key === 'mx' || key === 'my') {
          const parts =
            key === 'px'
              ? [
                  { cssProp: 'paddingLeft', derivedKey: 'pl' },
                  { cssProp: 'paddingRight', derivedKey: 'pr' },
                ]
              : key === 'py'
              ? [
                  { cssProp: 'paddingTop', derivedKey: 'pt' },
                  { cssProp: 'paddingBottom', derivedKey: 'pb' },
                ]
              : key === 'mx'
              ? [
                  { cssProp: 'marginLeft', derivedKey: 'ml' },
                  { cssProp: 'marginRight', derivedKey: 'mr' },
                ]
              : [
                  { cssProp: 'marginTop', derivedKey: 'mt' },
                  { cssProp: 'marginBottom', derivedKey: 'mb' },
                ];

          if (typeof value === 'object' && value !== null) {
            // Responsive object: emit media rules per breakpoint per side
            const orderedBps = Object.keys(
              this.theme.breakpoints
            ) as (keyof SjBreakPoints)[];
            for (const bp of orderedBps) {
              if (!Object.prototype.hasOwnProperty.call(value as any, bp)) {
                continue;
              }
              const bpValue = (value as any)[bp] as string | number | undefined;
              for (const part of parts) {
                const className = generateAtomicClassName(
                  variantPrefix,
                  part.derivedKey,
                  bp,
                  bpValue
                );
                const resolved = this.resolveStyleValue(
                  part.derivedKey,
                  bpValue
                );
                const mediaQuery = `@media (min-width: ${
                  this.theme.breakpoints[bp]
                }px) {\n  .${className}${pseudoClass} { ${this.kebabCase(
                  part.cssProp
                )}: ${resolved}; }\n}`;
                cssMap.set(className, mediaQuery);
              }
            }
          } else {
            // Single value: emit two atomic rules (left/right or top/bottom)
            for (const part of parts) {
              const className = generateAtomicClassName(
                variantPrefix,
                part.derivedKey,
                undefined,
                value
              );
              const resolved = this.resolveStyleValue(
                part.derivedKey,
                value as any
              );
              const cssRule = `.${className}${pseudoClass} { ${this.kebabCase(
                part.cssProp
              )}: ${resolved}; }`;
              cssMap.set(className, cssRule);
            }
          }
          continue; // skip standard handling for these shorthands
        }
        const cssProperty = shorthandMappings[key] || key;

        if (typeof value === 'object' && value !== null) {
          // Handle responsive styles: honor theme breakpoint order (xs -> xxl)
          const orderedBps = Object.keys(
            this.theme.breakpoints
          ) as (keyof SjBreakPoints)[];
          for (const bp of orderedBps) {
            if (!Object.prototype.hasOwnProperty.call(value as any, bp))
              continue;
            const className = generateAtomicClassName(
              variantPrefix,
              key,
              bp,
              (value as any)[bp]
            );
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
            const mediaQuery = `@media (min-width: ${
              this.theme.breakpoints[bp]
            }px) {\n  .${className}${pseudoClass} { ${this.kebabCase(
              cssProperty as string
            )}: ${responsiveValue}; }\n}`;
            cssMap.set(className, mediaQuery);
          }
        } else {
          // Handle non-responsive styles
          const className = generateAtomicClassName(
            variantPrefix,
            key,
            undefined,
            value
          );
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

    // Typography properties should handle numbers differently than spacing properties
    const typographyProps = new Set([
      'fontSize',
      'lineHeight',
      'letterSpacing',
      'wordSpacing',
      'fs',
      'lh',
      'ls',
      'ws',
      'fSize',
      'fVariant',
    ]);

    if (typeof value === 'number') {
      if (typographyProps.has(key)) {
        // For typography, convert numbers to rem units (1 = 1rem)
        return `${value}rem`;
      } else {
        // For spacing properties, use theme spacing function
        return this.theme.spacing(value);
      }
    }

    let v = resolveThemeColor(value, this.theme);
    if (key === 'fontFamily' && typeof v === 'string') {
      // If it's a list, assume user provided correct quoting per family (don't wrap)
      if (!v.includes(',')) {
        const trimmed = v.trim();
        const isQuoted = /^['"].*['"]$/.test(trimmed);
        const hasSpace = /\s/.test(trimmed);
        if (hasSpace && !isQuoted) {
          v = `"${trimmed}"`;
        }
      }
      // Preserve monospace/explicit overrides as raw values
      if (/\bmonospace\b/i.test(v)) {
        return v;
      }
      // Emit explicit override as-is (no CSS var indirection here)
      return v;
    }
    return v;
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
