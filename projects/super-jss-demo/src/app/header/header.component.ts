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
  sjButton,
  sjCard,
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

interface ThemeMeta {
  name: string;
  theme: Partial<SjTheme>;
  type: 'Library' | 'Custom';
  isDark: boolean;
}

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, SjDirective],
  template: `
    <div [sj]="style.header">
      <div [sj]="style.brand">
        

        <h1 [sj]="{c:'primary.contrast'}">SUPER-JSS</h1>
        <span [sj]="{c:'primary.contrast'}">The ultimate solution for dynamic styling</span>
      </div>

      <div [sj]="style.themeArea">
        <div [sj]="style.themeColumn">
          <small [sj]="style.themeLabel">Library</small>
          <div [sj]="style.themeList">
            <button
              *ngFor="let theme of libraryThemes"
              type="button"
              [title]="theme.name"
              [attr.aria-pressed]="currentThemeName() === theme.name"
              (click)="setTheme(theme.theme, theme.name)"
              [sj]="themeSwatchStyle(theme)"
            >
              @if (theme.isDark) {
                <span [sj]="style.themeSwatchIcon">🌙</span>
              } @else {
                <span [sj]="style.themeSwatchIcon">💡</span>
              }
            </button>
          </div>
        </div>

        <div [sj]="style.themeColumn">
          <small [sj]="style.themeLabel">Custom</small>
          <div [sj]="style.themeList">
            <button
              *ngFor="let theme of customThemes"
              type="button"
              [title]="theme.name"
              [attr.aria-pressed]="currentThemeName() === theme.name"
              (click)="setTheme(theme.theme, theme.name)"
              [sj]="themeSwatchStyle(theme)"
            >
              @if (theme.isDark) {
                <span [sj]="style.themeSwatchIcon">🌙</span>
              } @else {
                <span [sj]="style.themeSwatchIcon">💡</span>
              }
            </button>
          </div>
        </div>

        <div [sj]="style.themeName">
          {{ currentThemeName() }}
        </div>
      </div>
    </div>

    <div [sj]="style.metricsBar">
      <span [sj]="style.metricsItem">
        <strong>Breakpoints:</strong>
        {{ JSON.stringify(this.th.breakpoints()) }}
      </span>
      <span [sj]="style.metricsHighlight">
        <strong>Current Theme:</strong> {{ currentThemeName() }}
      </span>
      <span [sj]="style.metricsItem">
        <strong>Breakpoint:</strong> {{ th.currentBreakpoint() }}
      </span>
    </div>
  `,
})

export class HeaderComponent {
  readonly style: Record<string, SjStyle> = {
    header: sjCard.primary({
      borderRadius:0,
      fxDir: { xs: 'column', lg: 'row' },
      fxJustify: 'space-between',
      fxAItems: 'center',
    }),
    brand: { d: 'flex', fxDir: 'column', fxAItems: { xs: 'center', lg: 'flex-start' } } as SjStyle,
 
    themeArea: sjCard.flat({
      fxDir: 'row',
      fxWrap: 'wrap',
      fxJustify: 'center',
      fxAItems: 'center'
    }),
    themeColumn: sjCard({ d: 'flex', fxDir: 'column', gap: 0.5, bg: 'transparent', borderColor: 'transparent', boxShadow: 'none', p: 0 }),
    themeLabel: { m: 0, opacity: 0.8, textAlign: 'center', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em' } as SjStyle,
    themeList: { d: 'flex', fxDir: 'row', gap: 0.5, flexWrap: 'wrap', fxJustify: 'center' } as SjStyle,
    themeSwatch: sjButton.outlined({
      w: 3,
      h: 1,
      fxAItems: 'center',
      fxJustify: 'center',
    }),
    themeSwatchActive: {
      transform: 'scale(1.08)',
      borderColor: 'light.main',
      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    } as SjStyle,
    themeSwatchIcon: { fontSize: '0.75rem', lineHeight: 1 } as SjStyle,
    themeName: {
      c: 'primary.contrast',
      fontSize: 1,
      fontWeight: 500,
      pl: 1,
      ml: 0.5,
      borderLeft: '1px solid',
      borderColor: 'rgba(255,255,255,0.3)',
    } as SjStyle,
    metricsBar: sjCard({
      bg: 'secondary.light',
      d: 'flex',
      fxDir: { xs: 'column', sm: 'row' },
      fxJustify: 'space-around',
      fxAItems: 'center',
      gap: 0.75,
      p: 0.75,
      c: 'secondary.dark',
      boxShadow: '0 -1px 4px rgba(0,0,0,0.08)',
      borderColor: 'transparent',
    }),
    metricsItem: { textAlign: 'center', fontSize: { xs: 0.75, md: 0.85 } } as SjStyle,
    metricsHighlight: { fontWeight: 700, fontSize: 1 } as SjStyle,
  };

  themes: ThemeMeta[] = [
    {
      name: 'Default Light',
      theme: defaultTheme,
      type: 'Library',
      isDark: false,
    },
    {
      name: 'Default Dark',
      theme: deepMerge(defaultTheme, defaultDarkTheme),
      type: 'Library',
      isDark: true,
    },
    {
      name: 'Desert Light',
      theme: desertTheme,
      type: 'Library',
      isDark: false,
    },
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

  themeSwatchStyle(theme: ThemeMeta): SjStyle[] {
    const palettePrimary: any = (theme.theme as any)?.palette?.primary || {};
    const background = theme.isDark
      ? palettePrimary.dark ?? palettePrimary.main ?? 'primary.dark'
      : palettePrimary.main ?? 'primary.main';
    const contrast = palettePrimary.contrast ?? 'primary.contrast';

    return [
      this.style.themeSwatch,
      {
        bg: background,
        c: contrast,
      },
      this.currentThemeName() === theme.name ? this.style.themeSwatchActive : {},
    ];
  }

  breakpoints = computed(() => this.th.breakpoints());

  constructor(public th: SjThemeService) {}

  setTheme(theme: Partial<SjTheme>, name: string): void {
    this.th.setTheme(theme);
    this.currentThemeName.set(name);
  }
  protected readonly JSON = JSON;
}
