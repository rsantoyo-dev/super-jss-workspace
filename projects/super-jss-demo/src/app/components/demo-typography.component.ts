import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjTypographyComponent,
  SjFlexComponent,
  sj,
  SjRootApi,
  SJ_BASE_COMPONENTS_IMPORTS,
} from 'super-jss';
import { SectionContainerComponent } from './section-container.component';

@Component({
  selector: 'demo-typography',
  standalone: true,
  imports: [
    CommonModule,
    SectionContainerComponent,
    SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <app-section title="Typography">
      <sj-paper usePadding="compact" useRounded [usePaint]="'info'">
        <sj-typography variant="p"
          >SJSS typography is seamlessly integrated with your theme. Styles for
          HTML elements like h1, p, and span are defined in your active theme
          and automatically applied. You can easily override these default
          styles using the [sj] directive for fine-grained
          control.</sj-typography
        >
      </sj-paper>
      <sj-typography
        useWeight="bold"
        variant="h6"
        [sj]="sj.pt(sj.padding.options.default)"
      >
        sj-typography -> variant('variant')
      </sj-typography>
      <sj-paper
        usePadding
        [usePaint]="'light'"
        [sj]="{
          d: 'flex',
          fxWrap: { xs: 'wrap', md: 'nowrap' },
          overflowX: { xs: 'hidden', md: 'auto' },
          overflowY: 'hidden',
          whiteSpace: { xs: 'normal', md: 'nowrap' },
          gap: 2,
          w: '100%',
          maxW: '100%',
          boxSizing: 'border-box'
        }"
      >
        <div
          [sj]="{
            d: 'grid',
            gridTemplateColumns: { xs: '3rem auto', md: '6rem auto' },
            alignItems: 'baseline',
            minW: { xs: 0, md: 'max-content' },
            gap: 2
          }"
        >
          <sj-typography
            variant="small"
            [sj]="{ w: { xs: '3rem', md: '8rem' } }"
            >H1</sj-typography
          >
          <sj-typography variant="h1">{{ sampleText }}</sj-typography>
        </div>
        <div
          [sj]="{
            d: 'grid',
            gridTemplateColumns: { xs: '3rem auto', md: '6rem auto' },
            alignItems: 'baseline',
            minW: { xs: 0, md: 'max-content' },
            gap: 2
          }"
        >
          <sj-typography
            variant="small"
            [sj]="{ w: { xs: '3rem', md: '8rem' } }"
            >H2</sj-typography
          >
          <sj-typography variant="h2">{{ sampleText }}</sj-typography>
        </div>
        <div
          [sj]="{
            d: 'grid',
            gridTemplateColumns: { xs: '3rem auto', md: '6rem auto' },
            alignItems: 'baseline',
            minW: { xs: 0, md: 'max-content' },
            gap: 2
          }"
        >
          <sj-typography
            variant="small"
            [sj]="{ w: { xs: '3rem', md: '8rem' } }"
            >H3</sj-typography
          >
          <sj-typography variant="h3">{{ sampleText }}</sj-typography>
        </div>
        <div
          [sj]="{
            d: 'grid',
            gridTemplateColumns: { xs: '3rem auto', md: '6rem auto' },
            alignItems: 'baseline',
            minW: { xs: 0, md: 'max-content' },
            gap: 2
          }"
        >
          <sj-typography
            variant="small"
            [sj]="{ w: { xs: '3rem', md: '8rem' } }"
            >H4</sj-typography
          >
          <sj-typography variant="h4">{{ sampleText }}</sj-typography>
        </div>
        <div
          [sj]="{
            d: 'grid',
            gridTemplateColumns: { xs: '3rem auto', md: '6rem auto' },
            alignItems: 'baseline',
            minW: { xs: 0, md: 'max-content' },
            gap: 2
          }"
        >
          <sj-typography
            variant="small"
            [sj]="{ w: { xs: '3rem', md: '8rem' } }"
            >H5</sj-typography
          >
          <sj-typography variant="h5">{{ sampleText }}</sj-typography>
        </div>
        <div
          [sj]="{
            d: 'grid',
            gridTemplateColumns: { xs: '3rem auto', md: '6rem auto' },
            alignItems: 'baseline',
            minW: { xs: 0, md: 'max-content' },
            gap: 2
          }"
        >
          <sj-typography
            variant="small"
            [sj]="{ w: { xs: '3rem', md: '8rem' } }"
            >H6</sj-typography
          >
          <sj-typography variant="h6">{{ sampleText }}</sj-typography>
        </div>
        <div
          [sj]="{
            d: 'grid',
            gridTemplateColumns: { xs: '3rem auto', md: '6rem auto' },
            alignItems: 'baseline',
            minW: 'max-content',
            gap: 2
          }"
        >
          <sj-typography
            variant="small"
            [sj]="{ w: { xs: '3rem', md: '8rem' } }"
            >P</sj-typography
          >
          <sj-typography variant="p">{{ sampleText }}</sj-typography>
        </div>
        <div
          [sj]="{
            d: 'grid',
            gridTemplateColumns: { xs: '3rem auto', md: '6rem auto' },
            alignItems: 'baseline',
            minW: 'max-content',
            gap: 2
          }"
        >
          <sj-typography
            variant="small"
            [sj]="{ w: { xs: '3rem', md: '8rem' } }"
            >Small</sj-typography
          >
          <sj-typography variant="small">{{ sampleText }}</sj-typography>
        </div>
      </sj-paper>
      <sj-typography
        useWeight="bold"
        variant="h6"
        [sj]="sj.pt(sj.padding.options.default)"
      >
        sj-typography -> useWeight('weight')
      </sj-typography>
      <sj-paper
        usePadding
        [usePaint]="'light'"
        [sj]="{
          d: 'flex',
          fxWrap: { xs: 'wrap', md: 'nowrap' },
          overflowX: { xs: 'hidden', md: 'auto' },
          overflowY: 'hidden',
          whiteSpace: { xs: 'normal', md: 'nowrap' },
          gap: 2,
          w: '100%',
          maxW: '100%',
          boxSizing: 'border-box'
        }"
      >
        @for (weight of weights; track weight) {
        <div
          [sj]="{
            d: 'grid',
            gridTemplateColumns: { xs: '6rem auto', md: '6rem auto' },
            alignItems: 'baseline',
            minW: { xs: 0, md: 'max-content' },
            gap: 2
          }"
        >
          <sj-typography
            variant="small"
            [sj]="{ w: { xs: '6rem', md: '10rem' } }"
            >{{ weight }}</sj-typography
          >
          <sj-typography variant="p" [useWeight]="weight">{{
            sampleText
          }}</sj-typography>
        </div>
        }
      </sj-paper>
    </app-section>
  `,
})
export class DemoTypographyComponent {
  readonly sj: SjRootApi = sj;
  protected readonly sampleText =
    'The quick brown fox jumps over the lazy dog. ';
  sampleImplement: string =
    '<h3 [sj]="">Implement directive for text handler</h3>';

  // Narrowly typed list so Angular template infers the literal union
  readonly weights: (
    | 'default'
    | 'thin'
    | 'extraLight'
    | 'light'
    | 'regular'
    | 'medium'
    | 'semiBold'
    | 'bold'
    | 'extraBold'
    | 'black'
  )[] = [
    'default',
    'thin',
    'extraLight',
    'light',
    'regular',
    'medium',
    'semiBold',
    'bold',
    'extraBold',
    'black',
  ];
}
