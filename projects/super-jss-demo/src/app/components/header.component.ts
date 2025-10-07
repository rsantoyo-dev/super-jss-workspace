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
    <sj-paper
      host
      useSurface
      [density]="sj.density.options.default"
      [sj]="[
        sj.bg(sj.palette.primary.main),
        sj.color(sj.palette.primary.contrast),
        sj.fxDir({ xs: sj.fxDir.options.column, sm: sj.fxDir.options.row }),
        sj.flexFlow(sj.flexFlow.options.wrap.wrap),
        sj.borderRadius(0),
        sj.flexDirection({ xs: 'column', md: 'row' }),
        sj.justifyContent({
          xs: sj.justifyContent.options.center,
          md: sj.justifyContent.options.spaceBetween
        }),
        sj.alignItems(sj.alignItems.options.center)
      ]"
    >
      <sj-card
        [variant]="'flat'"
        [sj]="[sj.alignItems({ xs: 'center', md: 'flex-start' })]"
      >
        <sj-typography
          variant="h4"
          [sj]="[sj.color(sj.palette.primary.contrast)]"
        >
          SUPER JSS
        </sj-typography>
        <sj-typography
          [variant]="'small'"
          [sj]="[sj.color(sj.palette.primary.contrast)]"
          >The ultimate solution for dynamic styling</sj-typography
        >
      </sj-card>

      <sj-paper
        variant="flat"
        usePadding
        [density]="sj.density.options.compact"
      >
        <app-theme-selector></app-theme-selector>
      </sj-paper>
    </sj-paper>
  `,
})
export class HeaderComponent {
  @Output() menuClick = new EventEmitter<void>();
  readonly sj: SjRootApi = sj;

  readonly theme = inject(SjThemeService);
}
