import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SJ_BASE_COMPONENTS_IMPORTS, SjTypographyComponent, SjRootApi, sj } from 'super-jss';

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
    <sj-card
      host
      usePadding="default"
      useGap="default"
      [sj]="[sj.h(sj.height.options.auto)]"
    >
      <sj-button
        [variant]="'outlined'"
        routerLink="/home"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
        ><sj-typography [variant]="'span'">Home</sj-typography>
      </sj-button>

      <sj-button
        [variant]="'outlined'"
        routerLink="/typography"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
        ><sj-typography [variant]="'span'">Typography</sj-typography></sj-button
      >
      <sj-button
        [variant]="'outlined'"
        routerLink="/buttons"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
        ><sj-typography [variant]="'span'">Buttons</sj-typography></sj-button
      >
      <sj-button
        [variant]="'outlined'"
        routerLink="/paper"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
        ><sj-typography [variant]="'span'">Paper</sj-typography></sj-button
      >
      <sj-button
        [variant]="'outlined'"
        routerLink="/cards"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
        ><sj-typography [variant]="'span'">Cards</sj-typography></sj-button
      >
      <sj-button
        [variant]="'outlined'"
        routerLink="/palette"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        <sj-typography [variant]="'span'">Palette</sj-typography>
      </sj-button>
      <sj-button
        [variant]="'outlined'"
        routerLink="/theming"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        <sj-typography [variant]="'span'">Theming</sj-typography>
      </sj-button>
    </sj-card>
  `,
})
export class SidenavComponent {
  sj: SjRootApi = sj;
}
