import { Component, effect, inject } from '@angular/core';
import {
  SJ_BASE_COMPONENTS_IMPORTS,
  SjPalette,
  SjThemeService,
  SjTypography,
  sj,
} from 'super-jss';

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
      <sj-box [sj]="[sj.p(1), sj.brad(0.5), sj.bg(sj.bg.options.primary.main)]">
        <sj-typography
          variant="h1"
          [sj]="[sj.px(4), sj.c(sj.c.options.light.light)]"
          >Hello SJSS</sj-typography
        >
      </sj-box>

      <sj-button
        [sj]="[
          sj.p(2),
          sj.hover([sj.backgroundColor(sj.bg.options.primary.dark)])
        ]"
        (click)="updateTheme()"
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

  private _bpLogger = effect(() => {
    console.log('current breakpoint:', this.theme.breakpoint());
  });

  // One‑liner theme update for primary color
  updateTheme() {
    // update only primary.main while keeping other shades, and override default typography
    this.theme.setTheme({
      palette: { primary: { main: 'purple' } },
      typography: { default: { color: 'light', fontFamily: 'cursive' } },
    });
  }
}
