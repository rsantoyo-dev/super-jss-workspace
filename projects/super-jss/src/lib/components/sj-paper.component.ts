import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { sjPaper, SjPaperApi } from '../blueprints/paper';
import { SjStyle } from '../models/interfaces';
import { deepMerge } from '../utils';
import { SjPaperVariant } from '../models/variants';
import { SjBaseComponent } from '../core/base.component';
import { ElementRef, Renderer2 } from '@angular/core';
import { SjThemeService, SjCssGeneratorService } from '../services';

@Component({
  selector: 'sj-paper',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SjPaperComponent extends SjBaseComponent {
  protected override get defaultMarker(): string {
    return 'SjPaper';
  }
  @Input() variant: SjPaperVariant = 'default';
  @Input() usePadding:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | number
    | 'compact'
    | 'default'
    | 'comfortable'
    | 'spacious'
    | 'none'
    | true
    | ''
    | undefined;
  // Full paint override; for subtle surfaces prefer [useBg] or a future useTint
  @Input() usePaint: string | 'auto' | 'none' = 'auto';
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
    | true
    | ''
    | undefined;

  constructor(
    hostRef: ElementRef<HTMLElement>,
    renderer: Renderer2,
    themeService: SjThemeService,
    cssGenerator: SjCssGeneratorService
  ) {
    super(hostRef, renderer, themeService, cssGenerator);
  }

  protected override applyExtraMarkers(el: HTMLElement): void {
    try {
      this.renderer.setAttribute(
        el,
        'data-sj-component',
        `sj-paper_${this.variant}`
      );
    } catch {}
  }

  private getVariantStyles(): SjStyle {
    const variantMap: Record<
      SjPaperVariant,
      (api: SjPaperApi) => () => SjStyle
    > = {
      default: (api) => api,
      outlined: (api) => api.outlined,
      flat: (api) => api.flat,
      filled: (api) => api.filled,
    };
    const selectedVariant = variantMap[this.variant] || variantMap.default;
    return selectedVariant(sjPaper)();
  }

  override composeStyle(): SjStyle {
    const baseStyles = super.composeBaseStyle(); // Base sugars: useBg/useColor
    const variantStyles = this.getVariantStyles();
    const paperStyles: SjStyle = {};

    // Apply usePaint semantics similar to button:
    // - filled/default: bg=<fam>.main, color=<fam>.contrast
    // - outlined: border/text = <fam>.main (bg transparent)
    // - flat: text = <fam>.main
    if (this.usePaint && this.usePaint !== 'none') {
      const isAuto = this.usePaint === 'auto';
      const fam = isAuto ? '' : String(this.usePaint);
      const kind: 'filled' | 'outlined' | 'flat' =
        this.variant === 'outlined'
          ? 'outlined'
          : this.variant === 'flat'
          ? 'flat'
          : 'filled'; // treat 'default' and 'filled' as filled

      if (kind === 'filled') {
        (paperStyles as any).backgroundColor = isAuto
          ? 'light.light'
          : `${fam}.main`;
        if (!isAuto) (paperStyles as any).color = `${fam}.contrast`;
        (paperStyles as any).borderColor = 'transparent';
      } else if (kind === 'outlined') {
        (paperStyles as any).backgroundColor = 'transparent';
        (paperStyles as any).color = isAuto ? 'inherit' : `${fam}.main`;
        (paperStyles as any).borderStyle = 'solid';
        (paperStyles as any).borderWidth = 0.05;
        (paperStyles as any).borderColor = isAuto
          ? 'light.dark'
          : `${fam}.main`;
      } else {
        if (!isAuto) (paperStyles as any).color = `${fam}.main`;
      }
    }

    const theme = this.themeService.sjTheme();
    const surfaces = theme.components?.surfaces ?? {};
    const presets = (theme.components as any)?.surfacesPresets ?? {};
    const mapDensity = (v: any): 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined => {
      if (v === undefined || v === null || v === 'none') return undefined;
      if (v === true || v === '' || v === 'true') return 2;
      if (typeof v === 'number')
        return Math.max(1, Math.min(12, Math.round(v))) as any;
      const m: Record<string, 1 | 2 | 3 | 4> = {
        compact: 1,
        default: 2,
        comfortable: 3,
        spacious: 4,
      };
      return m[String(v).toLowerCase()];
    };

    // Handle surface-specific sugars
    const padLevel = mapDensity(this.usePadding);
    if (padLevel) {
      if (padLevel >= 1 && padLevel <= 4) {
        if ((surfaces.padding as any)?.[padLevel] !== undefined) {
          paperStyles.padding = (surfaces.padding as any)[padLevel];
        }
      } else {
        const presetArr = (presets.padding as any)?.[padLevel] as SjStyle[] | undefined;
        if (Array.isArray(presetArr)) {
          for (const st of presetArr) {
            try {
              Object.assign(paperStyles, deepMerge({}, st));
            } catch {
              Object.assign(paperStyles, st as any);
            }
          }
        }
      }
    }

    const roundedLevel = mapDensity(this.useRounded);
    if (
      roundedLevel &&
      (surfaces.radius as any)?.[roundedLevel] !== undefined
    ) {
      paperStyles.borderRadius = (surfaces.radius as any)[roundedLevel];
    }

    // Final merge order:
    // 1) variant defaults
    // 2) paper-specific sugars (padding/radius)
    // 3) base sugars (useBg/useColor) so they can override variant defaults
    // 4) user-provided [sj] last
    const finalStyles: SjStyle = {
      ...variantStyles,
      ...paperStyles,
      ...baseStyles,
    };
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
