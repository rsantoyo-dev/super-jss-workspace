import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

import { SjStyle } from '../models/interfaces';
import { SjCssGeneratorService, SjThemeService } from '../services';
import { SjBaseComponent } from '../core/base.component';

@Component({
  selector: 'sj-flex',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
})
export class SjFlexComponent extends SjBaseComponent {
  // Flexbox-specific layout sugars
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' })
  useCol = false;
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' })
  useWrap = false;
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' })
  useInline = false;
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' })
  useCenter = false;
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' })
  useBetween = false;
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' })
  useAround = false;
  @Input({ transform: (v: any) => v === '' || v === true || v === 'true' })
  useEvenly = false;

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

  override composeStyle(): SjStyle {
    const base = super.composeBaseStyle(); // Base sugars: useBg/useColor
    const flexStyles: SjStyle = {
      display: this.useInline ? 'inline-flex' : 'flex',
      flexDirection: this.useCol ? 'column' : 'row',
    };

    if (this.useWrap) flexStyles['flexWrap'] = 'wrap';

    if (this.useCenter) {
      flexStyles['justifyContent'] = 'center';
      flexStyles['alignItems'] = 'center';
    }
    if (this.useBetween) flexStyles['justifyContent'] = 'space-between';
    if (this.useAround) flexStyles['justifyContent'] = 'space-around';
    if (this.useEvenly) flexStyles['justifyContent'] = 'space-evenly';

    // Handle useGap
    if (this.useGap !== undefined && this.useGap !== 'none') {
      const theme = this.themeService.sjTheme();
      const surfaces = theme.components?.surfaces ?? {};
      const gapMap = surfaces?.gap ?? {};
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
      const gapLevel = mapDensity(this.useGap);
      if (gapLevel && (gapMap as any)?.[gapLevel] !== undefined) {
        flexStyles.gap = (gapMap as any)[gapLevel];
      }
    }

    // Final merge order: flex-specific first, then base sugars so bg/color can win, then user [sj]
    const finalStyles: SjStyle = { ...flexStyles, ...base };
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
