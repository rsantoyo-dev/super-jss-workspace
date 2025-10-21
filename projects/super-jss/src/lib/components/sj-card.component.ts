import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { SjInput } from '../directives/sj.directive';
import { SjBaseComponent } from '../core/base.component';
import { SjStyle } from '../models/interfaces';
import { sjPaper, SjPaperApi } from '../blueprints/paper';
import { SjThemeService, SjCssGeneratorService } from '../services';
import { ElementRef, Renderer2 } from '@angular/core';

/**
 * A card is a container for content.
 *
 * If you make a card interactive (e.g., by adding a click handler),
 * you must make it accessible.
 *
 * @example
 * <!-- For navigation -->
 * <a href="/details" style="text-decoration: none;">
 *   <sj-card variant="interactive">
 *     ...
 *   </sj-card>
 * </a>
 *
 * <!-- For an action -->
 * <sj-card variant="interactive" role="button" tabindex="0" (click)="doSomething()">
 *   ...
 * </sj-card>
 */
@Component({
  selector: 'sj-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
})
export class SjCardComponent extends SjBaseComponent {
  @Input() variant: 'flat' | 'outlined' | 'elevated' | 'interactive' = 'flat';
  @Input() usePaint: string | 'auto' | 'none' = 'auto';
  @Input() usePadding:
    | 1
    | 2
    | 3
    | 4
    | 'compact'
    | 'default'
    | 'comfortable'
    | 'spacious'
    | 'none'
    | undefined;
  @Input() useRounded:
    | 1
    | 2
    | 3
    | 4
    | 'compact'
    | 'default'
    | 'comfortable'
    | 'spacious'
    | 'none'
    | undefined;
  @Input() sj: SjInput | undefined;
  // Deprecated: keep old API working. useSurface implied padding+rounded defaults
  @Input() set useSurface(v: any) {
    const on = v === '' || v === true || v === 'true';
    if (on) {
      this.usePadding = this.usePadding ?? 'default';
      this.useRounded = this.useRounded ?? 'default';
      if (typeof window !== 'undefined' && (window as any).ngDevMode) {
        console.warn(
          '[SJ] sj-card: useSurface is deprecated. Use usePadding/useRounded instead.'
        );
      }
    }
  }

  protected override get defaultMarker(): string {
    return 'SjCard';
  }

  constructor(
    hostRef: ElementRef<HTMLElement>,
    renderer: Renderer2,
    themeService: SjThemeService,
    cssGenerator: SjCssGeneratorService
  ) {
    super(hostRef, renderer, themeService, cssGenerator);
  }

  protected override applyExtraMarkers(el: HTMLElement): void {
    // Attach variant information for debugging/targeting
    try {
      this.renderer.setAttribute(
        el,
        'data-sj-component',
        `sj-card_${this.variant}`
      );
    } catch {}
  }

  private getVariantStyles(): SjStyle {
    // Card variants map onto paper variants; default to a flat surface
    const map: Record<string, (api: SjPaperApi) => () => SjStyle> = {
      flat: (api) => api.flat,
      outlined: (api) => api.outlined,
      elevated: (api) => api.outlined, // keep outlined visuals; elevation handled via interactive sugar or user sj
      interactive: (api) => api.flat,
      default: (api) => api.flat,
    };
    const resolver = map[this.variant] || map.default;
    return resolver(sjPaper)();
  }

  protected composeStyle(): SjStyle {
    const base = this.composeBaseStyle();
    const variant = this.getVariantStyles();
    const style: SjStyle = {};

    // Paint semantics similar to paper
    if (this.usePaint && this.usePaint !== 'none') {
      const isAuto = this.usePaint === 'auto';
      const fam = isAuto ? '' : String(this.usePaint);
      const kind: 'filled' | 'outlined' | 'flat' =
        this.variant === 'outlined'
          ? 'outlined'
          : this.variant === 'flat'
          ? 'flat'
          : 'filled';
      if (kind === 'filled') {
        (style as any).backgroundColor = isAuto ? 'light.light' : `${fam}.main`;
        if (!isAuto) (style as any).color = `${fam}.contrast`;
        (style as any).borderColor = 'transparent';
      } else if (kind === 'outlined') {
        (style as any).backgroundColor = 'transparent';
        (style as any).color = isAuto ? 'inherit' : `${fam}.main`;
        (style as any).borderStyle = 'solid';
        (style as any).borderWidth = 0.1;
        (style as any).borderColor = isAuto ? 'light.dark' : `${fam}.main`;
      } else {
        if (!isAuto) (style as any).color = `${fam}.main`;
      }
    }

    // Density-driven sugars
    const theme = this.themeService.sjTheme();
    const surfaces = theme.components?.surfaces ?? {};
    const mapDensity = (v: any): 1 | 2 | 3 | 4 | undefined => {
      if (v === undefined || v === null || v === 'none') return undefined;
      if (v === true || v === '' || v === 'true') return 2;
      if (typeof v === 'number')
        return Math.max(1, Math.min(4, Math.round(v))) as 1 | 2 | 3 | 4;
      const m: Record<string, 1 | 2 | 3 | 4> = {
        compact: 1,
        default: 2,
        comfortable: 3,
        spacious: 4,
      };
      return m[String(v).toLowerCase()];
    };
    const pad = mapDensity(this.usePadding);
    if (pad && (surfaces.padding as any)?.[pad] !== undefined) {
      (style as any).padding = (surfaces.padding as any)[pad];
    }
    const rad = mapDensity(this.useRounded);
    if (rad && (surfaces.radius as any)?.[rad] !== undefined) {
      (style as any).borderRadius = (surfaces.radius as any)[rad];
    }

    // Interactive sugar
    if (this.variant === 'interactive') {
      (style as any).cursor = 'pointer';
      (style as any).transition = 'transform 0.2s, box-shadow 0.2s';
      (style as any)['&:hover'] = {
        ...(style as any)['&:hover'],
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.20)',
      } as any;
    }

    // Merge order: variant -> density sugars -> base sugars -> user sj
    const merged: SjStyle = { ...variant, ...style, ...base };
    if (this.sj) {
      const arr = Array.isArray(this.sj) ? this.sj : [this.sj];
      for (const item of arr) {
        const o = typeof item === 'function' ? item() : item;
        if (o && typeof o === 'object') Object.assign(merged, o);
      }
    }
    return merged;
  }
}
