import { Component, effect, signal } from '@angular/core';
import { HeaderComponent } from './components/header.component';

import { SjDirective, SjTheme, SjHostComponent, SjBoxComponent, SjCardComponent, WithSj, SjButtonComponent, sj } from 'super-jss';

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
    SjCardComponent,
    SjButtonComponent
],
  template: `
    <sj-box [sj]="[sj.flex.direction(sj.tokens.flex.direction.column), sj.sh.bg(sj.tokens.palette.light.main)]">

      <app-header (menuClick)="openSidenav()"></app-header>

      <sj-box
        [sj]="[
          sj.css.display(sj.tokens.flex.display.grid),
          sj.css.gridTemplateColumns({ xs: '1fr', sm: '30% 70%', md: '15% 85%' })
        ]"
      >
        @if (theme.currentBreakpoint() !== sj.tokens.breakpoints.xs){
          <app-sidenav></app-sidenav>
        }

        <sj-card [variant]="sj.variants.sjCard.flat" [sj]="[]">
          <app-breakpoint-indicator></app-breakpoint-indicator>
          <router-outlet></router-outlet>
        </sj-card>
      </sj-box>
    </sj-box>

    @if (isMobile() && showSidenav()) {
      <!-- Backdrop -->
      <sj-button
        [sj]="[
          sj.css.position('fixed'),
          sj.css.inset(0),
          sj.css.zIndex(1000)
        ]"
        (click)="closeSidenav()"
      ></sj-button>
      <!-- Drawer panel -->
      <div
        [sj]="[
          sj.css.position('fixed'),
          sj.css.top(0),
          sj.css.left(0),
          sj.css.height('100%'),
          sj.css.width({ xs: '80%', sm: '320px' }),
          sj.css.backgroundColor(sj.palette.light.light),
          sj.css.boxShadow('0 8px 24px rgba(0,0,0,0.2)'),
          sj.css.zIndex(1001),
          sj.css.padding(0.5)
        ]"
      >
        <div [sj]="[ sj.flex.row({ fxAItems: 'center' }), sj.css.justifyContent('space-between') ]">
          <strong [sj]="[]">Menu</strong>
          <sj-button (click)="closeSidenav()">✕</sj-button>
        </div>
        <app-sidenav></app-sidenav>
      </div>
    }
  `,
})
export class AppComponent extends WithSj {
  // Improve template completions: expose typed aliases
  override sj: typeof sj = sj;
  readonly tokens: typeof sj.tokens = sj.tokens;
  readonly css = sj.css;
  readonly sh = sj.sh;
  readonly flex = sj.flex;

  themeData: SjTheme;
  pendingThemePatch: Partial<SjTheme> | null = null;

  currentBP = signal('xs');
  showSidenav = signal(false);

  constructor() {
    super();
    this.themeData = this.theme.sjTheme();
    effect(() => {
      this.themeData = this.theme.sjTheme();
    });
  }
  // Receive edits, but do not apply until user confirms
  onStudioChange(patch: Partial<SjTheme>) {
    this.pendingThemePatch = patch;
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

  openSidenav() { this.showSidenav.set(true); }
  closeSidenav() { this.showSidenav.set(false); }
}
