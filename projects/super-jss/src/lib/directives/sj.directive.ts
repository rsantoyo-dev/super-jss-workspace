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

/**
 * Directive for applying dynamic styles, implementing SJSS (Super JavaScript Stylesheets) principles.
 * This directive handles responsive and typography styles dynamically.
 */
@Directive({
  standalone: true, // Marks this directive as standalone, not requiring an NgModule.
  selector: '[sj], h1, h2, h3, h4, h5, h6, p, span, strong, body, caption' // The selector to be used for applying this directive in templates.
})
export class SjDirective implements OnChanges {
  /**
   * The style object or array of style objects to be applied.
   * It can be a single style object or an array of style objects for responsive design.
   */
  @Input() sj: SjStyle | SjStyle[] | undefined;

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

    const sjStyles = this.sj ? (Array.isArray(this.sj) ? Object.assign({}, ...this.sj) : this.sj) : {};

    const mergedStyles = { ...defaultTypographyStyles, ...typographyStyles, ...sjStyles };

    if (Object.keys(mergedStyles).length > 0) {
      const classes = this.cssGenerator.getOrGenerateClasses(mergedStyles, theme);
      classes.forEach((c: string) => this.renderer.addClass(this.vcr.element.nativeElement, c));
      this.lastClasses = classes;
    }

  if (Object.keys(mergedStyles).length > 0) {
    const classes = this.cssGenerator.getOrGenerateClasses(mergedStyles, theme);
    // ----> ADD THIS LINE <----
    console.log('SJ Directive Generated Classes:', classes);

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