import { Component, effect, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
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

      <!-- Sticky in-page menu title (no [sj] so it stays native) -->
 
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
export class AppComponent implements AfterViewInit, OnDestroy {
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

  private observer: MutationObserver | undefined;

  constructor(private themeService: SjThemeService, private elementRef: ElementRef) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'tree', 'view', 'text'];
    this.editorOptions.mode = 'code';
    this.themeData = this.themeService.sjTheme();
    effect(() => {
      this.themeData = this.themeService.sjTheme();
    });
  }

  ngAfterViewInit(): void {
    const host: HTMLElement = this.elementRef.nativeElement;

    this.observer = new MutationObserver(() => {
      this.applyJsonEditorMenuStyles();
    });

    this.observer.observe(host, { childList: true, subtree: true });

    // Initial application
    this.applyJsonEditorMenuStyles();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private applyJsonEditorMenuStyles() {
    const host: HTMLElement = this.elementRef.nativeElement;
    const menu = host.querySelector('json-editor .jsoneditor-menu') as HTMLElement | null;
    if (!menu) return;

    const theme = this.themeService.sjTheme();
    
    menu.style.setProperty('background-color', theme.palette.primary.main);
    menu.style.setProperty('color', theme.palette.primary.contrast);
    menu.style.setProperty('border-bottom', `1px solid ${theme.palette.primary.dark}`);

    const buttons = menu.querySelectorAll('button');
    buttons.forEach((button: HTMLElement) => {
      button.style.setProperty('background-color', theme.palette.primary.main);
      button.style.setProperty('color', theme.palette.primary.contrast);
      button.style.setProperty('border', `1px solid ${theme.palette.primary.dark}`);
      button.style.setProperty('opacity', '0.8');
    });
  }

  applyTheme() {
    const newTheme = this.editor.get() as Partial<SjTheme>;
    this.themeService.setTheme(newTheme);
  }
}
