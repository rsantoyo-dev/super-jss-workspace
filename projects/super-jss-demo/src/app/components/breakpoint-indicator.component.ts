import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjStyle,
  SjThemeService,
  sjCard,
} from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-breakpoint-indicator',
  imports: [CommonModule, SjDirective],
  template: `
    <div [sj]="style.metricsBar">
      <span [sj]="style.metricsItem">
        <strong>Breakpoints:</strong>
        {{ JSON.stringify(this.breakpoints()) }}
      </span>
      <span [sj]="style.metricsHighlight">
        <strong>Current Theme:</strong> {{ th.sjTheme().name }}
      </span>
      <span [sj]="style.metricsItem">
        <strong>Breakpoint:</strong> {{ th.currentBreakpoint() }}
      </span>
    </div>
  `,
})
export class BreakpointIndicatorComponent {
  readonly style: Record<string, SjStyle> = {
    metricsBar: sjCard({
      bg: 'secondary.light',
      d: 'flex',
      fxDir: { xs: 'column', sm: 'row' },
      fxJustify: 'space-around',
      fxAItems: 'center',
      gap: 0.75,
      p: 0.75,
      c: 'secondary.dark',
      boxShadow: '0 -1px 4px rgba(0,0,0,0.08)',
      borderColor: 'transparent',
    }),
    metricsItem: { textAlign: 'center', fontSize: { xs: 0.75, md: 0.85 } } as SjStyle,
    metricsHighlight: { fontWeight: 700, fontSize: 1 } as SjStyle,
  };

  breakpoints = computed(() => this.th.sjTheme().breakpoints);

  constructor(public th: SjThemeService) {}
  protected readonly JSON = JSON;
}
