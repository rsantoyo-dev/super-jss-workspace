import {Injectable, signal, WritableSignal} from '@angular/core';
import {Breakpoints, SJssTheme} from "../model";
import { fromEvent, Subscription } from "rxjs";
import { defaultThemeConfig } from "../theme";
import {toObservable} from "@angular/core/rxjs-interop";


// Enumeration representing the various breakpoints

@Injectable({
  providedIn: 'root'
})
export class SJssThemeService {

  theme = signal(this.defaultTheme());
  theme$ = toObservable(this.theme);

  breakPoint = signal(Breakpoints.XS);
  breakPoint$ = toObservable(this.breakPoint);

  innerWidth = signal(window.innerWidth);

  subscriptions: Subscription = new Subscription();

  constructor() {
    this.subscriptions.add(this.theme$.subscribe(() => {
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
    const width = this.innerWidth();
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
    this.innerWidth.set(window.innerWidth);
    const bp = this.determineBreakpoint(this.theme);
    this.breakPoint.set((bp !== this.breakPoint()) ? bp : this.breakPoint());
  }

  /**
   * Updates the theme configuration.
   * @param newValue - The new theme configuration.
   */
  setTheme(newValue: SJssTheme): void {
    this.theme.set(newValue);
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
