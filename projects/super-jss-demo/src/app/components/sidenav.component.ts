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
        useGap="default"
        usePadding="default"
        useFullWidth
        [sj]="sj.py(sj.padding.options.compact)"
      >
        @for (item of menu; track item.route) {
        <sj-button
          [useDensity]="2"
          [useFullWidth]="true"
          useRounded="compact"
          [variant]="'flat'"
          [usePaint]="'primary'"
          [routerLink]="item.route"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="navigate.emit()"
        >
          <sj-typography [variant]="'small'" [sj]="sj.c('inherit')">
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
    { label: 'Palette', route: '/palette' },
    { label: 'Colors', route: '/colors' },
    { label: 'Typography', route: '/typography' },
    { label: 'Spacing', route: '/spacing' },
    { label: 'Padding', route: '/padding' },
    { label: 'Theming', route: '/theming' },
    { label: 'Paper', route: '/paper' },
    { label: 'Buttons', route: '/buttons' },
    { label: 'Inputs', route: '/inputs' },
    { label: 'Cards', route: '/cards' },
  ];
  @Output() navigate = new EventEmitter<void>();
}
