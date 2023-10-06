import {Directive, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef} from '@angular/core';
import {SJss, SJssBreakingStyle, SJssTheme} from "./super-jss-model";
import {Breakpoints, SJssThemeService} from "./s-jss-theme.service";
import {Subscription} from "rxjs";

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
    this.applyStyles()
  }

  applyStyles() {
    this.applyTypography(this.superDivElement, this.theme, window.innerWidth);
    this.applyStylesToElement(this.superDivElement, this.sj ? this.sj : {}, this.theme, window.innerWidth);
  }

  applyTypography(el: HTMLElement, theme: SJssTheme, screenWidth: number) {
    Object.keys(theme.typography)?.forEach(key => {
      const jss: SJss = {marginBlockStart: '0', marginBlockEnd: '0', ...theme.typography.default}
      if (el.nodeName === key) {
        // @ts-ignore
        this.applyStylesToElement(el, {...jss, ...theme.typography[key]}, theme, screenWidth)
      }
    })
  }

  applyStylesToElement(el: HTMLElement, jssStyle: SJss, theme: SJssTheme, screenWidth: number): void {
      Object.keys(jssStyle)?.forEach(key => {
        // @ts-ignore
        el.style[key] = this.applyStyle(jssStyle[key], screenWidth, theme)
      })
    }


  applyStyle(styleValue: SJssBreakingStyle | string | undefined, screenWidth: number, theme: SJssTheme): string {
    let style: string | undefined = "";

    switch (typeof styleValue) {
      case 'string':
        return styleValue ? styleValue : '';
      case 'object':
        Object.keys(styleValue).forEach(key => {
          if (Object.values(Breakpoints).includes(key as Breakpoints)
            && styleValue[key as Breakpoints]
            && screenWidth > theme.breakpoints[key as Breakpoints]) {
            style = styleValue[key as Breakpoints];
          }
        });
        break;
    }
    return style || "";
  }


  ngOnDestroy(): void {
    // Unsubscribe from all active subscriptions
    this.subscriptions.unsubscribe();
  }

}

