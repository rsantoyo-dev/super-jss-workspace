import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SJ_BASE_COMPONENTS_IMPORTS, sj, SjRootApi, SjThemeService } from 'super-jss';
import { SectionContainerComponent } from './section-container.component';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [CommonModule, SectionContainerComponent, SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <app-section title="Colors (theme.colors)">
      <sj-typography variant="p" [sj]="[sj.c('light.contrast')]
        ">
        Explore theme color families and tones. Each color exposes main, light, dark, and contrast.
      </sj-typography>

      @for (family of families; track family) {
      <sj-flex useCol useGap="compact">
        <sj-typography variant="h6" [sj]="[sj.c('light.contrast'), sj.m(0)]"
          >colors/{{ family }}</sj-typography
        >
        <!-- Scale families: show numeric shades + contrast; single families (black/white): show one tile -->
        @if (isScaleFamily(family)) {
          <div
            [sj]="[
              sj.d('grid'),
              sj.gridTemplateColumns({ xs: 'repeat(5, minmax(80px, 1fr))' }),
              sj.gap(sj.gap.options.default)
            ]"
          >
            @for (tone of shadesFor(family); track tone) {
            <sj-paper
              useRounded="default"
              usePadding="compact"
              variant="flat"
              [sj]="shadeTileStyle(family, tone)"
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
                {{ hexForShade(family, tone) }}
              </sj-typography>
            </sj-paper>
            }
          </div>
        } @else {
          <sj-paper
            useRounded="default"
            usePadding="compact"
            variant="flat"
            [sj]="[
              sj.bg(singleHex(family)),
              sj.c(textColorForHex(singleHex(family))),
              sj.minH('120px'),
              sj.position('relative'),
              sj.brad(0.75)
            ]"
          >
            <sj-typography variant="p">{{ family }}</sj-typography>
            <sj-typography variant="small">{{ singleHex(family) }}</sj-typography>
          </sj-paper>
        }
      </sj-flex>
      }
    </app-section>
  `,
})
export class ColorsComponent {
  readonly sj: SjRootApi = sj;
  private readonly theme = inject(SjThemeService);
  // Derive families from theme.colors keys
  readonly families: string[] = Object.keys(this.theme.sjTheme().colors || {});

  isScaleFamily(family: string): boolean {
    const entry: any = (this.theme.sjTheme().colors as any)?.[family];
    return entry && typeof entry === 'object' && '500' in entry;
  }

  shadesFor(family: string): (string | number)[] {
    const entry: any = (this.theme.sjTheme().colors as any)?.[family];
    if (!entry || typeof entry !== 'object') return [];
    const numeric = Object.keys(entry)
      .filter((k) => /^(50|100|200|300|400|500|600|700|800|900)$/.test(k))
      .map((k) => Number(k))
      .sort((a, b) => a - b);
    // include contrast tile at the end
    return [...numeric, 'contrast'];
  }

  colorToken(family: string, tone: string | number): string {
    return tone === 'contrast' ? `${family}.500` : `${family}.${tone}`;
  }

  textColorForShade(family: string, tone: string | number): string {
    const hex = this.hexForShade(family, tone).toLowerCase();
    const rgb = this.hexToRgb(hex);
    if (!rgb) return 'light.contrast';
    const [r, g, b] = rgb;
    const lum = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
    return lum < 0.55 ? '#FFFFFF' : '#000000';
  }

  hexForShade(family: string, tone: string | number): string {
    const colors: any = this.theme.sjTheme().colors as any;
    const fam = colors?.[family];
    if (!fam) return '#000000';
    if (tone === 'contrast') return fam?.contrast || '#000000';
    const v = fam[String(tone)];
    return typeof v === 'string' ? v : '#000000';
  }

  rgbFor(family: string, tone: string | number): string {
    const rgb = this.hexToRgb(this.hexForShade(family, tone));
    return rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : '';
  }

  // Single (non-scale) families like black/white
  singleHex(family: string): string {
    const colors: any = this.theme.sjTheme().colors as any;
    const val = colors?.[family];
    return typeof val === 'string' ? val : '#000000';
  }

  textColorForHex(hex: string): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return 'light.contrast';
    const [r, g, b] = rgb;
    const lum = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
    return lum < 0.55 ? '#FFFFFF' : '#000000';
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

  // Style builder for a shade/contrast tile
  shadeTileStyle(family: string, tone: string | number): any {
    const isContrast = tone === 'contrast';
    const bg = isContrast ? 'transparent' : this.colorToken(family, tone);
    const textColor = isContrast
      ? this.hexForShade(family, 'contrast')
      : this.textColorForShade(family, tone);
    const base: any = {
      backgroundColor: bg,
      color: textColor,
      minHeight: '120px',
      position: 'relative',
      borderRadius: '0.75rem',
    };
    if (isContrast) {
      base.gridColumn = '1 / -1';
      base.border = '1px solid';
      base.borderColor = 'light.dark';
      base.padding = '0.5rem';
    }
    return base;
  }
}
