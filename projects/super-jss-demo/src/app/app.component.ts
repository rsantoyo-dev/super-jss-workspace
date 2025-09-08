import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { DemoCardsComponent } from './components/demo-cards.component';
import { SjDirective } from 'super-jss';
import { PaletteComponent } from './components/palette.component';
import { TypographyComponent } from './components/typography.component';
import { sjCard } from 'projects/super-jss/src/public-api';
@Component({
  selector: 'app-root',
  imports: [
    SjDirective,
    HeaderComponent,
    TypographyComponent,
    PaletteComponent,
    DemoCardsComponent,
  ],
  template: `
    <div
      [sj]="{
        display: 'flex',
        flexDirection: 'column',
        bg: 'light.main',
        minHeight: '100vh',
      
      }"
    >
      <app-header></app-header>

      <div [sj]="sjCard.flat">
        <app-typography></app-typography>
        <app-demo-cards></app-demo-cards>
        <app-palette></app-palette>
      </div>
    </div>
  `,
})
export class AppComponent {
  protected readonly sjCard = sjCard;
}
