import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithSj, SjDirective } from 'super-jss';
import { SectionContainerComponent } from './section-container.component';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [CommonModule, SectionContainerComponent, SjDirective],
  template: `
    <app-section title="Typography">
      <div [sj]="[sj.css.display('flex'), sj.flex.direction({xs: 'column'})]">
        <div [sj]="[ sj.blueprints.sjCard.flat(), sj.sh.d('block') ]">
          SJSS typography is seamlessly integrated with your theme. Styles for
          HTML elements like <strong>h1</strong>, <strong>p</strong>, and
          <strong>span</strong> are defined in your active theme and
          automatically applied. You can easily override these default styles
          using the <strong>[sj]</strong> directive for fine-grained control.
          <pre [sj]="{ m: 0, mt: 1, p: 1, bg: 'light.light', brad: 0.5 }"><code>{{ this.sampleImplement }}</code></pre>
          
        </div>
        <a
            href="https://sjss.dev/typography/"
            target="_blank"
            rel="noopener"
            [sj]="[sj.blueprints.sjButton.containedPrimary(), sj.css.width(sj.tokens.sizing.width.fitContent)]"
          >Docs</a>

        <h1 [sj]="{ c: sj.tokens.palette.primary.main }">H1: {{ sampleText }}</h1>
        <h2 [sj]="{ c: sj.tokens.palette.secondary.main }">H2: {{ sampleText }}</h2>
        <h3 [sj]="{ c: sj.tokens.palette.tertiary.main }">H3: {{ sampleText }}</h3>
        <h4 [sj]>H4: {{ sampleText }}</h4>
        <h5 [sj]>H5: {{ sampleText }}</h5>
        <h6 [sj]>H6: {{ sampleText }}</h6>
        <p [sj]>P: {{ sampleText }}{{ sampleText }}{{ sampleText }}</p>
        <span [sj]>SPAN: {{ sampleText }}{{ sampleText }}{{ sampleText }}</span>
        <strong [sj]>STRONG: {{ sampleText }}{{ sampleText }}{{ sampleText }}</strong>
        <body [sj]>BODY: {{ sampleText }}{{ sampleText }}{{ sampleText }}</body>
        <caption [sj]>CAPTION: {{ sampleText }}</caption>
        <small [sj]>SMALL: {{ sampleText }} </small>
      </div>
    </app-section>
  `,
})
export class TypographyComponent extends WithSj {
  protected readonly sampleText =
    'The quick brown fox jumps over the lazy dog. ';
  sampleImplement: string =
    '<h3 [sj]="">Implement directive for text handler</h3>';
}
