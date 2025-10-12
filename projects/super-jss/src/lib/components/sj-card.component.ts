import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { sjCard, SjCardApi } from '../blueprints/card';
import { SjStyle } from '../models/interfaces';
import { SjCardVariant } from '../models/variants';
import { SjThemeService } from '../services';
import { SjCssGeneratorService } from '../services/sj-css-generator.service';
import { SjBaseComponent } from '../core/base.component';

@Component({
  selector: 'sj-card',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SjCardComponent extends SjBaseComponent {
  sjCard = sjCard;

  // Visual variant of the card blueprint
  @Input() variant: SjCardVariant = 'default';
  // Density baseline (used when boolean sugars are present)
  @Input() density: 1 | 2 | 3 | 4 = 2;

  // Density sugars: opt-in only
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
  @Input() useGap:
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
  /** @deprecated Prefer explicit usePadding/useGap/useRounded */
  @Input() useSurface: boolean | '' | undefined;

  // Subtle tint (not a full paint)
  @Input() useTint:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
    | 'dark'
    | 'neutral'
    | 'light'
    | undefined;

  constructor(
    hostRef: ElementRef<HTMLElement>,
    renderer: Renderer2,
    protected override themeService: SjThemeService,
    protected override cssGenerator: SjCssGeneratorService
  ) {
    super(hostRef, renderer, themeService, cssGenerator);
    // Prefer article by default for content blocks
    this.component = 'article';
  }

  private getVariantStyles(): SjStyle {
    const map: Record<
      SjCardVariant,
      (api: SjCardApi) => (overrides?: Partial<SjStyle>) => SjStyle
    > = {
      default: (api) => api,
      outlined: (api) => api.outlined,
      flat: (api) => api.flat,
      elevated: (api) => api.elevated,
      interactive: (api) => api.interactive,
      codeSnippet: (api) => api.codeSnippet,
    };
    const fn = map[this.variant] || map.default;
    return fn(sjCard)();
  }

  override composeStyle(): SjStyle {
    // 1) Variant styles
    const variantStyles = this.getVariantStyles();

    // 2) Density sugars
    const surfaceStyles: SjStyle = {};
    const theme = this.themeService.sjTheme();
    const surfaces = theme.components?.surfaces ?? {};
    const paddingMap = (surfaces as any).padding ?? {};
    const gapMap = (surfaces as any).gap ?? {};
    const radiusMap = (surfaces as any).radius ?? {};
    const mapDensity = (v: any): 1 | 2 | 3 | 4 | undefined => {
      if (v === undefined || v === null || v === 'none') return undefined;
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

    // Back-compat: useSurface enables padding + gap + rounded at current density
    const useSurfaceEnabled = this.useSurface === true;
    if (useSurfaceEnabled) {
      const lvl = this.density ?? 2;
      if ((paddingMap as any)[lvl] !== undefined)
        surfaceStyles.padding = (paddingMap as any)[lvl];
      if ((gapMap as any)[lvl] !== undefined)
        surfaceStyles.gap = (gapMap as any)[lvl];
      if ((radiusMap as any)[lvl] !== undefined)
        surfaceStyles.borderRadius = (radiusMap as any)[lvl];
    }

    const padLevel = mapDensity(this.usePadding);
    if (padLevel && (paddingMap as any)[padLevel] !== undefined) {
      surfaceStyles.padding = (paddingMap as any)[padLevel];
    }
    const gapLevel = mapDensity(this.useGap);
    if (gapLevel && (gapMap as any)[gapLevel] !== undefined) {
      surfaceStyles.gap = (gapMap as any)[gapLevel];
    }
    const roundedLevel = mapDensity(this.useRounded);
    if (roundedLevel && (radiusMap as any)[roundedLevel] !== undefined) {
      surfaceStyles.borderRadius = (radiusMap as any)[roundedLevel];
    }

    // 3) Tint (subtle background + border)
    const tintStyles: SjStyle = {};
    if (this.useTint) {
      (tintStyles as any).backgroundColor = `${this.useTint}.light`;
      (tintStyles as any).borderStyle = 'solid';
      (tintStyles as any).borderWidth = 0.1;
      (tintStyles as any).borderColor = `${this.useTint}.main`;
      (tintStyles as any).color = `${this.useTint}.contrast`;
    }

    // 4) Base color sugars (useBg/useColor) so they can override variant defaults
    const base = super.composeBaseStyle();

    // Merge in order; user [sj] will be merged by base class after this
    const finalStyles: SjStyle = {
      ...variantStyles,
      ...surfaceStyles,
      ...tintStyles,
      ...base,
    };

    // Apply user-provided [sj] overrides last
    if (this.sj) {
      const items = Array.isArray(this.sj) ? this.sj : [this.sj];
      for (const item of items) {
        const styleObj = typeof item === 'function' ? item() : item;
        if (typeof styleObj === 'object' && styleObj !== null) {
          Object.assign(finalStyles, styleObj);
        }
      }
    }

    return finalStyles;
  }
}
