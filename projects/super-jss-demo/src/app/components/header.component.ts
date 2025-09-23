import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjStyle,
  SjThemeService,
  sjButton,
  sjCard,
} from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, SjDirective],
  template: `
    <div [sj]="style.header">
      <div [sj]="style.brand">
        <h1 [sj]="{c:'primary.contrast'}">SUPER-JSS</h1>
        <span [sj]="{c:'primary.contrast'}">The ultimate solution for dynamic styling</span>
      </div>

      
    </div>
  `,
})
export class HeaderComponent {
  readonly style: Record<string, SjStyle> = {
    header: sjCard.primary({
      borderRadius:0,
      fxDir: { xs: 'column', lg: 'row' },
      fxJustify: 'space-between',
      fxAItems: 'center',
    }),
    brand: { d: 'flex', fxDir: 'column', fxAItems: { xs: 'center', lg: 'flex-start' } } as SjStyle,
  };

  constructor(public th: SjThemeService) {}
}
