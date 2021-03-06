import {Directive, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef} from '@angular/core';
import {SJss, SJssBreakingStyle, SJssTheme} from "./super-jss-model";
import {SuperJssService} from "./super-jss.service";


@Directive({
  selector: "[sJss], [sj]"
})
export class SuperJssDirective implements OnInit, OnChanges {

  @Input() sJss?: SJss;
  @Input() sj?: SJss;

  theme: SJssTheme;
  superDivElement: HTMLElement;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.applyStyles()
  }

  constructor(private jssStyleService: SuperJssService, private vcr: ViewContainerRef) {
    this.theme = jssStyleService.theme;
    this.superDivElement = vcr.element.nativeElement;
    jssStyleService.getTheme().subscribe(t=>{
      this.theme = t;
      this.applyThemeToStyles();
    })
  }



  ngOnChanges(changes: SimpleChanges) {
    if (changes.sJss) {
      this.sj = this.sJss;
      this.applyThemeToStyles();
    }
    if (changes.sj) {
      this.sJss = this.sj;
      this.applyThemeToStyles();
    }
  }
  applyThemeToStyles(){
    this.jssStyleService.theme = (this.theme)
    this.applyStyles()
  }

  ngOnInit(): void {
    this.applyStyles()
  }

  applyStyles() {
    this.applyTypography(this.superDivElement, this.jssStyleService.theme, window.innerWidth);
    this.applyStylesToElement(this.superDivElement, this.sJss ? this.sJss : {}, this.jssStyleService.theme, window.innerWidth);
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
    if (jssStyle) {
      Object.keys(jssStyle)?.forEach(key => {
        // @ts-ignore
        el.style[key] = this.applyStyle(jssStyle[key], screenWidth, theme)
      })
    }
  }

  applyStyle(styleValue: SJssBreakingStyle | string | undefined, screenWidth: number, theme: SJssTheme, defaultValue: string = ''): string {
    let style: string | undefined = "";
    switch (typeof styleValue) {
      case 'undefined':
        return style;
      case 'string':
        return styleValue ? styleValue : defaultValue;
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

