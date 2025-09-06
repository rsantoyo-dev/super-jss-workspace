import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjStyle,
  sjBorderShadow,
  sjCard,
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
      <div [sj]="sjCard.outlined()">
        <h3 [sj]="{ c: 'primary' }">sjCard.outlined()</h3>
      </div>
      <div [sj]="sjCard.flat()">
        <h3 [sj]="{ c: 'primary' }">sjCard.flat()</h3>
      </div>
      <div [sj]="sjCard.ghost()">
        <h3 [sj]="{ c: 'primary' }">sjCard.ghost()</h3>
      </div>
      <div [sj]="sjCard.elevated()">
        <h3 [sj]="{ c: 'primary' }">sjCard.elevated()</h3>
      </div>
      <div [sj]="sjCard.primary()">
        <h3 [sj]="{ c: 'primary.contrast' }">sjCard.primary()</h3>
      </div>
    </div>

  `,
})
export class DemoCardsComponent {
  protected readonly sjBorderShadow = sjBorderShadow;
  protected readonly sjCard = sjCard;

  protected readonly sampleText =
    'The quick brown fox jumps over the lazy dog. ';

  cl:SjStyle = sjCard.ghost();
}
