import { Component, effect, inject } from '@angular/core';
import { SJ_BASE_COMPONENTS_IMPORTS, SjThemeService, sj } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-hero',
  imports: [SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-host
      [sj]="[
        sj.display(sj.display.options.flex),
        sj.flexDirection({
          xs: sj.flexDirection.options.column,
          md: sj.flexDirection.options.row
        }),
        sj.justifyContent(sj.justifyContent.options.center),
        sj.alignItems(sj.alignItems.options.center),
        sj.gap({ xs: 0.5, md: 1 }),
        sj.p(2),
        sj.bg(sj.bg.options.light.light)
      ]"
    >
      <sj-box
        [sj]="[
          sj.p(1),
          sj.brad(0.5),
          sj.bg(sj.bg.options.primary.main),
          sj.c(sj.c.options.primary.contrast)
        ]"
      >
        <h1 [sj]="[sj.m(0)]">Hello SJSS</h1>
      </sj-box>

      <sj-button
        [sj]="[
          sj.p(2),
          sj.bg('primary.main'),
          sj.c('white'),
          sj.hover([sj.backgroundColor(sj.bg.options.primary.dark)])
        ]"
        (click)="updatePrimaryColor()"
      >
        Update Primary
      </sj-button>
    </sj-host>
  `,
})
export class HeroComponent {
  readonly theme = inject(SjThemeService);
  // expose sj to template
  readonly sj = sj;

  // Log breakpoint changes reactively
  private _bpLogger = effect(() => {
    console.log('current breakpoint:', this.theme.breakpoint());
  });

  // One‑liner theme update for primary color
  updatePrimaryColor() {
    // update only primary.main while keeping other shades; cast partial palette for brevity
    this.theme.setTheme({
      palette: {
        primary: { ...this.theme.sjTheme().palette.primary, main: '#4e3149ff' },
      } as any,
    });
  }
}
