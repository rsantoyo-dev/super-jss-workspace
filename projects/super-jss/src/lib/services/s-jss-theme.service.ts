import {Injectable, signal, WritableSignal} from '@angular/core';
import {Breakpoints, SJssTheme} from "../model";
import { BehaviorSubject, fromEvent, Subscription } from "rxjs";
import { defaultThemeConfig } from "../theme";
import {toObservable} from "@angular/core/rxjs-interop";


// Enumeration representing the various breakpoints

@Injectable({
  providedIn: 'root'
})
export class SJssThemeService {

  theme = signal(this.defaultTheme());
  theme$ = toObservable(this.theme);

  // Holds the current active breakpoint value
  breakPoint: Breakpoints = Breakpoints.XS;

  // Observable to track changes in the active breakpoint
  breakPointChanges$: BehaviorSubject<Breakpoints>;

  // Subscription container to manage all active subscriptions
  subscriptions: Subscription = new Subscription();

  constructor() {
    // Initialize observables with the current theme and breakpoint values
    this.breakPointChanges$ = new BehaviorSubject<Breakpoints>(this.breakPoint);

    this.subscriptions.add(this.theme$.subscribe(theme => {
      this.onResize()
    }));
    this.subscriptions.add(fromEvent(window, 'resize').subscribe(() => this.onResize()));
    this.subscriptions.add(fromEvent(window, 'load').subscribe(() => this.onResize()));
  }

  /**
   * Determines the current breakpoint based on the window's width.
   * @returns The current breakpoint as a string.
   */
  determineBreakpoint(theme:WritableSignal<SJssTheme>): Breakpoints {
    const width = this.getInnerWidth();
    let breakpoint: Breakpoints = Breakpoints.XS;
    for (const key in theme().breakpoints) {
      if (theme().breakpoints[key as Breakpoints] <= width) {
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
    const bp = this.determineBreakpoint(this.theme);
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
    this.theme.set(newValue);
  }

  /**
   * Provides an observable to track breakpoint changes.
   * @returns An observable of the breakpoint.
   */
  breakpointChanges(): BehaviorSubject<Breakpoints> {
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
