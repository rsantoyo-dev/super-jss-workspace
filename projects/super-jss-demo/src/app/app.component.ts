import { Component, effect, inject, signal } from '@angular/core';
import { HeaderComponent } from './components/header.component';

import {
  SjDirective,
  SjTheme,
  SJ_BASE_COMPONENTS_IMPORTS,
  SjBoxComponent,
  SjButtonComponent,
  SjTypographyComponent,
  sj,
  SjStyle,
  SjThemeService,
  SjRootApi,
} from 'super-jss';

import { BreakpointIndicatorComponent } from './components/breakpoint-indicator.component';

import { RouterOutlet } from '@angular/router';

import { SidenavComponent } from './components/sidenav.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SjDirective,
    HeaderComponent,
    SidenavComponent,
    BreakpointIndicatorComponent,
    SjBoxComponent,
    SjButtonComponent,
    ...SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <sj-box
      [sj]="[
        sj.fxDir(sj.fxDir.options.column),
        sj.bg('sj.palette.light.main'),
        sj.minHeight('100vh')
      ]"
    >
      <app-header (menuClick)="openSidenav()"></app-header>

      <sj-paper
        variant="flat"
        [sj]="[
          sj.d(sj.d.options.grid),
          sj.gridTemplateColumns({
            xs: '1fr',
            sm: '30% 70%',
            md: '15% 85%'
          }),
          sj.padding(0),
          sj.gap(0)
        ]"
      >
        @if (theme.currentBreakpoint() !== sj.breakpoints.xs){
        <app-sidenav [sj]="[sj.h('100%')]"></app-sidenav>
        }

        <sj-paper variant="flat" [sj]="[sj.minHeight('100vh')]">
          <app-breakpoint-indicator></app-breakpoint-indicator>
          <router-outlet></router-outlet>
        </sj-paper>

        <sj-box
          [sj]="[
            sj.d(sj.d.options.flex),
            sj.fxDir(sj.fxDir.options.row),
            sj.fxAItems(sj.fxAItems.options.center),
            sj.justifyContent(sj.justifyContent.options.spaceBetween)
          ]"
        >
        </sj-box>

        @if (theme.isMobile() && showSidenav()) {
        <sj-button
          [sj]="[
            sj.position(sj.position.options.fixed),
            sj.inset(0),
            sj.zIndex(1000)
          ]"
          (click)="closeSidenav()"
        ></sj-button>
        <!-- Drawer panel -->
        <sj-box
          [sj]="[
            sj.position(sj.position.options.fixed),
            sj.top(0),
            sj.left(0),
            sj.height('100%'),
            sj.width({ xs: '80%', sm: '320px' }),
            sj.backgroundColor(sj.palette.light.light),
            sj.boxShadow('0 8px 24px rgba(0,0,0,0.2)'),
            sj.zIndex(1001),
            sj.padding(0.5)
          ]"
        >
          <sj-box
            [sj]="[
              sj.d(sj.d.options.flex),
              sj.fxDir(sj.fxDir.options.row),
              sj.fxAItems(sj.fxAItems.options.center),
              sj.justifyContent(sj.justifyContent.options.spaceBetween)
            ]"
          >
            <sj-typography variant="strong" [sj]="[]">Menu</sj-typography>
            <sj-button (click)="closeSidenav()">✕</sj-button>
          </sj-box>
          <app-sidenav></app-sidenav>
        </sj-box>
        }
      </sj-paper>
    </sj-box>
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
}
