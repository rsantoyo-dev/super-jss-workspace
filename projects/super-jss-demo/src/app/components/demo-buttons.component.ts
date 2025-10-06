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
import { DemoItemComponent } from './demo-item.component';

interface DemoButton {
  title: string;
  message: string;
  titleColor: string;
  label: string;
  variant: string;
  overrides?: SjStyle;
  usageExample: string;
}

@Component({
  selector: 'app-demo-buttons',
  standalone: true,
  imports: [CommonModule, SectionContainerComponent, SJ_BASE_COMPONENTS_IMPORTS, DemoItemComponent],
  template: `
    <app-section title="Buttons">
      <!-- Header content lives inside SectionContainer's outlined card -->
      <sj-typography variant="span">
        Buttons inherit expressive presets for light, outlined, contained, and
        intent-driven looks. Toggle to view applied styles and copy usage into
        your templates.
      </sj-typography>
      <!-- Responsive grid of examples -->
      <div
        [sj]="[
          sj.d(sj.d.options.grid),
          sj.gridTemplateColumns('repeat(auto-fit, minmax(360px, 1fr))'),
          sj.gap({ xs: 0.5, md: 1 }),
          sj.mt(0)
        ]"
      >
        @for (button of buttonData; track button.title) {
          <app-demo-item [title]="button.title" [titleColor]="button.titleColor" [code]="button.usageExample">
            <sj-typography variant="span">{{ button.message }}</sj-typography>
            <sj-button type="button" [variant]="$any(button.variant)" [sj]="button.overrides">{{ button.label }}</sj-button>
          </app-demo-item>
        }
      </div>
    </app-section>
  `,
})
export class DemoButtonsComponent {
  readonly sj: SjRootApi = sj;

  protected readonly buttonData: DemoButton[] = this.buildButtonData();

  private buildButtonData(): DemoButton[] {
    const items: DemoButton[] = [
      {
        title: '<sj-button>',
        label: 'Primary Action',
        message: 'Default contained button with primary coloring.',
        titleColor: 'primary',
        variant: 'default',
        usageExample: `<sj-button>Click me</sj-button>`,
      },
      {
        title: '<sj-button variant="light">',
        label: 'Light Button',
        message: 'Subtle surface-friendly background with strong text contrast.',
        titleColor: 'primary',
        variant: 'light',
        usageExample: `<sj-button variant="light">Light</sj-button>`,
      },
      {
        title: '<sj-button variant="contained">',
        label: 'Neutral Contained',
        message: 'Neutral tone with shadow for elevated emphasis.',
        titleColor: 'primary',
        variant: 'contained',
        usageExample: `<sj-button variant="contained">Neutral</sj-button>`,
      },
      {
        title: '<sj-button variant="outlined">',
        label: 'Outlined',
        message: 'Transparent body with a crisp border.',
        titleColor: 'primary',
        variant: 'outlined',
        usageExample: `<sj-button variant="outlined">Outlined</sj-button>`,
      },
      {
        title: '<sj-button variant="containedPrimary">',
        label: 'Primary Contained',
        message: 'Primary brand color with elevated shadow.',
        titleColor: 'primary',
        variant: 'containedPrimary',
        usageExample: `<sj-button variant="containedPrimary">Primary</sj-button>`,
      },
      {
        title: '<sj-button variant="containedSecondary">',
        label: 'Secondary Contained',
        message: 'Secondary palette coloring for complementary actions.',
        titleColor: 'secondary.dark',
        variant: 'containedSecondary',
        usageExample: `<sj-button variant="containedSecondary">Secondary</sj-button>`,
      },
      {
        title: '<sj-button variant="danger">',
        label: 'Danger Action',
        message: 'Error palette styling for destructive tasks.',
        titleColor: 'error.dark',
        variant: 'danger',
        usageExample: `<sj-button variant="danger">Delete</sj-button>`,
      },
      {
        title: '<sj-button variant="containedLight">',
        label: 'Surface Light',
        message: 'Light background with soft accent tone.',
        titleColor: 'primary',
        variant: 'containedLight',
        usageExample: `<sj-button variant="containedLight">Light</sj-button>`,
      },
      {
        title: '<sj-button variant="containedDark">',
        label: 'Dark Hero',
        message: 'High-contrast dark background for hero actions.',
        titleColor: 'primary',
        variant: 'containedDark',
        usageExample: `<sj-button variant="containedDark">Dark</sj-button>`,
      },
      {
        title: '<sj-button variant="contained" [sj]="{ px: 2, borderRadius: 2 }">',
        label: 'Custom Contained',
        message: 'Padding and pill radius tweaks.',
        titleColor: 'primary',
        variant: 'contained',
        overrides: { px: 2, borderRadius: 2 } as any,
        usageExample: `<sj-button variant="contained" [sj]="{ px: 2, borderRadius: 2 }">Custom</sj-button>`,
      },
    ];
    return items;
  }
}
