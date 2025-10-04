import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SJ_BASE_COMPONENTS_IMPORTS, sj, SjRootApi } from 'super-jss';
import { SectionContainerComponent } from './section-container.component';

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
      <sj-typography variant="p">
        The theme palette defines semantic colors. Each color typically includes
        main, light, dark, and contrast variants. Toggle to view usage.
      </sj-typography>
      <sj-button
        type="button"
        (click)="toggleSnippets()"
        [attr.aria-pressed]="showSnippets"
        [variant]="sj.sjButton.variants.outlined"
        [sj]="{ px: 1, py: 0.5 }"
      >
        {{ showSnippets ? 'Hide usage' : 'Show usage' }}
      </sj-button>
      @if (showSnippets) {
      <sj-typography
        variant="pre"
        [sj]="[sj.m(0), sj.p(1), sj.bg('light.light'), sj.brad(0.5)]"
      >
        <code>{{ sampleImplement }}</code>
      </sj-typography>
      }
      <a
        href="https://sjss.dev/palette/"
        target="_blank"
        rel="noopener"
        [sj]="sj.sjButton.containedPrimary({ w: 5, p: 0.5, px: 1, my: 1 })"
        >Docs</a
      >

      <div
        [sj]="[
          sj.d(sj.d.options.grid),
          sj.gridTemplateColumns('repeat(auto-fit, minmax(280px, 1fr))'),
          sj.gap({ xs: 0.5, md: 1 })
        ]"
      >
        <sj-card *ngFor="let color of demoColors()" [sj]="sj.sjCard.outlined()">
          <sj-typography variant="h6" [sj]="[sj.c(color[0]), sj.mt(0)]">{{
            color[0]
          }}</sj-typography>
          <div [sj]="[sj.d('flex'), sj.fxDir({ xs: 'column' }), sj.gap(0.5)]">
            <sj-card
              *ngFor="let colorVariant of color"
              [sj]="[sj.bg(colorVariant), sj.flexGrow(1), sj.p(0.5)]"
            >
              <sj-typography
                variant="span"
                [sj]="[
                  sj.d(sj.d.options.flex),
                  sj.justifyContent(sj.justifyContent.options.center),
                  sj.alignItems(sj.alignItems.options.center),
                  sj.w('100%'),
                  sj.c(textColorFor(colorVariant)),
                  sj.m(0)
                ]"
                >{{ colorVariant }}</sj-typography
              >
            </sj-card>
          </div>
        </sj-card>
      </div>
    </app-section>
  `,
})
export class PaletteComponent {
  readonly sj: SjRootApi = sj;
  showSnippets = false;

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

  toggleSnippets() {
    this.showSnippets = !this.showSnippets;
  }

  sampleImplement: string = `
<div [sj]="[sj.bg(sj.palette.primary.main), sj.c(sj.palette.primary.contrast), sj.p(1)]">
  Primary surface
</div>`;

  textColorFor(variant: string): string {
    if (variant.endsWith('.contrast')) return 'neutral.dark';
    const key = variant.includes('.') ? variant.split('.')[0] : variant;
    return `${key}.contrast`;
  }
}
