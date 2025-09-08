import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TypographyComponent } from './components/typography.component';
import { DemoCardsComponent } from './components/demo-cards.component';
import { SjDirective } from 'super-jss';
import { PaletteComponent } from './components/palette.component';
@Component({
  selector: 'app-root',
  imports: [
    SjDirective,
    HeaderComponent,
    TypographyComponent,
    PaletteComponent,
    DemoCardsComponent
  ],
  template: `
    <div
      [sj]="{
        display: 'flex',
        flexDirection: 'column',
        bg: 'light.main',
        minHeight: '100vh'
      }"
    >
      <app-header></app-header>

      <div [sj]="{ p: {xs:1, md:2}, d:'flex', fxDir:'column', gap:2 }">
        <app-demo-cards></app-demo-cards>
        <app-typography></app-typography>
        <app-palette></app-palette>
      </div>
    </div>
  `,
})
export class AppComponent {}
