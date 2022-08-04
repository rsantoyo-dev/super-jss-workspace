import {Directive, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef} from '@angular/core';
import {SJss, SJssBreakingStyle, SJssTheme} from "./super-jss-model";
import {SJssThemeService} from "./s-jss-theme.service";

@Directive({
  selector: "[sJss], [sj]"
})
export class SuperJssDirective implements OnInit, OnChanges {

  @Input() sJss?: SJss;
  @Input() sj?: SJss;

  theme: SJssTheme;
  superDivElement: HTMLElement;

  constructor(private themeService: SJssThemeService, private vcr: ViewContainerRef) {
    this.theme = themeService.defaultTheme();
    this.superDivElement = vcr.element.nativeElement;
    themeService.themeChanges().subscribe(t=>{
      this.theme = t;
      this.applyStyles();
    })
    themeService.breakpointChanges().subscribe(()=>{
      this.applyStyles();
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sJss) {
      console.log('Please note that [sJss] notation is deprecated, use [sj] instead.');
      this.sj = this.sJss;
      this.applyStyles();
    }
    if (changes.sj) {
      this.sJss = this.sj;
      this.applyStyles();
    }
  }

  ngOnInit(): void {
    this.applyStyles()
  }


  applyStyles() {
    this.applyTypography(this.superDivElement, this.theme, window.innerWidth);
    this.applyStylesToElement(this.superDivElement, this.sJss ? this.sJss : {}, this.theme, window.innerWidth);
  }

  applyTypography(el: HTMLElement, theme: SJssTheme, screenWidth: number = 0) {
    Object.keys(theme.typography)?.forEach(key => {
      const jss: SJss = {marginBlockStart: '0', marginBlockEnd: '0', ...theme.typography.default}
      if (el.nodeName === key) {
        // @ts-ignore
        this.applyStylesToElement(el, {...jss, ...theme.typography[key]}, theme, screenWidth)
      }
    })
  }

  applyStylesToElement(el: HTMLElement, jssStyle: SJss = {}, theme: SJssTheme, screenWidth: number = 0): void {
      Object.keys(jssStyle)?.forEach(key => {
        // @ts-ignore
        el.style[key] = this.applyStyle(jssStyle[key], screenWidth, theme)
      })
    }


  applyStyle(styleValue: SJssBreakingStyle | string | undefined, screenWidth: number, theme: SJssTheme): string {
    let style: string | undefined = "";
    switch (typeof styleValue) {
      case 'undefined':
        return style;
      case 'string':
        return styleValue ? styleValue : '';
      case 'object':
        Object.keys(styleValue)?.forEach(key => {
          if ((key === 'xs' || key === 'sm' || key === 'md' || key === 'lg' || key === 'xl')
            && (styleValue[key] && screenWidth > theme.breakpoints[key])) {
            style = styleValue[key];
          }
        })
        break;
    }
    return style
  }


}

