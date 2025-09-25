import {
  Component,
  effect,
} from '@angular/core';
import { HeaderComponent } from './components/header.component';

import {
  SjDirective,
  sjCard,
  SjTheme,
  SjThemeService,
  sjBox,
  SjHostComponent,
  SjBoxComponent,
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
    <sj-host [sj]="sjBox.column">
      <sj-box [bg]="{xs:'red', md:'purple'}" [sj]="{p:3}">
        <sj-box> aaa </sj-box>
        <sj-box> bbb </sj-box>
      </sj-box>



      <app-header></app-header>

      <div
        [sj]="
          sjBox.grid({
            gridTemplateColumns: { xs: '1fr', sm: '25% 75%' }
          })
        "
      >
        <app-sidenav></app-sidenav>

        <div [sj]="sjCard.flat()">
          <app-breakpoint-indicator></app-breakpoint-indicator>
          <router-outlet></router-outlet>
        </div>
      </div>
    </sj-host>
  `,
})
export class AppComponent {
  themeData: SjTheme;
  pendingThemePatch: Partial<SjTheme> | null = null;

  sjCard = sjCard;
  sjBox = sjBox;

  constructor(
    private themeService: SjThemeService
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
}
