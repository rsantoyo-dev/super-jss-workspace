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
import { defaultTheme } from '../themes';

@Injectable({
  providedIn: 'root',
})
export class SjThemeService implements OnDestroy {
  // Signals to manage reactive state for breakpoints and theme configurations
  theme: WritableSignal<SjTheme> = signal(defaultTheme);

  sjTheme = computed(() => this.theme());

  // Signal to track the current breakpoint
  currentBreakpoint = signal('xs');
  // Track window width to trigger re-renders on any resize, even within same breakpoint
  windowWidth = signal(0);
  themeVersion = signal(0);
  private resizeSubscription?: Subscription;

  constructor(
    @Optional() @Inject(SJ_THEME) private initialTheme: SjTheme,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private injector: Injector
  ) {
    if (this.initialTheme) {
      this.setTheme(this.initialTheme);
    }
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
        .pipe(debounceTime(15))
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
   * Deep-merges provided theme into the current one, resets CSS cache and bumps version.
   * @param theme Partial theme overrides.
   */
  public setTheme(theme: Partial<SjTheme>) {
    const currentTheme = this.sjTheme();
    const newTheme = deepMerge(currentTheme, theme);
    this.theme.set(newTheme);

    const cssGenerator = this.injector.get(SjCssGeneratorService);
    cssGenerator.clearCache();

    this.themeVersion.set(this.themeVersion() + 1);
  }

  /** Cleans up window resize subscription when the service is destroyed. */
  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe();
  }
}
