import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { DemoCardsComponent } from './components/demo-cards.component';
import { SjDirective, sjCard, SjStyle } from 'super-jss';
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
      [sj]="mainContainer"
    >
      <app-header></app-header>

      <!-- Sticky in-page menu -->
      <nav
        [sj]="navBar"
      >
        <div [sj]="navInner">
          <a href="#typography" [sj]="navAnchor">Typography</a>
          <a href="#cards" [sj]="navAnchor">Cards</a>
          <a href="#palette" [sj]="navAnchor">Palette</a>
        </div>
      </nav>

      <div [sj]="contentContainer">
        <app-typography id="typography" [sj]="appBase"></app-typography>
        <app-demo-cards id="cards" [sj]="appBase"></app-demo-cards>
        <app-palette id="palette" [sj]="appBase"></app-palette>
      </div>
    </div>
  `,
})
export class AppComponent {
  protected readonly sjCard = sjCard;

  // Global Presets (to be moved to library later)
  sjPresets = {
    transitions: {
      allEase: { transition: 'all .2s ease' } as SjStyle,
      bgShadowEase: { transition: 'background-color .2s ease, box-shadow .2s ease' } as SjStyle,
      bgEase: { transition: 'background-color .2s ease' } as SjStyle,
      opacityEase: { transition: 'opacity .2s ease' } as SjStyle,
      transformEase: { transition: 'transform .2s ease' } as SjStyle,
    },
    states: {
      hoverBgLight: { '&:hover': { bg: 'light.light' } } as SjStyle,
      focusOutlinePrimary: { '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main' } } as SjStyle,
    },
  };

  mainContainer: SjStyle = {
    display: 'flex',
    flexDirection: 'column',
    bg: 'light.main',
    minHeight: '100vh',
  };

  navBar: SjStyle = {
    position: 'sticky', top: 0, zIndex: '900',
    bg: 'light.main',
    borderBottom: '1px solid', borderColor: 'light.dark',
    ...this.sjPresets.transitions.bgShadowEase,
  };

  navInner: SjStyle = {
    display: 'flex',
    fxJustify: 'center',
    gap: 1,
    px: { xs: 1, md: 2 },
    py: 0.5,
  };

  navAnchor: SjStyle = {
    p: 0.5,
    px: 1,
    brad: 0.5,
    c: 'dark.dark',
    ...this.sjPresets.transitions.bgEase,
    ...this.sjPresets.states.hoverBgLight,
    ...this.sjPresets.states.focusOutlinePrimary,
  };

  contentContainer: SjStyle = {
    display:'grid',
    p:{xs:1, sm:2, md:4},
    gap: 4,
  };

  appBase: SjStyle = {
    scrollMarginTop: '64px',
    ...this.sjPresets.transitions.opacityEase,
  };

  // Example of responsive flex direction
  responsiveFlexExample: SjStyle = {
    display: 'flex',
    flexDirection: { xs: 'row', md: 'column' }
  };
}
