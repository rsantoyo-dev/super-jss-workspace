import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjDirective, SjHostComponent, WithSj } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-breakpoint-indicator',
  imports: [CommonModule, SjDirective, SjHostComponent],
  template: `
    <sj-host
      [sj]="[
        sj.blueprints.sjCard(), sj.sh.gap(0), sj.sh.bg(sj.palette.info.main)
      ]"
    >
      <small [sj]="sj.sh.c(sj.palette.info.contrast)">
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
