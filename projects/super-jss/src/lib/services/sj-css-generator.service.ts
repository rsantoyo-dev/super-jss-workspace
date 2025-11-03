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
import { generateBundleId } from '../core/class-name';
import { CssGenerator } from '../core/css-generator';
import { StyleRegistry } from '../core/style-registry';
import { ensurePrecomputedStylesheet } from '../precomputed/precomputed-styles';

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
  // Microtask-batched CSS appends to reduce DOM writes under load
  private cssQueue: string[] = [];
  private flushScheduled = false;
  private useIdleFlush = true;
  private idleThreshold = 50; // when queue size >= threshold → schedule idle flush

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private rendererFactory: RendererFactory2,
    private registry: StyleRegistry
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.renderer = this.rendererFactory.createRenderer(null, null);

    // Only create and append style element in browser environment
    if (this.isBrowser) {
      ensurePrecomputedStylesheet(this.document);
      // Phase 5: seed generated class set from any existing SSR/inline styles
      this.seedExistingStyleClasses();
      this.styleEl = this.renderer.createElement('style');
      this.renderer.setAttribute(this.styleEl, 'data-sjss', '');
      this.renderer.appendChild(this.document.head, this.styleEl);
    }
  }

  /** Create atomic CSS map for a given style and theme. */
  private generateCssMap(styles: SjStyle, theme: SjResolvedTheme) {
    const cssGenerator = new CssGenerator(theme);
    return cssGenerator.generateAtomicCss(styles);
  }

  /** Append CSS text to the single managed <style> tag if any. */
  private appendCss(cssText: string) {
    if (!cssText || !this.styleEl) return;
    const node = this.renderer.createText(cssText);
    this.renderer.appendChild(this.styleEl, node);
  }

  /**
   * Phase 5 (SSR hydration): scan existing <style> tags for class selectors and
   * pre-populate the generatedClasses set so we don't emit duplicates on startup.
   */
  private seedExistingStyleClasses() {
    try {
      const styles = Array.from(
        this.document.querySelectorAll('style[data-sjss], style[data-sj-precomputed], style')
      );
      const classRegex = /\.([a-zA-Z0-9_-]+)\s*\{/g;
      for (const s of styles) {
        if (!s || !s.textContent) continue;
        const text = s.textContent;
        let m: RegExpExecArray | null;
        while ((m = classRegex.exec(text)) !== null) {
          const cls = m[1];
          // Heuristic: mark our classes/bundles as present (common prefixes: sj-, v<ver>-)
          if (cls && (cls.startsWith('sj') || cls.startsWith('v'))) {
            this.generatedClasses.add(cls);
          }
        }
      }
    } catch {
      // ignore failures in non-browser / CSP-constrained envs
    }
  }

  private enqueueCss(cssText: string) {
    if (!cssText) return;
    this.cssQueue.push(cssText);
    if (!this.flushScheduled) {
      this.flushScheduled = true;
      // If a large batch has accumulated and idle callback exists, prefer idle flush
      if (this.useIdleFlush && this.cssQueue.length >= this.idleThreshold) {
        this.scheduleIdleFlush();
      } else {
        try {
          queueMicrotask(() => this.flushCssQueue());
        } catch {
          setTimeout(() => this.flushCssQueue(), 0);
        }
      }
    }
  }

  private flushCssQueue() {
    this.flushScheduled = false;
    if (!this.styleEl || this.cssQueue.length === 0) {
      this.cssQueue.length = 0;
      return;
    }
    const cssText = this.cssQueue.join('\n');
    this.cssQueue.length = 0;
    this.appendCss(cssText);
  }

  /** Force an immediate flush of any pending CSS batches (latency-sensitive paths). */
  public flushNow(): void {
    try {
      this.flushCssQueue();
    } catch {}
  }

  /** Schedule a flush using requestIdleCallback (or a timeout fallback). */
  private scheduleIdleFlush() {
    try {
      const win = this.document.defaultView as any;
      const ric: any = win && (win.requestIdleCallback || win.webkitRequestIdleCallback);
      if (typeof ric === 'function') {
        ric(() => this.flushCssQueue());
        return;
      }
    } catch {}
    // Fallback when no idle callback: delay a bit to avoid blocking busy frames
    setTimeout(() => this.flushCssQueue(), 32);
  }

  /** Configure batching/idle flush behavior (Phase 6). */
  public configureBatching(opts: { useIdle?: boolean; idleThreshold?: number }): void {
    if (!opts) return;
    if (typeof opts.useIdle === 'boolean') this.useIdleFlush = opts.useIdle;
    if (typeof opts.idleThreshold === 'number' && opts.idleThreshold > 0) {
      this.idleThreshold = Math.floor(opts.idleThreshold);
    }
  }

  /**
   * Orders declarations so that shorthands (e.g., padding) are emitted before
   * corresponding longhands (e.g., padding-top). This ensures that longhands
   * take precedence within the merged declaration block.
   */
  private orderDeclarations(decls: string[]): string[] {
    const prop = (d: string) => d.split(':', 1)[0].trim();
    return [...decls].sort((a, b) => {
      const pa = prop(a);
      const pb = prop(b);
      if (pa === pb) return 0;
      // If pa is a shorthand of pb (e.g., padding vs padding-top), put pa first
      if (pb.startsWith(pa + '-')) return -1;
      // If pa is a longhand of pb (e.g., padding-top vs padding), put pa after
      if (pa.startsWith(pb + '-')) return 1;
      return 0;
    });
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

    const cssMap = this.generateCssMap(styles, theme);
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
    // Emit media blocks first, then top-level (empty key) last so non-responsive
    // longhands can override responsive shorthands across breakpoints.
    const mediaEntries = Array.from(mediaMap.entries()).sort((a, b) => {
      // Put top-level (empty key) FIRST, then media queries.
      const aTop = a[0] === '' ? 0 : 1;
      const bTop = b[0] === '' ? 0 : 1;
      return aTop - bTop;
    });
    for (const [mediaKey, selectorMap] of mediaEntries) {
      const inMedia = mediaKey !== '';
      if (inMedia) newCss += `${mediaKey} {\n`;

      for (const [selector, declSet] of selectorMap.entries()) {
        const ordered = this.orderDeclarations(Array.from(declSet));
        const decls = ordered.join('; ');
        const declStr = decls.endsWith(';')
          ? decls
          : decls + (decls ? ';' : '');
        newCss += `  ${selector} { ${declStr} }\n`;
      }

      if (inMedia) newCss += `}\n`;
    }

    // Batch CSS appends across calls for perf under load
    this.enqueueCss(newCss);

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
    // Next-gen registry: if enabled and bundle known, return immediately
    try {
      if (this.registry.isEnabled()) {
        const known = this.registry.getBundleClass(cacheKey);
        if (known) return [known];
      }
    } catch {}
    const cached = this.classCache.get(cacheKey);
    if (cached) return cached;

    const cssMap = this.generateCssMap(styles, theme);

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
      const mediaEntries = Array.from(mediaMap.entries()).sort((a, b) => {
        const aTop = a[0] === '' ? 0 : 1;
        const bTop = b[0] === '' ? 0 : 1;
        return aTop - bTop; // '' goes first
      });
      for (const [mediaKey, selectorMap] of mediaEntries) {
        const inMedia = mediaKey !== '';
        if (inMedia) newCss += `${mediaKey} {\n`;

        for (const [selector, declSet] of selectorMap.entries()) {
          const ordered = this.orderDeclarations(Array.from(declSet));
          const decls = ordered.join('; ');
          // Ensure declarations end with a semicolon
          const declStr = decls.endsWith(';')
            ? decls
            : decls + (decls ? ';' : '');
          newCss += `  ${selector} { ${declStr} }\n`;
        }

        if (inMedia) newCss += `}\n`;
      }

      // Batch CSS appends across calls for perf under load
      this.enqueueCss(newCss);
      this.generatedClasses.add(bundleId);
    }

    const classes = [bundleId];
    this.classCache.set(cacheKey, classes);
    try {
      if (this.registry.isEnabled()) this.registry.setBundleClass(cacheKey, bundleId);
    } catch {}
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
      try {
        // Safer than removing/recreating the <style>: clear its content in place
        // to avoid transient unstyled flashes and preserve the node reference.
        while (this.styleEl.firstChild) {
          this.renderer.removeChild(this.styleEl, this.styleEl.firstChild);
        }
      } catch {
        // Fallback: recreate if clearing fails for any reason
        try {
          this.renderer.removeChild(this.document.head, this.styleEl);
        } catch {}
        this.styleEl = this.renderer.createElement('style');
        this.renderer.setAttribute(this.styleEl, 'data-sjss', '');
        this.renderer.appendChild(this.document.head, this.styleEl);
      }
    }
  }

  // bundle id generation moved to core/class-name.ts

  /** Perf stats for Phase 7 dashboard. */
  public getStats() {
    return {
      generatedClasses: this.generatedClasses.size,
      cacheEntries: this.classCache.size,
      pendingCssChunks: this.cssQueue.length,
    } as const;
  }
}
