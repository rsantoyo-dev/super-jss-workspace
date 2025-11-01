import { Component, OnDestroy, effect, inject, signal } from '@angular/core';
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
  deepMerge,
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
      <app-header
        (menuClick)="toggleSidenav()"
        [showMobileMenu]="showSidenav()"
      ></app-header>

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

        <sj-paper [sj]="[sj.minH('auto'), sj.display('block')]">
          <router-outlet></router-outlet>
        </sj-paper>
      </sj-paper>

      <!-- Mobile menu overlay - always present but controlled by CSS -->
      <div
        class="mobile-overlay"
        [sj]="[
          sj.position('fixed'),
          sj.top(0),
          sj.left(0),
          sj.width('100vw'),
          sj.height('100vh'),
          sj.zIndex(9998),
          sj.bg('rgba(0,0,0,0.5)'),
          sj.cursor('pointer'),
          sj.d(!theme.isDesktop() && showSidenav() ? 'block' : 'none')
        ]"
        (click)="closeSidenav()"
      ></div>
      <!-- Drawer panel - always present but controlled by CSS -->
      <sj-flex
        class="mobile-drawer"
        [sj]="[
          sj.position('fixed'),
          sj.top(0),
          sj.left(0),
          sj.height('100vh'),
          sj.width({ xs: '280px', sm: '320px' }),
          sj.backgroundColor('light.light'),
          sj.boxShadow('0 8px 24px rgba(0,0,0,0.2)'),
          sj.zIndex(9999),
          sj.padding(0.5),
          sj.transition('transform 0.3s ease-out'),
          sj.transform(
            !theme.isDesktop() && showSidenav()
              ? 'translateX(0)'
              : 'translateX(-100%)'
          ),
          sj.d(!theme.isDesktop() ? 'block' : 'none')
        ]"
      >
        <sj-flex
          [sj]="[
            sj.fxAItems('center'),
            sj.justifyContent('space-between'),
            sj.mb(1)
          ]"
        >
          <sj-typography variant="strong" [sj]="[sj.c('primary.main')]"
            >Menu</sj-typography
          >
          <sj-button
            variant="outlined"
            (click)="closeSidenav()"
            [sj]="[sj.p(0.25), sj.brad(0.25)]"
          >
            ✕
          </sj-button>
        </sj-flex>
        <app-sidenav (navigate)="closeSidenav()"></app-sidenav>
      </sj-flex>
    </sj-paper>
  `,
})
export class AppComponent implements OnDestroy {
  sj: SjRootApi = sj;
  theme = inject(SjThemeService);
  themeData: SjTheme;
  pendingThemePatch: SjTheme | null = null;
  private applyTimer: any = null;
  private readonly autoApplyDelayMs = 2000;

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
      console.log(
        'Desktop check:',
        isDesktop,
        'sidenav state:',
        this.showSidenav()
      );
      if (isDesktop && this.showSidenav()) {
        console.log('Auto-closing sidenav due to desktop mode');
        this.showSidenav.set(false);
      }
      return isDesktop;
    });
  }
  // Receive edits, but do not apply until user confirms
  onStudioChange(patch: Partial<SjTheme>) {
    // Accumulate patch over time, merging into the latest theme snapshot
    this.pendingThemePatch = deepMerge(
      this.pendingThemePatch || this.themeData,
      patch as any
    ) as SjTheme;

    // Debounce theme application to avoid thrashing CSS regeneration
    if (this.applyTimer) clearTimeout(this.applyTimer);
    this.applyTimer = setTimeout(() => {
      if (this.pendingThemePatch) {
        this.theme.setTheme(this.pendingThemePatch);
        this.pendingThemePatch = null;
      }
    }, this.autoApplyDelayMs);
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
    console.log('Closing sidenav, current state:', this.showSidenav());
    this.showSidenav.set(false);
    console.log('After close, state:', this.showSidenav());
  }
  toggleSidenav() {
    console.log('Toggling sidenav, current state:', this.showSidenav());
    this.showSidenav.set(!this.showSidenav());
    console.log('After toggle, state:', this.showSidenav());
  }

  ngOnDestroy(): void {
    if (this.applyTimer) clearTimeout(this.applyTimer);
  }
}
