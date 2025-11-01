import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sj, SJ_BASE_COMPONENTS_IMPORTS, SjRootApi } from 'super-jss';
import { SectionContainerComponent } from './section-container.component';
import { DemoItemComponent } from './demo-item.component';

interface DemoCard {
  title: string;
  message: string;
  titleColor: string;
  variant: string | undefined;
  tint?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
    | 'dark'
    | 'neutral'
    | 'light';
  overrides?: any;
  usageExample: string;
}

@Component({
  selector: 'app-demo-cards',
  standalone: true,
  imports: [
    CommonModule,
    SectionContainerComponent,
    SJ_BASE_COMPONENTS_IMPORTS,
    DemoItemComponent,
  ],
  template: `
    <app-section title="Cards">
      <!-- Header content lives inside SectionContainer's outlined card -->
      <sj-typography variant="span">
        Each card ships with a predefined style that keeps layouts pleasant out
        of the box. Toggle to inspect the generated styles or override them to
        create your own twists.
      </sj-typography>
      <!-- Responsive grid of examples -->
      <sj-flex
        [sj]="[
          sj.d(sj.d.options.grid),
          sj.gridTemplateColumns('1fr'),
          sj.gap(sj.padding.options.default)
        ]"
      >
        @for (card of cardData; track card.title) {
        <app-demo-item
          [title]="card.title"
          [titleColor]="card.titleColor"
          [code]="card.usageExample"
        >
          <sj-card
            [variant]="$any(card.variant)"
            [usePaint]="$any(card.tint)"
            [sj]="card.overrides"
          >
            <sj-typography variant="p">{{ card.message }}</sj-typography>
          </sj-card>
        </app-demo-item>
        }
      </sj-flex>
    </app-section>
  `,
})
export class DemoCardsComponent {
  readonly sj: SjRootApi = sj;
  protected readonly cardData: DemoCard[] = this.buildCardData();

  private buildCardData(): DemoCard[] {
    const items: DemoCard[] = [
      {
        title: '<sj-card>',
        message: 'Default card with light background.',
        titleColor: 'primary',
        variant: 'default',
        usageExample: `<sj-card>...</sj-card>`,
      },
      {
        title: '<sj-card variant="outlined">',
        message: 'Outlined, transparent background, no shadow.',
        titleColor: 'primary',
        variant: 'outlined',
        usageExample: `<sj-card variant="outlined">...</sj-card>`,
      },
      {
        title: '<sj-card variant="flat">',
        message: 'No shadow.',
        titleColor: 'primary',
        variant: 'flat',
        usageExample: `<sj-card variant="flat">...</sj-card>`,
      },
      {
        title: '<sj-card variant="elevated">',
        message: 'Stronger shadow.',
        titleColor: 'primary',
        variant: 'elevated',
        usageExample: `<sj-card variant="elevated">...</sj-card>`,
      },
      {
        title: '<sj-card usePaint="primary">',
        message: 'Primary background and contrast text.',
        titleColor: 'primary.contrast',
        variant: 'flat',
        tint: 'primary',
        usageExample: `<sj-card usePaint="primary">...</sj-card>`,
      },
      {
        title: '<sj-card variant="interactive">',
        message: 'Card with hover effects.',
        titleColor: 'primary',
        variant: 'interactive',
        usageExample: `<sj-card variant="interactive">...</sj-card>`,
      },
      {
        title: `<sj-card [sj]="{ bg: 'secondary.main' }">`,
        message: 'Default card with overridden background.',
        titleColor: 'secondary.contrast',
        variant: 'default',
        overrides: { bg: 'secondary.main', borderColor: 'transparent' },
        usageExample: `<sj-card [sj]="{ bg: 'secondary.main' }">...</sj-card>`,
      },
      {
        title: `<sj-card usePaint="primary" [sj]="{ borderRadius: 4 }">`,
        message: 'Primary card with overridden border radius.',
        titleColor: 'primary.contrast',
        variant: 'flat',
        tint: 'primary',
        overrides: { borderRadius: 4 },
        usageExample: `<sj-card usePaint="primary" [sj]="{ borderRadius: 4 }">...</sj-card>`,
      },
      {
        title: `<sj-card variant="elevated" [sj]="{ p: 3 }">`,
        message: 'Secondary card with overridden padding.',
        titleColor: 'secondary.contrast',
        variant: 'elevated',
        overrides: { p: 3 },
        usageExample: `<sj-card variant="elevated" [sj]="{ p: 3 }">...</sj-card>`,
      },
    ];
    return items;
  }
}
