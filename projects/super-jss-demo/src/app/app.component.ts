import { Component, effect, ViewChild, ElementRef } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { DemoCardsComponent } from './components/demo-cards.component';
import { SjDirective, sjCard, SjStyle, SjTheme, SjThemeService } from 'super-jss';
import { PaletteComponent } from './components/palette.component';
import { TypographyComponent } from './components/typography.component';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-root',
  imports: [
    SjDirective,
    HeaderComponent,
    TypographyComponent,
    PaletteComponent,
    DemoCardsComponent,
    JsonEditorComponent,
  ],
  template: `
    <div [sj]="mainContainer">
      <app-header></app-header>

      <!-- Sticky in-page menu -->
      <nav [sj]="navBar">
        <div [sj]="navInner">
          <a href="#typography" [sj]="navAnchor">Typography</a>
          <a href="#cards" [sj]="navAnchor">Cards</a>
          <a href="#palette" [sj]="navAnchor">Palette</a>
        </div>
      </nav>

      <div [sj]="contentContainer">
        <div [sj]="appBase">
          <json-editor #editor [options]="editorOptions" [data]="themeData"></json-editor>
          <button [sj]="sjCard.interactive" (click)="applyTheme()">Apply</button>
        </div>
        <app-typography id="typography" [sj]="appBase"></app-typography>
        <app-demo-cards id="cards" [sj]="appBase"></app-demo-cards>
        <app-palette id="palette" [sj]="appBase"></app-palette>
        
      </div>
    </div>
  `,
})
export class AppComponent {
  @ViewChild('editor', { static: false }) editor!: JsonEditorComponent;
  editorOptions: JsonEditorOptions;
  themeData: any;

  protected readonly sjCard = sjCard;

  // Global Presets (to be moved to library later)
  sjPresets = {
    transitions: {
      allEase: { transition: 'all .2s ease' },
    },
  };

  mainContainer: SjStyle = {
    display: { xs: 'flex', md: 'grid' },
    bg: 'light.main',
    minHeight: '100vh',
  };

  navBar: SjStyle = {
    position: 'sticky',
    top: 0,
    zIndex: '900',
    bg: 'light.main',
    borderBottom: '1px solid',
    borderColor: 'light.dark',
    ...this.sjPresets.transitions.allEase,
  };

  navInner: SjStyle = {
    display: 'flex',
    fxJustify: 'center',
    gap: 1,
    p: 0.5,
  };

  navAnchor: SjStyle = {
    ...sjCard.interactive(),
    py: 0.5,
  };

  contentContainer: SjStyle = {
    display: 'grid',
    p: { xs: 1, sm: 2, md: 4 },
    gap: 4,
  };

  appBase: SjStyle = {
    scrollMarginTop: '64px',
    ...this.sjPresets.transitions.allEase,
  };

  applyButton: SjStyle = {
    bg: 'primary.main',
    color: 'primary.contrast',
    p: { xs: 1, sm: 1.5 },
    brad: 4,
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    mt: 1,
    w: '100%',
    '&:hover': {
      bg: 'primary.dark',
    },
  };

  constructor(private themeService: SjThemeService, private elementRef: ElementRef) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'tree', 'view', 'text'];
    this.editorOptions.mode = 'code';
    this.themeData = this.themeService.sjTheme();
    effect(() => {
      const theme = this.themeService.sjTheme();
      this.themeData = theme;
      this.elementRef.nativeElement.style.setProperty('--json-editor-menu-bg', theme.palette.primary.main);
      this.elementRef.nativeElement.style.setProperty('--json-editor-menu-color', theme.palette.primary.contrast);
      this.elementRef.nativeElement.style.setProperty('--json-editor-menu-border', theme.palette.primary.dark);
    });
  }

  applyTheme() {
    const newTheme = this.editor.get() as Partial<SjTheme>;
    this.themeService.setTheme(newTheme);
  }
}
