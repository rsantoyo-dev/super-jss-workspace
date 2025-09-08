import {Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';

import {SjDirective, sjBorder, sjBorderShadow, sjCard, sjOutlinedCard} from 'super-jss';

@Component({
    selector: 'app-palette',
    standalone: true,
    imports: [CommonModule, SjDirective], 
    template: `
    <h3 [sj]="{c: 'primary'}">Palette</h3>
    <div [sj]="sjCard({ d: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr' }, gap: 1 })">
      <div *ngFor="let color of demoColors()"
      [sj]="sjCard.outlined({ p: 1 })"
    >
      <p [sj]="{ c: color[0], fontWeight: 'bold', textTransform: 'capitalize', mb: 0.5 }">{{ color[0] }}</p>
      <div [sj]="{ d: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, minmax(0, 1fr))' }, gap: 0.5 }">
        <div *ngFor="let colorVariant of color" [sj]="[
          {
            d: 'grid',
            placeItems: 'center',
            minHeight: '56px',
            p: 0.5,
            bg: colorVariant
          }, sjBorder]"
        >
          <span [sj]="{c: colorVariant === color[3] ? color[0] : color[3]}">{{ colorVariant }}</span>

        </div>
      </div>

    </div>
    </div>
    
  `
})
export class PaletteComponent {


  demoColors = signal([
    ['primary','primary.light', 'primary.dark', 'primary.contrast'],
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

