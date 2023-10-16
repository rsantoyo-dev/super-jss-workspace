import { Injectable } from '@angular/core';
import {Breakpoints, SJssTheme} from "./super-jss-model";
import { BehaviorSubject, fromEvent, Subscription } from "rxjs";

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
    this.subscriptions.add(fromEvent(window, 'resize').subscribe(() => this.onResize()));
    this.subscriptions.add(fromEvent(window, 'load').subscribe(() => this.onResize()));
  }

  /**
   * Determines the current breakpoint based on the window's width.
   * @returns The current breakpoint as a string.
   */
  determineBreakpoint(): Breakpoints | undefined {
    return Object.keys(this.theme.breakpoints)
      .filter(key => (this.theme.breakpoints[key as Breakpoints] < this.getInnerWidth() ? this.getInnerWidth() : 0) && key)
      .pop() as Breakpoints;
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
    return {
      breakpoints: {xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536},
      spacing: (factor) => `${0.25 * factor}rem`,
      typography: {
        default: {fontFamily: '"Roboto","Helvetica"', fontSize: '1.2em'},
        H1: {fontSize: {xs: '3em', md: '3.5em'}, fontWeight: 'bold'},
        H2: {fontSize: {xs: '2.5em', md: '3em'}, fontWeight: 'bolder'},
        H3: {fontSize: {xs: '2.0em', md: '2.5em'}, fontWeight: 'bolder'},
        H4: {fontSize: {xs: '1.8em', md: '2em'}, fontWeight: 'bolder'},
        H5: {fontSize: {xs: '1.5em', md: '1.8em'}, fontWeight: 'bolder'},
        H6: {fontSize: {xs: '1em', md: '1.2em'}, fontWeight: 'bolder'},
        P: {fontSize: '1em', fontWeight: 'normal'},
        SPAN: {fontSize: '0.8em', fontWeight: 'normal'},
      },
      palette: {
        common: {
          black: "#030303",
          white: "#fafafa",
          gray: {
            main: '#888888',
            light: '#aaaaaa',
            dark: '#555555',
            contrastText: '#dddddd',
          }
        },
        primary: {
          main: '#147a81',
          light: '#5aeae7',
          dark: '#0f5d73',
          contrastText: '#f9fff7',
        },
        secondary: {
          main: '#c72488',
          light: '#e54f99',
          dark: '#aa0c3f',
          contrastText: '#e7d9bf',
        },
        error: {
          main: '#cc1d1d',
          light: '#e3543d',
          dark: '#801f13',
          contrastText: '#e7d9bf',
        },
        warning: {
          main: '#be5419',
          light: '#f39363',
          dark: '#b03c08',
          contrastText: '#e7d9bf',
        },
        info: {
          main: '#0b619f',
          light: '#3795d9',
          dark: '#073556',
          contrastText: '#e7d9bf',
        },
        success: {
          main: '#35850e',
          light: '#7eee47',
          dark: '#163807',
          contrastText: '#e7d9bf',
        },
        text: {
          primary: '#e7e7e7',
          secondary: '#1a1a1a',
          disabled: 'rgba(16,16,16,0.39)',
        },
      }

    }
  }

  /**
   * Lifecycle hook to clean up resources when the service is destroyed.
   */
  ngOnDestroy(): void {
    // Unsubscribe from all active subscriptions
    this.subscriptions.unsubscribe();
  }
}
