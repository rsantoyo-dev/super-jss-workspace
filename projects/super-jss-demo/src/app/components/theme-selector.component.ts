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
    <sj-paper
      variant="flat"
      usePadding="compact"
      useRounded="compact"
      [sj]="[sj.bg(sj.palette.primary.dark)]"
    >
      <sj-flex useCol useGap="compact">
        <sj-typography
          [variant]="'small'"
          [sj]="[sj.c(sj.palette.primary.contrast)]"
          >{{ previewLabel() }}</sj-typography
        >
        <!-- Breakpoints overview -->
        <sj-flex useCol useGap="compact" [sj]="[]">
          <sj-typography
            [variant]="'caption'"
            [sj]="[sj.c(sj.palette.primary.light)]"
          >
            @for (bp of orderedBps; track bp; let last = $last) {
            <span
              [sj]="
                currentBp() === bp ? [sj.c(sj.palette.primary.contrast)] : []
              "
            >
              {{ bp }}: {{ breakpoints()[bp] }}px </span
            >@if (!last){, } }
          </sj-typography>
          <sj-typography
            [variant]="'caption'"
            [sj]="[sj.c(sj.palette.primary.light)]"
          >
            Font: <span [sj]="[sj.c(sj.palette.primary.contrast)]">{{ fontFamilyDisplay() }}</span>
          </sj-typography>
        </sj-flex>

        <sj-flex
          useGap="compact"
          useRounded="default"
          [sj]="[sj.flexDirection('row')]"
        >
          @for (theme of libraryThemes; track theme.name){ @if (theme.isDark) {
          <sj-button
            [useDensity]="2"
            useRounded="default"
            [variant]="'contained'"
            [sj]="{ bg: theme.theme.palette?.primary?.dark }"
            (mouseenter)="onHover(theme.name)"
            (mouseleave)="onHoverEnd()"
            (click)="onSelect(theme)"
          >
            <sj-icon
              [name]="icon.moon"
              [fill]="'light'"
              [ariaHidden]="false"
              role="img"
              [label]="theme.name"
            ></sj-icon>
          </sj-button>

          } @else {
          <sj-button
            [useDensity]="2"
            [variant]="'contained'"
            [sj]="{ bg: theme.theme.palette?.primary?.light }"
            (mouseenter)="onHover(theme.name)"
            (mouseleave)="onHoverEnd()"
            (click)="onSelect(theme)"
          >
            <sj-icon
              [name]="icon.sun"
              [ariaHidden]="false"
              role="img"
              [label]="theme.name"
            ></sj-icon>
          </sj-button>
          } }
          <sj-flex [sj]="{ bg: sj.palette.primary.main, p: 0.1 }"></sj-flex>
          @for (theme of customThemes; track theme.name){ @if (theme.isDark) {
          <sj-button
            [useDensity]="2"
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
            [useDensity]="2"
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
        </sj-flex>
      </sj-flex>
    </sj-paper>
  `,
})
export class ThemeSelectorComponent {
  readonly sj: SjRootApi = sj;
  readonly theme = inject(SjThemeService);
  protected readonly icon = icon;
  protected readonly JSON = JSON;
  breakpoints = computed(() => this.theme.sjTheme().breakpoints);
  currentBp = computed(() => this.theme.currentBreakpoint());
  orderedBps: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'> = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl',
  ];
  fontFamilyDisplay = computed(() => {
    const ff: any = (this.theme.sjTheme().typography as any)?.default?.fontFamily;
    if (!ff) return '';
    // If it's an array, show only the first family as the primary intended font
    let raw = Array.isArray(ff) ? ff[0] : String(ff);
    if (typeof raw !== 'string') raw = String(raw);
    // If it's a comma-separated string, take the first segment
    const first = raw.split(',')[0]?.trim() ?? '';
    // Strip surrounding quotes for display
    return first.replace(/^['"]|['"]$/g, '');
  });

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
