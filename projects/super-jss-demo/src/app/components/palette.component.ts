import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SjDirective,
  sjBorder,
  sjBorderShadow,
  sjCard,
  sjOutlinedCard,
} from 'super-jss';

@Component({
  selector: 'app-palette',
  standalone: true,
  imports: [CommonModule, SjDirective],
  template: `
    <h2 [sj]="{ c: 'primary' }">Palette</h2>

    <div [sj]="sjCard.outlined">
      <div *ngFor="let color of demoColors()">
        <p [sj]="{ c: color[0], fontWeight: 'bold' }">{{ color[0] }}</p>
        <div
          [sj]="{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2
          }"
        >
          <div
            *ngFor="let colorVariant of color"
            [sj]="
              sjCard({
                bg: colorVariant,
                flexGrow: '1',
                justifyContent: 'center',
                py: 1
              })
            "
          >
            <span
              [sj]="{ c: colorVariant === color[3] ? color[0] : color[3] }"
              >{{ colorVariant }}</span
            >
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PaletteComponent {
  demoColors = signal([
    ['primary', 'primary.light', 'primary.dark', 'primary.contrast'],
    ['secondary', 'secondary.light', 'secondary.dark', 'secondary.contrast'],
    ['tertiary', 'tertiary.light', 'tertiary.dark', 'tertiary.contrast'],
    ['success', 'success.light', 'success.dark', 'success.contrast'],
    ['info', 'info.light', 'info.dark', 'info.contrast'],
    ['warning', 'warning.light', 'warning.dark', 'warning.contrast'],
    ['error', 'error.light', 'error.dark', 'error.contrast'],
    ['dark', 'dark.light', 'dark.dark', 'dark.contrast'],
    ['neutral', 'neutral.light', 'neutral.dark', 'neutral.contrast'],
    ['light', 'light.light', 'light.dark', 'light.contrast'],
  ]);

  protected readonly sjBorderShadow = sjBorderShadow;
  protected readonly sjBorder = sjBorder;
  protected readonly sjCard = sjCard;
  protected readonly sjOutlinedCard = sjOutlinedCard;
}
