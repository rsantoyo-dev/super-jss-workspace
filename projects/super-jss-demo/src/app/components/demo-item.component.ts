import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SJ_BASE_COMPONENTS_IMPORTS, SjRootApi, sj } from 'super-jss';
import { CodeBlockComponent } from './code-block.component';

@Component({
  standalone: true,
  selector: 'app-demo-item',
  imports: [CommonModule, ...SJ_BASE_COMPONENTS_IMPORTS, CodeBlockComponent],
  template: `
    <sj-card
      host
      usePadding="default"
      useRounded="default"
      variant="outlined"
      [sj]="[]"
    >
      <sj-flex useCol useGap>
        <sj-typography
          variant="h6"
          [sj]="[sj.c(titleColor || 'primary'), sj.mt(0)]"
          >{{ title }}</sj-typography
        >

        <div [sj]="">
          <ng-content></ng-content>
        </div>
      </sj-flex>
    </sj-card>
  `,
})
export class DemoItemComponent {
  readonly sj: SjRootApi = sj;
  @Input() title = '';
  @Input() titleColor: string | undefined;
  @Input() code: string | undefined;

  expanded = signal(false);
  toggle() {
    this.expanded.update((v) => !v);
  }
}
