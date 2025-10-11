import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SJ_BASE_COMPONENTS_IMPORTS, SjRootApi, SjStyle, sj, sjPaper as sjPaperBlueprint } from 'super-jss';
import { DemoItemComponent } from './demo-item.component';
import { SectionContainerComponent } from './section-container.component';

interface DemoPaper {
  title: string;
  paperType: SjStyle;
  message: string;
  titleColor: string;
  usageExample: string;
  computedStyle: string;
}

@Component({
  selector: 'app-demo-paper',
  standalone: true,
  imports: [CommonModule, SectionContainerComponent, ...SJ_BASE_COMPONENTS_IMPORTS, DemoItemComponent],
  template: `
    <app-section title="Paper (Surface)">
      <sj-typography variant="span">
        Paper is a neutral visual surface component. Use
        <code>&lt;sj-paper variant="..."&gt;</code> for filled/flat/outlined
        looks. For consistent spacing and corners, use the density-aware inputs
        <code>usePadding</code>, <code>useGap</code>, <code>useGutters</code>, and <code>useRounded</code>.
      </sj-typography>

      

      <div [sj]="[ sj.d(sj.d.options.grid), sj.gridTemplateColumns('repeat(auto-fit, minmax(360px, 1fr))'), sj.gap({ xs: 0.5, md: 1 }), sj.mt(0) ]">
        @for (paper of paperData; track paper.title) {
          <app-demo-item [title]="paper.title" [titleColor]="paper.titleColor" [code]="paper.usageExample">
            <sj-paper [sj]="[paper.paperType, sj.mt(0)]">
              <sj-typography variant="p" [sj]="[sj.m(0), sj.mt(0)]">{{ paper.message }}</sj-typography>
            </sj-paper>
          </app-demo-item>
        }
      </div>

      <sj-typography variant="h6" [sj]="{ mt: 1 }">Component basics: sj-paper</sj-typography>
      <sj-typography variant="span">
        Start simple: use the <code>&lt;sj-paper&gt;</code> component with a
        <code>variant</code>. Then add styles with <code>[sj]</code> when you
        want specifics.
      </sj-typography>

      <sj-typography variant="h6" [sj]="{ mt: 1 }">Density-Aware Inputs</sj-typography>
      <sj-typography variant="span">
        Using inputs like <code>useGutters</code> applies consistent spacing and rounding
        based on a density level (e.g., 'compact', 'default'). This keeps spacing uniform across the
        app, sourcing values from <code>theme.components.surfaces</code>.
      </sj-typography>

      <div [sj]="[ sj.d(sj.d.options.grid), sj.gridTemplateColumns('repeat(auto-fit, minmax(280px, 1fr))'), sj.gap({ xs: 0.5, md: 1 }) ]">
        <app-demo-item title="Compact" [code]="codeSurface('compact')">
          <sj-paper variant="outlined" useGutters="compact" useRounded="compact">
            <sj-typography variant="strong" [sj]="sj.m(0)">Compact</sj-typography>
            <sj-typography variant="small" [sj]="sj.m(0)">useGutters="compact"</sj-typography>
          </sj-paper>
        </app-demo-item>
        <app-demo-item title="Default" [code]="codeSurface('default')">
          <sj-paper variant="outlined" useGutters="default" useRounded="default">
            <sj-typography variant="strong" [sj]="sj.m(0)">Default</sj-typography>
            <sj-typography variant="small" [sj]="sj.m(0)">useGutters="default"</sj-typography>
          </sj-paper>
        </app-demo-item>
        <app-demo-item title="Comfortable" [code]="codeSurface('comfortable')">
          <sj-paper variant="outlined" useGutters="comfortable" useRounded="comfortable">
            <sj-typography variant="strong" [sj]="sj.m(0)">Comfortable</sj-typography>
            <sj-typography variant="small" [sj]="sj.m(0)">useGutters="comfortable"</sj-typography>
          </sj-paper>
        </app-demo-item>
        <app-demo-item title="Spacious" [code]="codeSurface('spacious')">
          <sj-paper variant="outlined" useGutters="spacious" useRounded="spacious">
            <sj-typography variant="strong" [sj]="sj.m(0)">Spacious</sj-typography>
            <sj-typography variant="small" [sj]="sj.m(0)">useGutters="spacious"</sj-typography>
          </sj-paper>
        </app-demo-item>
      </div>

      <sj-typography variant="h6" [sj]="{ mt: 1 }">Individual Inputs</sj-typography>
      <sj-typography variant="span">
        You can also apply one concern at a time by passing a density level to
        <code>usePadding</code>, <code>useGap</code>, or <code>useRounded</code>.
      </sj-typography>

      <div [sj]="[ sj.d(sj.d.options.grid), sj.gridTemplateColumns('repeat(auto-fit, minmax(280px, 1fr))'), sj.gap({ xs: 0.5, md: 1 }), sj.mt(0.5) ]">
        <app-demo-item title="Padding" [code]="codeToggle('usePadding')">
          <sj-paper variant="outlined" usePadding="default">
            <sj-typography variant="strong" [sj]="sj.m(0)">Padding</sj-typography>
            <sj-typography variant="small" [sj]="sj.m(0)">usePadding="default"</sj-typography>
          </sj-paper>
        </app-demo-item>
        <app-demo-item title="Gap" [code]="codeToggle('useGap')">
          <sj-paper variant="outlined" useGap="default">
            <sj-typography variant="strong" [sj]="sj.m(0)">Gap</sj-typography>
            <sj-typography variant="small" [sj]="sj.m(0)">useGap="default"</sj-typography>
          </sj-paper>
        </app-demo-item>
        <app-demo-item title="Rounded" [code]="codeToggle('useRounded')">
          <sj-paper variant="outlined" useRounded="default">
            <sj-typography variant="strong" [sj]="sj.m(0)">Rounded</sj-typography>
            <sj-typography variant="small" [sj]="sj.m(0)">useRounded="default"</sj-typography>
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
  

  codeSurface(level: 'compact' | 'default' | 'comfortable' | 'spacious'): string {
    return `<sj-paper
  variant="outlined"
  useGutters="${level}"
  useRounded="${level}">...</sj-paper>`;
  }
  codeToggle(toggle: 'usePadding' | 'useGap' | 'useRounded'): string {
    return `<sj-paper
  variant="outlined"
  ${toggle}="default">...</sj-paper>`;
  }

  

  readonly paperData: DemoPaper[] = this.buildPaperData();

  private buildPaperData(): DemoPaper[] {
    const items = [
      {
        title: '<sj-paper>',
        build: () => this.sjPaper(),
        message: 'Component default (filled) neutral surface.',
        titleColor: 'primary',
        usageExample: `<sj-paper variant="filled">...</sj-paper>`,
      },
      {
        title: '<sj-paper variant="flat">',
        build: () => this.sjPaper.flat(),
        message: 'Flat surface, no background/border.',
        titleColor: 'primary',
        usageExample: `<sj-paper variant="flat">...</sj-paper>`,
      },
      {
        title: '<sj-paper variant="outlined">',
        build: () => this.sjPaper.outlined(),
        message: 'Outlined surface, transparent body.',
        titleColor: 'primary',
        usageExample: `<sj-paper variant="outlined">...</sj-paper>`,
      },
      {
        title: '<sj-paper variant="filled">',
        build: () => this.sjPaper.filled(),
        message: 'Explicit filled variant (same as default).',
        titleColor: 'primary',
        usageExample: `<sj-paper variant="filled">...</sj-paper>`,
      },
      {
        title: `<sj-paper [sj]="{ bg: 'secondary.main' }">`,
        build: () => this.sjPaper({ bg: 'secondary.main' }),
        message: 'Override background via [sj] for custom surfaces.',
        titleColor: 'secondary.contrast',
        usageExample: `<sj-paper [sj]="{ bg: 'secondary.main' }">...</sj-paper>`,
      },
      {
        title: `<sj-paper variant="outlined" [sj]="{ p: 1 }">`,
        build: () => this.sjPaper.outlined({ p: 1 }),
        message: 'Outlined with custom padding via [sj] (explicit override).',
        titleColor: 'primary',
        usageExample: `<sj-paper variant="outlined" [sj]="{ p: 1 }">...</sj-paper>`,
      },
    ];

    return items.map(({ build, ...row }) => {
      const paperType = build();
      return {
        ...row,
        paperType,
        computedStyle: JSON.stringify(paperType, null, 2),
      } as DemoPaper;
    });
  }
}
