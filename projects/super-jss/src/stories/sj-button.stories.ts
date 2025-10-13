import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SjButtonComponent, SjDirective, sj } from 'super-jss';

const meta: Meta = {
  title: 'SJ/Button',
  component: SjButtonComponent as any,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [SjDirective] })],
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'flat'] },
    useDensity: { control: { type: 'number', min: 1, max: 4, step: 1 } },
    useFullWidth: { control: 'boolean' },
    useRounded: { control: 'select', options: [1, 2, 3, 4, 'compact', 'default', 'comfortable', 'spacious', 'none'] },
    usePaint: { control: 'select', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'dark', 'neutral', 'light', 'auto', 'none'] },
    sj: {
      control: 'object',
      table: { type: { summary: 'SjStyle | SjStyle[]' } },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  args: {
    variant: 'filled',
    useDensity: 2,
    useFullWidth: false,
    useRounded: 2,
    usePaint: 'auto',
    sj: undefined,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 20rem">
        <sj-button
          [variant]="variant"
          [useDensity]="useDensity"
          [useFullWidth]="useFullWidth"
          [useRounded]="useRounded"
          [usePaint]="usePaint"
          [sj]="sj"
        >
          Button Playground
        </sj-button>
      </div>
    `,
  }),
};

export const Filled: Story = {
  args: { variant: 'filled', useDensity: 2 },
  render: (args) => ({
    props: args,
    template: `<sj-button [variant]="variant" [useDensity]="useDensity">Click me</sj-button>`,
  }),
};

export const Outlined: Story = {
  args: { variant: 'outlined', useDensity: 2 },
  render: (args) => ({
    props: args,
    template: `<sj-button [variant]="variant" [useDensity]="useDensity">Outlined</sj-button>`,
  }),
};

export const Flat: Story = {
  args: { variant: 'flat', useDensity: 2 },
  render: (args) => ({
    props: args,
    template: `<sj-button [variant]="variant" [useDensity]="useDensity">Flat</sj-button>`,
  }),
};
