import { sjShadow } from './../sjStyling/sjStyles';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperJssModule, sjColor, theme, defaultThemeConfig, sjSpace } from 'projects/super-jss/src/lib';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SuperJssModule],
  template: `
    <div [sj]="[{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: { xs: sjSpace(1), md: sjSpace(2) },
      backgroundColor: { xs: sjColor.primary, md: sjColor.primaryLight },
    }, sjShadow]">
      <h3 [sj]="{ color: sjColor.primaryContrast }">SUPER-JSS-DEMO</h3>
      <span (click)="updateTheme()" [sj]="{ color: sjColor.primaryDark, cursor: 'pointer' }">
        click here to update theme
      </span>
    </div>
    <div [sj]="[{ backgroundColor: sjColor.secondaryLight, padding: sjSpace(0.5), display: 'flex', justifyContent: 'center' }]">
      <span [sj]="{ color: sjColor.secondaryDark, fontSize: sjSpace(1) }">
        sjBreakpoints: {{ JSON.stringify(theme().breakpoints) }}
      </span>
    </div>
  `,
})
export class HeaderComponent {
  protected readonly sjColor = sjColor;
  protected readonly theme = signal(theme());
  protected readonly sjShadow = sjShadow;
  protected readonly sjSpace = sjSpace;
  protected readonly JSON = JSON;

  toggleTheme = signal(false);

  updateTheme = () => {
    this.toggleTheme.set(!this.toggleTheme());
    theme.mutate((theme) => {
      theme.palette.primary = this.toggleTheme()
        ? {
            main: '#800080', // Purple
            light: '#E0B0FF', // Lighter Purple
            dark: '#4B0082', // Darker Purple
            contrastText: '#FFFFFF', // White for contrast
          }
        : defaultThemeConfig().palette.primary;

        theme.palette.secondary = this.toggleTheme()
        ? {
            main: '#FFDB58', // Mustard
            light: '#FFEA70', // Lighter Mustard
            dark: '#B08D57', // Darker Mustard
            contrastText: '#FFFFFF', // White for contrast
          }
        : defaultThemeConfig().palette.primary;

        theme.palette.tertiary = this.toggleTheme()
        ? {
            main: '#0000FF', // Blue
            light: '#8A2BE2', // Lighter Blue
            dark: '#00008B', // Darker Blue
            contrastText: '#FFFFFF', // White for contrast
          }
        : defaultThemeConfig().palette.primary;

      theme.breakpoints.md = this.toggleTheme() ? 750 : defaultThemeConfig().breakpoints.md;
    });
  };
}
