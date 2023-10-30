import { Injectable, signal, WritableSignal, effect } from '@angular/core';
import { Breakpoints, SJssTheme } from "../model";

import { determineBreakpoint } from "./helpers";
import { theme } from '../directives';


@Injectable({
  providedIn: 'root'
})
export class SJssThemeService {
  //theme = signal(this.defaultTheme());
  breakPoint: WritableSignal<Breakpoints> = signal(Breakpoints.XS);
  innerWidth = signal(window.innerWidth);

  constructor() {
    effect(() => {
      this.onResize(theme)
    }, { allowSignalWrites: true });

    window.addEventListener('resize', () => this.onResize(theme));
    window.addEventListener('load', () => this.onResize(theme));
  }

  /**
   * Updates the breakpoint and inner width values.
   * @param theme - The current theme configuration.
   */
  onResize(theme: WritableSignal<SJssTheme>) {
    this.innerWidth.set(window.innerWidth);
    const bp = determineBreakpoint(theme, this.innerWidth);
    this.breakPoint.set((bp !== this.breakPoint()) ? bp : this.breakPoint());
  }

  /**
   * Lifecycle hook to clean up resources when the service is destroyed.
   */
  ngOnDestroy(): void {
    // Unsubscribe from all active subscriptions
    window.removeEventListener('resize', () => this.onResize(theme));
    window.removeEventListener('load', () => this.onResize(theme));
  }
}
