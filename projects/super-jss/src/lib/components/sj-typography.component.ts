import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  computed,
  effect,
} from '@angular/core';
import { SjStyle } from '../models/interfaces';
import {
  createSjTypographyApi,
  SjTypographyApi,
} from '../blueprints/typography';
import { SjTypographyVariant } from '../models/variants';
import { SjThemeService } from '../services';
import type { SjInput } from '../directives/sj.directive';
import { SjCssGeneratorService } from '../services/sj-css-generator.service';

@Component({
  selector: 'sj-typography',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
})
export class SjTypographyComponent implements AfterContentInit, OnChanges {
  private static _nextId = 1;
  @Input() variant: SjTypographyVariant = 'default';
  // Optional: explicitly choose tag; when set it takes precedence over variant mapping
  @Input() component:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'strong'
    | 'small'
    | 'pre'
    | 'code'
    | 'label'
    | 'div'
    | 'blockquote'
    | 'cite'
    | undefined;
  @Input() align: 'left' | 'center' | 'right' | 'justify' | undefined;
  @Input() noWrap: boolean = false;
  @Input() gutterBottom: boolean = false;
  @Input() paragraph: boolean = false;
  @Input() sj: SjInput | undefined;

  private sjTypographyApi = computed(() =>
    createSjTypographyApi(this.themeService.sjTheme())
  );

  private targetEl: HTMLElement | null = null;
  private lastAppliedClass: string | null = null;

  constructor(
    private themeService: SjThemeService,
    private cssGenerator: SjCssGeneratorService,
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    // Ensure styles re-apply on theme structure changes
    effect(() => {
      this.themeService.themeVersion();
      this.applyToTarget();
    });
  }

  ngAfterContentInit(): void {
    const host = this.hostRef.nativeElement;
    const parent = host.parentElement;
    if (!parent) return;

    const tag = this.resolveTag();
    const newEl = this.renderer.createElement(tag);
    // Add data attributes for debugging/authoring (kebab-case)
    try {
      const id = SjTypographyComponent._nextId++;
      const marker =
        this.variant && this.variant !== 'default'
          ? `sj-typography_${this.variant}`
          : 'sj-typography';
      this.renderer.setAttribute(newEl, 'data-sj-component', marker);
      this.renderer.setAttribute(newEl, 'data-sj-id', String(id));
    } catch {}

    while (host.firstChild) this.renderer.appendChild(newEl, host.firstChild);
    this.renderer.insertBefore(parent, newEl, host);
    this.renderer.removeChild(parent, host);

    this.targetEl = newEl as HTMLElement;
    this.applyToTarget();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const variantChanged =
      !!changes['variant'] && !changes['variant'].firstChange;
    const componentChanged =
      !!changes['component'] && !changes['component'].firstChange;
    const alignChanged = !!changes['align'] && !changes['align'].firstChange;
    const noWrapChanged = !!changes['noWrap'] && !changes['noWrap'].firstChange;
    const gutterBottomChanged =
      !!changes['gutterBottom'] && !changes['gutterBottom'].firstChange;
    const paragraphChanged =
      !!changes['paragraph'] && !changes['paragraph'].firstChange;

    if (variantChanged || componentChanged || paragraphChanged) {
      this.rebuildTargetElement();
    }
    if (
      changes['sj'] ||
      variantChanged ||
      componentChanged ||
      alignChanged ||
      noWrapChanged ||
      gutterBottomChanged
    ) {
      this.applyToTarget();
    }
  }

  private resolveTag(): string {
    if (this.component) return this.component;
    switch (this.variant) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return this.variant;
      case 'p':
        return 'p';
      case 'paragraph':
        return 'p';
      case 'body':
        return this.paragraph ? 'p' : 'div';
      case 'caption':
      case 'small':
        return 'small';
      case 'strong':
        return 'strong';
      case 'pre':
        return 'pre';
      case 'span':
      default:
        return 'span';
    }
  }

  private rebuildTargetElement(): void {
    if (!this.targetEl) return;
    const old = this.targetEl;
    const parent = old.parentElement;
    if (!parent) return;
    const replacement = this.renderer.createElement(this.resolveTag());
    try {
      const id = SjTypographyComponent._nextId++;
      const marker =
        this.variant && this.variant !== 'default'
          ? `sj-typography_${this.variant}`
          : 'sj-typography';
      this.renderer.setAttribute(replacement, 'data-sj-component', marker);
      this.renderer.setAttribute(replacement, 'data-sj-id', String(id));
    } catch {}
    while (old.firstChild)
      this.renderer.appendChild(replacement, old.firstChild);
    this.renderer.insertBefore(parent, replacement, old);
    this.renderer.removeChild(parent, old);
    this.targetEl = replacement as HTMLElement;
    this.lastAppliedClass = null;
  }

  private selectedSj(
    api: SjTypographyApi
  ): (overrides?: Partial<SjStyle>) => SjStyle {
    switch (this.variant) {
      case 'h1':
        return api.h1;
      case 'h2':
        return api.h2;
      case 'h3':
        return api.h3;
      case 'h4':
        return api.h4;
      case 'h5':
        return api.h5;
      case 'h6':
        return api.h6;
      case 'p':
        return api.p;
      case 'paragraph':
        return api.paragraph;
      case 'span':
        return api.span;
      case 'strong':
        return api.strong;
      case 'body':
        return api.body;
      case 'caption':
        return api.caption;
      case 'small':
        return api.small;
      case 'pre':
        return api.pre;
      case 'default':
      default:
        return api;
    }
  }

  private composeStyle(): SjStyle {
    const baseFn = this.selectedSj(this.sjTypographyApi());
    const base = baseFn();
    const user = this.sj;
    let merged: any = [() => base];

    // Add typography-specific overrides
    const typographyOverrides: Partial<SjStyle> = {};

    if (this.align) {
      typographyOverrides.textAlign = this.align;
    }

    if (this.noWrap) {
      typographyOverrides.whiteSpace = 'nowrap';
      typographyOverrides.overflow = 'hidden';
      typographyOverrides.textOverflow = 'ellipsis';
    }

    if (this.gutterBottom) {
      typographyOverrides.marginBottom = this.themeService.sjTheme().spacing(1);
    }

    if (Object.keys(typographyOverrides).length > 0) {
      merged.push(() => typographyOverrides);
    }

    if (user) {
      if (Array.isArray(user)) {
        merged = merged.concat(user);
      } else {
        merged.push(user);
      }
    }

    // Shallow merge like sj.compose
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
    const classes = this.cssGenerator.getOrGenerateClassBundle
      ? this.cssGenerator.getOrGenerateClassBundle(
          styles,
          theme,
          this.themeService.themeVersion()
        )
      : this.cssGenerator.getOrGenerateClasses(
          styles,
          theme,
          this.themeService.themeVersion()
        );
    const canonical =
      Array.isArray(classes) && classes.length ? classes[0] : null;
    if (!canonical) return;
    if (this.lastAppliedClass) {
      this.renderer.removeClass(this.targetEl, this.lastAppliedClass);
    }
    this.renderer.addClass(this.targetEl, canonical);
    this.lastAppliedClass = canonical;
  }
}
