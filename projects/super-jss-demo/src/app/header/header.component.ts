import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjDirective, SjTheme, SjThemeService, SjTypography, SjPalette, SjBreakPoints } from 'super-jss';

@Component({
  selector: 'app-header',
  imports: [CommonModule, SjDirective],
  template: `
    <div
      [sj]="{
        d: 'flex',
        fxDir: 'column',
        fxAItems: 'center',
        fxJustify: 'center',
        p: { xs: 1, md: 3 },
        bg: { xs: 'primary', md: 'primary.light' }
      }"
    >
      <h3 [sj]="{ color: 'primary.contrast' }">SUPER-JSS-DEMO</h3>
      <span
        (click)="updateTheme()"
        [sj]="{ color: 'primary.dark', cursor: 'pointer' }"
      >
        click here to update theme
      </span>
    </div>
    <div
      [sj]="{
        bg: 'secondary.light',
        padding: 0.5,
        display: 'flex',
        justifyContent: 'center'
      }"
    >
      <span [sj]="{ color: 'secondary.dark', fontSize: 1 }">
        sjBreakpoints: {{ JSON.stringify(breakpoints) }}
      </span>
    </div>
  `,
})
export class HeaderComponent {
  defaultThemeConfig = this.th.sjTheme();

  toggleTheme = signal(false);

  breakpoints = this.th.breakpoints();

  newPalette: Partial<SjPalette> = {
    primary: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrast: '#ffffff',
    }
  };

  newTheme: Partial<SjTheme> = {
        palette: this.newPalette as SjPalette,
        breakpoints: {
          xs: 0,
          sm: 550,
          md: 920,
          lg: 1120,
          xl: 1620,
        } as SjBreakPoints
      };

  constructor(private th: SjThemeService) {
    effect(() => {
      this.breakpoints = this.th.breakpoints();
    });
  }

  updateTheme() {
    // toggle theme between default and a custom palette
    if (!this.toggleTheme()) {
      
      this.th.setTheme(this.newTheme);
    } else {
      this.th.setTheme(this.defaultThemeConfig);
    }

    this.toggleTheme.set(!this.toggleTheme());
  }

  protected readonly JSON = JSON;
}
