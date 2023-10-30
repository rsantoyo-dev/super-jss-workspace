import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SJssThemeService, SuperJssModule, SjQuick } from '../../../../super-jss/src/lib';

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
        padding: { xs: theme().spacing(5), md: theme().spacing(5) },
        backgroundColor: {xs:SjQuick.secondary, md:SjQuick.secondary},
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
  toggleTheme = signal(false);
  theme = signal(this.themeService.defaultTheme());  

  constructor(private themeService: SJssThemeService) {
    effect(() => {
      this.theme = this.themeService.theme;
    });
  }
  updateTheme = () => {
    this.toggleTheme.set(!this.toggleTheme());
    this.themeService.theme.mutate((theme) => {
      theme.palette.secondary.main = this.toggleTheme()
        ? 'red'
        : this.themeService.defaultTheme().palette.secondary.main;
      theme.palette.secondary.dark = this.toggleTheme()
        ? 'purple'
        : this.themeService.defaultTheme().palette.secondary.dark;
      theme.breakpoints.md = this.toggleTheme()
        ? 750
        : this.themeService.defaultTheme().breakpoints.md;
    });
  };
  
}
