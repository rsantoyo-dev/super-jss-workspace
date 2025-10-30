import { Component, effect, inject, signal } from '@angular/core';
import { HeaderComponent } from './components/header.component';

import {
  SjDirective,
  SjTheme,
  SJ_BASE_COMPONENTS_IMPORTS,
  SjButtonComponent,
  SjTypographyComponent,
  sj,
  SjStyle,
  SjThemeService,
  SjRootApi,
} from 'super-jss';

import { RouterOutlet } from '@angular/router';

import { SidenavComponent } from './components/sidenav.component';
import { SjFlexComponent } from 'super-jss';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SjDirective,
    HeaderComponent,
    SidenavComponent,
    SjButtonComponent,
    SjFlexComponent,
    ...SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <sj-paper
      host
      [sj]="[
        sj.fxDir(sj.fxDir.options.column),
        sj.bg(sj.palette.light.main),
        sj.minH('100vh'),
        sj.overflowX('hidden')
      ]"
    >
      <app-header (menuClick)="toggleSidenav()"></app-header>

      <sj-paper
        variant="flat"
        [sj]="[
          sj.d(sj.d.options.grid),
          sj.gridTemplateColumns({ xs: '1fr', md: '15% 85%' }),
          sj.gridTemplateRows('auto'),
          sj.alignItems('stretch'),
          sj.padding(0),
          sj.gap(0)
        ]"
      >
        @if (theme.isDesktop()){
        <app-sidenav [sj]="[sj.h('100%')]"></app-sidenav>
        }

        <sj-paper
          [sj]="[
            sj.minH('auto'),
            sj.display('block')
          ]"
        >
          <router-outlet></router-outlet>
        </sj-paper>

        @if (!theme.isDesktop()) { @if (showSidenav()) {
          <!-- Fullscreen overlay above header and content to capture outside clicks -->
          <sj-button
            [sj]="[
              sj.position(sj.position.options.fixed),
              sj.inset(0),
              sj.zIndex(2000),
              sj.bg('transparent')
            ]"
            (click)="closeSidenav()"
          ></sj-button>
        <!-- Drawer panel (render only when open to avoid FOUC) -->
          <sj-flex
            [sj]="[
              sj.position(sj.position.options.fixed),
              sj.top(0),
              sj.left(0),
              sj.height('100%'),
              sj.width({ xs: '80%', sm: '320px' }),
              sj.backgroundColor(sj.palette.light.light),
              sj.boxShadow('0 8px 24px rgba(0,0,0,0.2)'),
              sj.zIndex(3000),
              sj.padding(0.5),
              sj.transition('transform 0.2s ease-out')
            ]"
          >
          <sj-flex
            [sj]="[
              sj.fxAItems(sj.fxAItems.options.center),
              sj.justifyContent(sj.justifyContent.options.spaceBetween)
            ]"
          >
            <sj-typography variant="strong" [sj]="[]">Menu</sj-typography>
            <sj-button (click)="closeSidenav()">✕</sj-button>
          </sj-flex>
          <app-sidenav (navigate)="closeSidenav()"></app-sidenav>
        </sj-flex>
        } }
      </sj-paper>
    </sj-paper>
  `,
})
export class AppComponent {
  sj: SjRootApi = sj;
  theme = inject(SjThemeService);
  themeData: SjTheme;
  pendingThemePatch: SjTheme | null = null;

  currentBP = signal('xs');
  showSidenav = signal(false);

  constructor() {
    this.themeData = this.theme.sjTheme();
    effect(() => {
      this.themeData = this.theme.sjTheme();
    });

    // Auto-close drawer when entering desktop
    effect(() => {
      const isDesktop = this.theme.isDesktop();
      if (isDesktop && this.showSidenav()) {
        this.showSidenav.set(false);
      }
      return isDesktop;
    });
  }
  // Receive edits, but do not apply until user confirms
  onStudioChange(patch: Partial<SjTheme>) {
    this.pendingThemePatch = { ...this.themeData, ...patch };
  }

  applyEditedTheme() {
    if (this.pendingThemePatch) {
      this.theme.setTheme(this.pendingThemePatch);
      this.pendingThemePatch = null;
    }
  }

  discardEditedTheme() {
    this.pendingThemePatch = null;
  }

  openSidenav() {
    this.showSidenav.set(true);
  }
  closeSidenav() {
    this.showSidenav.set(false);
  }
  toggleSidenav() {
    this.showSidenav.set(!this.showSidenav());
  }
}
