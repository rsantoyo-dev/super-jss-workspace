import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjDirective, SjTheme, SjThemeService, defaultDarkTheme, defaultTheme, desertDarkTheme, desertTheme, oceanDarkTheme, oceanTheme, sjButton, sjCard, SjHostComponent, sjBox, SjIconComponent, icon, SjCardComponent, sj } from 'super-jss';
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
  imports: [CommonModule, SjHostComponent, SjDirective, SjIconComponent, SjCardComponent],
  template: `
    <sj-host [sj]="sj.blueprints.sjCard.flat({ p: 0, fxDir: 'row' })">
      <sj-card [sj]="sj.blueprints.sjCard.flat({ gap: 0.1, bg: 'primary.dark' })">
        <small [sj]="{ c: 'primary.contrast' }">{{ previewLabel() }}</small>

      
        <sj-card [variant]="'flat'" [sj]="[sj.flex.direction('row'), sj.css.gap(0.1)]">
          @for (theme of libraryThemes; track theme.name){

          @if (theme.isDark) {
          <button
            [sj]="sj.blueprints.sjButton({ bg: theme.theme.palette?.primary?.dark })"
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
          </button>

          } @else {
          <button
            [sj]="sj.blueprints.sjButton({ bg: theme.theme.palette?.primary?.light })"
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
          </button>
          } }
          <div [sj]="sj.blueprints.sjCard({ bg: 'primary', p: 0.1 })"></div>
          @for (theme of customThemes; track theme.name){ @if (theme.isDark) {
          <button
            [sj]="sj.blueprints.sjButton({ bg: theme.theme.palette?.primary?.dark })"
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
          </button>

          } @else {
          <button
            [sj]="sj.blueprints.sjButton({ bg: theme.theme.palette?.primary?.light })"
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
          </button>
          } }
        </sj-card>
      </sj-card>
     
    </sj-host>
  `,
})
export class ThemeSelectorComponent {

  sj = sj
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
  private hoveredTheme = signal<string | null>(null);
  previewLabel = computed(() => {
    const hovered = this.hoveredTheme();
    const current = this.currentThemeName();
    const target = hovered ?? current;
    const source = this.themes.find((t) => t.name === target);
    const prefix = source?.type === 'Custom' ? 'customized theme' : 'sjss-theme';

     return `${prefix}: ${target}`;
  });

  constructor(public th: SjThemeService) {}

  onHover(name: string): void {
    this.hoveredTheme.set(name);
  }

  onHoverEnd(): void {
    this.hoveredTheme.set(null);
  }

  onSelect(theme: ThemeMeta): void {
    this.th.setTheme(theme.theme);
    this.hoveredTheme.set(null);
  }
}
