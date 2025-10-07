import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjTypographyComponent,
  SjBoxComponent,
  sj,
  SjRootApi,
  SJ_BASE_COMPONENTS_IMPORTS,
} from 'super-jss';
import { SectionContainerComponent } from './section-container.component';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [
    CommonModule,
    SectionContainerComponent,
    SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <app-section title="Typography">
      <sj-paper host variant="outlined" [sj]="[sj.p(0)]">
        <sj-typography variant="p"
          >SJSS typography is seamlessly integrated with your theme. Styles for
          HTML elements like h1, p, and span are defined in your active theme
          and automatically applied. You can easily override these default
          styles using the [sj] directive for fine-grained
          control.</sj-typography
        >
        <sj-typography
          variant="pre"
          [sj]="{ m: 0, mt: 1, p: 1, bg: 'light.light', brad: 0.5 }"
          ><code>{{ this.sampleImplement }}</code></sj-typography
        >
        <a
          href="https://sjss.dev/typography/"
          target="_blank"
          rel="noopener"
          [sj]="[sj.sjButton.containedPrimary(), sj.width('fit-content')]"
          >Docs</a
        >
        <sj-typography variant="h1" [sj]="{ c: sj.palette.primary.main }"
          >H1: {{ sampleText }}</sj-typography
        >
        <sj-typography variant="h2" [sj]="{ c: sj.palette.secondary.main }"
          >H2: {{ sampleText }}</sj-typography
        >
        <sj-typography variant="h3" [sj]="{ c: sj.palette.tertiary.main }"
          >H3: {{ sampleText }}</sj-typography
        >
        <sj-typography variant="h4" [sj]>H4: {{ sampleText }}</sj-typography>
        <sj-typography variant="h5" [sj]>H5: {{ sampleText }}</sj-typography>
        <sj-typography variant="h6" [sj]>H6: {{ sampleText }}</sj-typography>
        <sj-typography variant="p" [sj]
          >P: {{ sampleText }}{{ sampleText }}{{ sampleText }}</sj-typography
        >
        <sj-typography variant="span" [sj]
          >SPAN: {{ sampleText }}{{ sampleText }}{{ sampleText }}</sj-typography
        >
        <sj-typography variant="strong" [sj]
          >STRONG: {{ sampleText }}{{ sampleText
          }}{{ sampleText }}</sj-typography
        >
        <sj-typography variant="body" [sj]
          >BODY: {{ sampleText }}{{ sampleText }}{{ sampleText }}</sj-typography
        >
        <sj-typography variant="caption" [sj]
          >CAPTION: {{ sampleText }}</sj-typography
        >
        <sj-typography variant="small" [sj]
          >SMALL: {{ sampleText }}
        </sj-typography>
      </sj-paper>
    </app-section>
  `,
})
export class TypographyComponent {
  readonly sj: SjRootApi = sj;
  protected readonly sampleText =
    'The quick brown fox jumps over the lazy dog. ';
  sampleImplement: string =
    '<h3 [sj]="">Implement directive for text handler</h3>';
}
