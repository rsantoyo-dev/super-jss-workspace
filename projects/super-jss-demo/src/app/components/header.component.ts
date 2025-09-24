import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjStyle,
  SjThemeService,
  sjBox,
  sjCard,
} from 'super-jss';
import { SjHostComponent } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, SjDirective, SjHostComponent],
  template: `
    <sj-host [sj]="sjCard.primary({ borderRadius: 0, gap:0 })">
      <div [sj]="sjBox.column">
        <h4 [sj]="{ c: 'primary.contrast' }">SUPER-JSS</h4>
        <small [sj]="{ c: 'primary.contrast' }"
          >The ultimate solution for dynamic styling
        </small>
      </div>
    </sj-host>
  `,
})
export class HeaderComponent {
  sjCard = sjCard;
  sjBox = sjBox;
  constructor(public th: SjThemeService) {}
}
