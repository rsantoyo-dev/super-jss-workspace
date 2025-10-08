import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, effect } from '@angular/core';
import { sjBox } from '../blueprints/box';
import type { SjInput } from '../directives/sj.directive';
import { SjStyle } from '../models/interfaces';
import { SjThemeService } from '../services';
import { SjCssGeneratorService } from '../services/sj-css-generator.service';

@Component({
  selector: 'sj-box',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
})
export class SjBoxComponent implements AfterContentInit, OnChanges {
  sjBox = sjBox;
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

  private targetEl: HTMLElement | null = null;
  private lastAppliedClass: string | null = null;

  constructor(
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private themeService: SjThemeService,
    private cssGenerator: SjCssGeneratorService,
  ) {
    // Re-apply styles when theme changes
    effect(() => {
      this.themeService.themeVersion();
      this.applyToTarget();
    });
  }

  ngAfterContentInit(): void {
    const host = this.hostRef.nativeElement;
    const parent = host.parentElement;
    if (!parent) return;

    // Create the semantic native element (div by default)
    const newEl = this.renderer.createElement(this.component || 'div');
    this.renderer.addClass(newEl, 'SjBox');

    // Move children from host into the new element
    while (host.firstChild) {
      this.renderer.appendChild(newEl, host.firstChild);
    }

    // Insert the new element before host and remove host
    this.renderer.insertBefore(parent, newEl, host);
    this.renderer.removeChild(parent, host);

    this.targetEl = newEl as HTMLElement;
    this.applyToTarget();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['component'] && !changes['component'].firstChange) {
      this.rebuildTargetElement();
    }
    if (changes['sj'] || changes['component']) {
      this.applyToTarget();
    }
  }

  private rebuildTargetElement() {
    if (!this.targetEl) return;
    const old = this.targetEl;
    const parent = old.parentElement;
    if (!parent) return;
    const replacement = this.renderer.createElement(this.component || 'div');
    this.renderer.addClass(replacement, 'SjBox');
    while (old.firstChild) this.renderer.appendChild(replacement, old.firstChild);
    this.renderer.insertBefore(parent, replacement, old);
    this.renderer.removeChild(parent, old);
    this.targetEl = replacement as HTMLElement;
    this.lastAppliedClass = null;
  }

  private composeStyle(): SjStyle {
    const base = this.sjBox();
    const user = this.sj;
    let merged: any;
    if (user === undefined) {
      merged = base;
    } else if (Array.isArray(user)) {
      merged = [() => base, ...user];
    } else {
      merged = [() => base, user];
    }

    // Resolve to a single style object (shallow merge like sj.compose)
    let acc: any = {};
    const push = (v: any) => {
      if (v === undefined || v === null) return;
      if (Array.isArray(v)) return v.forEach(push);
      if (typeof v === 'function') return push(v());
      if (typeof v === 'object') {
        acc = Object.assign(acc, v);
        return;
      }
    };
    push(merged);
    return acc as SjStyle;
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
    if (this.lastAppliedClass) {
      this.renderer.removeClass(this.targetEl, this.lastAppliedClass);
    }
    this.renderer.addClass(this.targetEl, canonical);
    this.lastAppliedClass = canonical;
  }
}
