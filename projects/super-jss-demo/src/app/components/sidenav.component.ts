import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  SjDirective,
  sjCard,
  SjStyle,
  sjButton,
  SjHostComponent,
} from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-sidenav',
  imports: [CommonModule, RouterModule, SjDirective, SjHostComponent],
  template: `
    <sj-host [sj]="sjCard({ width: '100%', height: '100%', bg: 'light', p:0 })">
      <a routerLink="/typography" [sj]="style.navAnchor">Typography</a>
      <a routerLink="/buttons" [sj]="style.navAnchor">Buttons</a>
      <a routerLink="/cards" [sj]="style.navAnchor">Cards</a>
      <a routerLink="/palette" [sj]="style.navAnchor">Palette</a>
      <a routerLink="/theming" [sj]="style.navAnchor">Theming</a>
      <a routerLink="/home" [sj]="style.navAnchor">Home</a>
    </sj-host>
  `,
})
export class SidenavComponent {
  sjCard = sjCard;
  sjButton = sjButton;
  readonly style: Record<string, SjStyle> = {
    navAnchor: {
      ...sjButton(),
    },
  };
}
