import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjHostComponent,
  SjThemeService,
  SjButtonComponent,
  SJ_BASE_COMPONENTS_IMPORTS,
  SjBoxComponent,
  sj,
  SjRootApi,
} from 'super-jss';
import { ThemeSelectorComponent } from './theme-selector.component';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [
    CommonModule,
    ThemeSelectorComponent,
    ...SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <sj-host
      [sj]="[
        sj.sjCard.primary(),
        sj.fxDir({ xs: sj.fxDir.options.column, sm: sj.fxDir.options.row }),
        sj.borderRadius(0),
        sj.justifyContent({
          xs: sj.justifyContent.options.center,
          sm: sj.justifyContent.options.spaceBetween
        }),
        sj.alignItems(sj.alignItems.options.center),
        sj.position(sj.position.options.relative)
      ]"
    >
      @if (theme.isMobile()) {
      <sj-button
        [sj]="[
          sj.bg(sj.palette.light.light),
          sj.position(sj.position.options.absolute),
          sj.zIndex(2),
          sj.top(0.5),
          sj.left(0.5)
        ]"
        (click)="menuClick.emit()"
      >
        <span [sj]="[sj.c('primary'), sj.lineHeight(0.8)]">☰</span>
      </sj-button>
      }
      <sj-box [sj]="[sj.sjBox.column()]">
        <sj-typography
          variant="h4"
          [sj]="[sj.color(sj.palette.primary.contrast)]"
        >
          SUPER JSS
        </sj-typography>
        <small [sj]="[sj.color(sj.palette.primary.contrast)]"
          >The ultimate solution for dynamic styling</small
        >
        @if (theme.isMobile()) {
        <sj-box [sj]="[sj.marginTop(0.5)]">
          <app-theme-selector></app-theme-selector>
        </sj-box>
        }
      </sj-box>

      <sj-box [sj]="sj.sjBox.row({ fxAItems: 'center' })">
        @if (!theme.isMobile()) {
        <app-theme-selector></app-theme-selector>
        }
      </sj-box>
    </sj-host>
  `,
})
export class HeaderComponent {
  @Output() menuClick = new EventEmitter<void>();
  readonly sj: SjRootApi = sj;
  readonly theme = inject(SjThemeService);
}
