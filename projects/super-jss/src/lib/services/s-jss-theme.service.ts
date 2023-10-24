import { Injectable } from '@angular/core';
import {SJssTheme} from "../model";
import { BehaviorSubject, fromEvent, Subscription } from "rxjs";
import { defaultThemeConfig } from "../theme/s-jss-default-theme";
import {debounceTime} from "rxjs/operators";
import {Breakpoints} from "super-jss";

// Enumeration representing the various breakpoints

@Injectable({
  providedIn: 'root'
})
export class SJssThemeService {

  // Represents the current theme configuration
  theme: SJssTheme;

  // Holds the current active breakpoint value
  breakPoint: Breakpoints | undefined = Breakpoints.XS;

  // Observable to track changes in the theme
  readonly themeChanges$: BehaviorSubject<SJssTheme>;

  // Observable to track changes in the active breakpoint
  readonly breakPointChanges$: BehaviorSubject<Breakpoints | undefined>;

  // Subscription container to manage all active subscriptions
  subscriptions: Subscription = new Subscription();

  constructor() {
    // Set the initial theme to the default configuration
    this.theme = this.defaultTheme();

    // Initialize observables with the current theme and breakpoint values
    this.themeChanges$ = new BehaviorSubject<SJssTheme>(this.theme);
    this.breakPointChanges$ = new BehaviorSubject<Breakpoints | undefined>(this.breakPoint);

    // Subscribe to theme changes and window events to handle responsive behavior
    this.subscriptions.add(this.themeChanges().subscribe(() => { this.onResize() }));
    this.subscriptions.add(fromEvent(window, 'resize').pipe(debounceTime(25)).subscribe(() => this.onResize()));
    this.subscriptions.add(fromEvent(window, 'load').subscribe(() => this.onResize()));
  }

  /**
   * Determines the current breakpoint based on the window's width.
   * @returns The current breakpoint as a string.
   */
  determineBreakpoint(): Breakpoints | undefined {
    const width = this.getInnerWidth();
    let breakpoint: Breakpoints | undefined;
    for (const key in this.theme.breakpoints) {
      if (this.theme.breakpoints[key as Breakpoints] <= width) {
        breakpoint = key as Breakpoints;
      } else {
        break;
      }
    }
    return breakpoint;
  }

  /**
   * Handles the window resize event and updates the active breakpoint.
   */
  onResize() {
    const bp = this.determineBreakpoint();
    if (bp !== this.breakPoint) {
      this.breakPoint = bp;
      this.breakPointChanges$.next(this.breakPoint);
    }
  }

  /**
   * Updates the theme configuration.
   * @param newValue - The new theme configuration.
   */
  setTheme(newValue: SJssTheme): void {
    this.theme = newValue;
    this.themeChanges$.next(this.theme);
  }

  /**
   * Provides an observable to track theme changes.
   * @returns An observable of the theme.
   */
  themeChanges(): BehaviorSubject<SJssTheme> {
    return this.themeChanges$;
  }

  /**
   * Provides an observable to track breakpoint changes.
   * @returns An observable of the breakpoint.
   */
  breakpointChanges(): BehaviorSubject<Breakpoints | undefined> {
    return this.breakPointChanges$;
  }

  /**
   * Retrieves the current window width.
   * @returns The width of the window.
   */
  getInnerWidth(): number {
    return window.innerWidth;
  }

  /**
   * Provides the default theme configuration.
   * @returns The default theme configuration.
   */
  defaultTheme(): SJssTheme {
    return defaultThemeConfig();
  }

  /**
   * Lifecycle hook to clean up resources when the service is destroyed.
   */
  ngOnDestroy(): void {
    // Unsubscribe from all active subscriptions
    this.subscriptions.unsubscribe();
  }
}
