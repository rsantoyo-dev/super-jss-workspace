import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SjDirective,
  SjStyle,
  SjCardComponent,
  SjButtonComponent,
  sj,
  SJ_BASE_COMPONENTS_IMPORTS,
  SjRootApi,
} from 'super-jss';
import { SectionContainerComponent } from './section-container.component';

interface DemoButton {
  title: string;
  message: string;
  titleColor: string;
  label: string;
  buttonStyle: SjStyle;
  usageExample: string;
  computedStyle: string;
}

@Component({
  selector: 'app-demo-buttons',
  standalone: true,
  imports: [
    CommonModule,
    SectionContainerComponent,
    SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <app-section title="Buttons">
      <!-- Header content lives inside SectionContainer's outlined card -->
      <sj-typography variant="span">
        Buttons inherit expressive presets for light, outlined, contained, and
        intent-driven looks. Toggle to view applied styles and copy usage into
        your templates.
      </sj-typography>
      <sj-button
        type="button"
        (click)="toggleSnippets()"
        [attr.aria-pressed]="showSnippets"
        [variant]="sj.sjButton.variants.outlined"
        [sj]="{ px: 1, py: 0.5 }"
      >
        {{ showSnippets ? 'Hide usage & styles' : 'Show usage & styles' }}
      </sj-button>

      <!-- Responsive grid of examples -->
      <div
        [sj]="[
          sj.d(sj.d.options.grid),
          sj.gridTemplateColumns('repeat(auto-fit, minmax(360px, 1fr))'),
          sj.gap({ xs: 0.5, md: 1 }),
          sj.mt(0)
        ]"
      >
        <sj-card *ngFor="let button of buttonData" [sj]="sj.sjCard.outlined()">
          <sj-typography
            variant="h6"
            [sj]="{ c: button.titleColor, m: 0, p: 0 }"
          >
            {{ button.title }}
          </sj-typography>
          <sj-typography variant="span">
            {{ button.message }}
          </sj-typography>
          <sj-button type="button" [sj]="button.buttonStyle">
            {{ button.label }}
          </sj-button>
          @if (showSnippets) {
          <section
            [sj]="[
              sj.d('flex'),
              sj.flexDirection('column'),
              sj.gap(1),
              sj.mt(1)
            ]"
          >
            <sj-typography variant="small">Usage</sj-typography>
            <sj-typography
              variant="pre"
              [sj]="sj.sjCard.codeSnippet({ fontSize: '0.7rem', mt: 0.25 })"
            >
              <code>{{ button.usageExample }}</code>
            </sj-typography>
            <sj-typography variant="small">Computed style</sj-typography>
            <sj-typography
              variant="pre"
              [sj]="sj.sjCard.codeSnippet({ fontSize: '0.7rem', mt: 0.25 })"
            >
              <code>{{ button.computedStyle }}</code>
            </sj-typography>
          </section>
          }
        </sj-card>
      </div>
    </app-section>
  `,
})
export class DemoButtonsComponent {
  readonly sj: SjRootApi = sj;
  protected showSnippets = false;

  // Short alias for templates: use sj.* (e.g., [sj]="[sj.fontSize('1rem')]")

  protected readonly buttonData: DemoButton[] = this.buildButtonData();

  protected toggleSnippets(): void {
    this.showSnippets = !this.showSnippets;
  }

  private buildButtonData(): DemoButton[] {
    const buttons = [
      {
        title: 'sjButton()',
        label: 'Primary Action',
        message: 'Default contained button with primary coloring.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.sjButton()">Click me</sj-button>`,
        build: () => sj.sjButton(),
      },
      {
        title: 'sjButton.light()',
        label: 'Light Button',
        message:
          'Subtle surface-friendly background with strong text contrast.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.sjButton.light()">Light</sj-button>`,
        build: () => sj.sjButton.light(),
      },
      {
        title: 'sjButton.contained()',
        label: 'Neutral Contained',
        message: 'Neutral tone with shadow for elevated emphasis.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.sjButton.contained()">Neutral</sj-button>`,
        build: () => sj.sjButton.contained(),
      },
      {
        title: 'sjButton.outlined()',
        label: 'Outlined',
        message: 'Transparent body with a crisp border.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.sjButton.outlined()">Outlined</sj-button>`,
        build: () => sj.sjButton.outlined(),
      },
      {
        title: 'sjButton.containedPrimary()',
        label: 'Primary Contained',
        message: 'Primary brand color with elevated shadow.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.sjButton.containedPrimary()">Primary</sj-button>`,
        build: () => sj.sjButton.containedPrimary(),
      },
      {
        title: 'sjButton.containedSecondary()',
        label: 'Secondary Contained',
        message: 'Secondary palette coloring for complementary actions.',
        titleColor: 'secondary.dark',
        usageExample: `<sj-button [sj]="sj.sjButton.containedSecondary()">Secondary</sj-button>`,
        build: () => sj.sjButton.containedSecondary(),
      },
      {
        title: 'sjButton.danger()',
        label: 'Danger Action',
        message: 'Error palette styling for destructive or critical tasks.',
        titleColor: 'error.dark',
        usageExample: `<sj-button [sj]="sj.sjButton.danger()">Delete</sj-button>`,
        build: () => sj.sjButton.danger(),
      },
      {
        title: 'sjButton.containedLight()',
        label: 'Surface Light',
        message: 'Light background with soft accent tone.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.sjButton.containedLight()">Light</sj-button>`,
        build: () => sj.sjButton.containedLight(),
      },
      {
        title: 'sjButton.containedDark()',
        label: 'Dark Hero',
        message: 'High-contrast dark background for hero actions.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.sjButton.containedDark()">Dark</sj-button>`,
        build: () => sj.sjButton.containedDark(),
      },
      {
        title: `sjButton.contained({ px: 2, borderRadius: 2 })`,
        label: 'Custom Contained',
        message: 'Overrides demonstrate padding and pill radius tweaks.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.sjButton.contained({ px: 2, borderRadius: 2 })">Custom</sj-button>`,
        build: () => sj.sjButton.contained({ px: 2, borderRadius: 2 }),
      },
    ];

    return buttons.map(({ build, ...button }) => {
      const buttonStyle = build();
      return {
        ...button,
        buttonStyle,
        computedStyle: this.stringifyStyle(buttonStyle),
      };
    });
  }

  private stringifyStyle(style: SjStyle): string {
    return JSON.stringify(style, null, 2);
  }
}
