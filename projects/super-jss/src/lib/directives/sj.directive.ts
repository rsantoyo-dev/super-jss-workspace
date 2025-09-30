import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
  effect,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { SjBreakPoints, SjStyle } from '../models/interfaces';
import { SjThemeService, SjCssGeneratorService } from '../services';
import { deepMerge } from '../utils/deep-merge';
import { applyResponsiveStyle } from '../core/core-methods';
import { shorthandMappings } from '../models/mappings';

/**
 * [sj] directive applies SJSS styles: responsive classes + inline typography.
 * Re-renders on theme, breakpoint and window resize changes.
 */
type SjStyleProducer = () => SjStyle;
export type SjInput =
  | SjStyle
  | SjStyle[]
  | SjStyleProducer
  | Array<SjStyle | SjStyleProducer>;

@Directive({
  standalone: true,
  // Opt-in only: apply styles/typography when [sj] is present
  selector: '[sj]:not(sj-host)',
})
export class SjDirective implements OnChanges {
  /**
   * The style object or array of style objects to be applied.
   * It can be a single style object or an array of style objects for responsive design.
   */
  @Input() sj: SjInput | undefined;

  private lastClasses: string[] = [];
  // Cache mapping serialized processed styles + themeVersion -> generated class list
  private styleCache = new Map<string, string[]>();

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
    protected el: ElementRef<HTMLElement>,
    private sjt: SjThemeService,
    private cssGenerator: SjCssGeneratorService,
    private renderer: Renderer2
  ) {
    // Initialize effect to re-render styles when the current breakpoint or theme changes.
    effect(() => {
      this.sjt.currentBreakpoint(); // depend on currentBreakpoint (responsive changes)
      // Removed windowWidth dependency to avoid re-rendering on every pixel resize.
      // Media queries handle responsive class application between breakpoints.
      const tv = this.sjt.themeVersion(); // depend on themeVersion (theme structure changes)
      // Clear local style cache when themeVersion changes to avoid stale classes
      this.styleCache.clear();
      this.renderStyles();
      return tv;
    });
  }

  /**
   * Normalizes incoming styles. Core no longer expands shorthand keys; callers
   * should provide canonical longhand properties (e.g., backgroundColor, padding)
   * or use the API shorthand helpers (sj.sh.*) which return canonical styles.
   * This method will still recurse into pseudo selectors to keep nested objects
   * intact but will not mutate shorthand keys.
   */
  protected processShorthands(styles: SjStyle): SjStyle {
    const newStyles: SjStyle = { ...styles };

    // Recurse pseudos to normalize nested objects but do not expand shorthands
    for (const key in newStyles) {
      if (
        key.startsWith('&') &&
        typeof newStyles[key] === 'object' &&
        newStyles[key] !== null
      ) {
        newStyles[key] = this.processShorthands(newStyles[key] as SjStyle);
      }
    }

    return newStyles;
  }

  /**
   * Generates/attaches classes and applies inline typography + text overrides.
   * Executed reactively by signals and on input changes.
   */
  protected renderStyles(): void {
    const element = this.el.nativeElement;
    this.lastClasses.forEach((c: string) =>
      this.renderer.removeClass(element, c)
    );

    const theme = this.sjt.sjTheme();

    const callIfFn = (v: SjStyle | SjStyleProducer): SjStyle =>
      typeof v === 'function' ? (v as SjStyleProducer)() : (v as SjStyle);

    const sjStyles = (
      this.sj
        ? Array.isArray(this.sj)
          ? (this.sj as Array<SjStyle | SjStyleProducer>).reduce(
              (acc, style) => deepMerge(acc, callIfFn(style)),
              {}
            )
          : callIfFn(this.sj as any)
        : {}
    ) as SjStyle;

    const processedStyles = this.processShorthands(sjStyles);

    // Use a cache key that includes themeVersion so classes are regenerated
    // when theme/token values change.
    const cacheKey =
      JSON.stringify(processedStyles || {}) + `::v${this.sjt.themeVersion()}`;

    let classes: string[] | undefined = this.styleCache.get(cacheKey);
    if (!classes && Object.keys(processedStyles).length > 0) {
      // Prefer bundled single-class generation when available for faster application
      // fallback to atomic class generation.
      if ((this.cssGenerator as any).getOrGenerateClassBundle) {
        classes = (this.cssGenerator as any).getOrGenerateClassBundle(
          processedStyles,
          theme,
          this.sjt.themeVersion()
        );
      } else {
        classes = this.cssGenerator.getOrGenerateClasses(
          processedStyles,
          theme,
          this.sjt.themeVersion()
        );
      }
      if (classes) this.styleCache.set(cacheKey, classes);
    }

    if (classes && classes.length > 0) {
      classes.forEach((c: string) => this.renderer.addClass(element, c));
      this.lastClasses = classes;
    }

    // Apply inline typography last so it always wins over classes
    try {
      // Use the lower bound of the current breakpoint to keep inline
      // responsive overrides stable within a breakpoint.
      const bp = this.sjt.currentBreakpoint() as keyof SjBreakPoints;
      const width = theme.breakpoints[bp];
    } catch {}
  }

  /**
   * Triggers a re-render when [sj] input changes.
   * @param changes Angular input change set.
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Re-render styles when any @Input properties change.
    this.renderStyles();
  }
}
