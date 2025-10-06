import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sj, SJ_BASE_COMPONENTS_IMPORTS } from 'super-jss';
import { SjRootApi } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-code-block',
  imports: [CommonModule, ...SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-card
      variant="outlined"
      [sj]="[sj.backgroundColor('light.dark'), sj.p(1), sj.m(0)]"
      [sj]="{ m: 0, p: 1, bg: 'light.light', backgroundColor: 'light.dark' }"
    >
      <code [innerText]="code"></code>
    </sj-card>
  `,
})
export class CodeBlockComponent {
  readonly sj: SjRootApi = sj;
  @Input() code = '';
}
