import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
  effect,
} from '@angular/core';
import { SjStyle } from '../models/interfaces';
import { SjThemeService, SjCssGeneratorService } from '../services';
import { applyResponsiveStyle, applyTypography } from '../core/core-methods';
import { deepMerge } from '../utils';
import { shorthandMappings } from '../models/mappings';

type SjStyleProducer = () => SjStyle;
type SjInput =
  | SjStyle
  | SjStyle[]
  | SjStyleProducer
  | Array<SjStyle | SjStyleProducer>;

@Component({
  selector: 'sj-host',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class SjHostComponent implements AfterContentInit, OnChanges {
  @Input() sj: SjInput | undefined;
  @Input() toHost: boolean | '' = true;

  private lastClasses: string[] = [];
  private currentTarget: HTMLElement | null = null;
  private contentReady = false;
  private anchor: Comment | null = null;

  constructor(
    public readonly viewContainerRef: ViewContainerRef,
    private readonly hostRef: ElementRef<HTMLElement>,
    private readonly themeService: SjThemeService,
    private readonly cssGenerator: SjCssGeneratorService,
    private readonly renderer: Renderer2,
  ) {
    effect(() => {
      this.themeService.currentBreakpoint();
      this.themeService.windowWidth();
      this.themeService.themeVersion();
      this.renderStyles();
    });
  }

  ngAfterContentInit(): void {
    const host = this.hostRef.nativeElement;
    const parent = host.parentNode;

    if (parent) {
      const anchor = host.ownerDocument.createComment('sj-host');
      parent.insertBefore(anchor, host);

      while (host.firstChild) {
        parent.insertBefore(host.firstChild, host);
      }

      parent.removeChild(host);
      this.anchor = anchor;
    }

    this.contentReady = true;
    this.renderStyles();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.renderStyles();
  }

  private getTargetElement(): HTMLElement | null {
    const anchor = this.anchor;
    if (!anchor) {
      return null;
    }

    const parentElement = anchor.parentElement ?? null;
    if (this.toHost) {
      return parentElement;
    }

    let node: Node | null = anchor.nextSibling;
    while (node) {
      if (node instanceof HTMLElement) {
        return node;
      }
      node = node.nextSibling;
    }

    return parentElement;
  }

  private renderStyles(): void {
    if (!this.contentReady) {
      return;
    }

    const target = this.getTargetElement();
    if (!target) {
      return;
    }

    if (this.currentTarget && this.currentTarget !== target) {
      this.lastClasses.forEach(klass => this.renderer.removeClass(this.currentTarget, klass));
      this.lastClasses = [];
    }

    this.currentTarget = target;

    const theme = this.themeService.sjTheme();
    const callIfFn = (value: SjStyle | SjStyleProducer): SjStyle =>
      typeof value === 'function' ? (value as SjStyleProducer)() : (value as SjStyle);

    const styles = (this.sj
      ? Array.isArray(this.sj)
        ? (this.sj as Array<SjStyle | SjStyleProducer>).reduce(
            (acc, style) => deepMerge(acc, callIfFn(style)),
            {} as SjStyle,
          )
        : callIfFn(this.sj as SjStyle | SjStyleProducer)
      : {}) as SjStyle;

    const processedStyles = this.processShorthands(styles);

    this.lastClasses.forEach(klass => this.renderer.removeClass(target, klass));
    this.lastClasses = [];

    if (Object.keys(processedStyles).length > 0) {
      const classes = this.cssGenerator.getOrGenerateClasses(
        processedStyles,
        theme,
        this.themeService.themeVersion(),
      );
      classes.forEach(klass => this.renderer.addClass(target, klass));
      this.lastClasses = classes;
    }

    try {
      const width = this.themeService.windowWidth();
      applyTypography(target, theme, width);

      const textKeys = new Set([
        'fontSize',
        'fontWeight',
        'lineHeight',
        'fontFamily',
        'letterSpacing',
        'textTransform',
        'fontStyle',
        'textDecoration',
        'textAlign',
        'color',
        'c',
      ]);
      const textOverrides: SjStyle = {} as SjStyle;
      for (const key in processedStyles) {
        if (!Object.prototype.hasOwnProperty.call(processedStyles, key)) {
          continue;
        }
        if (key.startsWith('&')) {
          continue;
        }
        if (textKeys.has(key)) {
          (textOverrides as any)[key] = (processedStyles as any)[key];
        }
      }
      if (Object.keys(textOverrides).length) {
        applyResponsiveStyle(target, textOverrides, width, theme);
      }
    } catch {
      // Ignore errors from typography application on non-element targets.
    }
  }

  private processShorthands(styles: SjStyle): SjStyle {
    const newStyles: SjStyle = { ...styles };

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
}
