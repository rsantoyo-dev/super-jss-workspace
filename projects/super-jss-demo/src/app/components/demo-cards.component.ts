import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjStyle,
  sjCard,
  SjCardComponent,
  WithSj,
  SJ_BASE_COMPONENTS_IMPORTS,
} from 'super-jss';
import { SectionContainerComponent } from './section-container.component';

interface DemoCard {
  title: string;
  cardType: SjStyle;
  message: string;
  titleColor: string;
  usageExample: string;
  computedStyle: string;
}

@Component({
  selector: 'app-demo-cards',
  standalone: true,
  imports: [
    CommonModule,
    SectionContainerComponent,
    SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <app-section title="Cards">
      <sj-card [variant]="sj.variants.sjCard.info">
        <sj-typography variant="span">
          Each card ships with a predefined style that keeps layouts pleasant
          out of the box. Flip the toggle to inspect the generated styles or
          override them to create your own twists.
        </sj-typography>
        <button
          type="button"
          (click)="toggleSnippets()"
          [attr.aria-pressed]="showSnippets"
          [sj]="
            sj.blueprints.sjButton.containedLight({
              bg: sj.tokens.palette.light.dark,
              p: 0.5
            })
          "
        >
          {{ showSnippets ? 'Hide usage & styles' : 'Show usage & styles' }}
        </button>
      </sj-card>
      <sj-card [sj]="sj.css.backgroundColor(sj.palette.light.dark)"></sj-card>

      <sj-card
        [sj]="[
          sj.grid.container(),
          sj.grid.columns('repeat(auto-fit, minmax(380px, 1fr))'),
          sj.css.gap({ xs: 0.5, md: 1 })
        ]"
      >
        <sj-card *ngFor="let card of cardData" [sj]="card.cardType">
          <sj-typography variant="h6" [sj]="{ c: card.titleColor }">{{
            card.title
          }}</sj-typography>
          <sj-typography variant="p" [sj]="{ m: 0 }">{{
            card.message
          }}</sj-typography>
          @if (showSnippets) {
          <section [sj]="{ mt: 1 }">
            <sj-typography
              variant="p"
              [sj]="{ mt: 0, mb: 0, fontSize: '0.75rem', fontWeight: 600 }"
              >Usage</sj-typography
            >
            <sj-typography
              variant="pre"
              [sj]="sjCard.codeSnippet({ fontSize: '0.7rem', mt: 0.25 })"
              ><code>{{ card.usageExample }}</code></sj-typography
            >
            <sj-typography
              variant="p"
              [sj]="{ mt: 1, mb: 0, fontSize: '0.75rem', fontWeight: 600 }"
              >Computed style</sj-typography
            >
            <sj-typography
              variant="pre"
              [sj]="sjCard.codeSnippet({ fontSize: '0.7rem', mt: 0.25 })"
              ><code>{{ card.computedStyle }}</code></sj-typography
            >
          </section>
          }
        </sj-card>
      </sj-card>
    </app-section>
  `,
})
export class DemoCardsComponent extends WithSj {
  protected readonly sjCard = sjCard;

  protected showSnippets = false;

  protected readonly cardData: DemoCard[] = this.buildCardData();

  protected toggleSnippets(): void {
    this.showSnippets = !this.showSnippets;
  }

  private buildCardData(): DemoCard[] {
    const cards = [
      {
        title: 'sjCard()',
        build: () => sjCard(),
        message: 'Default card with light background.',
        titleColor: 'primary',
        usageExample: `[sj]="sjCard()"`,
      },
      {
        title: 'sjCard.outlined()',
        build: () => sjCard.outlined(),
        message: 'Outlined, transparent background, no shadow.',
        titleColor: 'primary',
        usageExample: `[sj]="sjCard.outlined()"`,
      },
      {
        title: 'sjCard.flat()',
        build: () => sjCard.flat(),
        message: 'No shadow.',
        titleColor: 'primary',
        usageExample: `[sj]="sjCard.flat()"`,
      },
      {
        title: 'sjCard.elevated()',
        build: () => sjCard.elevated(),
        message: 'Stronger shadow.',
        titleColor: 'primary',
        usageExample: `[sj]="sjCard.elevated()"`,
      },
      {
        title: 'sjCard.primary()',
        build: () => sjCard.primary(),
        message: 'Primary background and contrast text.',
        titleColor: 'primary.contrast',
        usageExample: `[sj]="sjCard.primary()"`,
      },
      {
        title: 'sjCard.interactive()',
        build: () => sjCard.interactive(),
        message: 'Card with hover effects.',
        titleColor: 'primary',
        usageExample: `[sj]="sjCard.interactive()"`,
      },
      {
        title: `sjCard({ bg: 'secondary.main' })`,
        build: () =>
          sjCard({ bg: 'secondary.main', borderColor: 'transparent' }),
        message: 'Default card with overridden background.',
        titleColor: 'secondary.contrast',
        usageExample: `[sj]="sjCard({ bg: 'secondary.main' })"`,
      },
      {
        title: `sjCard.primary({ borderRadius: 4 })`,
        build: () => sjCard.primary({ borderRadius: 4 }),
        message: 'Primary card with overridden border radius.',
        titleColor: 'primary.contrast',
        usageExample: `[sj]="sjCard.primary({ borderRadius: 4 })"`,
      },
      {
        title: `sjCard.elevated({ p: 3 })`,
        build: () => sjCard.elevated({ p: 3 }),
        message: 'Secondary card with overridden padding.',
        titleColor: 'secondary.contrast',
        usageExample: `[sj]="sjCard.elevated({ p: 3 })"`,
      },
    ];

    return cards.map(({ build, ...card }) => {
      const cardType = build();
      return {
        ...card,
        cardType,
        computedStyle: this.stringifyStyle(cardType),
      };
    });
  }

  private stringifyStyle(style: SjStyle): string {
    return JSON.stringify(style, null, 2);
  }
}
