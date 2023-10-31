
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SuperJssModule, sjColor, theme, defaultThemeConfig, sjSpace} from 'projects/super-jss/src/lib';


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
        padding: { xs: sjSpace(2), md: sjSpace(8) },
        backgroundColor: {xs:sjColor.primary, md:sjColor.primaryLight},
      }"
    >
      <h3 [sj]="{ color: theme().palette.common.light.main }">SUPER-JSS-DEMO</h3>
      <span (click)="updateTheme()" [sj]="{ color: sjColor.neutralDark }"
        >click here to update theme</span
      >
    </div>
  `,
})
export class HeaderComponent {

  protected readonly sjColor = sjColor;
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

  protected readonly sjSpace = sjSpace;
}
