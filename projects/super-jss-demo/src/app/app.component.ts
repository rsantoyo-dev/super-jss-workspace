import { Component, effect } from '@angular/core';
import { HeaderComponent } from './components/header.component';

import {
  SjDirective,
  SjTheme,
  SjThemeService,
  SjHostComponent,
  SjBoxComponent,
  sj,
} from 'super-jss';

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
  ],
  template: `
    <sj-host [sj]="sj.fxDir('column')">
      <app-header></app-header>

      <sj-box
        [sj]="
          sj.blueprints.sjBox.grid({
            gridTemplateColumns: { xs: '1fr', sm: '25% 75%' }
          })
        "
      >
        <app-sidenav></app-sidenav>

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

  constructor(private themeService: SjThemeService) {
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
