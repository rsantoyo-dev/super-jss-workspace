import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SjStyle, SjTheme } from '../models/interfaces';
import { CssGenerator } from '../core/css-generator';
import { generateBundleId } from '../core/class-name';

@Injectable({
  providedIn: 'root',
})
export class SjCssGeneratorService {
  private generatedClasses = new Set<string>();
  // Cache mapping serialized styles + version -> generated class list
  private classCache = new Map<string, string[]>();
  private renderer: Renderer2;
  private styleEl: HTMLStyleElement;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.styleEl = this.renderer.createElement('style');
    this.renderer.setAttribute(this.styleEl, 'data-sjss', '');
    this.renderer.appendChild(this.document.head, this.styleEl);
  }

  /**
   * Returns prefixed class names for styles, appending new CSS to a single <style> tag.
   * Deduplicates previously generated rules using an in-memory cache.
   * @param styles Style object to convert.
   * @param theme Active theme for spacing/colors/breakpoints.
   * @param version Optional cache/version prefix to bust old CSS.
   * @returns Array of generated class names (prefixed).
   */
  public getOrGenerateClasses(
    styles: SjStyle,
    theme: SjTheme,
    version = 0
  ): string[] {
    const prefix = version > 0 ? `v${version}-` : '';
    const cacheKey = prefix + JSON.stringify(styles || {});
    const cached = this.classCache.get(cacheKey);
    if (cached) return cached;

    const cssGenerator = new CssGenerator(theme);
    const cssMap = cssGenerator.generateAtomicCss(styles);
    const classes: string[] = [];
    let newCss = '';

    for (const [className, cssRule] of cssMap) {
      const prefixedClass = `${prefix}${className}`;
      const prefixedRule = cssRule
        .split(`.${className}`)
        .join(`.${prefixedClass}`);
      if (!this.generatedClasses.has(prefixedClass)) {
        this.generatedClasses.add(prefixedClass);
        newCss += prefixedRule + '\n';
      }
      classes.push(prefixedClass);
    }

    if (newCss) {
      const cssText = this.renderer.createText(newCss);
      this.renderer.appendChild(this.styleEl, cssText);
    }

    // Store computed classes in cache so repeated identical style objects
    // return immediately without re-generating CSS.
    this.classCache.set(cacheKey, classes);
    return classes;
  }

  /**
   * Generate a single bundled class for the entire style object.
   * This reduces the number of classes applied per element (1 class vs many atomic classes)
   * by replacing all generated atomic selectors with a single prefix class.
   */
  public getOrGenerateClassBundle(
    styles: SjStyle,
    theme: SjTheme,
    version = 0
  ): string[] {
    const prefix = version > 0 ? `v${version}-` : '';
    const cacheKey = prefix + 'bundle::' + JSON.stringify(styles || {});
    const cached = this.classCache.get(cacheKey);
    if (cached) return cached;

    const cssGenerator = new CssGenerator(theme);
    const cssMap = cssGenerator.generateAtomicCss(styles);

    // Make a compact, deterministic id for this bundle from the JSON
    const bundleId = `${prefix}${generateBundleId(
      JSON.stringify(styles || {})
    )}`;

    // Avoid appending identical bundle rules multiple times
    if (!this.generatedClasses.has(bundleId)) {
      let newCss = '';
      for (const [className, cssRule] of cssMap) {
        // replace occurrences of the atomic class with the bundle class
        const prefixedRule = cssRule
          .split(`.${className}`)
          .join(`.${bundleId}`);
        newCss += prefixedRule + '\n';
      }

      if (newCss) {
        const cssText = this.renderer.createText(newCss);
        this.renderer.appendChild(this.styleEl, cssText);
      }
      this.generatedClasses.add(bundleId);
    }

    const classes = [bundleId];
    this.classCache.set(cacheKey, classes);
    return classes;
  }

  /**
   * Clears in-memory cache and resets the <style> host element.
   * Call when theme structure changes to avoid stale CSS.
   */
  public clearCache() {
    this.generatedClasses.clear();
    this.classCache.clear();
    this.renderer.removeChild(this.document.head, this.styleEl);
    this.styleEl = this.renderer.createElement('style');
    this.renderer.setAttribute(this.styleEl, 'data-sjss', '');
    this.renderer.appendChild(this.document.head, this.styleEl);
  }

  // bundle id generation moved to core/class-name.ts
}
