import { booleanAttribute, ChangeDetectionStrategy, Component, Input, AfterContentInit, OnChanges, SimpleChanges, ElementRef, Renderer2, effect } from '@angular/core';
import { sjPaper, SjPaperApi } from '../blueprints/paper';
import { SjStyle } from '../models/interfaces';
import { SjPaperVariant } from '../models/variants';
import { SjThemeService } from '../services';
import { SjCssGeneratorService } from '../services/sj-css-generator.service';

@Component({
  selector: 'sj-paper',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class SjPaperComponent implements AfterContentInit, OnChanges {
  sjPaper = sjPaper;

  @Input() variant: SjPaperVariant = 'default';
  @Input() sj: any | undefined;
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
  // Non-host mode: choose underlying element when replacing wrapper
  @Input() component: 'div' | 'section' | 'article' | 'span' | 'main' | 'aside' | 'header' | 'footer' = 'div';

  private parentEl: HTMLElement | null = null;
  private targetEl: HTMLElement | null = null;
  private lastAppliedClass: string | null = null;

  constructor(
    private themeService: SjThemeService,
    private cssGenerator: SjCssGeneratorService,
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {
    // Re-apply classes on theme changes
    effect(() => {
      this.themeService.themeVersion();
      if (this.host) {
        if (this.parentEl) this.applyToParent();
      } else {
        this.applyToTarget();
      }
    });
  }

  get selectedSj(): (overrides?: Partial<SjStyle>) => SjStyle {
    return this.pickVariant(this.sjPaper);
  }

  private pickVariant(
    api: SjPaperApi
  ): (overrides?: Partial<SjStyle>) => SjStyle {
    switch (this.variant) {
      case 'outlined':
        return api.outlined;
      case 'flat':
        return api.flat;
      case 'filled':
        return api.filled;
      case 'default':
      default:
        return api;
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

    let style: SjStyle = Object.keys(overrides).length ? ({ ...v, ...overrides } as SjStyle) : (v as SjStyle);
    // Merge user overrides after base
    const user = this.sj;
    if (user !== undefined) {
      const push = (acc: any, val: any) => {
        if (val === undefined || val === null) return acc;
        if (Array.isArray(val)) return val.reduce(push, acc);
        if (typeof val === 'function') return push(acc, val());
        if (typeof val === 'object') return Object.assign(acc, val);
        return acc;
      };
      style = push(style, user);
    }
    return style;
  }

  ngAfterContentInit(): void {
    const hostEl = this.el.nativeElement;
    const parent = hostEl.parentElement as HTMLElement | null;
    if (!parent) return;
    if (this.host) {
      this.parentEl = parent;
      this.applyToParent();
      // Move children out and remove host wrapper
      while (hostEl.firstChild) parent.insertBefore(hostEl.firstChild, hostEl);
      parent.removeChild(hostEl);
    } else {
      const newEl = this.renderer.createElement(this.component || 'div');
      this.renderer.addClass(newEl, 'SjPaper');
      this.renderer.addClass(newEl, 'Paper');
      while (hostEl.firstChild) this.renderer.appendChild(newEl, hostEl.firstChild);
      this.renderer.insertBefore(parent, newEl, hostEl);
      this.renderer.removeChild(parent, hostEl);
      this.targetEl = newEl as HTMLElement;
      this.applyToTarget();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.host) {
      if (this.parentEl) this.applyToParent();
    } else {
      if (changes['component'] && !changes['component'].firstChange) this.rebuildTargetElement();
      this.applyToTarget();
    }
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
    if (this.lastAppliedClass) this.renderer.removeClass(this.parentEl, this.lastAppliedClass);
    this.renderer.addClass(this.parentEl, canonical);
    this.lastAppliedClass = canonical;
  }

  private rebuildTargetElement(): void {
    if (!this.targetEl) return;
    const old = this.targetEl;
    const parent = old.parentElement;
    if (!parent) return;
    const replacement = this.renderer.createElement(this.component || 'div');
    this.renderer.addClass(replacement, 'SjPaper');
    this.renderer.addClass(replacement, 'Paper');
    while (old.firstChild) this.renderer.appendChild(replacement, old.firstChild);
    this.renderer.insertBefore(parent, replacement, old);
    this.renderer.removeChild(parent, old);
    this.targetEl = replacement as HTMLElement;
    this.lastAppliedClass = null;
  }

  private applyToTarget(): void {
    if (!this.targetEl) return;
    const theme = this.themeService.sjTheme();
    const styles = this.composeStyle();
    const classes = (this.cssGenerator as any).getOrGenerateClassBundle
      ? (this.cssGenerator as any).getOrGenerateClassBundle(styles, theme, this.themeService.themeVersion())
      : this.cssGenerator.getOrGenerateClasses(styles, theme, this.themeService.themeVersion());
    const canonical = Array.isArray(classes) && classes.length ? classes[0] : null;
    if (!canonical) return;
    if (this.lastAppliedClass) this.renderer.removeClass(this.targetEl, this.lastAppliedClass);
    this.renderer.addClass(this.targetEl, canonical);
    this.lastAppliedClass = canonical;
  }
}
