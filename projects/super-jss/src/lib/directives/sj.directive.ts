import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
  effect,
  Renderer2,
  ElementRef,
} from "@angular/core";
import { SjStyle } from "../models/interfaces";
import { SjThemeService, SjCssGeneratorService } from "../services";
import { deepMerge } from '../utils/deep-merge';

/**
 * Directive for applying dynamic styles, implementing SJSS (Super JavaScript Stylesheets) principles.
 * This directive handles responsive and typography styles dynamically.
 */
type SjStyleProducer = () => SjStyle;
type SjInput = SjStyle | SjStyle[] | SjStyleProducer | Array<SjStyle | SjStyleProducer>;

@Directive({
  standalone: true, // Marks this directive as standalone, not requiring an NgModule.
  selector: '[sj], h1, h2, h3, h4, h5, h6, p, span, strong, body, caption' // The selector to be used for applying this directive in templates.
})
export class SjDirective implements OnChanges {
  /**
   * The style object or array of style objects to be applied.
   * It can be a single style object or an array of style objects for responsive design.
   */
  @Input() sj: SjInput | undefined;

  private lastClasses: string[] = [];

  /**
   * Constructs the SjDirective.
   *
   * @param vcr The ViewContainerRef provides access to the host element.
   * @param el The ElementRef of the host element.
   * @param sjt The SjThemeService for accessing theme-related functionalities.
   * @param cssGenerator The SjCssGeneratorService for generating CSS classes.
   * @param renderer The Renderer2 for manipulating the DOM.
   */
  constructor(
    public vcr: ViewContainerRef,
    private el: ElementRef,
    private sjt: SjThemeService,
    private cssGenerator: SjCssGeneratorService,
    private renderer: Renderer2
  ) {
    // Initialize effect to re-render styles when the current breakpoint or theme changes.
    effect(() => {
      this.sjt.currentBreakpoint(); // depend on currentBreakpoint
      this.sjt.themeVersion(); // depend on themeVersion
      this.sjt.typography(); // depend on typography
      this.renderStyles();
    });
  }

  private processShorthands(styles: SjStyle): SjStyle {
    const newStyles: SjStyle = { ...styles };

    // Handle pseudo-selectors and nested objects
    for (const key in newStyles) {
        if (key.startsWith('&') && typeof newStyles[key] === 'object' && newStyles[key] !== null) {
            newStyles[key] = this.processShorthands(newStyles[key] as SjStyle);
        }
    }

    if (newStyles.px) {
        newStyles.pl = newStyles.px;
        newStyles.pr = newStyles.px;
        delete newStyles.px;
    }
    if (newStyles.py) {
        newStyles.pt = newStyles.py;
        newStyles.pb = newStyles.py;
        delete newStyles.py;
    }
    if (newStyles.mx) {
        newStyles.ml = newStyles.mx;
        newStyles.mr = newStyles.mx;
        delete newStyles.mx;
    }
    if (newStyles.my) {
        newStyles.mt = newStyles.my;
        newStyles.mb = newStyles.my;
        delete newStyles.my;
    }
    if (newStyles.bx) {
        newStyles.bl = newStyles.bx;
        newStyles.br = newStyles.bx;
        delete newStyles.bx;
    }
    if (newStyles.by) {
        newStyles.bt = newStyles.by;
        newStyles.bb = newStyles.by;
        delete newStyles.by;
    }
    return newStyles;
}

  /**
   * Renders the styles on the host element.
   * This method applies both typography and responsive styles.
   */
  private renderStyles(): void {
    this.lastClasses.forEach((c: string) => this.renderer.removeClass(this.vcr.element.nativeElement, c));

    const theme = this.sjt.sjTheme();
    const tagName = this.el.nativeElement.tagName.toUpperCase();
    const typographyStyles = theme.typography[tagName as keyof typeof theme.typography] || {};
    const defaultTypographyStyles = theme.typography.default || {};

    const callIfFn = (v: SjStyle | SjStyleProducer): SjStyle =>
      typeof v === 'function' ? (v as SjStyleProducer)() : (v as SjStyle);

    const sjStyles = (this.sj
      ? Array.isArray(this.sj)
        ? (this.sj as Array<SjStyle | SjStyleProducer>).reduce(
            (acc, style) => deepMerge(acc, callIfFn(style)),
            {}
          )
        : callIfFn(this.sj as any)
      : {}) as SjStyle;

    const processedStyles = this.processShorthands(sjStyles);

    const mergedStyles = deepMerge(
        deepMerge(defaultTypographyStyles, typographyStyles),
        processedStyles
    );

    if (Object.keys(mergedStyles).length > 0) {
      const classes = this.cssGenerator.getOrGenerateClasses(mergedStyles, theme);
      classes.forEach((c: string) => this.renderer.addClass(this.vcr.element.nativeElement, c));
      this.lastClasses = classes;
    }
  }

  /**
   * Lifecycle hook that is called when any data-bound property of a directive changes.
   * @param changes Object of changes.
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Re-render styles when any @Input properties change.
    this.renderStyles();
  }
}
