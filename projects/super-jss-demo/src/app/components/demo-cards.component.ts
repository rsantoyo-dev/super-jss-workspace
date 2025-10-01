import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  sj,
  SJ_BASE_COMPONENTS_IMPORTS,
  SjRootApi,
  SjStyle,
  sjCard as sjCardBlueprint,
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
      <sj-card [variant]="sj.sjCard.variants.info">
        <sj-typography variant="span">
          Each card ships with a predefined style that keeps layouts pleasant
          out of the box. Flip the toggle to inspect the generated styles or
          override them to create your own twists.
        </sj-typography>
        <button
          type="button"
          (click)="toggleSnippets()"
          [attr.aria-pressed]="showSnippets"
          [sj]="[
            sj.sjButton.containedLight({
              bg: sj.palette.light.dark,
              p: 0.5
            }),
            sj.mt(0)
          ]"
        >
          {{ showSnippets ? 'Hide usage & styles' : 'Show usage & styles' }}
        </button>
      </sj-card>
      <sj-card
        [sj]="[sj.backgroundColor(sj.palette.light.dark), sj.mt(0)]"
      ></sj-card>

      <sj-card
        [sj]="[
          sj.d(sj.d.options.grid),
          sj.gridTemplateColumns('repeat(auto-fit, minmax(380px, 1fr))'),
          sj.gap({ xs: 0.5, md: 1 }),
          sj.mt(0)
        ]"
      >
        <sj-card *ngFor="let card of cardData" [sj]="[card.cardType, sj.mt(0)]">
          <sj-typography
            variant="h6"
            [sj]="[sj.c(card.titleColor), sj.mt(0)]"
            >{{ card.title }}</sj-typography
          >
          <sj-typography variant="p" [sj]="[sj.m(0), sj.mt(0)]">{{
            card.message
          }}</sj-typography>
          @if (showSnippets) {
          <section [sj]="[sj.mt(0)]">
            <sj-typography
              variant="p"
              [sj]="[
                sj.mt(0),
                sj.mb(0),
                sj.fontSize('0.75rem'),
                sj.fontWeight(600)
              ]"
              >Usage</sj-typography
            >
            <sj-typography
              variant="pre"
              [sj]="[
                sjCard.codeSnippet({ fontSize: '0.7rem', mt: 0.25 }),
                sj.mt(0)
              ]"
              ><code>{{ card.usageExample }}</code></sj-typography
            >
            <sj-typography
              variant="p"
              [sj]="[
                sj.mt(1),
                sj.mb(0),
                sj.fontSize('0.75rem'),
                sj.fontWeight(600)
              ]"
              >Computed style</sj-typography
            >
            <sj-typography
              variant="pre"
              [sj]="[
                sjCard.codeSnippet({ fontSize: '0.7rem', mt: 0.25 }),
                sj.mt(0)
              ]"
              ><code>{{ card.computedStyle }}</code></sj-typography
            >
          </section>
          }
        </sj-card>
      </sj-card>
    </app-section>
  `,
})
export class DemoCardsComponent {
  readonly sj: SjRootApi = sj;
  readonly sjCard = sjCardBlueprint;

  protected showSnippets = false;

  protected readonly cardData: DemoCard[] = this.buildCardData();

  protected toggleSnippets(): void {
    this.showSnippets = !this.showSnippets;
  }

  private buildCardData(): DemoCard[] {
    const cards = [
      {
        title: 'sjCard()',
        build: () => this.sjCard(),
        message: 'Default card with light background.',
        titleColor: 'primary',
        usageExample: `[sj]="sjCard()"`,
      },
      {
        title: 'sjCard.outlined()',
        build: () => this.sjCard.outlined(),
        message: 'Outlined, transparent background, no shadow.',
        titleColor: 'primary',
        usageExample: `[sj]="sjCard.outlined()"`,
      },
      {
        title: 'sjCard.flat()',
        build: () => this.sjCard.flat(),
        message: 'No shadow.',
        titleColor: 'primary',
        usageExample: `[sj]="sjCard.flat()"`,
      },
      {
        title: 'sjCard.elevated()',
        build: () => this.sjCard.elevated(),
        message: 'Stronger shadow.',
        titleColor: 'primary',
        usageExample: `[sj]="sjCard.elevated()"`,
      },
      {
        title: 'sjCard.primary()',
        build: () => this.sjCard.primary(),
        message: 'Primary background and contrast text.',
        titleColor: 'primary.contrast',
        usageExample: `[sj]="sjCard.primary()"`,
      },
      {
        title: 'sjCard.interactive()',
        build: () => this.sjCard.interactive(),
        message: 'Card with hover effects.',
        titleColor: 'primary',
        usageExample: `[sj]="sjCard.interactive()"`,
      },
      {
        title: `sjCard({ bg: 'secondary.main' })`,
        build: () =>
          this.sjCard({ bg: 'secondary.main', borderColor: 'transparent' }),
        message: 'Default card with overridden background.',
        titleColor: 'secondary.contrast',
        usageExample: `[sj]="sjCard({ bg: 'secondary.main' })"`,
      },
      {
        title: `sjCard.primary({ borderRadius: 4 })`,
        build: () => this.sjCard.primary({ borderRadius: 4 }),
        message: 'Primary card with overridden border radius.',
        titleColor: 'primary.contrast',
        usageExample: `[sj]="sjCard.primary({ borderRadius: 4 })"`,
      },
      {
        title: `sjCard.elevated({ p: 3 })`,
        build: () => this.sjCard.elevated({ p: 3 }),
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
