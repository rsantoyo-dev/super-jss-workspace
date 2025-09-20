import { Component, computed } from '@angular/core';
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
  selector: 'app-theme-selector',
  imports: [CommonModule, SjDirective],
  template: `
    <div
      [sj]="{
        d: 'flex',
        fxDir: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.75
      }"
    >
      <div [sj]="{ d: 'flex', fxDir: 'column' }">
        <p [sj]="style.sectionLabel">Defaults</p>
        <div [sj]="style.themeList">
          <button
            *ngFor="let theme of libraryThemes"
            type="button"
            [title]="theme.name"
            [attr.aria-pressed]="currentThemeName() === theme.name"
            (click)="setTheme(theme.theme)"
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
      <div [sj]="{ d: 'flex', fxDir: 'column' }">
        <p [sj]="style.sectionLabel">Custom</p>
        <div [sj]="style.themeList">
          <ng-container *ngIf="customThemes.length; else noCustom">
            <button
              *ngFor="let theme of customThemes"
              type="button"
              [title]="theme.name"
              [attr.aria-pressed]="currentThemeName() === theme.name"
              (click)="setTheme(theme.theme)"
              [sj]="themeSwatchStyle(theme)"
            >
              @if (theme.isDark) {
              <span [sj]="style.themeSwatchIcon">🌙</span>
              } @else {
              <span [sj]="style.themeSwatchIcon">💡</span>
              }
            </button>
          </ng-container>
          <ng-template #noCustom>
            <span [sj]="style.emptyState">No custom themes yet.</span>
          </ng-template>
        </div>
      </div>
    </div>

    <div
      [sj]="{
        d: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 1
      }"
    >
      <strong [sj]="{ c: 'primary' }">
        {{ currentThemeName() }}
      </strong>
    </div>
  `,
})
export class ThemeSelectorComponent {
  sjCard = sjCard;
  readonly style: Record<string, SjStyle> = {
    sectionLabel: {
      m: 0,
      fontWeight: 600,
      fontSize: '0.8rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      c: 'primary',
    } as SjStyle,
    themeList: {
      d: 'flex',
      fxDir: 'row',
      gap: 0.5,
      flexWrap: 'wrap',
      fxJustify: 'center',
    } as SjStyle,
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
    emptyState: { fontSize: '0.75rem', opacity: 0.7 } as SjStyle,
    themeName: {
      c: 'primary.contrast',
      fontSize: 1,
      fontWeight: 500,
      pl: 1,
      ml: 0.5,
      borderLeft: '1px solid',
      borderColor: 'rgba(255,255,255,0.3)',
    } as SjStyle,
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
  currentThemeName = computed(() => this.th.sjTheme().name);

  themeSwatchStyle(theme: ThemeMeta): SjStyle[] {
    const palettePrimary: any = (theme.theme as any)?.palette?.primary || {};
    const background = theme.isDark
      ? palettePrimary.dark ?? palettePrimary.main ?? 'primary.dark'
      : palettePrimary.main ?? 'primary.main';
    const contrast = palettePrimary.contrast ?? 'primary.contrast';

    return [sjButton({ bg: background, c: contrast, width: 3, height: 1.5 })];
  }

  constructor(public th: SjThemeService) {}

  setTheme(theme: Partial<SjTheme>): void {
    this.th.setTheme(theme);
  }
}
