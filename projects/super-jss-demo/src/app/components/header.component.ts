import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjDirective, SjThemeService, SjHostComponent, sj } from 'super-jss';
import { ThemeSelectorComponent } from './theme-selector.component';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, SjDirective, SjHostComponent, ThemeSelectorComponent],
  template: `
    <sj-host
      [sj]="[
        sj.blueprints.sjCard.primary,
        sj.flex.direction({ xs: 'column', sm: 'row' }),
        sj.css.borderRadius(0),
        sj.css.justifyContent('space-between'),
        sj.css.alignItems('center')
      ]"
    >
      <div [sj]="[sj.blueprints.sjBox.column(), sj.css.gap(0)]">
        <h4
          [sj]="[sj.css.color(sj.palette.primary.contrast), sj.css.padding(0)]"
        >
          <strong>SUPER-JSS</strong>
        </h4>
        <small [sj]="[sj.css.color(sj.palette.primary.contrast)]"
          >The ultimate solution for dynamic styling
        </small>
      </div>

      <div [sj]="sj.blueprints.sjBox.row({ fxAItems: 'center' })">
        <app-theme-selector></app-theme-selector>
      </div>
    </sj-host>
  `,
})
export class HeaderComponent {
  sj = sj;
}
