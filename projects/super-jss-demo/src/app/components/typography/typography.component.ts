import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjDirective } from 'super-jss';
import { sjBorderShadow, sjCard } from '../../sjStyling/sjStyles';

@Component({
  selector: 'app-typography',
  imports: [CommonModule, SjDirective],
  template: `
    <div [sj]="{ d: 'flex', fxDir: 'column', w: '100%' }">
      <h3 [sj]="{ c: 'primary'}">Typography:</h3>
      <div [sj]="[sjCard(), { fxDir: 'column' }]" >
        <h1 [sj]="{ c: 'primary' }">H1: {{ sampleText }}</h1>
        <h2 [sj]="{ c: 'secondary' }">H2: {{ sampleText }}</h2>
        <h3 [sj]="{ c: 'tertiary' }">H3: {{ sampleText }}</h3>
        <h4 [sj]>H4: {{ sampleText }}</h4>
        <h5 [sj]>H5: {{ sampleText }}</h5>
        <h6 [sj]>H6: {{ sampleText }}</h6>
        <p [sj]>P: {{ sampleText }}{{ sampleText }}{{ sampleText }}</p>
        <span [sj]>SPAN: {{ sampleText }}{{ sampleText }}{{ sampleText }}</span>
        <strong [sj]>STRONG: {{ sampleText }}{{ sampleText }}{{ sampleText }}</strong>
        <body [sj]>
          BODY: {{ sampleText }}{{ sampleText }}{{ sampleText }}
        </body>
        <caption [sj]>
          CAPTION: {{ sampleText }}
        </caption>
        <small [sj]>
          SMALL: {{ sampleText }}
        </small>
      </div>
    </div>
  `,
})
export class TypographyComponent {
  protected readonly sjBorderShadow = sjBorderShadow;
  protected readonly sjCard = sjCard;
  protected readonly sampleText = 'The quick brown fox jumps over the lazy dog. ';
}
