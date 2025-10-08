import type { Meta, StoryObj } from '@storybook/angular';
import { SjCardComponent } from 'super-jss';

// Use untyped Meta/StoryObj to allow "component" input control without TS narrowing issues
const meta: Meta = {
  title: 'SJ/Card',
  component: SjCardComponent as any,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'flat', 'elevated', 'interactive', 'primary', 'secondary', 'info'],
    },
    component: {
      control: 'select',
      options: ['div', 'section', 'article'],
    },
    usePadding: { control: 'boolean' },
    useGap: { control: 'boolean' },
    useRounded: { control: 'boolean' },
    useSurface: { control: 'boolean' },
    density: { control: { type: 'number', min: 1, max: 4, step: 1 } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { variant: 'default', component: 'div', density: 2 },
  render: (args) => ({
    props: args,
    template: `<sj-card [variant]="variant" [component]="component" [density]="density">
      Card content
    </sj-card>`,
  }),
};

export const Outlined: Story = {
  args: { variant: 'outlined', component: 'section', density: 2, usePadding: true },
  render: (args) => ({
    props: args,
    template: `<sj-card [variant]="variant" [component]="component" [density]="density" [usePadding]="usePadding">
      Outlined card content
    </sj-card>`,
  }),
};

export const Elevated: Story = {
  args: { variant: 'elevated', component: 'article', density: 2, usePadding: true },
  render: (args) => ({
    props: args,
    template: `<sj-card [variant]="variant" [component]="component" [density]="density" [usePadding]="usePadding">
      Elevated card content
    </sj-card>`,
  }),
};
