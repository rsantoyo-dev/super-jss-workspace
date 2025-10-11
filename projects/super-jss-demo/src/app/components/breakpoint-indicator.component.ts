import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SJ_BASE_COMPONENTS_IMPORTS,
  SjDirective,
  SjHostComponent,
  SjThemeService,
  sj,
  SjRootApi,
} from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-breakpoint-indicator',
  imports: [CommonModule, ...SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-paper
      usePadding="compact"
      useRounded="compact"
      [sj]="[sj.bg(sj.palette.info.main)]"
    >
      <sj-flex useCol useGap="compact">
        <sj-typography variant="small" [sj]="sj.c(sj.palette.info.contrast)">
          <strong>Breakpoints:</strong>
          {{ JSON.stringify(this.breakpoints()) }}
        </sj-typography>
        <sj-typography variant="small" [sj]="sj.c(sj.palette.info.contrast)">
          <strong>Current Theme:</strong> {{ theme.sjTheme().name }}
        </sj-typography>
        <sj-typography variant="small" [sj]="sj.c(sj.palette.info.contrast)">
          <strong>Breakpoint:</strong> {{ theme.currentBreakpoint() }}
        </sj-typography>
      </sj-flex>
    </sj-paper>
  `,
})
export class BreakpointIndicatorComponent {
  readonly sj: SjRootApi = sj;
  readonly theme = inject(SjThemeService);
  breakpoints = computed(() => this.theme.sjTheme().breakpoints);
  protected readonly JSON = JSON;
}
