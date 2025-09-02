import {
  Injectable,
  computed,
  signal,
  OnDestroy,
  WritableSignal,
  Optional,
  Inject,
  Injector,
} from '@angular/core';
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
  startWith,
  Subscription,
} from 'rxjs';
import { SjCssGeneratorService } from './sj-css-generator.service';
import { defaultTheme } from '../themes';

@Injectable({
  providedIn: 'root',
})
export class SjThemeService implements OnDestroy {
  // Signals to manage reactive state for breakpoints and theme configurations
  breakpoints: WritableSignal<SjBreakPoints> = signal(defaultTheme.breakpoints);
  typography: WritableSignal<SjTypography> = signal(defaultTheme.typography);
  colors: WritableSignal<SjColors> = signal(defaultTheme.colors);

  // Palette signal for managing theme's color palette
  private palette: WritableSignal<SjPalette> = signal(defaultTheme.palette);

  spacing: WritableSignal<(factor: number) => string> = signal(
    defaultTheme.spacing
  );

  sjTheme = computed(() => {
    return {
      breakpoints: this.breakpoints(),
      spacing: this.spacing(),
      typography: this.typography(),
      colors: this.colors(),
      palette: this.palette(),
    };
  });

  // Signal to track the current breakpoint
  currentBreakpoint = signal('xs');
  themeVersion = signal(0);
  private resizeSubscription?: Subscription;

  /**
   * Constructor to set up event listeners for window resize and load events.
   * This is necessary to update the theme according to the window size.
   */

  constructor(
    @Optional() @Inject(SJ_THEME) private theme: SjTheme,
    @Inject(DOCUMENT) private document: Document,
    private injector: Injector
  ) {
    if (this.theme) {
      this.setTheme(this.theme);
    }
    const window = this.document.defaultView;
    if (window) {
      this.resizeSubscription = fromEvent(window, 'resize')
        .pipe(
          startWith(getCurrentBreakpoint(this.sjTheme().breakpoints, window.innerWidth)),
          debounceTime(100),
          map(() => getCurrentBreakpoint(this.sjTheme().breakpoints, window.innerWidth)),
          distinctUntilChanged()
        )
        .subscribe((bp) => this.currentBreakpoint.set(bp));
    }
  }

  /**
   * Sets a new theme for the application.
   * @param theme The theme to set.
   */

  public setTheme(theme: Partial<SjTheme>) {
    const currentTheme = this.sjTheme();
    const newTheme = deepMerge(currentTheme, theme);
    this.breakpoints.set(newTheme.breakpoints);
    this.typography.set(newTheme.typography);
    this.colors.set(newTheme.colors);
    this.palette.set(newTheme.palette);
    this.spacing.set(newTheme.spacing);

    // Clear the cache in SjCssGeneratorService
    const cssGenerator = this.injector.get(SjCssGeneratorService);
    cssGenerator.clearCache();

    this.themeVersion.set(this.themeVersion() + 1);
  }

  /**
   * Lifecycle hook that is called when the service is destroyed.
   * Removes event listeners for resize and load to prevent memory leaks.
   */
  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe();
  }
}