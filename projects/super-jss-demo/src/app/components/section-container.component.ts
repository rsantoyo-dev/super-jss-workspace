import { Component, Input, OnInit } from '@angular/core';
import { WithSj, SjDirective, SjHostComponent, SjCardComponent, SjInput } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-section',
  imports: [SjDirective, SjCardComponent],
  // Apply SjDirective to the host so the section styles the component itself
  hostDirectives: [
    { directive: SjDirective }
  ],
  template: `
    <h1 [sj]="[ sj.css.margin(0), sj.css.fontSize('1.25rem') ]">{{ title }}</h1>

    <sj-card [variant]="sj.variants.sjCard.outlined" [sj]="[ sj.css.margin(0), sj.css.gap(0.5) ]">
      <ng-content></ng-content>
    </sj-card>
  `,
})
export class SectionContainerComponent extends WithSj  {
  @Input() title = '';

}
