import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SJ_BASE_COMPONENTS_IMPORTS, SjThemeService, sj } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-hero',
  imports: [RouterModule, SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-card
      host
      cardVariant="elevated"
      useSurface
      useRounded
      [density]="3"
      [sj]="[
        sj.maxW('960px'),
        sj.mx('auto'),
        sj.my(1),
        sj.bg(sj.palette.light.main)
      ]"
    >
      <sj-typography variant="h2" [sj]="sj.m(0)">Super JSS</sj-typography>
      <sj-typography variant="span" [sj]="[sj.opacity(0.85), sj.mt(0.25)]">
        Tiny, flexible, themeable styling primitives for Angular.
      </sj-typography>

      <sj-button [sj]="sj.w(10)" (click)="updateTheme()"
        >Shuffle Colors</sj-button
      >

      <sj-paper
        variant="flat"
        usePadding
        [sj]="[sj.mt(1), sj.bg(sj.palette.light.light)]"
      >
        <sj-typography variant="p" [sj]="sj.m(0)">
          Use <strong>[sj]</strong> on any element, or drop ready components
          like <strong>sj-paper</strong>, <strong>sj-card</strong>, and
          <strong>sj-button</strong>.
        </sj-typography>
      </sj-paper>
    </sj-card>
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
    // update only primary.main while keeping other shades
    const colors = ['purple', 'teal', 'orange', 'indigo', 'green'];
    const pick = colors[Math.floor(Math.random() * colors.length)];
    this.theme.setTheme({ palette: { primary: { main: pick } } as any });
  }
}
