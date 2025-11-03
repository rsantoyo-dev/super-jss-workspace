import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjTypographyComponent,
  SjFlexComponent,
  sj,
  SjRootApi,
  SJ_BASE_COMPONENTS_IMPORTS,
  SjThemeService,
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
      @for (v of demoVariants; track v) {
      <sj-paper>
        <sj-flex useCol useGap usePadding>
          <sj-typography variant="h6" [sj]="[]">
            {{ v.toUpperCase() }}-{{ currentBp() }}
          </sj-typography>
          <sj-typography [variant]="v" [sj]="[]">
            {{ sampleFor(v) }}
          </sj-typography>
        </sj-flex>
      </sj-paper>
      }
    </app-section>
  `,
})
export class DemoTypographyComponent {
  readonly sj: SjRootApi = sj;
  readonly theme = inject(SjThemeService);
  breakpoints = computed(() => this.theme.sjTheme().breakpoints);
  currentBp = computed(() => this.theme.currentBreakpoint());

  protected readonly sampleText =
    'The quick brown fox jumps over the lazy dog. ';
  sampleImplement: string =
    '<h3 [sj]="">Implement directive for text handler</h3>';

  readonly demoVariants: (
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'body'
    | 'caption'
    | 'small'
    | 'pre'
  )[] = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'span',
    'body',
    'caption',
    'small',
    'pre',
  ];

  private readonly variantSamples: Record<string, string> = {
    h1: 'Taxing Laughter: The Joke Tax Chronicles',
    h2: 'The People of the Kingdom',
    h3: 'The Joke Tax',
    h4: 'People stopped telling jokes',
    h5: 'A Fortnight of Silence',
    h6: 'A Royal Change of Heart',
    p: 'The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.',
    span: 'Inline span text example',
    body: 'Body content example text for layout and rhythm.',
    caption: 'Caption text for images or notes',
    small: 'Small helper text',
    pre: 'const jokeTax = false; // humor is free',
  };

  sampleFor(v: string): string {
    return this.variantSamples[v] ?? this.sampleText;
  }

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
