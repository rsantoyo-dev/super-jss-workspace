import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  effect,
} from '@angular/core';
import { sjBox } from '../blueprints/box';
import type { SjInput } from '../directives/sj.directive';
import { SjStyle } from '../models/interfaces';
import { SjThemeService } from '../services';
import { SjCssGeneratorService } from '../services/sj-css-generator.service';

@Component({
  selector: 'sj-flex',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
})
export class SjFlexComponent implements AfterContentInit, OnChanges {
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
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' }) host: boolean = false;
  // Layout sugars (prefixed with use*)
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' }) useCol: boolean = false;
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' }) useWrap: boolean = false;
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' }) useInline: boolean = false;
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' }) useCenter: boolean = false;
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' }) useBetween: boolean = false;
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' }) useAround: boolean = false;
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' }) useEvenly: boolean = false;
  @Input() useJustify: string | undefined;
  @Input() useAlign: string | undefined;
  @Input() useGap: 1 | 2 | 3 | 4 | 'compact' | 'default' | 'comfortable' | 'spacious' | true | '' | undefined;
  @Input() usePadding: 1 | 2 | 3 | 4 | 'compact' | 'default' | 'comfortable' | 'spacious' | true | '' | undefined;
  // Combined density sugar: applies both gap and padding from the same density key
  @Input() useGutters: 1 | 2 | 3 | 4 | 'compact' | 'default' | 'comfortable' | 'spacious' | true | '' | undefined;

  private parentEl: HTMLElement | null = null;
  private targetEl: HTMLElement | null = null;
  private lastAppliedClass: string | null = null;

  constructor(
    private hostRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private themeService: SjThemeService,
    private cssGenerator: SjCssGeneratorService
  ) {
    // Re-apply styles when theme changes
    effect(() => {
      this.themeService.themeVersion();
      if (this.host) {
        if (this.parentEl) this.applyToParent();
      } else {
        this.applyToTarget();
      }
    });
  }

  ngAfterContentInit(): void {
    const host = this.hostRef.nativeElement;
    const parent = host.parentElement;
    if (!parent) return;

    if (this.host) {
      this.parentEl = parent;
      this.applyToParent();
      while (host.firstChild) parent.insertBefore(host.firstChild, host);
      this.renderer.removeChild(parent, host);
    } else {
      // Create the semantic native element (div by default)
      const newEl = this.renderer.createElement(this.component || 'div');
      this.renderer.addClass(newEl, 'SjFlex');
      // Move children into new element
      while (host.firstChild) {
        this.renderer.appendChild(newEl, host.firstChild);
      }
      // Insert and remove host
      this.renderer.insertBefore(parent, newEl, host);
      this.renderer.removeChild(parent, host);
      this.targetEl = newEl as HTMLElement;
      this.applyToTarget();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.host) {
      if (this.parentEl) this.applyToParent();
    } else {
      if (changes['component'] && !changes['component'].firstChange) {
        this.rebuildTargetElement();
      }
      if (
        changes['sj'] ||
        changes['useCol'] ||
        changes['useWrap'] ||
        changes['useInline'] ||
        changes['useCenter'] ||
        changes['useBetween'] ||
        changes['useAround'] ||
        changes['useEvenly'] ||
        changes['useJustify'] ||
        changes['useAlign'] ||
        changes['useGap'] ||
        changes['usePadding'] ||
        changes['component']
      ) {
        this.applyToTarget();
      }
    }
  }

  private rebuildTargetElement() {
    if (!this.targetEl) return;
    const old = this.targetEl;
    const parent = old.parentElement;
    if (!parent) return;
    const replacement = this.renderer.createElement(this.component || 'div');
    this.renderer.addClass(replacement, 'SjFlex');
    while (old.firstChild)
      this.renderer.appendChild(replacement, old.firstChild);
    this.renderer.insertBefore(parent, replacement, old);
    this.renderer.removeChild(parent, old);
    this.targetEl = replacement as HTMLElement;
    this.lastAppliedClass = null;
  }

  private composeStyle(): SjStyle {
    let base = { ...(this.sjBox() as any) } as SjStyle;
    // Inline
    if (this.useInline) (base as any).display = 'inline-flex';
    // Direction
    (base as any).flexDirection = this.useCol ? 'column' : 'row';
    // Wrap
    if (this.useWrap) (base as any).flexWrap = 'wrap';
    // Sugars
    if (this.useCenter) {
      (base as any).justifyContent = 'center';
      (base as any).alignItems = 'center';
    }
    if (this.useBetween) (base as any).justifyContent = 'space-between';
    if (this.useAround) (base as any).justifyContent = 'space-around';
    if (this.useEvenly) (base as any).justifyContent = 'space-evenly';
    // Explicit overrides
    if (this.useJustify) (base as any).justifyContent = this.useJustify as any;
    if (this.useAlign) (base as any).alignItems = this.useAlign as any;
    // Density sugar mapping
    const theme = this.themeService.sjTheme();
    const surfaces = (theme as any).components?.surfaces ?? {};
    const mapDensity = (v: any): 1 | 2 | 3 | 4 | undefined => {
      if (v === undefined || v === null) return undefined;
      if (v === true || v === '' || v === 'true') return 2;
      if (typeof v === 'number') {
        const n = Math.max(1, Math.min(4, Math.round(v)));
        return n as 1 | 2 | 3 | 4;
      }
      const m: Record<string, 1 | 2 | 3 | 4> = {
        compact: 1,
        default: 2,
        comfortable: 3,
        spacious: 4,
      } as const;
      return m[String(v).toLowerCase()] ?? undefined;
    };
    // Apply combined gutters first (both gap and padding), then allow specific overrides
    const guttersL = mapDensity(this.useGutters);
    if (guttersL) {
      if (surfaces.gap && (surfaces.gap as any)[guttersL] !== undefined) {
        (base as any).gap = (surfaces.gap as any)[guttersL];
      }
      if (surfaces.padding && (surfaces.padding as any)[guttersL] !== undefined) {
        (base as any).padding = (surfaces.padding as any)[guttersL];
      }
    }
    const gapL = mapDensity(this.useGap);
    if (gapL && surfaces.gap && (surfaces.gap as any)[gapL] !== undefined) {
      (base as any).gap = (surfaces.gap as any)[gapL];
    }
    const padL = mapDensity(this.usePadding);
    if (padL && surfaces.padding && (surfaces.padding as any)[padL] !== undefined) {
      (base as any).padding = (surfaces.padding as any)[padL];
    }

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
      ? (this.cssGenerator as any).getOrGenerateClassBundle(
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
}
