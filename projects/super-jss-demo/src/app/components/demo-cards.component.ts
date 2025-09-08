import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjDirective, SjStyle, sjCard } from 'super-jss';

@Component({
  selector: 'app-demo-cards',
  standalone: true,
  imports: [CommonModule, SjDirective],
  template: `
    <div [sj]="{ d: 'flex', fxJustify: 'space-between', fxAItems: 'center' }">
      <h2 [sj]="{ c: 'primary', m: 0 }">Cards</h2>
      <a href="https://sjss.dev/examples/" target="_blank" rel="noopener" [sj]="{ c: 'primary.contrast', bg: 'primary.main', p: 0.5, px: 1, brad: 0.5, '&:hover': { bg: 'primary.dark' } }">Docs</a>
    </div>
    <div [sj]="sjCard.outlined">
      <div [sj]="sjCard.flat({display:'block', bg:'light.dark', mb:2})">
        This demo showcases the different variants of the
        <code>sjCard</code> blueprint. Each card demonstrates a specific style
        (e.g., <code>outlined</code>, <code>flat</code>, <code>primary</code>).
        The last items show how easy it is to override any property to create a
        custom variation.
      </div>
      
      <div
        [sj]="{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(2, 1fr)',
            xl: 'repeat(4, 1fr)'
          }
        }"
      >
        <div *ngFor="let card of cardData" [sj]="card.cardType">
          <h3 [sj]="{ c: card.titleColor }">{{ card.title }}</h3>
          <p [sj]="{ m: 0 }">{{ card.message }}</p>
          <div *ngIf="card.implementationExample">

          <pre [sj]="{ m: 0, p: 1, bg: 'light.light', brad: 0.5 }"><code>{{ card.implementationExample }}</code></pre>
            
           
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DemoCardsComponent {
  protected readonly sjCard = sjCard;

  cardData = [
    {
      title: 'sjCard()',
      cardType: sjCard(),
      message: 'Default card with light background.',
      titleColor: 'primary',
      implementationExample: `[sj]="sjCard()"`,
    },
    {
      title: 'sjCard.outlined()',
      cardType: sjCard.outlined(),
      message: 'Outlined, transparent background, no shadow.',
      titleColor: 'primary',
      implementationExample: `[sj]="sjCard.outlined()"`,
    },
    {
      title: 'sjCard.flat()',
      cardType: sjCard.flat(),
      message: 'No shadow.',
      titleColor: 'primary',
      implementationExample: `[sj]="sjCard.flat()"`,
    },
    {
      title: 'sjCard.elevated()',
      cardType: sjCard.elevated(),
      message: 'Stronger shadow.',
      titleColor: 'primary',
      implementationExample: `[sj]="sjCard.elevated()"`,
    },
    {
      title: 'sjCard.primary()',
      cardType: sjCard.primary(),
      message: 'Primary background and contrast text.',
      titleColor: 'primary.contrast',
      implementationExample: `[sj]="sjCard.primary()"`,
    },
    
    {
      title: 'sjCard.interactive()',
      cardType: sjCard.interactive(),
      message: 'Card with hover effects.',
      titleColor: 'primary',
      implementationExample: `[sj]="sjCard.interactive()"`,
    },
    {
      title: `sjCard({ bg: 'secondary.main' })`,
      cardType: sjCard({ bg: 'secondary.main', borderColor: 'transparent' }),
      message: 'Default card with overridden background.',
      titleColor: 'secondary.contrast',
      implementationExample: `[sj]="sjCard({ bg: 'secondary.main' })"`,
    },
    {
      title: `sjCard.primary({ borderRadius: 4 })`,
      cardType: sjCard.primary({ borderRadius: 4 }),
      message: 'Primary card with overridden border radius.',
      titleColor: 'primary.contrast',
      implementationExample: `[sj]="sjCard.primary({ borderRadius: 4 })"`,
    },
    {
      title: `sjCard.elevated({ p: 3 })`,
      cardType: sjCard.elevated({ p: 3 }),
      message: 'Secondary card with overridden padding.',
      titleColor: 'secondary.contrast',
      implementationExample: `[sj]="sjCard.elevated({ p: 3 })"`,
    }
  ];
}
