import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  sjBorderShadow,
  sjCard,
  sjCardElevated,
  sjCardFlat,
  sjCardGhost,
  sjCardOutlined,
  sjCardPrimary,
} from 'super-jss';

@Component({
  selector: 'app-demo-cards',
  standalone: true,
  imports: [CommonModule, SjDirective],
  template: `
    <div [sj]="{ d: 'flex', fxDir: 'column', w: '100%', gap:2 }">
      hello cards
      <div [sj]="sjCard()">
        <h3 [sj]="{ c: 'primary' }">sjCard()</h3>
      </div>
      <div [sj]="sjCardOutlined()">
        <h3 [sj]="{ c: 'primary' }">sjCardOutlined()</h3>
      </div>
      <div [sj]="sjCardFlat()">
        <h3 [sj]="{ c: 'primary' }">sjCardFlat()</h3>
      </div>
      <div [sj]="sjCardGhost()">
        <h3 [sj]="{ c: 'primary' }">sjCardGhost()</h3>
      </div>
      <div [sj]="sjCardElevated()">
        <h3 [sj]="{ c: 'primary' }">sjCardElevated()</h3>
      </div>
      <div [sj]="sjCardPrimary()">
        <h3 [sj]="{ c: 'primary.contrast' }">sjCardPrimary()</h3>
      </div>
    </div>

  `,
})
export class DemoCardsComponent {
  protected readonly sjBorderShadow = sjBorderShadow;
  protected readonly sjCard = sjCard;
  protected readonly sjCardOutlined = sjCardOutlined;
  protected readonly sjCardFlat = sjCardFlat;
  protected readonly sjCardGhost = sjCardGhost;
  protected readonly sjCardElevated = sjCardElevated;
  protected readonly sjCardPrimary = sjCardPrimary;

  protected readonly sampleText =
    'The quick brown fox jumps over the lazy dog. ';
}
