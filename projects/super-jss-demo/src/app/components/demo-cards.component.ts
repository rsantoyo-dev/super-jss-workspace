import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjStyle,
  sjCard,
} from 'super-jss';

@Component({
  selector: 'app-demo-cards',
  standalone: true,
  imports: [CommonModule, SjDirective],
  template: `
   <h3 [sj]="{c: 'primary'}">Cards</h3>
    <div [sj]="{
      display: 'grid',
      gap: 2,
      gridTemplateColumns: {
        xs: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)'
      }
    }">
      <div *ngFor="let card of cardData" [sj]="card.cardType">
        <h3 [sj]="{ c: card.titleColor }">{{ card.title }}</h3>
        <p [sj]="{ m: 0 }">{{ card.message }}</p>
        <div *ngIf="card.implementationExample">
          <pre [sj]="sjCard.codeSnippet"><code>{{ card.implementationExample }}</code></pre>
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
      titleColor: 'primary'
    },
    {
      title: 'sjCard.outlined',
      cardType: sjCard.outlined,
      message: 'Outlined, transparent background, no shadow.',
      titleColor: 'primary',
      implementationExample: `[sj]="sjCard.outlined"`
    },
    {
      title: 'sjCard.flat()',
      cardType: sjCard.flat,
      message: 'No shadow.',
      titleColor: 'primary'
    },
    {
      title: 'sjCard.elevated',
      cardType: sjCard.elevated,
      message: 'Stronger shadow.',
      titleColor: 'primary'
    },
    {
      title: 'sjCard.primary()',
      cardType: sjCard.primary,
      message: 'Primary background and contrast text.',
      titleColor: 'primary.contrast' // Special case
    },
    {
      title: 'sjCard.interactive',
      cardType: sjCard.interactive,
      message: 'Card with hover effects.',
      titleColor: 'primary'
    }
  ];
}
