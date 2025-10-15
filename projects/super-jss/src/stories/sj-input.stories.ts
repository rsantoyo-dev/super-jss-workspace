import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SjInputComponent, SjPaperComponent, SjDirective, SjIconComponent, sj, icon } from 'super-jss';

const meta: Meta = {
  title: 'SJ/Input',
  component: SjInputComponent as any,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [SjPaperComponent, SjDirective, SjIconComponent] })],
  argTypes: {
    variant: { control: 'select', options: ['outlined', 'filled', 'flat'] },
    type: { control: 'select', options: ['text', 'email', 'password', 'search', 'number', 'url'] },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    usePadding: {
      control: 'select',
      options: [undefined, 'none', 1, 2, 3, 4, 'compact', 'default', 'comfortable', 'spacious'],
    },
    useRounded: {
      control: 'select',
      options: [undefined, 'none', 1, 2, 3, 4, 'compact', 'default', 'comfortable', 'spacious'],
    },
    usePaint: {
      control: 'select',
      options: ['none', 'auto', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'dark', 'neutral', 'light'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    sj: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  args: {
    variant: 'outlined',
    type: 'text',
    placeholder: 'Your email',
    value: '',
    usePadding: 'default',
    useRounded: 'default',
    usePaint: 'none',
    fullWidth: false,
    disabled: false,
    invalid: false,
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <div style="max-width: 360px;">
        <sj-input
          [variant]="variant"
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          (valueChange)="value = $event"
          [usePadding]="usePadding"
          [useRounded]="useRounded"
          [usePaint]="usePaint"
          [fullWidth]="fullWidth"
          [disabled]="disabled"
          [invalid]="invalid"
        ></sj-input>
      </div>
    `,
  }),
};

export const Variants: Story = {
  args: { placeholder: 'Placeholder' },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <div [sj]="[ sj.d('flex'), sj.fxDir('column'), sj.gap(0.5), sj.w('320px') ]">
        <sj-input variant="outlined" usePadding="default" useRounded="default" [placeholder]="placeholder"></sj-input>
        <sj-input variant="filled" usePaint="primary" usePadding="default" useRounded="default" [placeholder]="placeholder"></sj-input>
        <sj-input variant="flat" [placeholder]="placeholder"></sj-input>
      </div>
    `,
  }),
};

export const WithPrefixSuffix: Story = {
  args: { placeholder: 'Search...' },
  render: (args) => ({
    props: { ...args, sj, icon },
    template: `
      <div style="max-width: 360px;">
        <sj-input variant="outlined" usePadding="default" useRounded="default" [placeholder]="placeholder">
          <sj-icon prefix [name]="icon.superJson" size="1rem" [sj]="[ sj.mr(0.25) ]"></sj-icon>
          <span suffix [sj]="[ sj.c('neutral.dark') ]">&#64;</span>
        </sj-input>
      </div>
    `,
  }),
};
