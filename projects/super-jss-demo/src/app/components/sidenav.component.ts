import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SjDirective, sjCard, SjStyle, sjButton } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-sidenav',
  imports: [CommonModule, RouterModule, SjDirective],
  template: `
    <div [sj]="sjCard({ width: 10, heiight:'100%'})">
      <a routerLink="/typography" [sj]="style.navAnchor">Typography</a>
      <a routerLink="/buttons" [sj]="style.navAnchor">Buttons</a>
      <a routerLink="/cards" [sj]="style.navAnchor">Cards</a>
      <a routerLink="/palette" [sj]="style.navAnchor">Palette</a>
      <a routerLink="/theming" [sj]="style.navAnchor">Theming</a>
      <a routerLink="/home" [sj]="style.navAnchor">Home</a>
    </div>
  `,
})
export class SidenavComponent {
  sjCard = sjCard
  readonly style: Record<string, SjStyle> = {
    
    navAnchor: {
      ...sjButton({w:'auto'}),
     
    },
  };
}
