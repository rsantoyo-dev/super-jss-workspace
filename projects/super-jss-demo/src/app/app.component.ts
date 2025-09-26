import { Component, effect, signal } from '@angular/core';
import { HeaderComponent } from './components/header.component';

import { SjDirective, SjTheme, SjThemeService, SjHostComponent, SjBoxComponent, sj, SjCardComponent } from 'super-jss';

import { BreakpointIndicatorComponent } from './components/breakpoint-indicator.component';

import { RouterModule } from '@angular/router';

import { SidenavComponent } from './components/sidenav.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    SjDirective,
    HeaderComponent,
    SidenavComponent,
    BreakpointIndicatorComponent,
    SjHostComponent,
    SjBoxComponent,
    SjCardComponent
],
  template: `
    <sj-host [sj]="sj.fxDir('column')">
      <app-header></app-header>
      <sj-card [variant]="sj.variants.sjCard.secondary">dsd</sj-card>

      <sj-box
        [sj]="[
          sj.display('grid'),
          sj.gridTemplateColumns({ xs: '1fr', sm: '30% 70%', md: '15% 85%' })
        ]"
      >
        @if (themeService.currentBreakpoint() !== 'xs'){
        <app-sidenav></app-sidenav>
        }

        <div [sj]="sj.blueprints.sjCard.flat()">
          <app-breakpoint-indicator></app-breakpoint-indicator>
          <router-outlet></router-outlet>
        </div>
      </sj-box>
    </sj-host>
  `,
})
export class AppComponent {
  themeData: SjTheme;
  pendingThemePatch: Partial<SjTheme> | null = null;

  sj = sj;
  currentBP = signal('xs');

  constructor(public themeService: SjThemeService) {
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
}
