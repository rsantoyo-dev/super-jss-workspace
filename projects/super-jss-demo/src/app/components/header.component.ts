import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjThemeService,
  SjHostComponent,
  WithSj,
  SjButtonComponent,
  SJ_BASE_COMPONENTS_IMPORTS,
  SjBoxComponent,
} from 'super-jss';
import { ThemeSelectorComponent } from './theme-selector.component';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, ThemeSelectorComponent, SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-host
      [sj]="[
        sj.blueprints.sjCard.primary,
        sj.flex.direction({ xs: 'column', sm: 'row' }),
        sj.css.borderRadius(0),
        sj.css.justifyContent({
          xs: sj.tokens.flex.justify.center,
          sm: sj.tokens.flex.justify.between
        }),
        sj.css.alignItems('center'),
        sj.css.position('relative')
      ]"
    >
      @if (isMobile()) {
      <sj-button
        [sj]="[
          sj.sh.bg(sj.palette.light.light),
          sj.css.position('absolute'),
          sj.css.zIndex(2),
          sj.css.top(0.5),
          sj.css.left(0.5)
        ]"
        (click)="menuClick.emit()"
      >
        <span [sj]="[sj.sh.c('primary'), sj.css.lineHeight(0.8)]">☰</span>
      </sj-button>
      }
      <sj-box [sj]="[sj.blueprints.sjBox.column()]">
        <sj-typography
          variant="h4"
          [sj]="[sj.css.color(sj.tokens.palette.primary.contrast)]"
        >
          SUPER JSS
        </sj-typography>
        <small [sj]="[sj.css.color(sj.tokens.palette.primary.contrast)]"
          >The ultimate solution for dynamic styling</small
        >
        @if (isMobile()) {
        <sj-box [sj]="[sj.css.marginTop(0.5)]">
          <app-theme-selector></app-theme-selector>
        </sj-box>
        }
      </sj-box>

      <sj-box [sj]="sj.blueprints.sjBox.row({ fxAItems: 'center' })">
        @if (!isMobile()) {
        <app-theme-selector></app-theme-selector>
        }
      </sj-box>
    </sj-host>
  `,
})
export class HeaderComponent extends WithSj {
  @Output() menuClick = new EventEmitter<void>();
}
