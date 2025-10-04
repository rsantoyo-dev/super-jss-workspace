import {
  Injectable,
  computed,
  signal,
  OnDestroy,
  WritableSignal,
  Optional,
  Inject,
  Injector,
  PLATFORM_ID,
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
import { getCurrentBreakpoint } from '../core/core-methods';
import { deepMerge } from '../utils';
import { SJ_THEME } from '../tokens';
import { DOCUMENT } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Subscription,
} from 'rxjs';
import { SjCssGeneratorService } from './sj-css-generator.service';
import {
  defaultTheme,
  defaultDarkTheme,
  desertTheme,
  desertDarkTheme,
  oceanTheme,
  oceanDarkTheme,
} from '../themes';

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

  // Built-in library theme presets (extendable in the future via tokens)
  private readonly presets: Array<{
    name: string;
    theme: SjTheme | Partial<SjTheme>;
    base?: SjTheme;
    isDark?: boolean;
  }> = [
    { name: 'Default Light', theme: defaultTheme, isDark: false },
    {
      name: 'Default Dark',
      theme: defaultDarkTheme,
      base: defaultTheme,
      isDark: true,
    },
    { name: 'Desert Light', theme: desertTheme, isDark: false },
    {
      name: 'Desert Dark',
      theme: desertDarkTheme,
      base: desertTheme,
      isDark: true,
    },
    { name: 'Ocean Light', theme: oceanTheme, isDark: false },
    {
      name: 'Ocean Dark',
      theme: oceanDarkTheme,
      base: oceanTheme,
      isDark: true,
    },
  ];

  // Convenience computed helpers (exposed for components and WithSj)
  themeName = computed(() => this.sjTheme().name);
  breakpoint = computed(() => this.currentBreakpoint());
  isMobile = computed(() => this.currentBreakpoint() === 'xs');
  isTablet = computed(() => this.currentBreakpoint() === 'sm');
  isDesktop = computed(() =>
    ['md', 'lg', 'xl', 'xxl'].includes(this.currentBreakpoint())
  );

  constructor(
    @Optional() @Inject(SJ_THEME) private initialTheme: SjTheme,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private injector: Injector
  ) {
    if (this.initialTheme) {
      this.setTheme(this.initialTheme);
    }
    // Apply initial typography to document
    this.applyDocumentTypography(this.sjTheme());
    // Only initialize resize listener in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.initResizeListener();
    }
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
        .pipe(debounceTime(5))
        .subscribe(() => {
          const w = window.innerWidth;
          this.windowWidth.set(w);
          const bp = getCurrentBreakpoint(this.sjTheme().breakpoints, w);
          if (bp !== this.currentBreakpoint()) {
            this.currentBreakpoint.set(bp);
          }
        });
    }
  }

  /**
   * List the names of available built-in theme presets.
   */
  public listThemePresets(): string[] {
    return this.presets.map((p) => p.name);
  }

  /**
   * Get a preset definition by name.
   */
  public getThemePreset(name: string) {
    return this.presets.find((p) => p.name === name);
  }

  /**
   * Create a resolved, standalone theme object from a preset plus optional overrides.
   * Returns an SjResolvedTheme which can be used with setTheme or setThemeReset.
   */
  public cloneThemePreset(
    name: string,
    overrides?: import('../models/interfaces').DeepPartial<SjTheme>
  ): SjResolvedTheme {
    const preset = this.getThemePreset(name);
    if (!preset) throw new Error(`Unknown theme preset: ${name}`);
    const base = preset.base ?? ({} as SjTheme);
    const merged = deepMerge(
      deepMerge(base, preset.theme as any),
      overrides || {}
    );
    let newTheme = resolveTheme(merged as SjTheme);
    newTheme = {
      ...newTheme,
      typography: normalizeTypography(newTheme.typography),
    } as SjResolvedTheme;
    return newTheme;
  }

  /**
   * Apply a preset by name, with optional overrides, using reset (default) or merge mode.
   */
  public applyThemePreset(
    name: string,
    opts?: {
      overrides?: import('../models/interfaces').DeepPartial<SjTheme>;
      mode?: 'reset' | 'merge';
    }
  ): void {
    const { overrides, mode } = opts || {};
    const resolved = this.cloneThemePreset(name, overrides);
    if (mode === 'merge') {
      this.setTheme(resolved);
    } else {
      this.setThemeReset(resolved);
    }
  }

  /**
   * Deep-merges provided theme into the current one, resets CSS cache and bumps version.
   * @param theme Partial theme overrides.
   */
  public setTheme(
    theme: import('../models/interfaces').DeepPartial<SjTheme>
  ): void;
  public setTheme(theme: SjTheme): void;
  public setTheme(theme: any) {
    const currentTheme = this.sjTheme();
    const merged = deepMerge(currentTheme, theme as any);
    let newTheme = resolveTheme(merged as SjTheme);
    // Normalize typography so defaults flow into variants while preserving overrides
    newTheme = {
      ...newTheme,
      typography: normalizeTypography(newTheme.typography),
    } as SjResolvedTheme;
    this.theme.set(newTheme);

    const cssGenerator = this.injector.get(SjCssGeneratorService);
    cssGenerator.clearCache();

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
    const base = resolveTheme(defaultTheme);
    const merged = deepMerge(base, theme as any);
    let newTheme = resolveTheme(merged as SjTheme);
    newTheme = {
      ...newTheme,
      typography: normalizeTypography(newTheme.typography),
    } as SjResolvedTheme;
    this.theme.set(newTheme);

    const cssGenerator = this.injector.get(SjCssGeneratorService);
    cssGenerator.clearCache();

    this.themeVersion.set(this.themeVersion() + 1);

    this.applyDocumentTypography(newTheme);
  }

  /** Cleans up window resize subscription when the service is destroyed. */
  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe();
  }

  /** Apply current theme typography to document via CSS variable so classes can reference it */
  private applyDocumentTypography(theme: SjResolvedTheme) {
    try {
      if (!isPlatformBrowser(this.platformId)) return;
      const ff = (theme.typography as any)?.default?.fontFamily;
      if (ff) {
        const value = Array.isArray(ff) ? (ff as any).join(', ') : (ff as any);
        // Expose as a CSS custom property; classes use var(--sj-ff, <fallback>)
        this.document.documentElement.style.setProperty('--sj-ff', value);
        this.document.body.style.setProperty('--sj-ff', value);
        // Also set body font-family using the CSS var to ensure inheritance
        this.document.body.style.fontFamily = `var(--sj-ff, ${value})`;
      }
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
  } as SjResolvedTheme;
}

// Merge default typography into all variants; variant-specific values win.
function normalizeTypography(typography: SjTypography): SjTypography {
  const base = typography.default || ({} as SjStyle);
  const merge = (v: SjStyle | undefined): SjStyle => {
    const merged = deepMerge(base, v || {});
    // Ensure default fontFamily propagates to all variants unless explicitly redefined post-merge.
    if ((base as any).fontFamily !== undefined) {
      (merged as any).fontFamily = (base as any).fontFamily;
    }
    return merged;
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
