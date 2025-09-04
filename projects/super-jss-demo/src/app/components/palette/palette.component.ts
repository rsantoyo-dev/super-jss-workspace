import {Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';

import {SjDirective} from 'super-jss';
import {sjBorder, sjBorderShadow, sjCard, sjOutlinedCard} from "../../sjStyling/sjStyles";

@Component({
    selector: 'app-palette',
    standalone: true,
    imports: [CommonModule, SjDirective], 
    template: `
    <h3 [sj]="{c: 'primary'}">Palette</h3>
    <div [sj]="sjCard()">
      <div *ngFor="let color of demoColors()"
      [sj]="sjOutlinedCard({my:1})"
    >
      <p [sj]="{c:color[0], fontWeight:'bold'}">{{ color[0] }}</p>
      <div [sj]="{display:'flex', flexDirection:{xs:'column', md:'row'}}">
        <div *ngFor="let colorVariant of color" [sj]="[
          {
            display: 'flex',
            flexGrow: '1',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 0.5,
            margin: 0.5,
            backgroundColor: colorVariant
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


