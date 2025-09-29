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
      this.sjt.themeVersion(); // depend on themeVersion (theme structure changes)
      this.renderStyles();
    });
  }

  /**
   * Expands SJSS shorthands (px/py/mx/my/bx/by/textSize) and nests pseudos recursively.
   * @param styles Incoming style object.
   * @returns Normalized style object.
   */
  protected processShorthands(styles: SjStyle): SjStyle {
    const newStyles: SjStyle = { ...styles };

    // Handle pseudo-selectors and nested objects
    for (const key in newStyles) {
      if (
        key.startsWith('&') &&
        typeof newStyles[key] === 'object' &&
        newStyles[key] !== null
      ) {
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
    // Optional text shorthand: textSize -> fontSize
    if ((newStyles as any).textSize !== undefined) {
      (newStyles as any).fontSize = (newStyles as any).textSize;
      delete (newStyles as any).textSize;
    }

    for (const [shorthandKey, longhandKey] of Object.entries(
      shorthandMappings
    )) {
      if (!Object.prototype.hasOwnProperty.call(newStyles, shorthandKey)) {
        continue;
      }

      if (!Object.prototype.hasOwnProperty.call(newStyles, longhandKey)) {
        (newStyles as any)[longhandKey] = (newStyles as any)[shorthandKey];
      }

      delete (newStyles as any)[shorthandKey];
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

    // Do not auto-apply theme typography based on native element tag names anymore.
    // Rely on the `sj-typography` component for typography variants. Only use
    // styles explicitly provided via the [sj] input.
    const mergedStyles = processedStyles;

    if (Object.keys(mergedStyles).length > 0) {
      const classes = this.cssGenerator.getOrGenerateClasses(
        mergedStyles,
        theme,
        this.sjt.themeVersion()
      );
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
