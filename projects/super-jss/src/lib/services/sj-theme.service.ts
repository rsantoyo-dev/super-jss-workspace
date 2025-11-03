import {
  Injectable,
  computed,
  signal,
  OnDestroy,
  WritableSignal,
  Injector,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  SjBreakPoints,
  SjColors,
  SjPalette,
  SjTheme,
  SjTypography,
  SjResolvedTheme,
  SjStyle,
} from '../models/interfaces';
import { getCurrentBreakpoint, resolveThemeColor } from '../core/core-methods';
import { deepMerge } from '../utils';
import { DOCUMENT } from '@angular/common';
import {
  auditTime,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Subscription,
} from 'rxjs';
import { SjCssGeneratorService } from './sj-css-generator.service';
import { StyleRegistry } from '../core/style-registry';
import { defaultTheme } from '../themes/theme-definitions/default-theme';

// Internal: holds a reference to the active SjThemeService for sj.theme accessors
export let sjActiveThemeService: SjThemeService | undefined;

@Injectable({
  providedIn: 'root',
})
export class SjThemeService implements OnDestroy {
  // Signals to manage reactive state for breakpoints and theme configurations
  theme: WritableSignal<SjResolvedTheme> = signal(resolveTheme(defaultTheme));

  sjTheme = computed(() => this.theme());

  // Signal to track the current breakpoint
  currentBreakpoint = signal('xs');
  // Track window width to trigger re-renders on any resize, even within same breakpoint
  windowWidth = signal(0);
  themeVersion = signal(0);
  private resizeSubscription?: Subscription;
  // Optional: purge generated CSS when breakpoint changes (off by default)
  private purgeCssOnBreakpoint = false;

  // Removed bundled presets from core to reduce bundle size. Consumers can
  // import presets from secondary entry: `super-jss/themes`.

  // Convenience computed helpers (exposed for components and WithSj)
  themeName = computed(() => this.sjTheme().name);
  breakpoint = computed(() => this.currentBreakpoint());
  isMobile = computed(() => this.currentBreakpoint() === 'xs');
  isTablet = computed(() => this.currentBreakpoint() === 'sm');
  isDesktop = computed(() =>
    ['md', 'lg', 'xl', 'xxl'].includes(this.currentBreakpoint())
  );

  private _buildSeq = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private injector: Injector,
    private styleRegistry: StyleRegistry
  ) {
    // Apply initial typography to document
    this.applyDocumentTypography(this.sjTheme());
    // Dev cache-busting: bump a build sequence on each service construction
    try {
      if (isPlatformBrowser(this.platformId)) {
        const win = this.document.defaultView as any;
        win.__sj_build_seq = (win.__sj_build_seq || 0) + 1;
        this._buildSeq = Number(win.__sj_build_seq) || 0;
        // Reset CSS cache so new bundles append cleanly after edits
        const cssGenerator = this.injector.get(SjCssGeneratorService);
        cssGenerator.clearCache();
        // Force a re-render of SJ components/directives after clearing caches.
        // This avoids transient missing styles in dev/HMR where only the CSS cache changes.
        this.themeVersion.set((this.themeVersion() || 0) + 1);
      }
    } catch {}
    // Register this instance for global sj.theme access (internal)
    try {
      sjActiveThemeService = this;
    } catch {}
    // Only initialize resize listener in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.initResizeListener();
    }
  }

  /** Version used for CSS caching: theme version + build sequence (dev). */
  public cacheVersion(): number {
    return (this.themeVersion() || 0) + (this._buildSeq || 0);
  }

  /**
   * Subscribes to window resize and updates width/breakpoint signals (debounced).
   * Ensures consumers re-render on any resize, not only breakpoint changes.
   * Only runs in browser environment.
   */
  public initResizeListener(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.resizeSubscription?.unsubscribe();
    const window = this.document.defaultView;
    if (window) {
      const width = window.innerWidth;
      this.windowWidth.set(width);
      this.currentBreakpoint.set(
        getCurrentBreakpoint(this.sjTheme().breakpoints, width)
      );

      this.resizeSubscription = fromEvent(window, 'resize')
        // Phase 4: dedupe resize globally — throttle to ~1 emit per frame chunk
        .pipe(auditTime(80))
        .subscribe(() => {
          const w = window.innerWidth;
          this.windowWidth.set(w);
          const bp = getCurrentBreakpoint(this.sjTheme().breakpoints, w);
          if (bp !== this.currentBreakpoint()) {
            // Only update the breakpoint signal; do not clear CSS or bump theme
            // version here to avoid transient unstyled content on resize.
            this.currentBreakpoint.set(bp);
            // Optionally purge generated CSS when bp changes (demo/diagnostic)
            if (this.purgeCssOnBreakpoint) {
              // Defer purge to the next macrotask so Angular's bp-dependent
              // views finish reconciling before we clear and regenerate CSS.
              setTimeout(() => {
                try {
                  const cssGenerator = this.injector.get(SjCssGeneratorService);
                  cssGenerator.clearCache();
                } catch {}
                // Bump version so components/directives regenerate CSS bundles
                this.themeVersion.set(1);
              }, 0);
            }
          }
        });
    }
  }

  // Preset management API removed from core. Import presets from
  // `super-jss/themes` and apply them via setTheme / setThemeReset.

  /**
   * Deep-merges provided theme into the current one, resets CSS cache and bumps version.
   * @param theme Partial theme overrides.
   */
  public setTheme(
    theme: import('../models/interfaces').DeepPartial<SjTheme>
  ): void;
  public setTheme(theme: SjTheme): void;
  public setTheme(theme: any) {
    // Clear CSS first to avoid a window where old rules remain applied to new DOM
    const cssGenerator = this.injector.get(SjCssGeneratorService);
    cssGenerator.clearCache();

    const currentTheme = this.sjTheme();
    const merged = deepMerge(currentTheme, theme as any);
    let newTheme = resolveTheme(merged as SjTheme);
    // Normalize typography so defaults flow into variants while preserving overrides
    newTheme = {
      ...newTheme,
      typography: normalizeTypography(newTheme.typography),
    } as SjResolvedTheme;
    this.theme.set(newTheme);

    // Bump version to force re-render and regeneration of classes
    this.themeVersion.set(this.themeVersion() + 1);

    // Reflect typography font on document when theme changes
    this.applyDocumentTypography(newTheme);
  }

  /**
   * Replace strategy: start from library defaults and apply the provided theme.
   * Use this when switching between full themes to avoid carry-over.
   */
  public setThemeReset(
    theme: import('../models/interfaces').DeepPartial<SjTheme> | SjTheme
  ): void {
    // Clear CSS first so new theme produces a fresh stylesheet
    const cssGenerator = this.injector.get(SjCssGeneratorService);
    cssGenerator.clearCache();

    const base = resolveTheme(defaultTheme);
    const merged = deepMerge(base, theme as any);
    let newTheme = resolveTheme(merged as SjTheme);
    newTheme = {
      ...newTheme,
      typography: normalizeTypography(newTheme.typography),
    } as SjResolvedTheme;
    this.theme.set(newTheme);

    this.themeVersion.set(this.themeVersion() + 1);

    this.applyDocumentTypography(newTheme);
  }

  /** Cleans up window resize subscription when the service is destroyed. */
  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe();
    try {
      if (sjActiveThemeService === this) sjActiveThemeService = undefined;
    } catch {}
  }

  /** Enable/disable purging generated CSS on breakpoint changes (off by default). */
  public setPurgeCssOnBreakpoint(enabled: boolean): void {
    this.purgeCssOnBreakpoint = !!enabled;
  }

  /** Enable/disable the next-gen engine (global style registry + batching). */
  public enableNextGenEngine(enabled: boolean): void {
    try {
      this.styleRegistry.setEnabled(!!enabled);
    } catch {}
  }

  /** Configure CSS batching (Phase 6): useIdle scheduling and threshold. */
  public configureCssBatching(options: {
    useIdle?: boolean;
    idleThreshold?: number;
  }): void {
    try {
      const cssGenerator = this.injector.get(SjCssGeneratorService);
      cssGenerator.configureBatching(options || {});
    } catch {}
  }

  /** Phase 7: expose perf stats (registry + generator) for demo dashboards. */
  public getPerfStats() {
    try {
      const css = this.injector.get(SjCssGeneratorService);
      return {
        registry: this.styleRegistry.snapshot(),
        generator: css.getStats(),
        themeVersion: this.themeVersion(),
        breakpoint: this.currentBreakpoint(),
      };
    } catch {
      return {
        registry: {},
        generator: {},
        themeVersion: 0,
        breakpoint: 'xs',
      } as any;
    }
  }

  public resetPerfCounters(): void {
    try {
      this.styleRegistry.resetCounters();
    } catch {}
  }

  /** Force-flush pending CSS injection batches immediately. */
  public flushCssNow(): void {
    try {
      const css = this.injector.get(SjCssGeneratorService);
      css.flushNow();
    } catch {}
  }

  /** Apply current theme variables (typography + app background) to :root/body */
  private applyDocumentTypography(theme: SjResolvedTheme) {
    try {
      if (!isPlatformBrowser(this.platformId)) return;
      const ff = (theme.typography as any)?.default?.fontFamily;
      if (ff) {
        const value = Array.isArray(ff) ? (ff as any).join(', ') : (ff as any);
        // Expose as a CSS custom property; classes use var(--sj-ff, <fallback>)
        this.document.documentElement.style.setProperty('--sj-ff', value);
        // Do not set body font-family; keep global DOM pristine. SJ Typography
        // classes reference var(--sj-ff) explicitly.
      }

      // Also expose a global app background variable so html/body can bind it
      try {
        const token = (theme.palette as any)?.light?.main ?? '#ffffff';
        const bg = resolveThemeColor(String(token), theme);
        this.document.documentElement.style.setProperty('--sj-app-bg', bg);
        if (this.document.body) {
          this.document.body.style.setProperty('--sj-app-bg', bg);
        }
      } catch {}

      // Phase 2: publish palette tokens as CSS variables for near-zero-cost theme swaps
      try {
        const palette = theme.palette as any;
        const setVar = (name: string, val: string) =>
          this.document.documentElement.style.setProperty(name, val);
        const families = Object.keys(palette || {});
        for (const fam of families) {
          const tones: Array<'main' | 'light' | 'dark' | 'contrast'> = [
            'main',
            'light',
            'dark',
            'contrast',
          ];
          for (const tone of tones) {
            const val = String((palette?.[fam]?.[tone] ?? '') || '');
            if (!val) continue;
            setVar(
              `--sj-palette-${fam}-${tone}`,
              resolveThemeColor(val, theme)
            );
          }
        }
      } catch {}
    } catch {
      // noop
    }
  }
}

// Helper to resolve a partial SjTheme into a non-optional SjResolvedTheme
function resolveTheme(incoming: SjTheme): SjResolvedTheme {
  // Import defaults lazily to avoid circulars
  const fromDefaults = defaultTheme as Required<SjTheme>;
  return {
    name: incoming.name ?? fromDefaults.name,
    breakpoints: incoming.breakpoints ?? fromDefaults.breakpoints!,
    spacing: incoming.spacing ?? fromDefaults.spacing!,
    typography: incoming.typography ?? fromDefaults.typography!,
    colors: incoming.colors ?? fromDefaults.colors!,
    palette: incoming.palette ?? fromDefaults.palette!,
    components: (incoming.components ?? fromDefaults.components!) as any,
  } as SjResolvedTheme;
}

// Merge default typography into all variants; variant-specific values win.
function normalizeTypography(typography: SjTypography): SjTypography {
  const base = typography.default || ({} as SjStyle);
  // Do NOT propagate default.fontFamily into variants; font-family is theme-managed.
  const { fontFamily: _ignored, ...baseWithoutFont } = base as any;
  const merge = (v: SjStyle | undefined): SjStyle => {
    // Merge base (without fontFamily) so color/other props flow; variant overrides win.
    return deepMerge(baseWithoutFont, v || {});
  };
  return {
    default: base,
    H1: merge(typography.H1),
    H2: merge(typography.H2),
    H3: merge(typography.H3),
    H4: merge(typography.H4),
    H5: merge(typography.H5),
    H6: merge(typography.H6),
    SPAN: merge(typography.SPAN),
    P: merge(typography.P),
    BODY: merge(typography.BODY),
    STRONG: merge(typography.STRONG),
    CAPTION: merge(typography.CAPTION),
    SMALL: merge(typography.SMALL),
    PRE: merge(typography.PRE),
  } as SjTypography;
}
