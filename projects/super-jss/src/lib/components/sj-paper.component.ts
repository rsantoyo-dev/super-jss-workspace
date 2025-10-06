import { booleanAttribute, ChangeDetectionStrategy, Component, Inject, Input, Optional } from '@angular/core';
import { sjPaper, SjPaperApi } from '../blueprints/paper';
import { SjHostComponent } from './sj-host.component';
import { SjStyle } from '../models/interfaces';
import type { SjInput } from '../directives/sj.directive';
import { SjPaperVariant } from '../models/variants';
import { DEFAULT_SURFACE_DENSITIES, SJ_SURFACES_CONFIG, SjSurfacesConfig } from '../tokens';

@Component({
  selector: 'sj-paper',
  standalone: true,
  template: `<sj-host [sj]="hostSj"><ng-content></ng-content></sj-host>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SjHostComponent],
})
export class SjPaperComponent {
  sjPaper = sjPaper;

  @Input() variant: SjPaperVariant = 'default';
  @Input() sj: SjInput | undefined;
  // Surface density: 1..4 (compact -> spacious). Default 2.
  @Input() density: 1 | 2 | 3 | 4 = 2;
  // Toggles to apply density-driven styles
  @Input({ transform: booleanAttribute }) usePadding: boolean = false;
  @Input({ transform: booleanAttribute }) useGap: boolean = false;
  @Input({ transform: booleanAttribute }) useRounded: boolean = false;
  // Convenience: enable padding+gap+rounded together at current density
  @Input({ transform: booleanAttribute }) useSurface: boolean = false;

  constructor(@Optional() @Inject(SJ_SURFACES_CONFIG) private surfaces?: SjSurfacesConfig) {}

  get selectedSj(): (overrides?: Partial<SjStyle>) => SjStyle {
    return this.pickVariant(this.sjPaper);
  }

  private pickVariant(api: SjPaperApi): (overrides?: Partial<SjStyle>) => SjStyle {
    switch (this.variant) {
      case 'flat':
        return api.flat;
      case 'outlined':
        return api.outlined;
      case 'filled':
        return api.filled;
      case 'default':
      default:
        return api;
    }
  }

  get hostSj(): SjInput {
    const base = () => {
      const style = this.selectedSj();
      const overrides: Partial<SjStyle> = {};
      const level = this.density ?? 2;
      const paddingMap = this.surfaces?.padding ?? DEFAULT_SURFACE_DENSITIES.padding;
      const gapMap = this.surfaces?.gap ?? DEFAULT_SURFACE_DENSITIES.gap;
      const radiusMap = this.surfaces?.radius ?? DEFAULT_SURFACE_DENSITIES.radius;

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

      return Object.keys(overrides).length ? { ...style, ...overrides } : style;
    };
    const user = this.sj;
    if (user === undefined) return base;
    return Array.isArray(user) ? [base, ...user] : [base, user];
  }
}
