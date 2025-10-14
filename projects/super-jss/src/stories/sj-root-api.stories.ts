import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SjDirective, sj } from 'super-jss';

const meta: Meta = {
  title: 'SJ/sjRootApi Basic',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [SjDirective] })],
  parameters: {
    docs: {
      description: {
        component:
          'The `sj` root API exposes every CSS property as a typed function and a small set of curated shorthands.\n' +
          'Use it inline for great IDE autocomplete in Angular templates. These basic examples use plain CSS values (no theming).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const PropsAndShorthands: Story = {
  name: 'Properties & shorthands (inline array)',
  render: () => ({
    props: { sj },
    template: `
      <div [sj]="[ sj.padding('16px'), sj.backgroundColor('#f7f7f7'), sj.color('#333'), sj.brad('8px') ]">
        padding:16px, bg:#f7f7f7, color:#333, radius:8px
      </div>
    `,
  }),
};

export const ResponsiveLonghand: Story = {
  name: 'Responsive (longhand CSS functions)',
  render: () => ({
    props: { sj },
    template: `
      <div [sj]="[ sj.padding({ xs: '8px', md: '16px' }), sj.backgroundColor('#eee'), sj.brad('8px') ]">
        padding: xs 8px → md 16px (sj.padding responsive object)
      </div>
    `,
  }),
};

export const MixingFunctionsAndObjects: Story = {
  name: 'Mixing sj.* and literal objects',
  render: () => ({
    props: { sj },
    template: `
      <div [sj]="[ sj.padding('12px'), { backgroundColor: 'red', marginTop: '2px', borderRadius: '6px', color: '#fff' } ]">
        [sj] can take an array mixing sj.* helpers and plain objects
      </div>
    `,
  }),
};

// Theming/tokens and compose examples live in: sj-root-api-tokens.stories.ts
