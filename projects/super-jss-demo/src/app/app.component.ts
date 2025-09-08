import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { DemoCardsComponent } from './components/demo-cards.component';
import { SjDirective, sjCard } from 'super-jss';
import { PaletteComponent } from './components/palette.component';
import { TypographyComponent } from './components/typography.component';
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

      <!-- Sticky in-page menu -->
      <nav
        [sj]="{
          position: 'sticky', top: 0, zIndex: '900',
          bg: 'light.main',
          borderBottom: '1px solid', borderColor: 'light.dark',
          transition: 'background-color .2s ease, box-shadow .2s ease'
        }"
      >
        <div [sj]="{ d: 'flex', fxJustify: 'center', gap: 1, px: { xs: 1, md: 2 }, py: 0.5 }">
          <a href="#typography" [sj]="{ p: 0.5, px: 1, brad: 0.5, c: 'dark.dark', transition: 'background-color .2s ease', '&:hover': { bg: 'light.light' }, '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main' } }">Typography</a>
          <a href="#cards" [sj]="{ p: 0.5, px: 1, brad: 0.5, c: 'dark.dark', transition: 'background-color .2s ease', '&:hover': { bg: 'light.light' }, '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main' } }">Cards</a>
          <a href="#palette" [sj]="{ p: 0.5, px: 1, brad: 0.5, c: 'dark.dark', transition: 'background-color .2s ease', '&:hover': { bg: 'light.light' }, '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main' } }">Palette</a>
        </div>
      </nav>

      <div [sj]="{display:'grid', p:{xs:1, sm:2, md:4}, gap:4}">
        <app-typography id="typography" [sj]="{ scrollMarginTop: '64px', transition: 'opacity .2s ease' }"></app-typography>
        <app-demo-cards id="cards" [sj]="{ scrollMarginTop: '64px', transition: 'opacity .2s ease' }"></app-demo-cards>
        <app-palette id="palette" [sj]="{ scrollMarginTop: '64px', transition: 'opacity .2s ease' }"></app-palette>
      </div>
    </div>
  `,
})
export class AppComponent {
  protected readonly sjCard = sjCard;
}
