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
    <sj-paper
      host
      variant="flat"
      [usePadding]="4"
      [sj]="[sj.bg('light'), sj.overflowX('hidden')]"
    >
      <sj-flex [sj]="[sj.justifyContent('center'), sj.w('100%')]">
        <sj-flex useCol useGap="default" [sj]="[sj.width('inherit')]">
          <sj-typography variant="h3" [sj]="[sj.c('light.contrast')]">{{
            title
          }}</sj-typography>

          <sj-flex useCol useGap>
            <ng-content></ng-content>
          </sj-flex>
        </sj-flex>
      </sj-flex>
    </sj-paper>
  `,
})
export class SectionContainerComponent {
  readonly sj: SjRootApi = sj;
  @Input() title = '';
}
