import { Component, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SJ_BASE_COMPONENTS_IMPORTS,
  SjRootApi,
  SjThemeService,
  sj,
} from 'super-jss';
import { SectionContainerComponent } from './section-container.component';

@Component({
  standalone: true,
  selector: 'app-demo-spacing',
  imports: [
    CommonModule,
    SectionContainerComponent,
    ...SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <app-section title="Spacing Scale (1–20)">
      <sj-flex useGap="compact">
        <sj-typography variant="small">Live StackBlitz demo:</sj-typography>
        <a
          href="https://stackblitz.com/edit/sjss-spacing?file=src%2Fmain.ts"
          target="_blank"
          rel="noreferrer"
          [sj]="sj.c('primary.main')"
          >Open</a
        >
      </sj-flex>
      <sj-typography variant="small" [sj]="sj.c('neutral.dark')">
        sj.space(n) returns the rem factor for the systemic spacing step n.
        Example: sj.space(3) = 0.5rem (8px).
      </sj-typography>

      <div
        [sj]="[
          sj.d('flex'),
          sj.flexDirection('column'),
          sj.gap(sj.gap.options.compact)
        ]"
      >
        @for (item of stepsToShow(); track item) {
        <sj-paper useRounded variant="outlined">
          <sj-flex
            useCol
            useGap="compact"
            useInline
            [sj]="[sj.padding(2), sj.padding(item)]"
          >
            <sj-paper
              [usePaint]="'secondary'"
              usePadding="compact"
              useRounded="compact"
            >
              <sj-typography variant="small"></sj-typography>
              <sj-typography variant="small"
                >sj-paper [sj]='sj.padding({{ item }})'</sj-typography
              >
              <sj-typography variant="small"
                >{{ sj.space(item) * 16 | number : '1.0-0' }}px ·
                {{ sj.space(item) | number : '1.3-3' }}rem</sj-typography
              >
            </sj-paper>
          </sj-flex>
        </sj-paper>
        }
      </div>

      <sj-typography variant="small" [sj]="sj.c('neutral.dark')">
        ex. padding Top sj.pt(item)
      </sj-typography>

      <div
        [sj]="[
          sj.d('flex'),
          sj.flexDirection('column'),
          sj.gap(sj.gap.options.compact)
        ]"
      >
        @for (item of bigSteps; track item) {
        <sj-paper useRounded variant="outlined">
          <sj-flex
            useCol
            useGap="compact"
            useInline
            [sj]="[sj.padding(2), sj.pt(item)]"
          >
            <sj-paper
              [usePaint]="'secondary'"
              usePadding="compact"
              useRounded="compact"
            >
              <sj-typography variant="small"></sj-typography>
              <sj-typography variant="small"
                >sj-paper [sj]='sj.padding({{ item }})'</sj-typography
              >
              <sj-typography variant="small"
                >{{ sj.space(item) * 16 | number : '1.0-0' }}px ·
                {{ sj.space(item) | number : '1.3-3' }}rem</sj-typography
              >
            </sj-paper>
          </sj-flex>
        </sj-paper>
        }
      </div>

      <sj-typography variant="small" [sj]="sj.c('neutral.dark')">
        ex. padding in X sj.px(item)
      </sj-typography>

      <div
        [sj]="[
          sj.d('flex'),
          sj.flexDirection('column'),
          sj.gap(sj.gap.options.compact)
        ]"
      >
        @for (item of bigSteps; track item) {
        <sj-paper useRounded variant="outlined">
          <sj-flex
            useCol
            useGap="compact"
            useInline
            [sj]="[sj.padding(2), sj.px(item)]"
          >
            <sj-paper
              [usePaint]="'secondary'"
              usePadding="compact"
              useRounded="compact"
            >
              <sj-typography variant="small"></sj-typography>
              <sj-typography variant="small"
                >sj-paper [sj]='sj.padding({{ item }})'</sj-typography
              >
              <sj-typography variant="small"
                >{{ sj.space(item) * 16 | number : '1.0-0' }}px ·
                {{ sj.space(item) | number : '1.3-3' }}rem</sj-typography
              >
            </sj-paper>
          </sj-flex>
        </sj-paper>
        }
      </div>
    </app-section>
  `,
})
export class DemoSpacingComponent {
  readonly sj: SjRootApi = sj;

  readonly theme = inject(SjThemeService);

  breakpoints = computed(() => this.theme.sjTheme().breakpoints);
  currentBp = computed(() => this.theme.currentBreakpoint());
  isMobileOrTablet = computed(() => {
    const bp = this.currentBp();
    return bp === 'xs' || bp === 'sm' || bp === 'md';
  });

  // Derive directly from current breakpoint so it re-evaluates on every bp change
  stepsToShow = computed(() => {
    const bp = this.currentBp(); // track breakpoint changes explicitly
    const isSmall = bp === 'xs' || bp === 'sm' || bp === 'md';
    return isSmall ? this.steps.filter((item) => item < 12) : this.steps;
  });

  readonly bigSteps = Array.from({ length: 6 }, (_, i) => (i + 1) * 2);
  readonly steps = Array.from({ length: 16 }, (_, i) => i + 1);

  // Debug: track recomputation order on breakpoint changes
  _debug = effect(() => {
    const bp = this.currentBp();
    const len = this.stepsToShow().length;
    const ver = this.theme.themeVersion();
    // eslint-disable-next-line no-console
    console.log('[SpacingDemo]', { bp, stepsToShow: len, themeVersion: ver });
    return { bp, len, ver };
  });
}
