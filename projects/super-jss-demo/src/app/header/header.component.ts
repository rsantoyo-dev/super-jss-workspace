import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjStyle,
  SjTheme,
  SjThemeService,
  defaultDarkTheme,
  defaultTheme,
  desertDarkTheme,
  desertTheme,
  oceanDarkTheme,
  oceanTheme,
} from 'super-jss';
import { goldenEmeraldTheme } from '../sjStyling/themes/golden-emerald';

function deepMerge(target: any, source: any): any {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
}

function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, SjDirective],
  template: `
    <div
      [sj]="{
        d: 'flex',
        fxDir: { xs: 'column', lg: 'row' },
        fxJustify: 'space-between',
        fxAItems: 'center',
        p: { xs: 1, md: '1rem 1.5rem' },
        bg: 'primary.main',
        color: 'primary.contrast',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'all 0.3s ease-in-out'
      }"
    >
      <!-- Left Column: Title -->
      <div
        [sj]="{
          d: 'flex',
          fxDir: 'column',
          fxAItems: { xs: 'center', lg: 'flex-start' }
        }"
      >
        <h1
          [sj]="{
            m: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontSize: { xs: 1.8, md: 2.2 },
            fontWeight: 400
          }"
        >
          SUPER-JSS
        </h1>
        <p
          [sj]="{
            m: 0,
            p: 0,
            fontStyle: 'italic',
            fontSize: { xs: 0.9, md: 1 },
            opacity: 0.8
          }"
        >
          The ultimate solution for dynamic styling
        </p>
      </div>

      <!-- Right Column: Themes -->
      <div
        [sj]="{
          d: 'flex',
          fxDir: 'row',
          fxAItems: 'center',
          gap: 2,
          mt: { xs: '1.5rem', lg: 0 }
        }"
      >
        <!-- Library Themes Group -->
        <div [sj]="{ d: 'flex', fxDir: 'column', gap: 0.2 }">
          <small
            [sj]="{
              m: 0,
              opacity: 0.8
            }"
          >
            Library
          </small>
          <div [sj]="{ d: 'flex', fxDir: 'row', gap: 0.5 }">
            <div
              *ngFor="let theme of libraryThemes"
              (click)="setTheme(theme.theme, theme.name)"
              [sj]="[
                circleBaseStyle,
                {
                  bg: theme.isDark
                    ? theme.theme.palette.secondary.dark
                    : theme.theme.palette.secondary.main,
                },
                theme.name === currentThemeName() ? circleActiveStyle : {}
              ]"
              [title]="theme.name"
            ></div>
          </div>
        </div>

        <!-- Custom Themes Group -->
        <div [sj]="{ d: 'flex', fxDir: 'column', gap: 0.2 }">
          <small
            [sj]="{
              m: 0,
              opacity: 0.8
            }"
          >
            Custom
          </small>
          <div [sj]="{ d: 'flex', fxDir: 'row', gap: 0.75 }">
            <div
              *ngFor="let theme of customThemes"
              (click)="setTheme(theme.theme, theme.name)"
              [sj]="[
                circleBaseStyle,
                {
                  bg: theme.isDark
                    ? theme.theme.palette.secondary.dark
                    : theme.theme.palette.secondary.main,
                },
                theme.name === currentThemeName() ? circleActiveStyle : {}
              ]"
              [title]="theme.name"
            ></div>
          </div>
        </div>

        <!-- Selected Theme Name -->
        <div
          [sj]="{
            color: 'primary.contrast',
            fontSize: 1,
            fontWeight: 500,
            pl: 1,
            ml: 0.5,
            borderLeft: '1px solid',
            borderColor: 'rgba(255,255,255,0.3)'
          }"
        >
          {{ currentThemeName() }}
        </div>
      </div>
    </div>

    <div
      [sj]="{
        bg: 'secondary.light',
        p: 0.75,
        d: 'flex',
        fxDir: { xs: 'column', sm: 'row' },
        fxJustify: 'space-around',
        fxAItems: 'center',
        gap: 0.75,
        transition: 'all 0.3s ease-in-out',
        boxShadow: '0 -1px 4px rgba(0,0,0,0.08)',
        color: 'secondary.dark',
        fontSize: { xs: 0.75, md: 0.85 }
      }"
    >
      <span [sj]="{ textAlign: 'center' }">
        <strong>Breakpoints:</strong>
        {{ JSON.stringify(this.th.breakpoints()) }}
      </span>
      <span [sj]="{ fontWeight: 'bold', fontSize: 1 }">
        <strong>Current Theme:</strong> {{ currentThemeName() }}
      </span>
      <span [sj]="{ textAlign: 'center' }">
        <strong>Breakpoint:</strong> {{ th.currentBreakpoint() }}
      </span>
    </div>
  `,
})
export class HeaderComponent {
  themes = [
    { name: 'Default Light', theme: defaultTheme, type: 'Library', isDark: false },
    {
      name: 'Default Dark',
      theme: deepMerge(defaultTheme, defaultDarkTheme),
      type: 'Library',
      isDark: true,
    },
    { name: 'Desert Light', theme: desertTheme, type: 'Library', isDark: false },
    {
      name: 'Desert Dark',
      theme: deepMerge(desertTheme, desertDarkTheme),
      type: 'Library',
      isDark: true,
    },
    { name: 'Ocean Light', theme: oceanTheme, type: 'Library', isDark: false },
    {
      name: 'Ocean Dark',
      theme: deepMerge(oceanTheme, oceanDarkTheme),
      type: 'Library',
      isDark: true,
    },
    {
      name: 'Golden Emerald',
      theme: goldenEmeraldTheme,
      type: 'Custom',
      isDark: false,
    },
  ];
  libraryThemes = this.themes.filter((t) => t.type === 'Library');
  customThemes = this.themes.filter((t) => t.type === 'Custom');
  currentThemeName = signal('Default Light');

  circleBaseStyle: SjStyle = {
    cursor: 'pointer',
    w: '24px',
    h: '24px',
    brad: '50%',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    border: '2px solid rgba(255,255,255,0.5)',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  };

  circleActiveStyle: SjStyle = {
    transform: 'scale(1.2)',
    borderColor: 'rgba(255,255,255,0.9)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  };

  breakpoints = computed(() => this.th.breakpoints());

  constructor(public th: SjThemeService) {}

  setTheme(theme: Partial<SjTheme>, name: string): void {
    this.th.setTheme(theme);
    this.currentThemeName.set(name);
  }
  protected readonly JSON = JSON;
}
