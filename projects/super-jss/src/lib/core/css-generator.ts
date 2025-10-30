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
      let value = styles[key as keyof SjStyle];

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
          let axisValue: any = value;
          // If user passed an explicit density token marker via sj.padding.options.*, map to responsive
          const densityAxis = this.getDensityLevel(value);
          if ((key === 'px' || key === 'py') && densityAxis) {
            const dens = this.densityToResponsive(
              key === 'px' ? 'padding-x' : 'padding-y',
              densityAxis
            );
            if (dens) axisValue = dens as any;
          }
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

          if (typeof axisValue === 'object' && axisValue !== null) {
            // Responsive object: fill-forward values so missing breakpoints inherit
            // the last defined value. Emit base rule for xs (top-level) and media for others.
            const orderedBps = Object.keys(
              this.theme.breakpoints
            ) as (keyof SjBreakPoints)[];
            let lastVal: string | number | undefined = undefined;
            for (const bp of orderedBps) {
              if (Object.prototype.hasOwnProperty.call(axisValue as any, bp)) {
                lastVal = (axisValue as any)[bp] as string | number | undefined;
              }
              if (lastVal === undefined) continue;

              for (const part of parts) {
                if (bp === 'xs' && this.theme.breakpoints.xs === 0) {
                  const className = generateAtomicClassName(
                    variantPrefix,
                    part.derivedKey,
                    undefined,
                    lastVal
                  );
                  const resolved = this.resolveStyleValue(
                    part.derivedKey,
                    lastVal
                  );
                  const cssRule = `.${className}${pseudoClass} { ${this.kebabCase(
                    part.cssProp
                  )}: ${resolved}; }`;
                  cssMap.set(className, cssRule);
                } else {
                  const className = generateAtomicClassName(
                    variantPrefix,
                    part.derivedKey,
                    bp,
                    lastVal
                  );
                  const resolved = this.resolveStyleValue(
                    part.derivedKey,
                    lastVal
                  );
                  const mediaQuery = `@media (min-width: ${
                    this.theme.breakpoints[bp]
                  }px) {\n  .${className}${pseudoClass} { ${this.kebabCase(
                    part.cssProp
                  )}: ${resolved}; }\n}`;
                  cssMap.set(className, mediaQuery);
                }
              }
            }
          } else {
            // Single value: emit two atomic rules (left/right or top/bottom)
            for (const part of parts) {
              const className = generateAtomicClassName(
                variantPrefix,
                part.derivedKey,
                undefined,
                axisValue
              );
              const resolved = this.resolveStyleValue(
                part.derivedKey,
                axisValue as any
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

        // Density tokens via explicit sj.*.options.* marker (padding/gap)
        const densityLevel = this.getDensityLevel(value);
        if (
          densityLevel &&
          (String(cssProperty).startsWith('padding') || String(cssProperty) === 'gap')
        ) {
          const dens = this.densityToResponsive(String(cssProperty), densityLevel);
          if (dens) value = dens as any;
        }

        if (typeof value === 'object' && value !== null) {
          // Handle responsive styles with fill-forward semantics:
          // generate a rule for each breakpoint from the last defined value.
          const orderedBps = Object.keys(
            this.theme.breakpoints
          ) as (keyof SjBreakPoints)[];
          let lastVal: string | number | undefined = undefined;
          for (const bp of orderedBps) {
            if (Object.prototype.hasOwnProperty.call(value as any, bp)) {
              lastVal = (value as any)[bp] as string | number | undefined;
            }
            if (lastVal === undefined) continue;

            const responsiveValue = this.resolveStyleValue(key, lastVal);
            if (bp === 'xs' && this.theme.breakpoints.xs === 0) {
              // Top-level rule for xs
              const className = generateAtomicClassName(
                variantPrefix,
                key,
                undefined,
                lastVal
              );
              const cssRule = `.${className}${pseudoClass} { ${this.kebabCase(
                cssProperty as string
              )}: ${responsiveValue}; }`;
              cssMap.set(className, cssRule);
            } else {
              // Media rule for this breakpoint (including inherited values)
              const className = generateAtomicClassName(
                variantPrefix,
                key,
                bp,
                lastVal
              );
              const mediaQuery = `@media (min-width: ${
                this.theme.breakpoints[bp]
              }px) {\n  .${className}${pseudoClass} { ${this.kebabCase(
                cssProperty as string
              )}: ${responsiveValue}; }\n}`;
              cssMap.set(className, mediaQuery);
            }
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
   * Maps a density level (1..4) to a ResponsiveStyle using the theme's
   * surfaces maps for spacing-related properties.
   */
  private densityToResponsive(prop: string, level: number): ResponsiveStyle | null {
    const srf = (this.theme.components as any)?.surfaces ?? {};
    const pad = (srf.padding || {})[level];
    const getRS = (v: any): ResponsiveStyle | null => {
      if (!v) return null;
      if (typeof v === 'number') return { xs: v } as any;
      if (typeof v === 'object') return v as ResponsiveStyle;
      return null;
    };
    if (prop.startsWith('padding')) {
      if (!pad) return null;
      // Support: ResponsiveStyle/number OR side maps with all/x/y/top/right/bottom/left
      if (typeof pad === 'number' || (typeof pad === 'object' && (pad.xs || pad.sm || pad.md || pad.lg || pad.xl || pad.xxl))) {
        return getRS(pad);
      }
      const sideMap = pad as any;
      // Determine which side/axis
      if (prop === 'padding-x' || prop === 'px') return getRS(sideMap.x) || getRS(sideMap.all);
      if (prop === 'padding-y' || prop === 'py') return getRS(sideMap.y) || getRS(sideMap.all);
      if (prop === 'paddingTop') return getRS(sideMap.top) || getRS(sideMap.y) || getRS(sideMap.all);
      if (prop === 'paddingBottom') return getRS(sideMap.bottom) || getRS(sideMap.y) || getRS(sideMap.all);
      if (prop === 'paddingLeft') return getRS(sideMap.left) || getRS(sideMap.x) || getRS(sideMap.all);
      if (prop === 'paddingRight') return getRS(sideMap.right) || getRS(sideMap.x) || getRS(sideMap.all);
      // generic padding: prefer all, else y as a reasonable fallback
      return getRS(sideMap.all) || getRS(sideMap.y) || null;
    }
    if (prop === 'gap') {
      const gp = (srf.gap || {})[level];
      return getRS(gp);
    }
    return null;
  }

  /** Extracts density level from an explicit sj token object. */
  private getDensityLevel(v: any): number | null {
    try {
      if (v && typeof v === 'object' && (v as any).__sjDensity != null) {
        const n = Number((v as any).__sjDensity);
        if (Number.isFinite(n) && n >= 1 && n <= 12) return n;
      }
    } catch {}
    return null;
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
      // Font weight: keep numeric as-is (not spacing, not rem)
      if (key === 'fontWeight' || key === 'fw') {
        return String(value);
      }
      // Keep line-height unitless when numeric (CSS best practice and matches tests)
      if (key === 'lineHeight' || key === 'lh') {
        return String(value);
      }
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
