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
  SjTypographyComponent,
} from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-sidenav',
  imports: [CommonModule, RouterModule, SjDirective, SjHostComponent, SjTypographyComponent],
  template: `
    <sj-host [sj]="[sjCard()]">
      <a routerLink="/home" [sj]="sjButton.light()"><sj-typography [variant]="'body'">Home</sj-typography></a>     
      <a routerLink="/typography" [sj]="sjButton.light()"><sj-typography [variant]="'body'">Typography</sj-typography></a>
      <a routerLink="/buttons" [sj]="sjButton.light()"><sj-typography [variant]="'body'">Buttons</sj-typography></a>
      <a routerLink="/cards" [sj]="sjButton.light()"><sj-typography [variant]="'body'">Cards</sj-typography></a>
      <a routerLink="/palette" [sj]="sjButton.light()"><sj-typography [variant]="'body'">Palette</sj-typography></a>
      <a routerLink="/theming" [sj]="sjButton.light()"><sj-typography [variant]="'body'">Theming</sj-typography></a>
      
    </sj-host>
  `,
})
export class SidenavComponent {
  sjCard = sjCard;
  sjButton = sjButton;
  sjBox = sjBox;

  
}
