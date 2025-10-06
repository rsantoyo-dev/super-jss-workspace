import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SjDirective, SJ_BASE_COMPONENTS_IMPORTS, SjTypographyComponent, SjRootApi, sj } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-sidenav',
  imports: [CommonModule, RouterModule, SjDirective, SjTypographyComponent, ...SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-paper usePadding [density]="sj.density.options.default" [sj]="[sj.h('100%')]">
      <a routerLink="/home" [sj]="sj.sjButton.light()"
        ><sj-typography [variant]="'span'">Home</sj-typography></a
      >
      <a routerLink="/typography" [sj]="sj.sjButton.light()"
        ><sj-typography [variant]="'span'">Typography</sj-typography></a
      >
      <a routerLink="/buttons" [sj]="sj.sjButton.light()"
        ><sj-typography [variant]="'span'">Buttons</sj-typography></a
      >
      <a routerLink="/cards" [sj]="sj.sjButton.light()"
        ><sj-typography [variant]="'span'">Cards</sj-typography></a
      >
      <a routerLink="/palette" [sj]="sj.sjButton.light()"
        ><sj-typography [variant]="'span'">Palette</sj-typography></a
      >
      <a routerLink="/theming" [sj]="sj.sjButton.light()"
        ><sj-typography [variant]="'span'">Theming</sj-typography></a
      >
    </sj-paper>
  `,
})
export class SidenavComponent {
  sj: SjRootApi = sj;
}
