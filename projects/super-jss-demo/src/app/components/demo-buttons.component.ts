import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SjDirective, SjStyle, sjButton, sjCard } from 'super-jss';

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
  imports: [CommonModule, SjDirective],
  template: `
    <div [sj]="{ d: 'flex', fxJustify: 'space-between', fxAItems: 'center' }">
      <h2 [sj]="{ c: 'primary', mb: 1 }">Buttons</h2>
    </div>
    <div [sj]="sjCard.outlined">
      <div [sj]="sjCard({ bg: 'light.dark' })">
        <span [sj]="{ d: 'block' }">
          Buttons inherit expressive presets for light, outlined, contained,
          and intent-driven looks such as danger. Toggle snippets to view the
          applied styles and copy usage straight into your templates.
        </span>
        <button
          type="button"
          (click)="toggleSnippets()"
          [attr.aria-pressed]="showSnippets"
          [sj]="sjButton.outlined({ px: 1, py: 0.5 })"
        >
          {{ showSnippets ? 'Hide usage & styles' : 'Show usage & styles' }}
        </button>
      </div>

      <div
        [sj]="sjCard({
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(2, 1fr)',
            xl: 'repeat(4, 1fr)'
          }
        })"
      >
        <div
          *ngFor="let button of buttonData"
          [sj]="sjCard.outlined"
        >
          <h6 [sj]="{ c: button.titleColor, m: 0, p:0 }">{{ button.title }}</h6>
          <span [sj]="">{{ button.message }}</span>
          <button type="button" [sj]="button.buttonStyle">
            {{ button.label }}
          </button>
          @if (showSnippets) {
            <section [sj]="{ mt: 1, w: '100%' }">
              <p [sj]="{ mt: 0, mb: 0, fontSize: '0.75rem', fontWeight: 600 }">
                Usage
              </p>
              <pre
                [sj]="sjCard.codeSnippet({ fontSize: '0.7rem', mt: 0.25 })"
              ><code>{{ button.usageExample }}</code></pre>
              <p [sj]="{ mt: 1, mb: 0, fontSize: '0.75rem', fontWeight: 600 }">
                Computed style
              </p>
              <pre
                [sj]="sjCard.codeSnippet({ fontSize: '0.7rem', mt: 0.25 })"
              ><code>{{ button.computedStyle }}</code></pre>
            </section>
          }
        </div>
      </div>
    </div>
  `,
})
export class DemoButtonsComponent {
  protected readonly sjButton = sjButton;
  protected readonly sjCard = sjCard;

  protected showSnippets = false;

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
        usageExample: `<div [sj]="sjButton()"></div>`,
        build: () => sjButton(),
      },
      {
        title: 'sjButton.light()',
        label: 'Light Button',
        message: 'Subtle surface-friendly background with strong text contrast.',
        titleColor: 'primary',
        usageExample: `<div [sj]="sjButton.light()"></div>`,
        build: () => sjButton.light(),
      },
      {
        title: 'sjButton.contained()',
        label: 'Neutral Contained',
        message: 'Neutral tone with shadow for elevated emphasis.',
        titleColor: 'primary',
        usageExample: `<div [sj]="sjButton.contained()"></div>`,
        build: () => sjButton.contained(),
      },
      {
        title: 'sjButton.outlined()',
        label: 'Outlined',
        message: 'Transparent body with a crisp border.',
        titleColor: 'primary',
        usageExample: `<div [sj]="sjButton.outlined()"></div>`,
        build: () => sjButton.outlined(),
      },
      {
        title: 'sjButton.containedPrimary()',
        label: 'Primary Contained',
        message: 'Primary brand color with elevated shadow.',
        titleColor: 'primary',
        usageExample: `<div [sj]="sjButton.containedPrimary()"></div>`,
        build: () => sjButton.containedPrimary(),
      },
      {
        title: 'sjButton.containedSecondary()',
        label: 'Secondary Contained',
        message: 'Secondary palette coloring for complementary actions.',
        titleColor: 'secondary.dark',
        usageExample: `<div [sj]="sjButton.containedSecondary()"></div>`,
        build: () => sjButton.containedSecondary(),
      },
      {
        title: 'sjButton.danger()',
        label: 'Danger Action',
        message: 'Error palette styling for destructive or critical tasks.',
        titleColor: 'error.dark',
        usageExample: `<div [sj]="sjButton.danger()"></div>`,
        build: () => sjButton.danger(),
      },
      {
        title: 'sjButton.containedLight()',
        label: 'Surface Light',
        message: 'Light background with soft accent tone.',
        titleColor: 'primary',
        usageExample: `<div [sj]="sjButton.containedLight()"></div>`,
        build: () => sjButton.containedLight(),
      },
      {
        title: 'sjButton.containedDark()',
        label: 'Dark Hero',
        message: 'High-contrast dark background for hero actions.',
        titleColor: 'primary',
        usageExample: `<div [sj]="sjButton.containedDark()"></div>`,
        build: () => sjButton.containedDark(),
      },
      {
        title: `sjButton.contained({ px: 2, borderRadius: 2 })`,
        label: 'Custom Contained',
        message: 'Overrides demonstrate padding and pill radius tweaks.',
        titleColor: 'primary',
        usageExample: `<div [sj]="sjButton.contained({ px: 2, borderRadius: 2 })"></div>`,
        build: () => sjButton.contained({ px: 2, borderRadius: 2 }),
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
