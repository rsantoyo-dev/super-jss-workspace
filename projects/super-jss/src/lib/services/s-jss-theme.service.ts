import { Injectable, signal, WritableSignal, effect } from '@angular/core';
import { Breakpoints, SJssTheme } from "../model";
import { defaultThemeConfig } from "../theme";
import { determineBreakpoint } from "./helpers";

@Injectable({
  providedIn: 'root'
})
export class SJssThemeService {
  theme = signal(this.defaultTheme());
  breakPoint: WritableSignal<Breakpoints> = signal(Breakpoints.XS);
  innerWidth = signal(window.innerWidth);

  
  

  constructor() {
    effect(() => {
      this.onResize(this.theme)
    }, { allowSignalWrites: true });

    window.addEventListener('resize', () => this.onResize(this.theme));
    window.addEventListener('load', () => this.onResize(this.theme));
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
   * Provides the current theme configuration.
   * @returns The current theme configuration.
   */
  defaultTheme(): SJssTheme {
    return defaultThemeConfig();
  }

  /**
   * Lifecycle hook to clean up resources when the service is destroyed.
   */
  ngOnDestroy(): void {
    // Unsubscribe from all active subscriptions
    window.removeEventListener('resize', () => this.onResize(this.theme));
    window.removeEventListener('load', () => this.onResize(this.theme));
  }
}
