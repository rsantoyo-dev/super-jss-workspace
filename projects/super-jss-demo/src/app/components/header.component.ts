import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjStyle,
  SjThemeService,
  sjButton,
  sjCard,
} from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, SjDirective],
  template: `
    <div [sj]="style.header">
      <div [sj]="style.brand">
        <h1 [sj]="{c:'primary.contrast'}">SUPER-JSS</h1>
        <span [sj]="{c:'primary.contrast'}">The ultimate solution for dynamic styling</span>
      </div>

      
    </div>

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
export class HeaderComponent {
  readonly style: Record<string, SjStyle> = {
    header: sjCard.primary({
      borderRadius:0,
      fxDir: { xs: 'column', lg: 'row' },
      fxJustify: 'space-between',
      fxAItems: 'center',
    }),
    brand: { d: 'flex', fxDir: 'column', fxAItems: { xs: 'center', lg: 'flex-start' } } as SjStyle,
 
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
