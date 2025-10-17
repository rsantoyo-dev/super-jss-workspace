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
    <sj-paper host usePadding [sj]="[]">
      <sj-flex useCol useGap>
        <sj-typography variant="h5">{{ title }}</sj-typography>

        <sj-paper usePadding useRounded [variant]="'outlined'">
          <sj-flex useCol useGap>
            <ng-content></ng-content>
          </sj-flex>
        </sj-paper>
      </sj-flex>
    </sj-paper>
  `,
})
export class SectionContainerComponent {
  readonly sj: SjRootApi = sj;
  @Input() title = '';
}
