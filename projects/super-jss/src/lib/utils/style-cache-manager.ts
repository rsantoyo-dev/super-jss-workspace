import { SjStyle } from '../models/interfaces';
import { deepMerge } from './deep-merge';

type SjStyleProducer = () => SjStyle;

/**
 * Utility class for managing style caching and merging in SJSS directives.
 * Handles caching of resolved styles, generated classes, and provides stable hashing.
 */
export class StyleCacheManager {
  // Cache mapping hashed processed styles + themeVersion -> generated class list
  private styleCache = new Map<string, string[]>();
  // Cache resolved merged styles keyed by the original sj input reference
  private mergeCache: WeakMap<object | Function, SjStyle> = new WeakMap();
  // Memoize the last raw sj input reference and its resolved merged styles
  private _lastSjInputRef: any = undefined;
  private _lastResolvedStyles: SjStyle | undefined = undefined;

  /**
   * Simple stable hash for style objects. Sorts keys for consistency.
   * @param obj The object to hash.
   * @returns A string hash.
   */
  hashObject(obj: any): string {
    if (obj === null || obj === undefined) return 'null';
    if (typeof obj !== 'object') return String(obj);
    if (Array.isArray(obj))
      return '[' + obj.map(this.hashObject.bind(this)).join(',') + ']';
    const keys = Object.keys(obj).sort();
    const pairs = keys.map((key) => `${key}:${this.hashObject(obj[key])}`);
    return '{' + pairs.join(',') + '}';
  }

  /**
   * Resolves and merges the SJ input into a single SjStyle object with caching.
   * @param input The SJ input to resolve.
   * @returns The merged SjStyle object.
   */
  resolveAndMergeOnce(input: any): SjStyle {
    // Use a cheap reference-based memo to avoid repeated deepMerge work when
    // the input hasn't changed (most callers pass precomputed style refs).
    const callIfFn = (v: any) =>
      typeof v === 'function' ? (v as SjStyleProducer)() : v;

    // Fast path: exact same input reference
    if (input === this._lastSjInputRef && this._lastResolvedStyles) {
      return this._lastResolvedStyles;
    }

    // If input is an object/function, try WeakMap cache
    const canWeakKey =
      input && (typeof input === 'object' || typeof input === 'function');
    if (canWeakKey) {
      const existing = this.mergeCache.get(input as object | Function);
      if (existing) {
        this._lastSjInputRef = input;
        this._lastResolvedStyles = existing;
        return existing;
      }
    }

    let acc: SjStyle = {};
    const push = (v: any) => {
      if (v === undefined || v === null) return;
      if (Array.isArray(v)) return v.forEach(push);
      if (typeof v === 'function') return push(callIfFn(v));
      if (typeof v === 'object') {
        try {
          acc = deepMerge(acc, v as SjStyle);
        } catch (error) {
          // Log merge errors in dev mode for debugging
          if (typeof window !== 'undefined' && (window as any).ngDevMode) {
            console.warn(
              '[SJ Directive] Error merging styles:',
              error,
              'Input:',
              v
            );
          }
          // Continue with partial merge or skip invalid object
        }
        return;
      }
      // Warn about invalid style types
      if (typeof window !== 'undefined' && (window as any).ngDevMode) {
        console.warn(
          '[SJ Directive] Invalid style input type:',
          typeof v,
          'Value:',
          v
        );
      }
    };
    try {
      push(input);
    } catch (error) {
      if (typeof window !== 'undefined' && (window as any).ngDevMode) {
        console.warn(
          '[SJ Directive] Error resolving styles:',
          error,
          'Input:',
          input
        );
      }
      acc = {}; // Fallback to empty styles
    }

    this._lastSjInputRef = input;
    this._lastResolvedStyles = acc;
    if (canWeakKey) {
      try {
        this.mergeCache.set(input as object | Function, acc);
      } catch (error) {
        // WeakMap set can fail if key is not valid; silently ignore
      }
    }
    return acc;
  }

  /**
   * Gets or generates classes for the given styles and theme version.
   * @param processedStyles The resolved styles object.
   * @param theme The current theme.
   * @param themeVersion The theme version for cache invalidation.
   * @param cssGenerator The CSS generator service.
   * @returns Array of generated class names.
   */
  getOrGenerateClasses(
    processedStyles: SjStyle,
    theme: any,
    themeVersion: number,
    cssGenerator: any
  ): string[] | undefined {
    // Use a cache key that includes themeVersion so classes are regenerated
    // when theme/token values change.
    const cacheKey =
      this.hashObject(processedStyles || {}) + '::v' + themeVersion;

    let classes: string[] | undefined;
    try {
      classes = this.styleCache.get(cacheKey);
      if (!classes && Object.keys(processedStyles).length > 0) {
        // Prefer bundled single-class generation when available for faster application
        // fallback to atomic class generation.
        if (cssGenerator.getOrGenerateClassBundle) {
          classes = cssGenerator.getOrGenerateClassBundle(
            processedStyles,
            theme,
            themeVersion
          );
        } else {
          classes = cssGenerator.getOrGenerateClasses(
            processedStyles,
            theme,
            themeVersion
          );
        }
        if (classes) this.styleCache.set(cacheKey, classes);
      }
    } catch (error) {
      if (typeof window !== 'undefined' && (window as any).ngDevMode) {
        console.warn('[SJ Directive] Error generating CSS classes:', error);
      }
      classes = undefined; // Skip application
    }
    return classes;
  }

  /**
   * Clears all caches when theme version changes.
   */
  clearCaches(): void {
    this.styleCache.clear();
    try {
      this.mergeCache = new WeakMap();
    } catch {}
    this._lastSjInputRef = undefined;
    this._lastResolvedStyles = undefined;
  }
}
