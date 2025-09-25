import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  SjDirective,
  sjCard,
  SjStyle,
  sjButton,
  SjHostComponent,
  sjBox,
} from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-sidenav',
  imports: [CommonModule, RouterModule, SjDirective, SjHostComponent],
  template: `
    <sj-host [sj]="[sjCard()]">     
      <a routerLink="/typography" [sj]="sjButton.light()">Typography</a>
      <a routerLink="/typography" [sj]="sjButton.light()">Typography</a>
      <a routerLink="/buttons" [sj]="sjButton.light()">Buttons</a>
      <a routerLink="/cards" [sj]="sjButton.light()">Cards</a>
      <a routerLink="/palette" [sj]="sjButton.light()">Palette</a>
      <a routerLink="/theming" [sj]="sjButton.light()">Theming</a>
      <a routerLink="/home" [sj]="sjButton.light()">Home</a>
    </sj-host>
  `,
})
export class SidenavComponent {
  sjCard = sjCard;
  sjButton = sjButton;
  sjBox = sjBox;

  
}
