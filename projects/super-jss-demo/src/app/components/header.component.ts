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
    <sj-paper host usePadding [sj]="[ sj.bg('primary.main') ]">
      <sj-flex
        useGap
        [sj]="[
          sj.fxDir({ xs: 'column', md: 'row' }),
          sj.justifyContent({ xs: 'center', md: 'space-between' }),
          sj.alignItems('center')
        ]"
      >
        <sj-flex useCol [sj]="[ sj.alignItems({ xs: 'center', md: 'flex-start' }) ]">
          <sj-typography variant="h4" [sj]="[ sj.c('primary.contrast') ]">
            SUPER JSS
          </sj-typography>
          <sj-typography [variant]="'small'" [sj]="[ sj.c('primary.contrast') ]">
            The ultimate solution for dynamic styling
          </sj-typography>
        </sj-flex>

        <app-theme-selector></app-theme-selector>
      </sj-flex>
    </sj-paper>
  `,
})
export class HeaderComponent {
  @Output() menuClick = new EventEmitter<void>();
  readonly sj: SjRootApi = sj;

  readonly theme = inject(SjThemeService);
}
