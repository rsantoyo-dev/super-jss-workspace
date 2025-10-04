import { Component, Input } from '@angular/core';
import {
  SjDirective,
  SjHostComponent,
  SjCardComponent,
  SjInput,
  SjTypographyComponent,
  sj,
  SjRootApi,
  SJ_BASE_COMPONENTS_IMPORTS,
} from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-section',
  imports: [SJ_BASE_COMPONENTS_IMPORTS],
  // Apply SjDirective to the host so the section styles the component itself
  hostDirectives: [{ directive: SjDirective }],
  template: `
    <sj-host [sj]="[sj.d('flex'), sj.flexDirection('column'), sj.gap(1)]">
      <sj-typography variant="h5">{{ title }}</sj-typography>

      <sj-card
        [variant]="sj.sjCard.variants.outlined"
        [sj]="[sj.margin(0), sj.gap(0.5)]"
      >
        <ng-content></ng-content>
      </sj-card>
    </sj-host>
  `,
})
export class SectionContainerComponent {
  readonly sj: SjRootApi = sj;
  @Input() title = '';
}
