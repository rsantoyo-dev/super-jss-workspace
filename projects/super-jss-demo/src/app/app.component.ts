import { Component, effect, signal } from '@angular/core';
import { HeaderComponent } from './components/header.component';

import { SjDirective, SjTheme, SjThemeService, SjHostComponent, SjBoxComponent, sj, SjCardComponent } from 'super-jss';

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
    SjCardComponent
],
  template: `
    <sj-box [sj]="[sj.flex.direction(sj.tokens.flex.direction.column), sj.sh.bg(sj.tokens.palette.light.main)]">
      
      <app-header></app-header>

      <sj-box
        [sj]="[
          
          sj.css.display(sj.tokens.flex.display.grid),
          sj.css.gridTemplateColumns({ xs: '1fr', sm: '30% 70%', md: '15% 85%' })
        ]"
      >
        @if (themeService.currentBreakpoint() !== sj.tokens.breakpoints.xs){
          <app-sidenav></app-sidenav>
        }

        <sj-card [variant]="sj.variants.sjCard.flat">
          <app-breakpoint-indicator></app-breakpoint-indicator>
          <router-outlet></router-outlet>
        </sj-card>
      </sj-box>
    </sj-box>
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
