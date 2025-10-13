import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SJ_BASE_COMPONENTS_IMPORTS, SjRootApi, sj } from 'super-jss';
import { CodeBlockComponent } from './code-block.component';

@Component({
  standalone: true,
  selector: 'app-demo-item',
  imports: [CommonModule, ...SJ_BASE_COMPONENTS_IMPORTS, CodeBlockComponent],
  template: `
    <sj-card host usePadding="default" variant="outlined" [sj]="[]">
      <sj-typography
        variant="h6"
        [sj]="[sj.c(titleColor || 'primary'), sj.mt(0)]"
        >{{ title }}</sj-typography
      >

      <div [sj]="sj.m(0)">
        <ng-content></ng-content>
      </div>

      @if (code) {
      <div
        [sj]="[
          sj.mt(0.5),
          sj.d('flex'),
          sj.fxDir(sj.fxDir.options.row),
          sj.gap(0.5)
        ]"
      >
        <sj-button
          [variant]="sj.sjButton.variants.outlined"
          [sj]="{ px: 0.5, py: 0.25 }"
          (click)="toggle()"
        >
          {{ expanded() ? 'Hide code' : 'Show code' }}
        </sj-button>
      </div>
      @if (expanded()) {
      <app-code-block [code]="code!"></app-code-block>
      } }
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
