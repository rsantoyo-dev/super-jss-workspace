import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjDirective, SjCardComponent, sj, SjRootApi } from 'super-jss';
import { SjBoxComponent } from 'super-jss';
import { SectionContainerComponent } from './section-container.component';
import { SJ_BASE_COMPONENTS_IMPORTS } from 'super-jss';

@Component({
  selector: 'app-palette',
  standalone: true,
  imports: [
    CommonModule,

    SectionContainerComponent,
    SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <app-section title="Palette">
      <sj-card [sj]="[sj.sjCard.flat(), sj.d('block')]">
        <sj-typography variant="p" [sj]="[]">
          The SJSS theme palette defines a set of semantic colors. Each color
          typically includes main, light, dark, and contrast variants. These
          colors are used consistently throughout your application and update
          automatically when you switch themes, ensuring a cohesive and dynamic
          visual experience.
        </sj-typography>
        <sj-typography
          variant="pre"
          [sj]="[sj.m(0), sj.p(1), sj.bg('light.light'), sj.brad(0.5)]"
          ><code>{{ this.sampleImplement }}</code></sj-typography
        >
        <a
          href="https://sjss.dev/palette/"
          target="_blank"
          rel="noopener"
          [sj]="sj.button.containedPrimary({ w: 5, p: 0.5, px: 1, my: 1 })"
          >Docs</a
        >
      </sj-card>

      <sj-card *ngFor="let color of demoColors()">
        <sj-typography
          variant="p"
          [sj]="[sj.c(color[0]), sj.fontWeight('bold')]"
          >{{ color[0] }}</sj-typography
        >
        <sj-card [sj]="[sj.fxDir({ xs: 'column', md: 'row' })]">
          <sj-card
            *ngFor="let colorVariant of color"
            [sj]="[sj.bg(colorVariant), sj.flexGrow(1)]"
          >
            <sj-typography
              [variant]="'span'"
              [sj]="[
                sj.display(sj.display.options.flex),
                sj.justifyContent(sj.justifyContent.options.center),
                sj.alignItems(sj.alignItems.options.center),
                sj.width('100%')
              ]"
              >{{ colorVariant }}</sj-typography
            >
          </sj-card>
        </sj-card>
      </sj-card>
    </app-section>
  `,
})
export class PaletteComponent {
  readonly sj: SjRootApi = sj;
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
