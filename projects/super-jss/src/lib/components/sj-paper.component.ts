import { booleanAttribute, ChangeDetectionStrategy, Component, Input, AfterContentInit, OnChanges, SimpleChanges, ElementRef, Renderer2, effect } from '@angular/core';
import { sjPaper, SjPaperApi } from '../blueprints/paper';
import { SjHostComponent } from './sj-host.component';
import { SjStyle } from '../models/interfaces';
import type { SjInput } from '../directives/sj.directive';
import { SjPaperVariant } from '../models/variants';
import { SjThemeService } from '../services';
import { SjCssGeneratorService } from '../services/sj-css-generator.service';

@Component({
  selector: 'sj-paper',
  standalone: true,
  template: `<sj-host [sj]="hostSj"><ng-content></ng-content></sj-host>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SjHostComponent],
})
export class SjPaperComponent implements AfterContentInit, OnChanges {
  sjPaper = sjPaper;

  @Input() variant: SjPaperVariant = 'default';
  @Input() sj: SjInput | undefined;
  // Surface density: 1..4 (compact -> spacious). Default 2.
  @Input() density: 1 | 2 | 3 | 4 = 2;
  // Toggles to apply density-driven styles
  @Input({ transform: booleanAttribute }) usePadding: boolean = false;
  @Input({ transform: booleanAttribute }) useGap: boolean = false;
  @Input({ transform: booleanAttribute }) useRounded: boolean = false;
  // Convenience: enable padding+gap+rounded together at current density
  @Input({ transform: booleanAttribute }) useSurface: boolean = false;
  // Host mode: apply styles to parent element and remove <sj-paper> wrapper
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
    return this.pickVariant(this.sjPaper);
  }

  private pickVariant(api: SjPaperApi): (overrides?: Partial<SjStyle>) => SjStyle {
    switch (this.variant) {
      case 'flat':
        return api.flat;
      case 'outlined':
        return api.outlined;
      case 'filled':
        return api.filled;
      case 'default':
      default:
        return api;
    }
  }

  get hostSj(): SjInput {
    const base = () => {
      const style = this.composeStyle();
      return style;
    };
    const user = this.sj;
    if (user === undefined) return base;
    return Array.isArray(user) ? [base, ...user] : [base, user];
  }

  ngAfterContentInit(): void {
    if (!this.host) return;
    const paperEl = this.el.nativeElement;
    const parent = paperEl.parentElement as HTMLElement | null;
    if (!parent) return;
    this.parentEl = parent;

    // Apply classes to parent before moving nodes so initial paint looks right
    this.applyToParent();

    // Move children out and remove this wrapper element
    while (paperEl.firstChild) {
      parent.insertBefore(paperEl.firstChild, paperEl);
    }
    parent.removeChild(paperEl);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.host && this.parentEl) {
      this.applyToParent();
    }
  }

  private composeStyle(): SjStyle {
    const style = this.selectedSj();
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

    return Object.keys(overrides).length ? ({ ...style, ...overrides } as SjStyle) : (style as SjStyle);
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
