import { booleanAttribute, ChangeDetectionStrategy, Component, Input, AfterContentInit, OnChanges, SimpleChanges, ElementRef, Renderer2, effect } from '@angular/core';
import { sjCard, SjCardApi } from '../blueprints/card';
import { SjHostComponent } from './sj-host.component';
import { SjStyle } from '../models/interfaces';
import type { SjInput } from '../directives/sj.directive';
import { SjCardVariant } from '../models/variants';
import { SjThemeService } from '../services';
import { SjCssGeneratorService } from '../services/sj-css-generator.service';

@Component({
  selector: 'sj-card',
  standalone: true,
  template: `<sj-host [sj]="hostSj"><ng-content></ng-content></sj-host>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SjHostComponent],
})
export class SjCardComponent implements AfterContentInit, OnChanges {
  sjCard = sjCard
  // Visual variant of the card blueprint
  @Input() variant: SjCardVariant = 'default';
  // Optional user overrides to merge after the variant
  @Input() sj: SjInput | undefined;
  
  // Optional surface controls (off by default to preserve current look)
  @Input() density: 1 | 2 | 3 | 4 = 2;
  @Input({ transform: booleanAttribute }) usePadding: boolean = false;
  @Input({ transform: booleanAttribute }) useGap: boolean = false;
  @Input({ transform: booleanAttribute }) useRounded: boolean = false;
  @Input({ transform: booleanAttribute }) useSurface: boolean = false;
  // Host mode: apply styles to parent element and remove <sj-card> wrapper
  @Input({ transform: booleanAttribute }) host: boolean = false;

  private parentEl: HTMLElement | null = null;
  private lastAppliedClass: string | null = null;

  constructor(
    private themeService: SjThemeService,
    private cssGenerator: SjCssGeneratorService,
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {
    // Re-apply classes on theme structure changes when in host mode
    effect(() => {
      this.themeService.themeVersion();
      if (this.host && this.parentEl) {
        this.applyToParent();
      }
    });
  }

  get selectedSj(): (overrides?: Partial<SjStyle>) => SjStyle {
    return this.pickVariant(this.sjCard);
  }

  private pickVariant(api: SjCardApi): (overrides?: Partial<SjStyle>) => SjStyle {
    switch (this.variant) {
      case 'outlined': return api.outlined;
      case 'flat': return api.flat;
      case 'elevated': return api.elevated;
      case 'interactive': return api.interactive;
      case 'primary': return api.primary;
      case 'secondary': return api.secondary;
      case 'info': return api.info;
      case 'codeSnippet': return api.codeSnippet;
      case 'default':
      default: return api;
    }
  }

  // Compose variant base with user-provided overrides so user wins
  get hostSj(): SjInput {
    // Normalize selected variant to a zero-arg producer for SjInput
    const base = () => {
      const v = this.selectedSj();
      const overrides: Partial<SjStyle> = {};
      const level = this.density ?? 2;
      const theme = this.themeService.sjTheme();
      const surfaces = theme.components?.surfaces;
      const paddingMap = surfaces?.padding ?? {};
      const gapMap = surfaces?.gap ?? {};
      const radiusMap = surfaces?.radius ?? {};

      const enablePadding = this.useSurface || this.usePadding;
      const enableGap = this.useSurface || this.useGap;
      const enableRounded = this.useSurface || this.useRounded;

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

      return Object.keys(overrides).length ? { ...v, ...overrides } : v;
    };
    const user = this.sj;
    if (user === undefined) return base;
    return Array.isArray(user) ? [base, ...user] : [base, user];
  }

  ngAfterContentInit(): void {
    if (!this.host) return;
    const cardEl = this.el.nativeElement;
    const parent = cardEl.parentElement as HTMLElement | null;
    if (!parent) return;
    this.parentEl = parent;

    // Apply classes to parent before moving nodes so initial paint looks right
    this.applyToParent();

    // Move children out and remove this wrapper element
    while (cardEl.firstChild) {
      parent.insertBefore(cardEl.firstChild, cardEl);
    }
    parent.removeChild(cardEl);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.host && this.parentEl) {
      this.applyToParent();
    }
  }

  private composeStyle(): SjStyle {
    const v = this.selectedSj();
    const overrides: Partial<SjStyle> = {};
    const level = this.density ?? 2;
    const theme = this.themeService.sjTheme();
    const surfaces = theme.components?.surfaces;
    const paddingMap = surfaces?.padding ?? {};
    const gapMap = surfaces?.gap ?? {};
    const radiusMap = surfaces?.radius ?? {};

    const enablePadding = this.useSurface || this.usePadding;
    const enableGap = this.useSurface || this.useGap;
    const enableRounded = this.useSurface || this.useRounded;

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

    return Object.keys(overrides).length ? ({ ...v, ...overrides } as SjStyle) : (v as SjStyle);
  }

  private applyToParent(): void {
    if (!this.parentEl) return;
    const theme = this.themeService.sjTheme();
    const styles = this.composeStyle();
    const classes = (this.cssGenerator as any).getOrGenerateClassBundle
      ? (this.cssGenerator as any).getOrGenerateClassBundle(styles, theme, this.themeService.themeVersion())
      : this.cssGenerator.getOrGenerateClasses(styles, theme, this.themeService.themeVersion());
    const canonical = Array.isArray(classes) && classes.length ? classes[0] : null;
    if (!canonical) return;
    if (this.lastAppliedClass) {
      this.renderer.removeClass(this.parentEl, this.lastAppliedClass);
    }
    this.renderer.addClass(this.parentEl, canonical);
    this.lastAppliedClass = canonical;
  }

}
