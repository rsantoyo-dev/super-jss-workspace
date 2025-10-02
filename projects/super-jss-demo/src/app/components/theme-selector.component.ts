import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjTheme,
  defaultDarkTheme,
  defaultTheme,
  desertDarkTheme,
  desertTheme,
  oceanDarkTheme,
  oceanTheme,
  icon,
  SjBoxComponent,
  SJ_BASE_COMPONENTS_IMPORTS,
} from 'super-jss';
import { sj, SjRootApi, SjThemeService } from 'super-jss';
import { inject } from '@angular/core';
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
  imports: [CommonModule, ...SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-host [sj]="[sj.sjCard(), sj.bg(sj.palette.primary.dark), sj.gap(0.25)]">
      <sj-typography [variant]="'small'" [sj]="[sj.c(sj.palette.primary.contrast)]">{{
        previewLabel()
      }}</sj-typography>

      <sj-card [variant]="'flat'" [sj]="[sj.flexDirection('row'), sj.p(0)]">
        @for (theme of libraryThemes; track theme.name){ @if (theme.isDark) {
        <sj-button
          [sj]="sj.sjButton({ bg: theme.theme.palette?.primary?.dark })"
          (mouseenter)="onHover(theme.name)"
          (mouseleave)="onHoverEnd()"
          (click)="onSelect(theme)"
        >
          <sj-icon
            [name]="icon.moon"
            [fill]="'light'"
            size="1.5rem"
            [ariaHidden]="false"
            role="img"
            [label]="theme.name"
          ></sj-icon>
        </sj-button>

        } @else {
        <sj-button
          [sj]="sj.sjButton({ bg: theme.theme.palette?.primary?.light })"
          (mouseenter)="onHover(theme.name)"
          (mouseleave)="onHoverEnd()"
          (click)="onSelect(theme)"
        >
          <sj-icon
            [name]="icon.sun"
            size="1.5rem"
            [ariaHidden]="false"
            role="img"
            [label]="theme.name"
          ></sj-icon>
        </sj-button>
        } }
        <sj-box
          [sj]="sj.sjCard({ bg: sj.palette.primary.main, p: 0.1 })"
        ></sj-box>
        @for (theme of customThemes; track theme.name){ @if (theme.isDark) {
        <sj-button
          [sj]="sj.sjButton({ bg: theme.theme.palette?.primary?.dark })"
          (mouseenter)="onHover(theme.name)"
          (mouseleave)="onHoverEnd()"
          (click)="onSelect(theme)"
        >
          <sj-icon
            [name]="icon.moon"
            [fill]="'light'"
            size="1.5rem"
            [ariaHidden]="false"
            role="img"
            [label]="theme.name"
          ></sj-icon>
        </sj-button>

        } @else {
        <sj-button
          [sj]="sj.sjButton({ bg: theme.theme.palette?.primary?.light })"
          (mouseenter)="onHover(theme.name)"
          (mouseleave)="onHoverEnd()"
          (click)="onSelect(theme)"
        >
          <sj-icon
            [name]="icon.sun"
            size="1.5rem"
            [ariaHidden]="false"
            role="img"
            [label]="theme.name"
          ></sj-icon>
        </sj-button>
        } }
      </sj-card>
    </sj-host>
  `,
})
export class ThemeSelectorComponent {
  readonly sj: SjRootApi = sj;
  readonly theme = inject(SjThemeService);
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
  currentThemeName = computed(() => this.theme.sjTheme().name);
  private hoveredTheme = signal<string | null>(null);
  previewLabel = computed(() => {
    const hovered = this.hoveredTheme();
    const current = this.currentThemeName();
    const target = hovered ?? current;
    const source = this.themes.find((t) => t.name === target);
    const prefix =
      source?.type === 'Custom' ? 'customized theme' : 'sjss-theme';

    return `${prefix}: ${target}`;
  });

  constructor() {}

  onHover(name: string): void {
    this.hoveredTheme.set(name);
  }

  onHoverEnd(): void {
    this.hoveredTheme.set(null);
  }

  onSelect(theme: ThemeMeta): void {
    this.theme.setTheme(theme.theme);
    this.hoveredTheme.set(null);
  }
}
