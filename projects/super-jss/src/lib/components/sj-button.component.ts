import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SjHostComponent } from './sj-host.component';
import { sjButton, SjButtonApi } from '../blueprints/button';
import { SjStyle } from '../models/interfaces';
import type { SjInput } from '../directives/sj.directive';
import { SjButtonVariant } from '../models/variants';

@Component({
  selector: 'sj-button',
  standalone: true,
  imports: [SjHostComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<sj-host [sj]="hostSj"><ng-content></ng-content></sj-host>`,
})
export class SjButtonComponent {
  sjButton = sjButton;

  // Visual variant of the button blueprint
  @Input() variant: SjButtonVariant = 'default';
  // Optional user overrides to merge after the variant
  @Input() sj: SjInput | undefined;

  get selectedSj(): (overrides?: Partial<SjStyle>) => SjStyle {
    return this.pickVariant(this.sjButton);
  }

  private pickVariant(api: SjButtonApi): (overrides?: Partial<SjStyle>) => SjStyle {
    switch (this.variant) {
      case 'light': return api.light;
      case 'contained': return api.contained;
      case 'outlined': return api.outlined;
      case 'containedPrimary': return api.containedPrimary;
      case 'containedLight': return api.containedLight;
      case 'containedDark': return api.containedDark;
      case 'containedSecondary': return api.containedSecondary;
      case 'danger': return api.danger;
      case 'default':
      default: return api;
    }
  }

  // Compose variant base with user-provided overrides so user wins
  get hostSj(): SjInput {
    const base = () => this.selectedSj();
    const user = this.sj;
    if (user === undefined) return base;
    return Array.isArray(user) ? [base, ...user] : [base, user];
  }
}

