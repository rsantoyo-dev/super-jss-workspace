import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SJ_BASE_COMPONENTS_IMPORTS,
  SjRootApi,
  SjStyle,
  sj,
  sjPaper as sjPaperBlueprint,
} from 'super-jss';
import { DemoItemComponent } from './demo-item.component';
import { SectionContainerComponent } from './section-container.component';

interface DemoPaper {
  title: string;
  subtitle?: string;
  paperType: SjStyle;
  message: string;
  titleColor: string;
}

@Component({
  selector: 'app-demo-paper',
  standalone: true,
  imports: [
    CommonModule,
    SectionContainerComponent,
    ...SJ_BASE_COMPONENTS_IMPORTS,
    DemoItemComponent,
  ],
  template: `
    <app-section title="Paper (Surface)">
      <sj-typography variant="span">
        Paper is a neutral surface. Use
        <code>&lt;sj-paper variant="..."&gt;</code> for flat/outlined/filled.
        Prefer density tokens for consistent spacing and corners:
        <code>usePadding</code>, <code>useGap</code>, <code>useRounded</code>.
      </sj-typography>

      <sj-typography variant="h6" [sj]="{ mt: 1 }">Variants & usage</sj-typography>

      <div
        [sj]="[
          sj.d(sj.d.options.grid),
          sj.gridTemplateColumns('repeat(auto-fit, minmax(360px, 1fr))'),
          sj.gap(sj.gap.options.compact)
        ]"
      >
        @for (paper of paperData; track paper.title) {
        <app-demo-item
          [title]="paper.title"
          [subtitle]="paper.subtitle"
          [titleColor]="paper.titleColor"
        >
          <sj-paper [sj]="[paper.paperType]">
            <sj-typography variant="p" [sj]="sj.m(0)">{{
              paper.message
            }}</sj-typography>
          </sj-paper>
        </app-demo-item>
        }
      </div>

      <sj-typography variant="h6" [sj]="{ mt: 1 }"
        >Component basics: sj-paper</sj-typography
      >
      <sj-typography variant="span">
        Start simple: use the <code>&lt;sj-paper&gt;</code> component with a
        <code>variant</code>. Then add styles with <code>[sj]</code> when you
        want specifics.
      </sj-typography>

      <sj-typography variant="h6" [sj]="{ mt: 1 }"
        >Density-Aware Inputs</sj-typography
      >
      <sj-typography variant="span">
        Using inputs like <code>usePadding</code> applies consistent spacing and
        rounding based on a density level (e.g., 'compact', 'default'). This
        keeps spacing uniform across the app, sourcing values from
        <code>theme.components.surfaces</code>.
      </sj-typography>

      <div
        [sj]="[
          sj.d(sj.d.options.grid),
          sj.gridTemplateColumns('repeat(auto-fit, minmax(280px, 1fr))'),
          sj.gap({ xs: 0.5, md: 1 })
        ]"
      >
        <app-demo-item title="Compact" subtitle='usePadding="compact" useRounded="compact"'>
          <sj-paper
            variant="outlined"
            useRounded="compact"
            usePadding="compact"
          >
            <sj-typography variant="strong" [sj]="sj.m(0)"
              >Compact</sj-typography
            >
            <sj-typography variant="small" [sj]="sj.m(0)"
              >usePadding="compact"</sj-typography
            >
          </sj-paper>
        </app-demo-item>
        <app-demo-item title="Default" subtitle='usePadding="default" useRounded="default"'>
          <sj-paper
            variant="outlined"
            usePadding="default"
            useRounded="default"
          >
            <sj-typography variant="strong" [sj]="sj.m(0)"
              >Default</sj-typography
            >
            <sj-typography variant="small" [sj]="sj.m(0)"
              >usePadding="default"</sj-typography
            >
          </sj-paper>
        </app-demo-item>
        <app-demo-item title="Comfortable" subtitle='usePadding="comfortable" useRounded="comfortable"'>
          <sj-paper
            variant="outlined"
            usePadding="comfortable"
            useRounded="comfortable"
          >
            <sj-typography variant="strong" [sj]="sj.m(0)"
              >Comfortable</sj-typography
            >
            <sj-typography variant="small" [sj]="sj.m(0)"
              >usePadding="comfortable"</sj-typography
            >
          </sj-paper>
        </app-demo-item>
        <app-demo-item title="Spacious" subtitle='usePadding="spacious" useRounded="spacious"'>
          <sj-paper
            variant="outlined"
            usePadding="spacious"
            useRounded="spacious"
          >
            <sj-typography variant="strong" [sj]="sj.m(0)"
              >Spacious</sj-typography
            >
            <sj-typography variant="small" [sj]="sj.m(0)"
              >usePadding="spacious"</sj-typography
            >
          </sj-paper>
        </app-demo-item>
      </div>

      <sj-typography variant="h6" [sj]="{ mt: 1 }"
        >Individual Inputs</sj-typography
      >
      <sj-typography variant="span">
        You can also apply one concern at a time by passing a density level to
        <code>usePadding</code>, <code>useGap</code>, or
        <code>useRounded</code>.
      </sj-typography>

      <div
        [sj]="[
          sj.d(sj.d.options.grid),
          sj.gridTemplateColumns('repeat(auto-fit, minmax(280px, 1fr))'),
          sj.gap({ xs: 0.5, md: 1 }),
          sj.mt(0.5)
        ]"
      >
        <app-demo-item title="Padding" subtitle='usePadding="default"'>
          <sj-paper variant="outlined" usePadding="default">
            <sj-typography variant="strong" [sj]="sj.m(0)"
              >Padding</sj-typography
            >
            <sj-typography variant="small" [sj]="sj.m(0)"
              >usePadding="default"</sj-typography
            >
          </sj-paper>
        </app-demo-item>
        <app-demo-item title="Gap" subtitle='useGap="default"'>
          <sj-paper variant="outlined" useGap="default">
            <sj-typography variant="strong" [sj]="sj.m(0)">Gap</sj-typography>
            <sj-typography variant="small" [sj]="sj.m(0)"
              >useGap="default"</sj-typography
            >
          </sj-paper>
        </app-demo-item>
        <app-demo-item title="Rounded" subtitle='useRounded="default" usePadding="default"'>
          <sj-paper variant="outlined" useRounded="default">
            <sj-typography variant="strong" [sj]="sj.m(0)"
              >Rounded</sj-typography
            >
            <sj-typography variant="small" [sj]="sj.m(0)"
              >useRounded="default"</sj-typography
            >
          </sj-paper>
        </app-demo-item>
      </div>

      <sj-typography variant="small" [sj]="sj.mt(1)">
        Tip: use <code>[sj]</code> to override any detail. The component toggles
        provide fast, theme-aligned defaults; explicit styles still win.
      </sj-typography>
    </app-section>
  `,
})
export class DemoPaperComponent {
  readonly sj: SjRootApi = sj;
  readonly sjPaper = sjPaperBlueprint;

  readonly paperData: DemoPaper[] = this.buildPaperData();

  private buildPaperData(): DemoPaper[] {
    const items = [
      {
        title: 'Filled paper',
        subtitle: 'default',
        build: () => this.sjPaper(),
        message: 'Filled (default).',
        titleColor: 'primary',
      },
      {
        title: 'Flat paper',
        subtitle: 'variant="flat"',
        build: () => this.sjPaper.flat(),
        message: 'Flat (no background/border).',
        titleColor: 'primary',
      },
      {
        title: 'Outlined paper',
        subtitle: 'variant="outlined"',
        build: () => this.sjPaper.outlined(),
        message: 'Outlined (transparent background).',
        titleColor: 'primary',
      },
      
      {
        title: 'Paper',
        subtitle: `[sj]="{ bg: 'secondary.main' }"`,
        build: () => this.sjPaper({ bg: 'secondary.main' }),
        message: 'Custom background.',
        titleColor: 'secondary.contrast',
      },
      {
        title: `<sj-paper variant="outlined" [sj]="{ p: 1 }">`,
        build: () => this.sjPaper.outlined({ p: 1 }),
        message: 'Outlined with custom padding via [sj] (explicit override).',
        titleColor: 'primary',
      },
    ];

    return items.map(({ build, ...row }) => {
      const paperType = build();
      return {
        ...row,
        paperType,
      } as DemoPaper;
    });
  }
}
