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
    <sj-card [variant]="'flat'">
      <sj-typography variant="h5">{{ title }}</sj-typography>

      <sj-card [variant]="'outlined'">
        <ng-content></ng-content>
      </sj-card>
    </sj-card>
  `,
})
export class SectionContainerComponent {
  readonly sj: SjRootApi = sj;
  @Input() title = '';
}
