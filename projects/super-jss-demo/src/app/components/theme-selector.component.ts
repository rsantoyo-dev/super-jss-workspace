import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjTheme,
  icon,
  SjFlexComponent,
  SJ_BASE_COMPONENTS_IMPORTS,
  defaultTheme,
  defaultDarkTheme,
} from 'super-jss';
import {
  desertTheme,
  desertDarkTheme,
  oceanTheme,
  oceanDarkTheme,
} from 'super-jss/themes';
import { sj, SjRootApi, SjThemeService } from 'super-jss';
import { inject } from '@angular/core';
import { goldenEmeraldTheme } from '../sjStyling/themes/golden-emerald';
import { midnightVioletTheme } from '../sjStyling/themes/midnight-violet';

interface ThemeMeta {
  name: string;
  theme: SjTheme | Partial<SjTheme>;
  base?: SjTheme; // optional base to reset before applying partial overrides
  type: 'Library' | 'Custom';
  isDark: boolean;
}

@Component({
  standalone: true,
  selector: 'app-theme-selector',
  imports: [CommonModule, ...SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-paper host useSurface [sj]="[sj.bg(sj.palette.primary.dark)]">
      <sj-typography
        [variant]="'small'"
        [sj]="[sj.c(sj.palette.primary.contrast)]"
        >{{ previewLabel() }}</sj-typography
      >

      <sj-paper
        variant="flat"
        useSurface
        usePadding="false"
        [sj]="[sj.flexDirection('row'), sj.p(0)]"
      >
        @for (theme of libraryThemes; track theme.name){ @if (theme.isDark) {
        <sj-button
          [variant]="'contained'"
          [sj]="{ bg: theme.theme.palette?.primary?.dark }"
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
          [variant]="'contained'"
          [sj]="{ bg: theme.theme.palette?.primary?.light }"
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
        <sj-flex [sj]="{ bg: sj.palette.primary.main, p: 0.1 }"></sj-flex>
        @for (theme of customThemes; track theme.name){ @if (theme.isDark) {
        <sj-button
          [variant]="'contained'"
          [sj]="{ bg: theme.theme.palette?.primary?.dark }"
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
          [variant]="'contained'"
          [sj]="{ bg: theme.theme.palette?.primary?.light }"
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
      </sj-paper>
    </sj-paper>
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
      theme: defaultDarkTheme,
      base: defaultTheme,
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
      theme: desertDarkTheme,
      base: desertTheme,
      type: 'Library',
      isDark: true,
    },
    { name: 'Ocean Light', theme: oceanTheme, type: 'Library', isDark: false },
    {
      name: 'Ocean Dark',
      theme: oceanDarkTheme,
      base: oceanTheme,
      type: 'Library',
      isDark: true,
    },
    {
      name: 'Golden Emerald',
      theme: goldenEmeraldTheme,
      base: defaultTheme,
      type: 'Custom',
      isDark: false,
    },
    {
      name: 'Midnight Violet',
      theme: midnightVioletTheme,
      base: defaultTheme,
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
    // Replace strategy to avoid carry-over from previous theme overrides (e.g., font sizes)
    if (theme.base) {
      this.theme.setThemeReset({ ...theme.base, ...theme.theme });
    } else {
      this.theme.setThemeReset(theme.theme);
    }
    this.hoveredTheme.set(null);
  }
}
