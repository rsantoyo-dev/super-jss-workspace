import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjDirective, sjBorderShadow, sjCard } from 'super-jss';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [CommonModule, SjDirective],
  template: `
    <div [sj]="{ d: 'flex', fxDir: 'column', w: '100%' }">
      <div [sj]="{ d: 'flex', fxJustify: 'space-between', fxAItems: 'center' }">
        <h2 [sj]="{ c: 'primary', mb: 1 }">Typography</h2>
      </div>

      <div [sj]="[sjCard.outlined, { fxDir: 'column' }]">
        <div [sj]="sjCard.flat({ display: 'block', bg: 'light.dark', mb: 2 })">
          SJSS typography is seamlessly integrated with your theme. Styles for
          HTML elements like <strong>h1</strong>, <strong>p</strong>, and
          <strong>span</strong> are defined in your active theme and
          automatically applied. You can easily override these default styles
          using the <strong>[sj]</strong> directive for fine-grained control.
          <pre
            [sj]="{ m: 0, mt: 1, p: 1, bg: 'light.light', brad: 0.5 }"
          ><code>{{ this.sampleImplement }}</code></pre>
          <a
          href="https://sjss.dev/typography/"
          target="_blank"
          rel="noopener"
          [sj]="sjCard.interactive({width:5, bg: 'primary.main', p: 0.5, px: 1, my:1})"
          >Docs
        </a> 
        </div>
        <h1 [sj]="{ c: 'primary' }">H1: {{ sampleText }}</h1> 
        <h2 [sj]="{ c: 'secondary' }">H2: {{ sampleText }}</h2>
        <h3 [sj]="{ c: 'tertiary' }">H3: {{ sampleText }}</h3>
        <h4 [sj]>H4: {{ sampleText }}</h4>
        <h5 [sj]>H5: {{ sampleText }}</h5>
        <h6 [sj]>H6: {{ sampleText }}</h6>
        <p [sj]>P: {{ sampleText }}{{ sampleText }}{{ sampleText }}</p>
        <span [sj]>SPAN: {{ sampleText }}{{ sampleText }}{{ sampleText }}</span>
        <strong [sj]
          >STRONG: {{ sampleText }}{{ sampleText }}{{ sampleText }}</strong
        >
        <body [sj]>
          BODY: {{ sampleText }}{{ sampleText }}{{ sampleText }}
        </body>
        <caption [sj]>
          CAPTION:
          {{
            sampleText
          }}
        </caption>
        <small [sj]> SMALL: {{ sampleText }} </small>
      </div>
    </div>
  `,
})
export class TypographyComponent {
  protected readonly sjBorderShadow = sjBorderShadow;
  protected readonly sjCard = sjCard;

  protected readonly sampleText =
    'The quick brown fox jumps over the lazy dog. ';
  sampleImplement: string =
    '<h3 [sj]="">Implement directive for text handler</h3>';
}
