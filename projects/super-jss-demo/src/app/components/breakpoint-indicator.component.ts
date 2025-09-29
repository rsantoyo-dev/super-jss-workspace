import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SJ_BASE_COMPONENTS_IMPORTS,
  SjDirective,
  SjHostComponent,
  WithSj,
} from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-breakpoint-indicator',
  imports: [CommonModule, SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-host
      [sj]="[
        sj.blueprints.sjCard(),
        sj.sh.gap(0),
        sj.sh.bg(sj.palette.info.main)
      ]"
    >
      <sj-typography variant="small" [sj]="sj.sh.c(sj.palette.info.contrast)">
        <strong>Breakpoints:</strong>
        {{ JSON.stringify(this.breakpoints()) }}
      </sj-typography>
      <sj-typography variant="small" [sj]="sj.sh.c(sj.palette.info.contrast)">
        <strong>Current Theme:</strong> {{ theme.sjTheme().name }}
      </sj-typography>
      <sj-typography variant="small" [sj]="sj.sh.c(sj.palette.info.contrast)">
        <strong>Breakpoint:</strong> {{ theme.currentBreakpoint() }}
      </sj-typography>
    </sj-host>
  `,
})
export class BreakpointIndicatorComponent extends WithSj {
  breakpoints = computed(() => this.theme.sjTheme().breakpoints);

  constructor() {
    super();
  }
  protected readonly JSON = JSON;
}
