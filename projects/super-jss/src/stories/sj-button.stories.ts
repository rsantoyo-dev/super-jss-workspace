import type { Meta, StoryObj } from '@storybook/angular';
import { SjButtonComponent } from 'super-jss';

const meta: Meta<SjButtonComponent> = {
  title: 'SJ/Button',
  component: SjButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'flat', 'contained', 'light', 'danger', 'containedPrimary'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'dark', 'neutral', 'light'],
    },
    density: { control: { type: 'number', min: 1, max: 4, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<SjButtonComponent>;

export const Filled: Story = {
  args: { variant: 'filled', color: 'primary', density: 2 },
  render: (args) => ({
    props: args,
    template: `<sj-button [variant]="variant" [color]="color" [density]="density">Click me</sj-button>`,
  }),
};

export const Outlined: Story = {
  args: { variant: 'outlined', color: 'secondary', density: 2 },
  render: (args) => ({
    props: args,
    template: `<sj-button [variant]="variant" [color]="color" [density]="density">Outlined</sj-button>`,
  }),
};

export const Flat: Story = {
  args: { variant: 'flat', color: 'primary', density: 2 },
  render: (args) => ({
    props: args,
    template: `<sj-button [variant]="variant" [color]="color" [density]="density">Flat</sj-button>`,
  }),
};

