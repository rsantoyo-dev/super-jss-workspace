import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { sjCard, SjCardApi } from '../blueprints/card';
import { SjHostComponent } from './sj-host.component';
import { SjStyle } from '../models/interfaces';
import { SjCardVariant } from '../models/variants';

@Component({
  selector: 'sj-card',
  standalone: true,
  template: `<sj-host [sj]="selectedSj"><ng-content></ng-content></sj-host>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SjHostComponent],
})
export class SjCardComponent {
  sjCard = sjCard
  // Visual variant of the card blueprint
  @Input() variant: SjCardVariant = 'default';

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

}
