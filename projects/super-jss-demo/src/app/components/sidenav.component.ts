import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  SJ_BASE_COMPONENTS_IMPORTS,
  SjTypographyComponent,
  SjRootApi,
  sj,
} from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-sidenav',
  imports: [
    CommonModule,
    RouterModule,
    SjTypographyComponent,
    ...SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <sj-paper
      host
      usePadding="compact"
      [sj]="[sj.h(sj.height.options.auto), sj.backgroundColor('light.light')]"
    >
      <sj-flex
        useCol
        useGap="compact"
        usePadding="compact"
        useFullWidth
        [sj]="sj.py(sj.padding.options.compact)"
      >
        @for (item of menu; track item.route) {
        <sj-button
          [useDensity]="1"
          [useFullWidth]="true"
          [variant]="'default'"
          [usePaint]="'primary'"
          [routerLink]="item.route"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="navigate.emit()"
        >
          <sj-typography [variant]="'span'" [sj]="sj.c('inherit')">
            {{ item.label }}
          </sj-typography>
        </sj-button>
        }
      </sj-flex>
    </sj-paper>
  `,
})
export class SidenavComponent {
  sj: SjRootApi = sj;
  menu = [
    { label: 'Home', route: '/home' },
    { label: 'Typography', route: '/typography' },
    { label: 'Spacing', route: '/spacing' },
    { label: 'Padding', route: '/padding' },
    { label: 'Palette', route: '/palette' },
    { label: 'Buttons', route: '/buttons' },
    { label: 'Inputs', route: '/inputs' },
    { label: 'Paper', route: '/paper' },
    { label: 'Cards', route: '/cards' },
    { label: 'Theming', route: '/theming' },
  ];
  @Output() navigate = new EventEmitter<void>();
}
