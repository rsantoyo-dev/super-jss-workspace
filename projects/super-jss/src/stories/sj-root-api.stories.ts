import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SjDirective, sj } from 'super-jss';
// @ts-ignore MDX component provided by Storybook bundler
import DocsPage from './sj-root-api.mdx';

const meta: Meta = {
  title: 'SJ/sjRootApi',
  decorators: [moduleMetadata({ imports: [SjDirective] })],
  parameters: {
    docs: {
      page: DocsPage,
      description: {
        component:
          'The `sj` root API exposes every CSS property as a typed function. Using `sj.*` in templates provides IDE autocomplete for properties and token values, and supports responsive objects.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const PaddingSimple: Story = {
  name: 'Padding (sj.padding — very easy)',
  render: () => ({
    props: { sj },
    template: `
      <div [sj]="[ sj.padding('16px') ]">
        Start simple: sj.padding('16px') — sj.* helpers are typed for IDE autocomplete
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div [sj]="[ sj.padding('16px') ]">\n  Start simple: sj.padding('16px') — sj.* helpers are typed for IDE autocomplete\n</div>`
      }
    }
  }
};
