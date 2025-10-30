import {
  AfterContentInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  effect,
} from '@angular/core';
import { SjStyle } from '../models/interfaces';
import { SjInput } from '../directives/sj.directive';
import { SjCssGeneratorService, SjThemeService } from '../services';

@Directive()
export abstract class SjBaseComponent implements AfterContentInit, OnChanges {
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
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' })
  host = false;
  // Optional marker to identify the component type in the DOM
  @Input() marker: string | undefined;
  // Color sugars (inherit by all components)
  @Input() useBg: string | 'none' | undefined;
  @Input() useColor: string | 'auto' | 'none' | undefined;

  protected parentEl: HTMLElement | null = null;
  protected targetEl: HTMLElement | null = null;
  protected lastAppliedClass: string | null = null;
  private static _instanceCounter = 0;
  private _instanceId = ++SjBaseComponent._instanceCounter;

  constructor(
    protected hostRef: ElementRef<HTMLElement>,
    protected renderer: Renderer2,
    protected themeService: SjThemeService,
    protected cssGenerator: SjCssGeneratorService
  ) {
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
      this.applyMarkerToEl(this.parentEl);
      this.applyToParent();
      while (host.firstChild) parent.insertBefore(host.firstChild, host);
      this.renderer.removeChild(parent, host);
    } else {
      const newEl = this.renderer.createElement(this.component || 'div');
      this.applyMarkerToEl(newEl);
      while (host.firstChild) {
        this.renderer.appendChild(newEl, host.firstChild);
      }
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
      this.applyToTarget();
    }
  }

  protected rebuildTargetElement() {
    if (!this.targetEl) return;
    const old = this.targetEl;
    const parent = old.parentElement;
    if (!parent) return;
    const replacement = this.renderer.createElement(this.component || 'div');
    this.applyMarkerToEl(replacement);
    while (old.firstChild) {
      this.renderer.appendChild(replacement, old.firstChild);
    }
    this.renderer.insertBefore(parent, replacement, old);
    this.renderer.removeChild(parent, old);
    this.targetEl = replacement as HTMLElement;
    this.lastAppliedClass = null;
  }

  // Default marker can be overridden by subclasses
  protected get defaultMarker(): string {
    return 'SjBase';
  }

  private applyMarkerToEl(el: HTMLElement) {
    const marker = this.marker || this.defaultMarker;
    // Normalize to kebab-case for DOM class/attributes (e.g., SjCard -> sj-card)
    const kebab = (marker || '')
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase();
    try {
      // Add data attributes for tooling/debugging (use kebab-case for consistency)
      // Only set data-sj-component if not already set by subclass (e.g., with variant)
      if (kebab && !el.getAttribute('data-sj-component')) {
        this.renderer.setAttribute(el, 'data-sj-component', kebab);
      }
      this.renderer.setAttribute(el, 'data-sj-id', String(this._instanceId));
      // Allow subclasses to add extra markers (e.g., variant/state)
      this.applyExtraMarkers(el);
    } catch {}
  }

  // Subclasses can override to add data attributes or other non-style markers
  // This is called whenever markers are applied/refreshed to an element
  // (both for host parent and target element)
  // Default: no-op
  protected applyExtraMarkers(el: HTMLElement): void {}

  protected composeBaseStyle(): SjStyle {
    const style: SjStyle = {};

    // Helpers to detect palette tokens like "primary" or "primary.light"
    const paletteFamilies = new Set([
      'primary',
      'secondary',
      'tertiary',
      'success',
      'info',
      'warning',
      'error',
      'dark',
      'neutral',
      'light',
    ]);
    const tones = new Set(['main', 'light', 'dark', 'contrast']);

    const parsePaletteToken = (
      v: string
    ): {
      family: string;
      tone?: 'main' | 'light' | 'dark' | 'contrast';
    } | null => {
      if (!v || typeof v !== 'string') return null;
      const parts = v.split('.');
      const family = parts[0];
      const tone = parts[1] as any | undefined;
      if (!paletteFamilies.has(family)) return null;
      if (tone && !tones.has(tone)) return { family };
      return { family, tone: tone as any };
    };

    const bgToken =
      this.useBg && this.useBg !== 'none' ? String(this.useBg) : undefined;
    const colorToken =
      this.useColor && this.useColor !== 'none'
        ? String(this.useColor)
        : undefined;

    // Apply background via shorthand so downstream generator resolves tokens consistently
    if (bgToken) {
      (style as any).bg = bgToken;
    }

    // Auto-contrast logic when bg is a palette token
    const bgParsed = bgToken ? parsePaletteToken(bgToken) : null;
    const wantsAutoContrast = colorToken === undefined || colorToken === 'auto';
    if (bgParsed && wantsAutoContrast) {
      (style as any).c = `${bgParsed.family}.contrast`;
    } else if (colorToken && colorToken !== 'auto') {
      (style as any).c = colorToken;
    }

    return style;
  }

  // This method must be implemented by subclasses
  protected abstract composeStyle(): SjStyle;

  protected applyToTarget(): void {
    if (!this.targetEl) return;
    // Refresh markers on the target element (e.g., variant updates)
    this.applyMarkerToEl(this.targetEl);
    const theme = this.themeService.sjTheme();
    const styles = this.composeStyle();
    const classes = (this.cssGenerator as any).getOrGenerateClassBundle
      ? (this.cssGenerator as any).getOrGenerateClassBundle(
          styles,
          theme,
          this.themeService.cacheVersion()
        )
      : this.cssGenerator.getOrGenerateClasses(
          styles,
          theme,
          this.themeService.cacheVersion()
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

  protected applyToParent(): void {
    if (!this.parentEl) return;
    this.applyMarkerToEl(this.parentEl);
    // Add explicit host markers for observability
    try {
      this.renderer.addClass(this.parentEl, 'host');
      this.renderer.setAttribute(this.parentEl, 'data-sj-mode', 'host');
    } catch {}
    const theme = this.themeService.sjTheme();
    const styles = this.composeStyle();
    const classes = (this.cssGenerator as any).getOrGenerateClassBundle
      ? (this.cssGenerator as any).getOrGenerateClassBundle(
          styles,
          theme,
          this.themeService.cacheVersion()
        )
      : this.cssGenerator.getOrGenerateClasses(
          styles,
          theme,
          this.themeService.cacheVersion()
        );
    const canonical =
      Array.isArray(classes) && classes.length ? classes[0] : null;
    if (!canonical) return;
    if (this.lastAppliedClass)
      this.renderer.removeClass(this.parentEl, this.lastAppliedClass);
    this.renderer.addClass(this.parentEl, canonical);
    this.lastAppliedClass = canonical;
  }
}
