import { AfterContentInit, Component, ElementRef, Renderer2, ViewContainerRef, Input, OnChanges, SimpleChanges, booleanAttribute } from '@angular/core';
import { SjDirective } from '../directives/sj.directive';
import { SjCssGeneratorService, SjThemeService } from '../services';
import { sjPaper } from '../blueprints/paper';
import { sjCard } from '../blueprints/card';
import type { SjStyle } from '../models/interfaces';
import type { SjInput } from '../directives/sj.directive';

/**
 * Lightweight host element that forwards `[sj]` styles to its surrounding parent.
 * Useful when the consumer is dynamically instantiating a component and needs a
 * dedicated hook to apply Super JSS styles without introducing extra DOM wrappers.
 */
@Component({
  selector: 'sj-host',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class SjHostComponent extends SjDirective implements AfterContentInit, OnChanges {
  // Blueprint emulation: behave as 'paper' or 'card' while still merging [sj]
  @Input() as: 'paper' | 'card' | undefined;
  @Input() variant: string | undefined;
  @Input() paperVariant: string | undefined;
  @Input() cardVariant: string | undefined;
  @Input() density: 1 | 2 | 3 | 4 = 2;
  @Input({ transform: booleanAttribute }) useSurface: boolean = false;
  @Input({ transform: booleanAttribute }) usePadding: boolean = false;
  @Input({ transform: booleanAttribute }) useGap: boolean = false;
  @Input({ transform: booleanAttribute }) useRounded: boolean = false;
  // Aliases to improve discoverability in templates
  @Input({ transform: booleanAttribute }) set asPaper(v: boolean) {
    if (v) this.as = 'paper';
  }
  @Input({ transform: booleanAttribute }) set asCard(v: boolean) {
    if (v) this.as = 'card';
  }

  // Keep a reference to the user-provided [sj] so we can compose it
  private userSj: SjInput | undefined;

  constructor(
    viewContainerRef: ViewContainerRef,
    elementRef: ElementRef<HTMLElement>,
    private themeService: SjThemeService,
    cssGenerator: SjCssGeneratorService,
    renderer: Renderer2,
  ) {
    super(viewContainerRef, elementRef, themeService, cssGenerator, renderer);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.prototype.hasOwnProperty.call(changes, 'sj')) {
      // Capture the user's [sj] before composing
      this.userSj = (changes as any)['sj']?.currentValue as SjInput | undefined;
    }
    this.composeHostStyles();
    // Let base directive react (renders and handles caches/versioning)
    super.ngOnChanges(changes);
  }

  ngAfterContentInit(): void {
    const host = this.el.nativeElement;
    const parent = host.parentElement;

    if (!parent) {
      return;
    }

    while (host.firstChild) {
      parent.insertBefore(host.firstChild, host);
    }

    parent.removeChild(host);

    this.el = new ElementRef(parent as HTMLElement);
    // Re-compose now that host moved to parent and apply styles
    this.composeHostStyles();
    this.renderStyles();
  }

  private composeHostStyles(): void {
    // If no blueprint behavior requested, keep existing [sj]
    if (!this.as) {
      return;
    }

    const level = this.density ?? 2;
    const theme = this.themeService.sjTheme();
    const surfaces = theme.components?.surfaces;
    const paddingMap = surfaces?.padding ?? {};
    const gapMap = surfaces?.gap ?? {};
    const radiusMap = surfaces?.radius ?? {};

    let base: (overrides?: Partial<SjStyle>) => SjStyle;
    if (this.as === 'paper') {
      // Resolve paper variant
      const v = (this.paperVariant ?? this.variant) as any;
      switch (v) {
        case 'flat':
          base = sjPaper.flat; break;
        case 'outlined':
          base = sjPaper.outlined; break;
        case 'filled':
        case 'default':
        default:
          base = sjPaper; break;
      }
    } else {
      // as === 'card'
      const v = (this.cardVariant ?? this.variant) as any;
      switch (v) {
        case 'outlined': base = sjCard.outlined; break;
        case 'flat': base = sjCard.flat; break;
        case 'elevated': base = sjCard.elevated; break;
        case 'interactive': base = sjCard.interactive; break;
        case 'primary': base = sjCard.primary; break;
        case 'secondary': base = sjCard.secondary; break;
        case 'info': base = sjCard.info; break;
        case 'codeSnippet': base = sjCard.codeSnippet; break;
        case 'default':
        default: base = sjCard; break;
      }
    }

    const enablePadding = this.useSurface || this.usePadding;
    const enableGap = this.useSurface || this.useGap;
    const enableRounded = this.useSurface || this.useRounded;

    const baseProducer = (): SjStyle => {
      const style = base();
      const overrides: Partial<SjStyle> = {};
      if (enablePadding) {
        const p = (paddingMap as any)[level];
        if (p !== undefined) (overrides as any).padding = p as any;
      }
      if (enableGap) {
        const g = (gapMap as any)[level];
        if (g !== undefined) (overrides as any).gap = g as any;
      }
      if (enableRounded) {
        const r = (radiusMap as any)[level];
        if (r !== undefined) (overrides as any).borderRadius = r as any;
      }
      return Object.keys(overrides).length ? { ...style, ...overrides } : style;
    };

    const user = this.userSj ?? (this as any).sj as SjInput | undefined;
    if (user === undefined) {
      (this as any).sj = baseProducer;
    } else {
      (this as any).sj = Array.isArray(user) ? [baseProducer, ...user] : [baseProducer, user];
    }
  }
}
