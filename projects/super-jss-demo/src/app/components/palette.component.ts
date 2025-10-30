import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SJ_BASE_COMPONENTS_IMPORTS, sj, SjRootApi } from 'super-jss';
import { SectionContainerComponent } from './section-container.component';
import { DemoItemComponent } from './demo-item.component';

@Component({
  selector: 'app-palette',
  standalone: true,
  imports: [
    CommonModule,
    SectionContainerComponent,
    SJ_BASE_COMPONENTS_IMPORTS,
    DemoItemComponent,
  ],
  template: `
    <app-section title="Palette">
      <sj-typography variant="p" [sj]="[sj.c('light.contrast')]">
        The theme palette defines semantic colors. Each color includes main,
        light, dark, and contrast variants.
      </sj-typography>

      <div
        [sj]="[
          sj.d(sj.d.options.grid),
          sj.gridTemplateColumns('repeat(auto-fit, minmax(280px, 1fr))'),
          sj.gap({ xs: 0.5, md: 1 })
        ]"
      >
        @for (color of demoColors(); track color[0]) {
        <app-demo-item [title]="color[0]" [titleColor]="color[0]">
          <sj-flex useCol>
            @for (colorVariant of color; track colorVariant) {
            <sj-card
              [variant]="sj.sjCard.variants.outlined"
              useRounded="default"
              usePadding="compact"
              [sj]="[sj.bg(colorVariant), sj.flexGrow(1)]"
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
            }
          </sj-flex>
        </app-demo-item>
        }
      </div>
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

  textColorFor(variant: string): string {
    if (variant.endsWith('.contrast')) return 'neutral.dark';
    const key = variant.includes('.') ? variant.split('.')[0] : variant;
    return `${key}.contrast`;
  }

  // code sample generation removed
}
