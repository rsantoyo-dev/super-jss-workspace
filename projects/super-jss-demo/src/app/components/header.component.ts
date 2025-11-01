import { Component, EventEmitter, Output, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjHostComponent,
  SjThemeService,
  SjButtonComponent,
  SJ_BASE_COMPONENTS_IMPORTS,
  sj,
  SjRootApi,
} from 'super-jss';
import { icon } from 'super-jss';
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
      usePadding
      [sj]="[
        { background: 'linear-gradient(180deg, #273555 0%, #0F172A 50%, #050911 100%)' }
      ]"
    >
      <sj-flex
        useGap
        usePadding
        [sj]="[
          sj.fxDir({ xs: 'column', md: 'row' }),
          sj.justifyContent({ xs: 'center', md: 'space-between' }),
          sj.alignItems('center')
        ]"
      >
        <sj-flex
          useCol
          [sj]="[sj.alignItems({ xs: 'center', md: 'flex-start' })]"
        >
          <!-- Mobile burger (xs only) -->
          <sj-button
            variant="flat"
            (click)="menuClick.emit()"
            [sj]="[
              sj.d({
                xs: showMobileMenu ? 'none' : 'inline-flex',
                sm: showMobileMenu ? 'none' : 'inline-flex',
                md: 'none'
              }),
              sj.position('fixed'),
              sj.top('12px'),
              sj.left('12px'),
              sj.zIndex(1100),
              sj.bg('transparent'),
              sj.c('primary.contrast')
            ]"
            >☰</sj-button
          >
          <a
            href="https://sjss.dev"
            target="_blank"
            rel="noreferrer"
            [sj]="[
              sj.d('inline-flex'),
              sj.fxAItems('center'),
              sj.gap(0.5),
              sj.textDecoration('none'),
              sj.c('primary.contrast'),
              sj.cursor('pointer'),
              { '&:hover': { scale: '1.1' } }
            ]"
          >
            <sj-icon
              [name]="icon.superJson"
              size="3.5rem"
              fill="'light'"
              [ariaHidden]="false"
              role="img"
              [sj]="[sj.c('primary.contrast')]"
            ></sj-icon>
            <sj-typography variant="h4"> SUPER JSS </sj-typography>
          </a>
          <sj-typography [variant]="'small'" [sj]="[sj.c('primary.contrast')]">
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
  @Input() showMobileMenu = false;
  readonly sj: SjRootApi = sj;
  readonly icon = icon;

  readonly theme = inject(SjThemeService);
}
