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
    <sj-card
      host
      [sj]="[
        sj.h(sj.height.options.auto),

        sj.backgroundColor(sj.backgroundColor.options.light.light)
      ]"
    >
      <sj-flex useCol useGap usePadding>
        <sj-button
          [useFullWidth]="true"
          [variant]="'outlined'"
          routerLink="/home"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="navigate.emit()"
          ><sj-typography [variant]="'span'">Home</sj-typography>
        </sj-button>

        <sj-button
          [useFullWidth]="true"
          [variant]="'outlined'"
          routerLink="/typography"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="navigate.emit()"
          ><sj-typography [variant]="'span'"
            >Typography</sj-typography
          ></sj-button
        >
        <sj-button
          [useFullWidth]="true"
          [variant]="'outlined'"
          routerLink="/buttons"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="navigate.emit()"
          ><sj-typography [variant]="'span'">Buttons</sj-typography></sj-button
        >
        <sj-button
          [useFullWidth]="true"
          [variant]="'outlined'"
          routerLink="/inputs"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="navigate.emit()"
          ><sj-typography [variant]="'span'">Inputs</sj-typography></sj-button
        >
        <sj-button
          [useFullWidth]="true"
          [variant]="'outlined'"
          routerLink="/paper"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="navigate.emit()"
          ><sj-typography [variant]="'span'">Paper</sj-typography></sj-button
        >
        <sj-button
          [useFullWidth]="true"
          [variant]="'outlined'"
          routerLink="/cards"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="navigate.emit()"
          ><sj-typography [variant]="'span'">Cards</sj-typography></sj-button
        >
        <sj-button
          [useFullWidth]="true"
          [variant]="'outlined'"
          [variant]="'flat'"
          [variant]="'outlined'"
          routerLink="/palette"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="navigate.emit()"
        >
          <sj-typography [variant]="'span'">Palette</sj-typography>
        </sj-button>
        <sj-button
          [useFullWidth]="true"
          [variant]="'outlined'"
          routerLink="/theming"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="navigate.emit()"
        >
          <sj-typography [variant]="'span'">Theming</sj-typography>
        </sj-button>

        <sj-button
          [useFullWidth]="true"
          [variant]="'outlined'"
          routerLink="/element-options"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="navigate.emit()"
        >
          <sj-typography [variant]="'span'">Element Options</sj-typography>
        </sj-button>

        <sj-button
          [useFullWidth]="true"
          [variant]="'outlined'"
          routerLink="/perf"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          (click)="navigate.emit()"
        >
          <sj-typography [variant]="'span'">Performance</sj-typography>
        </sj-button>
      </sj-flex>
    </sj-card>
  `,
})
export class SidenavComponent {
  sj: SjRootApi = sj;
  @Output() navigate = new EventEmitter<void>();
}
