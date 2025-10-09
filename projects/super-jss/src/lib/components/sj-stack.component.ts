import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, effect } from '@angular/core';
import { SjStyle } from '../models/interfaces';
import type { SjInput } from '../directives/sj.directive';
import { SjThemeService } from '../services';
import { SjCssGeneratorService } from '../services/sj-css-generator.service';

@Component({
  selector: 'sj-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
})
export class SjStackComponent implements AfterContentInit, OnChanges {
  @Input() sj: SjInput | undefined;
  @Input() component:
    | 'div'
    | 'section'
    | 'article'
    | 'span'
    | 'nav'
    | 'header'
    | 'footer'
    | 'main'
    | 'aside' = 'div';
  // Layout inputs (flex stack)
  @Input() direction: 'row' | 'column' = 'row';
  @Input() gap: any | undefined;
  @Input() justify:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  @Input() align:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline'
    | undefined;
  @Input() wrap: 'wrap' | 'nowrap' | 'wrap-reverse' | undefined;
  @Input() inline: boolean = false;

  private targetEl: HTMLElement | null = null;
  private lastAppliedClass: string | null = null;

  constructor(
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private themeService: SjThemeService,
    private cssGenerator: SjCssGeneratorService,
  ) {
    // Re-apply when theme structure changes
    effect(() => {
      this.themeService.themeVersion();
      this.applyToTarget();
    });
  }

  ngAfterContentInit(): void {
    const host = this.hostRef.nativeElement;
    const parent = host.parentElement;
    if (!parent) return;

    const newEl = this.renderer.createElement(this.component || 'div');
    this.renderer.addClass(newEl, 'SjStack');

    while (host.firstChild) this.renderer.appendChild(newEl, host.firstChild);
    this.renderer.insertBefore(parent, newEl, host);
    this.renderer.removeChild(parent, host);

    this.targetEl = newEl as HTMLElement;
    this.applyToTarget();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['component'] && !changes['component'].firstChange) {
      this.rebuildTargetElement();
    }
    if (
      changes['sj'] ||
      changes['direction'] ||
      changes['gap'] ||
      changes['justify'] ||
      changes['align'] ||
      changes['wrap'] ||
      changes['inline']
    ) {
      this.applyToTarget();
    }
  }

  private rebuildTargetElement(): void {
    if (!this.targetEl) return;
    const old = this.targetEl;
    const parent = old.parentElement;
    if (!parent) return;
    const replacement = this.renderer.createElement(this.component || 'div');
    this.renderer.addClass(replacement, 'SjStack');
    while (old.firstChild) this.renderer.appendChild(replacement, old.firstChild);
    this.renderer.insertBefore(parent, replacement, old);
    this.renderer.removeChild(parent, old);
    this.targetEl = replacement as HTMLElement;
    this.lastAppliedClass = null;
  }

  private composeStyle(): SjStyle {
    const style: SjStyle = {
      display: this.inline ? ('inline-flex' as any) : 'flex',
      flexDirection: this.direction,
    } as SjStyle;
    if (this.gap !== undefined) (style as any).gap = this.gap;
    if (this.justify) (style as any).justifyContent = this.justify;
    if (this.align) (style as any).alignItems = this.align;
    if (this.wrap) (style as any).flexWrap = this.wrap;

    // Merge user overrides last
    const user = this.sj;
    if (user !== undefined) {
      const push = (acc: any, val: any) => {
        if (val === undefined || val === null) return acc;
        if (Array.isArray(val)) return val.reduce(push, acc);
        if (typeof val === 'function') return push(acc, val());
        if (typeof val === 'object') return Object.assign(acc, val);
        return acc;
      };
      return push(style, user);
    }
    return style;
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

