import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjDirective, SjHostComponent } from 'super-jss';
import { WithSj } from '../shared/with-sj';

@Component({
  standalone: true,
  selector: 'app-breakpoint-indicator',
  imports: [CommonModule, SjDirective, SjHostComponent],
  template: `
    <sj-host
      [sj]="[
        sj.blueprints.sjCard, sj.css.gap(0), sj.sh.w('100%')
      ]"
    >
      <small [sj]="">
        <strong>Breakpoints:</strong>
        {{ JSON.stringify(this.breakpoints()) }}
      </small>
      <small [sj]="">
        <strong>Current Theme:</strong> {{ theme.sjTheme().name }}
      </small>
      <small [sj]=" ">
        <strong>Breakpoint:</strong> {{ theme.currentBreakpoint() }}
      </small>
    </sj-host>
  `,
})
export class BreakpointIndicatorComponent extends WithSj {
  breakpoints = computed(() => this.theme.sjTheme().breakpoints);

  constructor() { super(); }
  protected readonly JSON = JSON;
}
