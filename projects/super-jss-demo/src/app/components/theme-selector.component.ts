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
  SjHostComponent,
  sjBox,
  SjIconComponent,
  icon,
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
  imports: [CommonModule, SjHostComponent, SjDirective, SjIconComponent],
  template: `
    <sj-host [sj]="sjCard.flat({ p: 0, fxDir: 'row' })">
      <div [sj]="sjCard.flat({ gap: 0 , bg: 'primary.dark' })">
        <small [sj]="{c:'primary.contrast'}">sjss-themes</small>
        <div [sj]="sjCard.flat({ p: 0, fxDir: 'row' })">
          @for (theme of libraryThemes; track theme.name){
          <!-- <div>{{ theme.name }}</div> -->

          @if (theme.isDark) {
          <button
            [sj]="sjButton({ bg: theme.theme.palette?.primary?.dark })"
            (click)="setTheme(theme.theme)"
          >
            <sj-icon
              [name]="icon.moon"
              [fill]="'light'"
              size="1.5rem"
              [ariaHidden]="false"
              role="img"
              [label]="theme.name"
            ></sj-icon>
          </button>

          } @else {
          <button
            [sj]="sjButton({ bg: theme.theme.palette?.primary?.light })"
            (click)="setTheme(theme.theme)"
          >
            <sj-icon
              [name]="icon.sun"
              size="1.5rem"
              [ariaHidden]="false"
              role="img"
              [label]="theme.name"
            ></sj-icon>
          </button>
          } }
        </div>
      </div>
      <div [sj]="sjCard.flat({ gap: 0 , bg: 'primary.dark' })">
        <small [sj]="{c:'primary.contrast'}">custom</small>
        <div [sj]="sjCard.flat({ p: 0, fxDir: 'row' })">
          @for (theme of customThemes; track theme.name){
          <!-- <div>{{ theme.name }}</div> -->

          @if (theme.isDark) {
          <button
            [sj]="sjButton({ bg: theme.theme.palette?.primary?.dark })"
            (click)="setTheme(theme.theme)"
          >
            <sj-icon
              [name]="icon.moon"
              [fill]="'light'"
              size="1.5rem"
              [ariaHidden]="false"
              role="img"
              [label]="theme.name"
            ></sj-icon>
          </button>

          } @else {
          <button
            [sj]="sjButton({ bg: theme.theme.palette?.primary?.light })"
            (click)="setTheme(theme.theme)"
          >
            <sj-icon
              [name]="icon.sun"
              size="1.5rem"
              [ariaHidden]="false"
              role="img"
              [label]="theme.name"
            ></sj-icon>
          </button>
          } }
        </div>
      </div>
    </sj-host>
  `,
})
export class ThemeSelectorComponent {
  sjCard = sjCard;
  sjBox = sjBox;
  sjButton = sjButton;
  protected readonly icon = icon;

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
