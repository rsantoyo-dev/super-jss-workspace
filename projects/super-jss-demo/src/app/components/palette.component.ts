import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SJ_BASE_COMPONENTS_IMPORTS,
  sj,
  SjRootApi,
  SjThemeService,
} from 'super-jss';
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
      <sj-typography variant="p" [sj]="[sj.c('light.contrast')]">
        The theme palette defines semantic colors. Each color includes main,
        light, dark, and contrast variants.
      </sj-typography>

      @for (family of families; track family) {
      <sj-flex useCol useGap="compact">
        <sj-typography variant="h6" [sj]="[sj.c('light.contrast'), sj.m(0)]"
          >palette/light/{{ family }}</sj-typography
        >
        <div
          [sj]="[
            sj.d('grid'),
            sj.gridTemplateColumns({ xs: 'repeat(4, minmax(80px, 1fr))' }),
            sj.gap(sj.gap.options.default)
          ]"
        >
          @for (tone of tones; track tone) {
          <sj-paper
            useRounded="default"
            usePadding="compact"
            variant="flat"
            [sj]="[
              sj.bg(family + '.' + tone),
              sj.c(textColorFor(family, tone)),
              sj.minH('140px'),
              sj.position('relative'),
              sj.brad(0.75)
            ]"
          >
            <sj-typography variant="p">{{ tone }}</sj-typography>
            <sj-typography
              variant="small"
              [sj]="[
                sj.position('absolute'),
                sj.right(1),
                sj.bottom(1),
                sj.textAlign('right'),
                sj.p(sj.padding.options.compact)
              ]"
            >
              {{ hexFor(family, tone) }}<br />{{ rgbFor(family, tone) }}
            </sj-typography>
          </sj-paper>
          }
        </div>
      </sj-flex>
      }
    </app-section>
  `,
})
export class PaletteComponent {
  readonly sj: SjRootApi = sj;
  private readonly theme = inject(SjThemeService);
  readonly families: Array<
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
    | 'dark'
    | 'neutral'
    | 'light'
  > = [
    'primary',
    'secondary',
    'tertiary',
    'success',
    'info',
    'warning',
    'error',
    'dark',
    'neutral',
    'light',
  ];
  readonly tones: Array<'main' | 'light' | 'dark' | 'contrast'> = [
    'main',
    'light',
    'dark',
    'contrast',
  ];

  textColorFor(family: string, tone: string): string {
    const hex = this.hexFor(family, tone).toLowerCase();
    const rgb = this.hexToRgb(hex);
    if (!rgb) return 'light.contrast';
    const [r, g, b] = rgb;
    const lum = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
    return lum < 0.55 ? '#FFFFFF' : '#000000';
  }

  hexFor(family: string, tone: string): string {
    const pal: any = this.theme.sjTheme().palette as any;
    const fam = pal[family];
    if (!fam) return '#000000';
    const v = fam[tone];
    return typeof v === 'string' ? v : '#000000';
  }

  rgbFor(family: string, tone: string): string {
    const rgb = this.hexToRgb(this.hexFor(family, tone));
    return rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : '';
  }

  private hexToRgb(hex: string): [number, number, number] | null {
    const h = hex.startsWith('#') ? hex.slice(1) : hex;
    if (h.length !== 6) return null;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
    return [r, g, b];
  }
}
