import { Component, effect, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from './header/header.component';

import { SjDirective, sjCard, SjStyle, SjTheme, SjThemeService } from 'super-jss';

import { JsonStudioComponent } from "./sj-json-studio/json-studio.component";
import { DemoCardsComponent } from './components/demo-cards.component';
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
    JsonStudioComponent
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
          <a href="#home" [sj]="navAnchor">Home</a>
        </div>
      </nav>

      <div [sj]="contentContainer">
        <app-json-studio
          id="home"
          [sj]="appBase"
          [value]="themeData"
          (valueChange)="onStudioChange($event)">
        </app-json-studio>

        @if (pendingThemePatch) {
          <div [sj]="applyBar">
            <button [sj]="applyBtn" (click)="applyEditedTheme()">Apply Theme</button>
            <button [sj]="discardBtn" (click)="discardEditedTheme()">Discard</button>
          </div>
        }

                <app-typography id="typography" [sj]="appBase"></app-typography>
        <app-demo-cards id="cards" [sj]="appBase"></app-demo-cards>
        <app-palette id="palette" [sj]="appBase"></app-palette>
        

        
      </div>
    </div>
  `,
})
export class AppComponent implements AfterViewInit, OnDestroy {

  themeData: SjTheme;
  pendingThemePatch: Partial<SjTheme> | null = null;

  protected readonly sjCard = sjCard;

  // Global Presets (to be moved to library later)
  sjPresets = {
    transitions: {
      allEase: { transition: 'all .2s ease' },
    },
  };

  mainContainer: SjStyle = {
    display: 'grid',
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
   
    this.themeData = this.themeService.sjTheme();
    effect(() => {
      this.themeData = this.themeService.sjTheme();
    });
  }
  // Receive edits, but do not apply until user confirms
  onStudioChange(patch: Partial<SjTheme>) {
    this.pendingThemePatch = patch;
  }

  applyEditedTheme() {
    if (this.pendingThemePatch) {
      this.themeService.setTheme(this.pendingThemePatch);
      this.pendingThemePatch = null;
    }
  }

  discardEditedTheme() {
    this.pendingThemePatch = null;
  }

  // Inline styles for the apply bar and buttons
  applyBar: SjStyle = {
    d: 'flex',
    gap: 1,
    mt: 1,
    p: 1,
    bg: 'light.light',
    b: '1px solid',
    bc: 'light.dark',
    brad: 0.5,
  };
  applyBtn: SjStyle = {
    ...sjCard.primary({ px: 1, py: 0.5 }),
  };
  discardBtn: SjStyle = {
    ...sjCard.outlined({ px: 1, py: 0.5 }),
  };

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
    const theme = this.themeService.sjTheme();

    // Toolbar
    const menu = host.querySelector('json-editor .jsoneditor-menu') as HTMLElement | null;
    if (menu) {
      menu.style.setProperty('background-color', theme.palette.primary.main);
      menu.style.setProperty('color', theme.palette.primary.contrast);
      menu.style.setProperty('border-bottom', `1px solid ${theme.palette.primary.dark}`);

      const buttons = menu.querySelectorAll('button');
      buttons.forEach((button: HTMLElement) => {
        button.style.setProperty('background-color', theme.palette.primary.main);
        button.style.setProperty('color', theme.palette.primary.contrast);
        button.style.setProperty('border', `1px solid ${theme.palette.primary.dark}`);
        button.style.setProperty('opacity', '0.9');
      });
    }

    // Status bar
    const status = host.querySelector('json-editor .jsoneditor-statusbar') as HTMLElement | null;
    if (status) {
      status.style.setProperty('background-color', theme.palette.light.light);
      status.style.setProperty('color', theme.palette.light.light);
      status.style.setProperty('border-top', `1px solid ${theme.palette.light.dark}`);
    }

    // Editor area (Ace)
    const ace = host.querySelector('json-editor .ace_editor') as HTMLElement | null;
    if (ace) {
      // Background + text
      ace.style.setProperty('background-color', theme.palette.light.main);
      ace.style.setProperty('color', theme.palette.dark.dark);

      // Scroller area background (editor body)
      const scroller = ace.querySelector('.ace_scroller') as HTMLElement | null;
      if (scroller) {
        scroller.style.setProperty('background-color', theme.palette.light.light);
      }

      const gutter = ace.querySelector('.ace_gutter') as HTMLElement | null;
      if (gutter) {
        gutter.style.setProperty('background-color', theme.palette.light.light);
        gutter.style.setProperty('color', theme.palette.light.light);
        gutter.style.setProperty('border-right', `1px solid ${theme.palette.light.dark}`);
      }

      const content = ace.querySelector('.ace_content') as HTMLElement | null;
      if (content) {
        // Ensure sufficient contrast on dark scroller
        content.style.setProperty('color', theme.palette.dark.contrast);
      }

      // Active line highlight
      const activeLines = ace.querySelectorAll('.ace_active-line');
      const activeBg = this.hexToRgba(theme.palette.primary.light, 0.15);
      activeLines.forEach((line: Element) => {
        (line as HTMLElement).style.setProperty('background-color', activeBg);
      });

      // Selection highlight
      const selections = ace.querySelectorAll('.ace_selection');
      const selBg = this.hexToRgba(theme.palette.primary.main, 0.15);
      selections.forEach((sel: Element) => {
        (sel as HTMLElement).style.setProperty('background-color', selBg);
      });

      // Caret/cursor color
      const cursors = ace.querySelectorAll('.ace_cursor');
      cursors.forEach((c: Element) => {
        (c as HTMLElement).style.setProperty('color', theme.palette.primary.dark);
        (c as HTMLElement).style.setProperty('border-left-color', theme.palette.primary.dark);
      });
    }
  }

  private hexToRgba(hex: string, alpha = 1): string {
    // Normalize: #RGB or #RRGGBB to R,G,B
    try {
      const h = hex.replace('#', '');
      const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
      const num = parseInt(full, 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } catch {
      return `rgba(0, 0, 0, ${alpha})`;
    }
  }


}
