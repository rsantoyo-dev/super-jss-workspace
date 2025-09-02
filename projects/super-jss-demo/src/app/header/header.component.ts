import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjTheme,
  SjThemeService,
  defaultTheme,
  desertTheme,
  oceanTheme,
} from 'super-jss';
import { goldenEmeraldTheme } from '../sjStyling/themes/golden-emerald';
import { sjBorderShadow } from '../sjStyling/sjStyles';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, SjDirective],
  template: `
    <div
      [sj]="{
        d: 'flex',
        fxDir: 'column',
        fxAItems: 'center',
        p: { xs: 2, md: 4 },
        bg: 'primary.main',
        boxShadow:
          '0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12)',
        transition: 'all 0.3s ease-in-out'
      }"
    >
      <h1 [sj]="{ color: 'primary.contrast', m: 0 }">SUPER-JSS</h1>
      <p [sj]="{ color: 'primary.contrast', m: 0, p: 0 }">
        The ultimate solution for dynamic styling
      </p>
      <div [sj]="{ d: 'flex', fxWrap: 'wrap', fxJustify: 'center', mt: '1rem' }">
        <span
          *ngFor="let theme of themes"
          (click)="setTheme(theme.theme, theme.name)"
          [sj]="[
            {
              color: 'secondary.contrast',
              bg: 'secondary.main',
              cursor: 'pointer',
              p: 0.5,
              m: 0.5,
              transition: 'all 0.3s ease-in-out',

              '&:hover': {
                bg: 'secondary.dark',
                pl: 2,
                pr: 2,
                pt: 1.2,
                pb: 1.2,
              },
            },
            sjBorderShadow
          ]"
        >
          {{ theme.name }} ({{ theme.type }})
        </span>
      </div>
    </div>
    <div
      [sj]="{
        bg: 'secondary.light',
        p: 0.5,
        d: 'flex',
        fxJustify: 'center',
        transition: 'all 0.3s ease-in-out',
        alignItems: 'center',
        flexDirection: 'column'
      }"
    >
      <span [sj]="{ color: 'secondary.dark', fontSize: 1 }">
        sjBreakpoints: {{ JSON.stringify(this.th.breakpoints()) }}
      </span>
      <span [sj]="{ color: 'secondary.dark', fontSize: 1 }">
        Current Theme:
        {{ currentThemeName() }}
      </span>
      <span [sj]="{ color: 'secondary.dark', fontSize: 1 }">
        currentBreakpoint: {{ th.currentBreakpoint() }}
      </span>
    </div>
  `,
})
export class HeaderComponent {
  protected readonly sjBorderShadow = sjBorderShadow;

  themes = [
    { name: 'Default', theme: defaultTheme, type: 'Library' },
    { name: 'Desert', theme: desertTheme, type: 'Library' },
    { name: 'Ocean', theme: oceanTheme, type: 'Library' },
    { name: 'Golden Emerald', theme: goldenEmeraldTheme, type: 'Custom' },
  ];
  currentThemeName = signal('Default');

  // Create a computed signal
  breakpoints = computed(() => this.th.breakpoints());

  constructor(public th: SjThemeService) {}

  setTheme(theme: Partial<SjTheme>, name: string): void {
    this.th.setTheme(theme);
    this.currentThemeName.set(name);
  }
  protected readonly JSON = JSON;
}
