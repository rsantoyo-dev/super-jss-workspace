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
import { StyleCacheManager } from '../utils/style-cache-manager';
import { shorthandMappings } from '../models/mappings';

/**
 * [sj] directive applies SJSS styles: responsive classes + inline typography.
 * Re-renders on theme, breakpoint and window resize changes.
 *
 * This directive is the core of SJSS, transforming style objects into atomic CSS classes
 * that are applied reactively based on theme and responsive breakpoints. It supports
 * various input formats including static styles, arrays, and producer functions.
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
  // Exclude components that render styles on other elements
  selector:
    '[sj]:not(sj-host):not(sj-typography):not(sj-card):not(sj-paper):not(sj-flex):not(sj-button):not(sj-input)',
})
export class SjDirective implements OnChanges {
  /**
   * The style object or array of style objects to be applied.
   * Can be a single style object, an array of styles, a producer function,
   * or a mixed array of styles and producers for dynamic styling.
   */
  @Input() sj: SjInput | undefined;

  private lastClasses: string[] = [];
  private cacheManager = new StyleCacheManager();

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
      // Snapshot theme ref as well so overrides that don't bump version still update
      this.sjt.sjTheme();
      // Removed windowWidth dependency to avoid re-rendering on every pixel resize.
      // Media queries handle responsive class application between breakpoints.
      const tv = this.sjt.themeVersion(); // depend on themeVersion (theme structure changes)
      // Clear local style cache when themeVersion changes to avoid stale classes
      this.cacheManager.clearCaches();
      this.renderStyles();
      return tv;
    });
  }

  /**
   * Triggers a re-render when [sj] input changes.
   * Clears caches when the input reference changes to ensure fresh resolution.
   * @param changes Angular input change set containing changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Re-render styles when any @Input properties change.
    // Clear the last resolved input ref if the sj input reference changed
    if (changes['sj']) {
      this.cacheManager.clearCaches();
    }
    this.renderStyles();
  }

  // Removed unused processShorthands(): generator handles shorthands directly.

  /**
   * Generates/attaches classes and applies inline typography + text overrides.
   * Executed reactively by signals and on input changes.
   */
  protected renderStyles(): void {
    const element = this.el.nativeElement;
    // remove classes added by the previous render
    this.lastClasses.forEach((c: string) =>
      this.renderer.removeClass(element, c)
    );

    const theme = this.sjt.sjTheme();

    let sjStyles: SjStyle;
    try {
      sjStyles = this.cacheManager.resolveAndMergeOnce(this.sj) as SjStyle;
    } catch (error) {
      if (typeof window !== 'undefined' && (window as any).ngDevMode) {
        console.warn('[SJ Directive] Failed to resolve styles:', error);
      }
      sjStyles = {}; // Fallback
    }

    const processedStyles = sjStyles;

    // Validate processed styles before generating CSS
    if (processedStyles && typeof processedStyles !== 'object') {
      if (typeof window !== 'undefined' && (window as any).ngDevMode) {
        console.warn(
          '[SJ Directive] Processed styles must be an object:',
          processedStyles
        );
      }
      return; // Skip rendering invalid styles
    }

    const classes = this.generateClasses(processedStyles, theme);
    this.applyClasses(element, classes);
  }

  /**
   * Generates CSS classes for the given processed styles and theme.
   * @param processedStyles The resolved and merged styles object.
   * @param theme The current theme object.
   * @returns Array of generated class names or undefined if generation failed.
   */
  private generateClasses(
    processedStyles: SjStyle,
    theme: any
  ): string[] | undefined {
    return this.cacheManager.getOrGenerateClasses(
      processedStyles,
      theme,
      this.sjt.cacheVersion(),
      this.cssGenerator
    );
  }

  /**
   * Applies the generated classes to the DOM element.
   * @param element The native DOM element to apply classes to.
   * @param classes Array of class names to apply.
   */
  private applyClasses(
    element: HTMLElement,
    classes: string[] | undefined
  ): void {
    if (classes && classes.length > 0) {
      // Apply only one canonical SJ class for best runtime performance.
      const canonical = classes[0];
      this.renderer.addClass(element, canonical);
      this.lastClasses = [canonical];
    }
  }
}
