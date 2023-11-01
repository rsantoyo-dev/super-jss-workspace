import { sjShadow } from './../sjStyling/sjStyles';

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
        padding: { xs: sjSpace(1), md: sjSpace(2) },
        backgroundColor: {xs:sjColor.primary, md:sjColor.primaryLight},
      }"
    >
      <h3 [sj]="{ color: sjColor.primaryContrast}">SUPER-JSS-DEMO</h3>
      <span (click)="updateTheme()"  [sj]="{ color: sjColor.primaryDark, cursor: 'pointer' }">
        click here to update theme
      </span>
    </div>
    <div [sj]="[{backgroundColor:sjColor.secondaryLight, padding: sjSpace(0.5), display: 'flex', justifyContent:'center'}, sjShadow]">
      <span [sj]="{color:sjColor.secondaryDark, fontSize:sjSpace(1)}">
        sjBreakpoints: {{JSON.stringify(theme().breakpoints)}}
      </span>
    </div>

  `,
})
export class HeaderComponent {

  protected readonly sjColor = sjColor;
  protected readonly theme = signal(theme());
  protected readonly sjShadow = sjShadow;


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
  protected readonly JSON = JSON;
}
