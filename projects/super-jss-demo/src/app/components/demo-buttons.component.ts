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
      <sj-card [variant]="sj.sjCard.variants.info">
        <sj-typography variant="span">
          Buttons inherit expressive presets for light, outlined, contained, and
          intent-driven looks such as danger. Toggle snippets to view the
          applied styles and copy usage straight into your templates.
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
      </sj-card>

      <sj-card
        [sj]="[
          sj.d(sj.d.options.grid),
          sj.gridTemplateColumns('repeat(auto-fit, minmax(360px, 1fr))')
        ]"
      >
        <sj-card *ngFor="let button of buttonData" [sj]="sj.sjCard.outlined()">
          <sj-typography
            variant="h6"
            [sj]="{ c: button.titleColor, m: 0, p: 0 }"
            >{{ button.title }}</sj-typography
          >
          <sj-typography variant="span" [sj]="[]">{{
            button.message
          }}</sj-typography>
          <sj-button type="button" [sj]="button.buttonStyle">{{
            button.label
          }}</sj-button>
          @if (showSnippets) {
          <section [sj]="{ mt: 1, w: '320px' }">
            <sj-typography
              variant="p"
              [sj]="[
                sj.mt(0),
                sj.mb(0),
                sj.fontSize('0.75rem'),
                sj.fontWeight(600)
              ]"
              >Usage</sj-typography
            >
            <sj-typography
              variant="pre"
              [sj]="
                sj.sjCard.codeSnippet({
                  fontSize: '0.7rem',
                  mt: 0.25
                })
              "
              ><code>{{ button.usageExample }}</code></sj-typography
            >
            <sj-typography
              variant="p"
              [sj]="[
                sj.mt(1),
                sj.mb(0),
                sj.fontSize('0.75rem'),
                sj.fontWeight(600)
              ]"
              >Computed style</sj-typography
            >
            <sj-typography
              variant="pre"
              [sj]="
                sj.sjCard.codeSnippet({
                  fontSize: '0.7rem',
                  mt: 0.25
                })
              "
              ><code>{{ button.computedStyle }}</code></sj-typography
            >
          </section>
          }
        </sj-card>
      </sj-card>
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
        usageExample: `<sj-button [sj]="sj.button()">Click me</sj-button>`,
        build: () => sj.button(),
      },
      {
        title: 'sjButton.light()',
        label: 'Light Button',
        message:
          'Subtle surface-friendly background with strong text contrast.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.button.light()">Light</sj-button>`,
        build: () => sj.button.light(),
      },
      {
        title: 'sjButton.contained()',
        label: 'Neutral Contained',
        message: 'Neutral tone with shadow for elevated emphasis.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.button.contained()">Neutral</sj-button>`,
        build: () => sj.button.contained(),
      },
      {
        title: 'sjButton.outlined()',
        label: 'Outlined',
        message: 'Transparent body with a crisp border.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.button.outlined()">Outlined</sj-button>`,
        build: () => sj.button.outlined(),
      },
      {
        title: 'sjButton.containedPrimary()',
        label: 'Primary Contained',
        message: 'Primary brand color with elevated shadow.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.button.containedPrimary()">Primary</sj-button>`,
        build: () => sj.button.containedPrimary(),
      },
      {
        title: 'sjButton.containedSecondary()',
        label: 'Secondary Contained',
        message: 'Secondary palette coloring for complementary actions.',
        titleColor: 'secondary.dark',
        usageExample: `<sj-button [sj]="sj.button.containedSecondary()">Secondary</sj-button>`,
        build: () => sj.button.containedSecondary(),
      },
      {
        title: 'sjButton.danger()',
        label: 'Danger Action',
        message: 'Error palette styling for destructive or critical tasks.',
        titleColor: 'error.dark',
        usageExample: `<sj-button [sj]="sj.button.danger()">Delete</sj-button>`,
        build: () => sj.button.danger(),
      },
      {
        title: 'sjButton.containedLight()',
        label: 'Surface Light',
        message: 'Light background with soft accent tone.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.button.containedLight()">Light</sj-button>`,
        build: () => sj.button.containedLight(),
      },
      {
        title: 'sjButton.containedDark()',
        label: 'Dark Hero',
        message: 'High-contrast dark background for hero actions.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.button.containedDark()">Dark</sj-button>`,
        build: () => sj.button.containedDark(),
      },
      {
        title: `sjButton.contained({ px: 2, borderRadius: 2 })`,
        label: 'Custom Contained',
        message: 'Overrides demonstrate padding and pill radius tweaks.',
        titleColor: 'primary',
        usageExample: `<sj-button [sj]="sj.button.contained({ px: 2, borderRadius: 2 })">Custom</sj-button>`,
        build: () => sj.button.contained({ px: 2, borderRadius: 2 }),
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
