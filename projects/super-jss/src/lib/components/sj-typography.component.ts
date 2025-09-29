import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { sjTypography, SjTypographyApi } from '../blueprints/typography';
import { SjHostComponent } from './sj-host.component';
import { SjStyle } from '../models/interfaces';
import type { SjInput } from '../directives/sj.directive';
import { SjTypographyVariant } from '../models/variants';

@Component({
  selector: 'sj-typography',
  standalone: true,
  template: `<sj-host [sj]="hostSj"><ng-content></ng-content></sj-host>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SjHostComponent],
})
export class SjTypographyComponent {
  sjTypography = sjTypography;
  // Visual variant of the typography blueprint
  @Input() variant: SjTypographyVariant = 'default';
  // Optional user overrides to merge after the variant
  @Input() sj: SjInput | undefined;

  get selectedSj(): (overrides?: Partial<SjStyle>) => SjStyle {
    return this.pickVariant(this.sjTypography);
  }

  private pickVariant(api: SjTypographyApi): (overrides?: Partial<SjStyle>) => SjStyle {
    switch (this.variant) {
      case 'h1': return api.h1;
      case 'h2': return api.h2;
      case 'h3': return api.h3;
      case 'h4': return api.h4;
      case 'h5': return api.h5;
      case 'h6': return api.h6;
      case 'p': return api.p;
      case 'span': return api.span;
      case 'strong': return api.strong;
      case 'body': return api.body;
      case 'caption': return api.caption;
      case 'small': return api.small;
      case 'pre': return api.pre;
      case 'default':
      default: return api;
    }
  }

  // Compose variant base with user-provided overrides so user wins
  get hostSj(): SjInput {
    // Normalize selected variant to a zero-arg producer for SjInput
    const base = () => this.selectedSj();
    const user = this.sj;
    if (user === undefined) return base;
    return Array.isArray(user) ? [base, ...user] : [base, user];
  }

}
