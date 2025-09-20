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
import { applyTypography, applyResponsiveStyle } from '../core/core-methods';
import { shorthandMappings } from '../models/mappings';

/**
 * [sj] directive applies SJSS styles: responsive classes + inline typography.
 * Re-renders on theme, breakpoint and window resize changes.
 */
type SjStyleProducer = () => SjStyle;
type SjInput = SjStyle | SjStyle[] | SjStyleProducer | Array<SjStyle | SjStyleProducer>;

@Directive({
  standalone: true,
  // Opt-in only: apply styles/typography when [sj] is present
  selector: '[sj]'
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
      this.sjt.windowWidth(); // depend on raw window width to re-render on any resize
      this.sjt.themeVersion(); // depend on themeVersion
      this.renderStyles();
    });
  }

  /**
   * Expands SJSS shorthands (px/py/mx/my/bx/by/textSize) and nests pseudos recursively.
   * @param styles Incoming style object.
   * @returns Normalized style object.
   */
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
    // Optional text shorthand: textSize -> fontSize
    if ((newStyles as any).textSize !== undefined) {
      (newStyles as any).fontSize = (newStyles as any).textSize;
      delete (newStyles as any).textSize;
    }

    for (const [shorthandKey, longhandKey] of Object.entries(shorthandMappings)) {
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

    // Only apply theme typography (default + tag) if the element has a specific entry.
    // Non-text elements (e.g., DIV) do not receive default typography classes.
    const hasTagTypography = !!(theme.typography as any)[tagName];
    const baseTypography = hasTagTypography
      ? (deepMerge(defaultTypographyStyles, typographyStyles) as SjStyle)
      : ({} as SjStyle);

    const mergedStyles = deepMerge(baseTypography, processedStyles);

    if (Object.keys(mergedStyles).length > 0) {
      const classes = this.cssGenerator.getOrGenerateClasses(mergedStyles, theme, this.sjt.themeVersion());
      classes.forEach((c: string) => this.renderer.addClass(this.vcr.element.nativeElement, c));
      this.lastClasses = classes;
    }

    // Apply inline typography last so it always wins over classes
    try {
      const width = this.sjt.windowWidth();
      applyTypography(this.vcr.element.nativeElement, theme, width);
      // Then apply any text-related overrides from [sj] inline so they win over theme typography
      const textKeys = new Set([
        'fontSize', 'fontWeight', 'lineHeight', 'fontFamily', 'letterSpacing',
        'textTransform', 'fontStyle', 'textDecoration', 'textAlign', 'color', 'c'
      ]);
      const textOverrides: SjStyle = {} as SjStyle;
      for (const k in processedStyles) {
        if (!Object.prototype.hasOwnProperty.call(processedStyles, k)) continue;
        if (k.startsWith('&')) continue;
        if (textKeys.has(k)) (textOverrides as any)[k] = (processedStyles as any)[k];
      }
      if (Object.keys(textOverrides).length) {
        applyResponsiveStyle(this.vcr.element.nativeElement, textOverrides, width, theme);
      }
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
