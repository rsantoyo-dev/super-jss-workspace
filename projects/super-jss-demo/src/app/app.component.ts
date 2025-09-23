import {
  Component,
  effect,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { HeaderComponent } from './components/header.component';

import {
  SjDirective,
  sjCard,
  SjStyle,
  SjTheme,
  SjThemeService,
  sjBox,
} from 'super-jss';

import { JsonStudioComponent } from './sj-json-studio/json-studio.component';
import { DemoButtonsComponent } from './components/demo-buttons.component';
import { DemoCardsComponent } from './components/demo-cards.component';
import { PaletteComponent } from './components/palette.component';
import { TypographyComponent } from './components/typography.component';
import { BreakpointIndicatorComponent } from './components/breakpoint-indicator.component';
import { ThemeSelectorComponent } from './components/theme-selector.component';

import { RouterModule } from '@angular/router';

import { SidenavComponent } from './components/sidenav.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    SjDirective,
    HeaderComponent,
    ThemeSelectorComponent,
    SidenavComponent,
    BreakpointIndicatorComponent
  ],
  template: `
    <div [sj]="sjBox.column()">
      <app-header></app-header>    

      <div [sj]="sjBox">
        <app-sidenav [sj]="sidenav"></app-sidenav>

        <div [sj]="sjCard.flat">
          <app-theme-selector [sj]="sjCard.outlined"></app-theme-selector>
          <app-breakpoint-indicator></app-breakpoint-indicator>
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  themeData: SjTheme;
  pendingThemePatch: Partial<SjTheme> | null = null;

  sjCard = sjCard;
  sjBox= sjBox;

  sidenav: SjStyle = {
    position: 'sticky',
    top: 0,
    h: '100vh',
  };

  private observer: MutationObserver | undefined;

  constructor(
    private themeService: SjThemeService,
    private elementRef: ElementRef
  ) {
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
    const menu = host.querySelector(
      'json-editor .jsoneditor-menu'
    ) as HTMLElement | null;
    if (menu) {
      menu.style.setProperty('background-color', theme.palette.primary.main);
      menu.style.setProperty('color', theme.palette.primary.contrast);
      menu.style.setProperty(
        'border-bottom',
        `1px solid ${theme.palette.primary.dark}`
      );

      const buttons = menu.querySelectorAll('button');
      buttons.forEach((button: HTMLElement) => {
        button.style.setProperty(
          'background-color',
          theme.palette.primary.main
        );
        button.style.setProperty('color', theme.palette.primary.contrast);
        button.style.setProperty(
          'border',
          `1px solid ${theme.palette.primary.dark}`
        );
        button.style.setProperty('opacity', '0.9');
      });
    }

    // Status bar
    const status = host.querySelector(
      'json-editor .jsoneditor-statusbar'
    ) as HTMLElement | null;
    if (status) {
      status.style.setProperty('background-color', theme.palette.light.light);
      status.style.setProperty('color', theme.palette.light.light);
      status.style.setProperty(
        'border-top',
        `1px solid ${theme.palette.light.dark}`
      );
    }

    // Editor area (Ace)
    const ace = host.querySelector(
      'json-editor .ace_editor'
    ) as HTMLElement | null;
    if (ace) {
      // Background + text
      ace.style.setProperty('background-color', theme.palette.light.main);
      ace.style.setProperty('color', theme.palette.dark.dark);

      // Scroller area background (editor body)
      const scroller = ace.querySelector('.ace_scroller') as HTMLElement | null;
      if (scroller) {
        scroller.style.setProperty(
          'background-color',
          theme.palette.light.light
        );
      }

      const gutter = ace.querySelector('.ace_gutter') as HTMLElement | null;
      if (gutter) {
        gutter.style.setProperty('background-color', theme.palette.light.light);
        gutter.style.setProperty('color', theme.palette.light.light);
        gutter.style.setProperty(
          'border-right',
          `1px solid ${theme.palette.light.dark}`
        );
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
        (c as HTMLElement).style.setProperty(
          'color',
          theme.palette.primary.dark
        );
        (c as HTMLElement).style.setProperty(
          'border-left-color',
          theme.palette.primary.dark
        );
      });
    }
  }

  private hexToRgba(hex: string, alpha = 1): string {
    // Normalize: #RGB or #RRGGBB to R,G,B
    try {
      const h = hex.replace('#', '');
      const full =
        h.length === 3
          ? h
              .split('')
              .map((c) => c + c)
              .join('')
          : h;
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
