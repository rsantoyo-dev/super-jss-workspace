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

import { BreakpointIndicatorComponent } from './components/breakpoint-indicator.component';

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
    BreakpointIndicatorComponent,
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
        sj.minHeight({ xs: '100dvh', md: '100vh' })
      ]"
    >
      <app-header (menuClick)="openSidenav()"></app-header>

      <sj-paper
        variant="flat"
        [sj]="[
          sj.d(sj.d.options.grid),
          sj.gridTemplateColumns({ xs: '1fr', sm: '30% 70%', md: '15% 85%' }),
          sj.gridTemplateRows('1fr'),
          sj.alignItems('stretch'),
          sj.h('100%'),
          sj.padding(0),
          sj.gap(0)
        ]"
      >
        @if (theme.currentBreakpoint() !== sj.breakpoints.xs){
        <app-sidenav [sj]="[sj.h('100%')]"></app-sidenav>
        }

        <sj-paper variant="flat" [sj]="[sj.h('auto')]">
          <sj-paper variant="flat" usePadding [sj]="[]">
            <app-breakpoint-indicator></app-breakpoint-indicator>
          </sj-paper>

          <router-outlet></router-outlet>
        </sj-paper>

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
        <sj-flex
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
          <sj-flex
            [sj]="[
              sj.fxAItems(sj.fxAItems.options.center),
              sj.justifyContent(sj.justifyContent.options.spaceBetween)
            ]"
          >
            <sj-typography variant="strong" [sj]="[]">Menu</sj-typography>
            <sj-button (click)="closeSidenav()">✕</sj-button>
          </sj-flex>
          <app-sidenav></app-sidenav>
        </sj-flex>
        }

        <!-- Floating burger button on mobile when sidenav is closed -->
        @if (theme.isMobile() && !showSidenav()) {
          <sj-button
            variant="outlined"
            (click)="openSidenav()"
            [sj]="[
              sj.position('fixed'),
              sj.right('16px'),
              sj.bottom('16px'),
              sj.zIndex(900),
              sj.brad('50%'),
              sj.w('48px'),
              sj.h('48px'),
              sj.d('flex'),
              sj.fxAItems('center'),
              sj.fxJustify('center')
            ]"
          >☰</sj-button>
        }
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
