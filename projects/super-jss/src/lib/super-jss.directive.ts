import { Directive, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import {SJss, SJssBreakingStyle, SJssStyles, SJssTheme} from "./super-jss-model";
import { Breakpoints, SJssThemeService } from "./s-jss-theme.service";
import { Subscription } from "rxjs";

@Directive({
  selector: "[sj]"
})
export class SuperJssDirective implements OnInit, OnChanges {

  @Input() sj?: SJss;

  theme: SJssTheme;
  superDivElement: HTMLElement;
  private subscriptions: Subscription = new Subscription();

  constructor(private themeService: SJssThemeService, private vcr: ViewContainerRef) {
    // Initialize with the default theme
    this.theme = themeService.defaultTheme();
    this.superDivElement = vcr.element.nativeElement;

    // Subscribe to theme changes and apply styles accordingly
    this.subscriptions.add(
      themeService.themeChanges().subscribe(t => {
        this.theme = t;
        this.applyStyles();
      })
    );

    // Subscribe to breakpoint changes and apply styles accordingly
    this.subscriptions.add(
      themeService.breakpointChanges().subscribe(() => {
        this.applyStyles();
      })
    );
  }

  // Detect changes in the input and apply styles if necessary
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sj) {
      this.applyStyles();
    }
  }

  // Apply styles on initialization
  ngOnInit(): void {
    this.applyStyles();
  }

  // Main method to apply styles
  applyStyles() {
    this.applyTypography(this.superDivElement, this.theme, window.innerWidth);
    this.applyStylesToElement(this.superDivElement, this.sj ? this.sj : {}, this.theme, window.innerWidth);
  }

  // Apply typography styles based on the theme and element type
  applyTypography(el: HTMLElement, theme: SJssTheme, screenWidth: number) {
    Object.keys(theme.typography).forEach(key => {
      const jss: SJss = { marginBlockStart: '0', marginBlockEnd: '0', ...theme.typography.default };
      const specificStyle: SJss | undefined = theme.typography[key as keyof typeof theme.typography];
      if (el.nodeName === key && specificStyle) {
        this.applyStylesToElement(el, { ...jss, ...specificStyle }, theme, screenWidth);
      }
    });
  }

  // Apply styles to an element based on the provided JSS style
  applyStylesToElement(el: HTMLElement, jssStyle: SJss, theme: SJssTheme, screenWidth: number): void {
    if (Array.isArray(jssStyle)) {
      jssStyle.forEach(styleObj => {
        this.setStyleProperties(el, styleObj, theme, screenWidth);
      });
    } else {
      this.setStyleProperties(el, jssStyle, theme, screenWidth);
    }
  }

  // Helper method to set style properties on an element
  setStyleProperties(el: HTMLElement, styleObj: SJssStyles, theme: SJssTheme, screenWidth: number): void {
    Object.keys(styleObj).forEach(key => {
      try {
        el.style[key as any] = this.applyStyle(styleObj[key], screenWidth, theme);
      } catch (error) {
        console.error(`Failed to apply style for key: ${key}`, error);
      }
    });
  }

  // Determine the appropriate style value based on screen width and theme
  applyStyle(styleValue: SJssBreakingStyle | string | undefined, screenWidth: number, theme: SJssTheme): string {
    let style: string = "";

    if (typeof styleValue === 'string') {
      return styleValue;
    } else if (typeof styleValue === 'object') {
      Object.keys(styleValue).forEach(key => {
        if (Object.values(Breakpoints).includes(key as Breakpoints)
          && styleValue[key as Breakpoints]
          && screenWidth > theme.breakpoints[key as Breakpoints]) {
          style = styleValue[key as Breakpoints]!;
        }
      });
    }
    return style;
  }

  // Cleanup: Unsubscribe from all active subscriptions
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
