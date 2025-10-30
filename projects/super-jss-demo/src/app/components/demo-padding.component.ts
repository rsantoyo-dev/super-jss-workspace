import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SJ_BASE_COMPONENTS_IMPORTS,
  SjRootApi,
  sj,
  SjThemeService,
} from 'super-jss';
import { SectionContainerComponent } from './section-container.component';

@Component({
  standalone: true,
  selector: 'app-demo-padding',
  imports: [
    CommonModule,
    SectionContainerComponent,
    ...SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <app-section title="Component Padding Densities">
      <sj-typography variant="small">
        demoing sj-paper, sj-flex, sj-typography padding options and sj
        directive
      </sj-typography>
      <sj-typography variant="p">
        There are different needs when it comes to spacing inside components.
        Super-JSS provides sugar such as [usePadding] on components to quickly
        set responsive padding densities from the theme. You can also use the
        sj.padding helper from the sj directive for fine-grained control over
        padding values.
      </sj-typography>
      <sj-typography variant="small">
        <strong
          >component usePadding('compact' | 'default' | 'comfortable' |
          'spacious')</strong
        >
      </sj-typography>
      <sj-typography variant="small">
        <strong>component [usePadding](1 | 2 | 3 | 4)</strong>
      </sj-typography>
      <sj-typography variant="small">
        <strong
          >component [sj]="[sj.padding(sj.padding.options.compact)]"</strong
        >
      </sj-typography>

      <sj-typography variant="p">
        <strong>1 → xs 1 · md 2 · xl 3;</strong>
      </sj-typography>
      <sj-typography variant="p">
        <strong>2 → xs 3 · md 4 · xl 5;</strong>
      </sj-typography>
      <sj-typography variant="p">
        <strong>3 → xs 5 · md 6 · xl 7;</strong>
      </sj-typography>
      <sj-typography variant="p">
        <strong>4 → xs 7 · md 8 · xl 9.</strong>
      </sj-typography>

      <div
        [sj]="[
          sj.d('grid'),
          sj.gap(sj.gap.options.compact),
          sj.gridTemplateColumns({
            xs: '1fr',

          })
        ]"
      >
        @for (item of [1, 2, 3, 4]; track $index) {
        <sj-paper useRounded variant="outlined" usePaint="">
          <sj-flex useCol useGap="compact" useInline [usePadding]="$any(item)">
            <sj-paper
              [usePaint]="'secondary'"
              usePadding="compact"
              useRounded="compact"
            >
              <sj-typography variant="small">
                {{ densityName(item) }}
              </sj-typography>
            </sj-paper>
          </sj-flex>
        </sj-paper>
        }
      </div>
    </app-section>
  `,
})
export class DemoPaddingComponent {
  readonly sj: SjRootApi = sj;
  readonly theme = inject(SjThemeService);

  densitySteps(n: number): string {
    switch (n) {
      case 1:
        return 'xs 1 · md 2 · xl 3';
      case 2:
        return 'xs 3 · md 4 · xl 5';
      case 3:
        return 'xs 5 · md 6 · xl 7';
      case 4:
        return 'xs 7 · md 8 · xl 9';
      default:
        return '';
    }
  }

  densityName(n: number): string {
    switch (n) {
      case 1:
        return 'compact';
      case 2:
        return 'default';
      case 3:
        return 'comfortable';
      case 4:
        return 'spacious';
      default:
        return '';
    }
  }
}
