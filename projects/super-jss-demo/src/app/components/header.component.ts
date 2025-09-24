import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjDirective, SjThemeService, sjBox, sjCard, SjHostComponent } from 'super-jss';
import { ThemeSelectorComponent } from './theme-selector.component';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, SjDirective, SjHostComponent, ThemeSelectorComponent],
  template: `
    <sj-host
      [sj]="
       sjCard.primary(sjBox.between({fxDir: {xs:'column', md:'row'}, borderRadius: 0}))
      "
    >
      <div [sj]="sjBox.column({ gap: 0 })">
        <h4 [sj]="{ c: 'primary.contrast', m: 0 }"><strong>SUPER-JSS</strong></h4>
        <small [sj]="{ c: 'primary.contrast' }"
          >The ultimate solution for dynamic styling
        </small>
      </div>

      <div [sj]="sjBox.row({ fxAItems: 'center' })">
        <app-theme-selector></app-theme-selector>
      </div>
    </sj-host>
  `,
})
export class HeaderComponent {
  sjCard = sjCard;
  sjBox = sjBox;
  constructor(public th: SjThemeService) {}
}
