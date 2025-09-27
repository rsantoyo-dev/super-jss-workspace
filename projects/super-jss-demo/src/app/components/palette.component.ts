import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjDirective, WithSj, SjCardComponent, sj } from 'super-jss';
import { SectionContainerComponent } from './section-container.component';

@Component({
  selector: 'app-palette',
  standalone: true,
  imports: [CommonModule, SjDirective, SjCardComponent, SectionContainerComponent],
  template: `
    <app-section title="Palette">
      <sj-card [sj]="[ sj.blueprints.sjCard.flat(), sj.sh.d('block') ]">
        <p [sj]="[]">
          The SJSS theme palette defines a set of semantic colors. Each color
          typically includes main, light, dark, and contrast variants. These
          colors are used consistently throughout your application and update
          automatically when you switch themes, ensuring a cohesive and dynamic
          visual experience.
        </p>
        <pre [sj]="{ m: 0, p: 1, bg: 'light.light', brad: 0.5 }"><code>{{ this.sampleImplement }}</code></pre>
        <a
          href="https://sjss.dev/palette/"
          target="_blank"
          rel="noopener"
          [sj]="sj.button.containedPrimary({ w: 5, p: 0.5, px: 1, my: 1 })"
        >Docs</a>
      </sj-card>

      <div *ngFor="let color of demoColors()">
        <p [sj]="{ c: color[0], fontWeight: 'bold' }">{{ color[0] }}</p>
        <div [sj]="[ sj.flex.direction({ xs: 'column', md: 'row' }), sj.css.gap(2) ]">
          <sj-card
            *ngFor="let colorVariant of color"
            [sj]="{ bg: colorVariant, fxGrow: 1, fxJustify: 'center', py: 1 }"
          >
            <span [sj]="{ c: colorVariant === color[3] ? color[0] : color[3] }">{{ colorVariant }}</span>
          </sj-card>
        </div>
      </div>
    </app-section>
  `,
})
export class PaletteComponent extends WithSj {
  demoColors = signal([
    ['primary', 'primary.light', 'primary.dark', 'primary.contrast'],
    ['secondary', 'secondary.light', 'secondary.dark', 'secondary.contrast'],
    ['tertiary', 'tertiary.light', 'tertiary.dark', 'tertiary.contrast'],
    ['success', 'success.light', 'success.dark', 'success.contrast'],
    ['info', 'info.light', 'info.dark', 'info.contrast'],
    ['warning', 'warning.light', 'warning.dark', 'warning.contrast'],
    ['error', 'error.light', 'error.dark', 'error.contrast'],
    ['dark', 'dark.light', 'dark.dark', 'dark.contrast'],
    ['neutral', 'neutral.light', 'neutral.dark', 'neutral.contrast'],
    ['light', 'light.light', 'light.dark', 'light.contrast'],
  ]);

  sampleImplement: string =
    '<h3 [sj]="">Implement directive for text handler</h3>';
}
