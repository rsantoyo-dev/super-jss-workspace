import { Component, Input, OnInit } from '@angular/core';
import {
  WithSj,
  SjDirective,
  SjHostComponent,
  SjCardComponent,
  SjInput,
  SjTypographyComponent,
} from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-section',
  imports: [SjDirective, SjCardComponent, SjTypographyComponent],
  // Apply SjDirective to the host so the section styles the component itself
  hostDirectives: [{ directive: SjDirective }],
  template: `
    <sj-typography
      variant="h1"
      [sj]="[sj.css.margin(0), sj.css.fontSize('1.25rem')]"
      >{{ title }}</sj-typography
    >

    <sj-card
      [variant]="sj.variants.sjCard.outlined"
      [sj]="[sj.css.margin(0), sj.css.gap(0.5)]"
    >
      <ng-content></ng-content>
    </sj-card>
  `,
})
export class SectionContainerComponent extends WithSj {
  @Input() title = '';
}
