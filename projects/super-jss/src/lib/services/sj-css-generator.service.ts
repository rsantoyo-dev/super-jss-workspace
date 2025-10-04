import {
  Inject,
  Injectable,
  Renderer2,
  RendererFactory2,
  PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { SjStyle, SjResolvedTheme } from '../models/interfaces';
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
  private styleEl?: HTMLStyleElement;
  private isBrowser: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private rendererFactory: RendererFactory2
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.renderer = this.rendererFactory.createRenderer(null, null);

    // Only create and append style element in browser environment
    if (this.isBrowser) {
      this.styleEl = this.renderer.createElement('style');
      this.renderer.setAttribute(this.styleEl, 'data-sjss', '');
      this.renderer.appendChild(this.document.head, this.styleEl);
    }
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
    theme: SjResolvedTheme,
    version = 0
  ): string[] {
    const prefix = version > 0 ? `v${version}-` : '';
    const cacheKey = prefix + JSON.stringify(styles || {});
    const cached = this.classCache.get(cacheKey);
    if (cached) return cached;

    const cssGenerator = new CssGenerator(theme);
    const cssMap = cssGenerator.generateAtomicCss(styles);
    const classes: string[] = [];
    // Merge declarations per selector/media instead of appending one-rule blocks
    // to make the stylesheet contain combined rule blocks (faster to parse
    // and easier to inspect in DevTools).
    const mediaMap = new Map<string, Map<string, Set<string>>>();

    for (const [className, cssRule] of cssMap) {
      const prefixedClass = `${prefix}${className}`;
      classes.push(prefixedClass);

      // Skip classes we've already emitted
      if (this.generatedClasses.has(prefixedClass)) continue;

      const prefixedRule = cssRule
        .split(`.${className}`)
        .join(`.${prefixedClass}`);

      // detect @media wrapper
      const mediaMatch = prefixedRule.match(/^@media\s*([^\{]+)\{([\s\S]*)\}$/);
      let mediaKey = '';
      let inner = prefixedRule;
      if (mediaMatch) {
        mediaKey = `@media ${mediaMatch[1].trim()}`;
        inner = mediaMatch[2].trim();
      }

      if (!mediaMap.has(mediaKey)) mediaMap.set(mediaKey, new Map());
      const selectorMap = mediaMap.get(mediaKey)!;

      const ruleRegex = /([^\{]+)\{([^\}]*)\}/g;
      let m: RegExpExecArray | null;
      while ((m = ruleRegex.exec(inner)) !== null) {
        const selector = m[1].trim();
        const declsRaw = m[2].trim();
        if (!selector) continue;

        if (!selectorMap.has(selector)) selectorMap.set(selector, new Set());
        const declSet = selectorMap.get(selector)!;

        declsRaw.split(';').forEach((d) => {
          const ds = d.trim();
          if (ds) declSet.add(ds);
        });
      }

      // mark as generated so subsequent calls skip it
      this.generatedClasses.add(prefixedClass);
    }

    // Reconstruct merged CSS text
    let newCss = '';
    for (const [mediaKey, selectorMap] of mediaMap.entries()) {
      const inMedia = mediaKey !== '';
      if (inMedia) newCss += `${mediaKey} {\n`;

      for (const [selector, declSet] of selectorMap.entries()) {
        const decls = Array.from(declSet).join('; ');
        const declStr = decls.endsWith(';')
          ? decls
          : decls + (decls ? ';' : '');
        newCss += `  ${selector} { ${declStr} }\n`;
      }

      if (inMedia) newCss += `}\n`;
    }

    if (newCss && this.styleEl) {
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
    theme: SjResolvedTheme,
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
      // Merge declarations for the same selector (and media query) so the
      // final stylesheet contains a single rule block per selector. This
      // reduces scattered single-property blocks like:
      // .sjb-1 { color: ... }
      // .sjb-1 { margin-top: ... }
      // into a single combined block:
      // .sjb-1 { color: ...; margin-top: ... }
      const mediaMap = new Map<string, Map<string, Set<string>>>();

      for (const [className, cssRule] of cssMap) {
        // replace occurrences of the atomic class with the bundle class
        const prefixedRule = cssRule
          .split(`.${className}`)
          .join(`.${bundleId}`);

        // Detect @media wrapper produced by the generator. If present,
        // extract the media header and inner rules; otherwise treat as
        // top-level rules with an empty media key.
        const mediaMatch = prefixedRule.match(
          /^@media\s*([^\{]+)\{([\s\S]*)\}$/
        );
        let mediaKey = '';
        let inner = prefixedRule;
        if (mediaMatch) {
          mediaKey = `@media ${mediaMatch[1].trim()}`;
          inner = mediaMatch[2].trim();
        }

        if (!mediaMap.has(mediaKey)) mediaMap.set(mediaKey, new Map());
        const selectorMap = mediaMap.get(mediaKey)!;

        // Extract selector blocks from the inner content. Generator outputs
        // rules like `.selector{ prop: val; }` (possibly with pseudo like :hover).
        const ruleRegex = /([^\{]+)\{([^\}]*)\}/g;
        let m: RegExpExecArray | null;
        while ((m = ruleRegex.exec(inner)) !== null) {
          const selector = m[1].trim();
          const declsRaw = m[2].trim();
          if (!selector) continue;

          if (!selectorMap.has(selector)) selectorMap.set(selector, new Set());
          const declSet = selectorMap.get(selector)!;

          // Split declarations and add unique entries
          declsRaw.split(';').forEach((d) => {
            const ds = d.trim();
            if (ds) declSet.add(ds);
          });
        }
      }

      // Reconstruct merged CSS text
      let newCss = '';
      for (const [mediaKey, selectorMap] of mediaMap.entries()) {
        const inMedia = mediaKey !== '';
        if (inMedia) newCss += `${mediaKey} {\n`;

        for (const [selector, declSet] of selectorMap.entries()) {
          const decls = Array.from(declSet).join('; ');
          // Ensure declarations end with a semicolon
          const declStr = decls.endsWith(';')
            ? decls
            : decls + (decls ? ';' : '');
          newCss += `  ${selector} { ${declStr} }\n`;
        }

        if (inMedia) newCss += `}\n`;
      }

      if (newCss && this.styleEl) {
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

    // Only manipulate DOM in browser environment
    if (this.isBrowser && this.styleEl) {
      this.renderer.removeChild(this.document.head, this.styleEl);
      this.styleEl = this.renderer.createElement('style');
      this.renderer.setAttribute(this.styleEl, 'data-sjss', '');
      this.renderer.appendChild(this.document.head, this.styleEl);
    }
  }

  // bundle id generation moved to core/class-name.ts
}
