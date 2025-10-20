import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { SjDirective } from 'super-jss';
import type { SjStyle } from 'super-jss';

@Component({
  standalone: true,
  selector: 'story-sj-basic-class',
  imports: [SjDirective],
  template: ` <div [sj]="box">bound to class property typed as SjStyle</div> `,
})
class SjBasicClassExampleComponent {
  box: SjStyle = {
    padding: '20px',
    backgroundColor: '#eeeeee',
    borderRadius: '8px',
  };
}

@Component({
  standalone: true,
  selector: 'story-sj-basic-array',
  imports: [SjDirective],
  template: `
    <div [sj]="styles">
      bound to class property typed as SjStyle[] (merged left→right)
    </div>
  `,
})
class SjBasicArrayExampleComponent {
  styles: SjStyle[] = [
    { padding: '12px' },
    { backgroundColor: '#f7f7f7' },
    { borderRadius: '6px' },
  ];
}

const meta: Meta = {
  title: 'SJ/[sj] Basic',
  decorators: [
    moduleMetadata({
      imports: [
        SjDirective,
        SjBasicClassExampleComponent,
        SjBasicArrayExampleComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          '[sj] is a lightweight Angular directive that lets you author styles as plain JavaScript objects directly in your templates.\n\nKey ideas:\n- Use camelCase CSS properties (e.g., padding, backgroundColor).\n- Values can be raw CSS (px, rem, hex) or theme tokens — start with raw CSS here.\n- Inline or class property: bind a literal object, or a component field typed as `SjStyle` or `SjStyle[]`.\n- You can pass a single object, an array of objects (merged left→right), or responsive objects like { xs, sm, md, ... }.\n- The library generates tiny atomic CSS classes at runtime; no global CSS needed.\n\nThese first examples avoid theming to show the most basic form.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Padding: Story = {
  name: 'Padding (simple object)',
  render: () => ({
    props: {},
    template: `
      <div [sj]="{ padding: '24px', backgroundColor: '#f7f7f7', borderRadius: '8px' }">
        div with padding: 24px (plain CSS units)
      </div>
    `,
  }),
};

export const ResponsivePadding: Story = {
  name: 'Padding (responsive object)',
  render: () => ({
    props: {},
    template: `
      <div [sj]="{
        padding: { xs: '16px', sm: '24px', md: '32px' },
        backgroundColor: '#f7f7f7',
        borderRadius: '8px'
      }">
        div with responsive padding: xs=16px, sm=24px, md=32px
      </div>
    `,
  }),
};

export const ClassPropertySjStyle: Story = {
  name: 'Class property (SjStyle)',
  render: () => ({ props: {}, template: `<story-sj-basic-class></story-sj-basic-class>` }),
  parameters: { docs: { disable: true } },
};

export const ClassPropertySjStyleArray: Story = {
  name: 'Class property (SjStyle[])',
  render: () => ({ props: {}, template: `<story-sj-basic-array></story-sj-basic-array>` }),
  parameters: { docs: { disable: true } },
};
