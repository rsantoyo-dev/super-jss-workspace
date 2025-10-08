import type { Meta, StoryObj } from '@storybook/angular';
import { SjPaperComponent } from 'super-jss';

// Use untyped Meta/StoryObj to allow "component" input control without TS narrowing issues
const meta: Meta = {
  title: 'SJ/Paper',
  component: SjPaperComponent as any,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'flat', 'outlined', 'filled'] },
    component: { control: 'select', options: ['div', 'section', 'article'] },
    usePadding: { control: 'boolean' },
    useGap: { control: 'boolean' },
    useRounded: { control: 'boolean' },
    useSurface: { control: 'boolean' },
    density: { control: { type: 'number', min: 1, max: 4, step: 1 } },
  },
};

export default meta;
type Story = StoryObj;

export const Flat: Story = {
  args: { variant: 'flat', component: 'div', density: 2, usePadding: true },
  render: (args) => ({
    props: args,
    template: `<sj-paper [variant]="variant" [component]="component" [density]="density" [usePadding]="usePadding">Flat paper</sj-paper>`,
  }),
};

export const Outlined: Story = {
  args: { variant: 'outlined', component: 'section', density: 2, usePadding: true },
  render: (args) => ({
    props: args,
    template: `<sj-paper [variant]="variant" [component]="component" [density]="density" [usePadding]="usePadding">Outlined paper</sj-paper>`,
  }),
};

export const Filled: Story = {
  args: { variant: 'filled', component: 'article', density: 2, usePadding: true },
  render: (args) => ({
    props: args,
    template: `<sj-paper [variant]="variant" [component]="component" [density]="density" [usePadding]="usePadding">Filled paper</sj-paper>`,
  }),
};
