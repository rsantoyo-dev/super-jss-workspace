
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperJssModule, SjQuick, theme, defaultThemeConfig } from 'projects/super-jss/src/lib';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SuperJssModule],
  template: `
    <div
      [sj]="{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: theme().spacing(5), md: theme().spacing(8) },
        backgroundColor: {xs:SjQuick.primary, md:SjQuick.primaryLight},
      }"
    >
      <h3 [sj]="{ color: theme().palette.common.white }">SUPER-JSS-DEMO</h3>
      <span (click)="updateTheme()" [sj]="{ color: SjQuick.grayDark }"
        >click here to update theme</span
      >
    </div>
  `,
})
export class HeaderComponent {

  protected readonly SjQuick = SjQuick;
  protected readonly theme = signal(theme());

  toggleTheme = signal(false);
  
  updateTheme = () => {
    this.toggleTheme.set(!this.toggleTheme());
    theme.mutate((theme) => {
      theme.palette.primary.main = this.toggleTheme()
        ? '#003366'
        : defaultThemeConfig().palette.primary.main;
      theme.palette.primary.light = this.toggleTheme()
        ? '#6699ff'
        : defaultThemeConfig().palette.primary.light;
      theme.breakpoints.md = this.toggleTheme()
        ? 750
        : defaultThemeConfig().breakpoints.md;
    });
  };

}
