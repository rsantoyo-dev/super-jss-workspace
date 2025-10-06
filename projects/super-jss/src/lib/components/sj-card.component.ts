import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { sjCard, SjCardApi } from '../blueprints/card';
import { SjHostComponent } from './sj-host.component';
import { SjStyle } from '../models/interfaces';
import type { SjInput } from '../directives/sj.directive';
import { SjCardVariant } from '../models/variants';
import { SjThemeService } from '../services';

@Component({
  selector: 'sj-card',
  standalone: true,
  template: `<sj-host [sj]="hostSj"><ng-content></ng-content></sj-host>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SjHostComponent],
})
export class SjCardComponent {
  sjCard = sjCard
  // Visual variant of the card blueprint
  @Input() variant: SjCardVariant = 'default';
  // Optional user overrides to merge after the variant
  @Input() sj: SjInput | undefined;

  // Optional surface controls (off by default to preserve current look)
  @Input() density: 1 | 2 | 3 | 4 = 2;
  @Input({ transform: booleanAttribute }) usePadding: boolean = false;
  @Input({ transform: booleanAttribute }) useGap: boolean = false;
  @Input({ transform: booleanAttribute }) useRounded: boolean = false;
  @Input({ transform: booleanAttribute }) useSurface: boolean = false;

  constructor(private themeService: SjThemeService) {}

  get selectedSj(): (overrides?: Partial<SjStyle>) => SjStyle {
    return this.pickVariant(this.sjCard);
  }

  private pickVariant(api: SjCardApi): (overrides?: Partial<SjStyle>) => SjStyle {
    switch (this.variant) {
      case 'outlined': return api.outlined;
      case 'flat': return api.flat;
      case 'elevated': return api.elevated;
      case 'interactive': return api.interactive;
      case 'primary': return api.primary;
      case 'secondary': return api.secondary;
      case 'info': return api.info;
      case 'codeSnippet': return api.codeSnippet;
      case 'default':
      default: return api;
    }
  }

  // Compose variant base with user-provided overrides so user wins
  get hostSj(): SjInput {
    // Normalize selected variant to a zero-arg producer for SjInput
    const base = () => {
      const v = this.selectedSj();
      const overrides: Partial<SjStyle> = {};
      const level = this.density ?? 2;
      const theme = this.themeService.sjTheme();
      const surfaces = theme.components?.surfaces;
      const paddingMap = surfaces?.padding ?? {};
      const gapMap = surfaces?.gap ?? {};
      const radiusMap = surfaces?.radius ?? {};

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

      return Object.keys(overrides).length ? { ...v, ...overrides } : v;
    };
    const user = this.sj;
    if (user === undefined) return base;
    return Array.isArray(user) ? [base, ...user] : [base, user];
  }

}
