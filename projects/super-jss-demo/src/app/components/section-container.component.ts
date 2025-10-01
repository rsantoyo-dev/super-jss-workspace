import { Component, Input } from '@angular/core';
import {
  SjDirective,
  SjHostComponent,
  SjCardComponent,
  SjInput,
  SjTypographyComponent,
  sj,
  SjRootApi,
} from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-section',
  imports: [SjDirective, SjCardComponent, SjTypographyComponent],
  // Apply SjDirective to the host so the section styles the component itself
  hostDirectives: [{ directive: SjDirective }],
  template: `
    <sj-typography variant="h1" [sj]="[sj.margin(0), sj.fontSize('1.25rem')]">{{
      title
    }}</sj-typography>

    <sj-card
      [variant]="sj.sjCard.variants.outlined"
      [sj]="[sj.margin(0), sj.gap(0.5)]"
    >
      <ng-content></ng-content>
    </sj-card>
  `,
})
export class SectionContainerComponent {
  readonly sj: SjRootApi = sj;
  @Input() title = '';
}
