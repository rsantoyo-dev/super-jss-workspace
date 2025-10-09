import type { Meta, StoryObj } from '@storybook/angular';
import { SjStackComponent } from 'super-jss';

const meta: Meta = {
  title: 'SJ/Stack',
  component: SjStackComponent as any,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['row', 'column'] },
    gap: { control: 'number' },
    justify: { control: 'select', options: ['flex-start','flex-end','center','space-between','space-around','space-evenly'] },
    align: { control: 'select', options: ['flex-start','flex-end','center','stretch','baseline'] },
    wrap: { control: 'select', options: ['nowrap','wrap','wrap-reverse'] },
    inline: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Row: Story = {
  args: { direction: 'row', gap: 1, align: 'center' },
  render: (args) => ({
    props: args,
    template: `
      <sj-stack [direction]="direction" [gap]="gap" [align]="align">
        <div [sj]="{ p: 0.5, bg: 'primary.light', brad: 0.5 }">A</div>
        <div [sj]="{ p: 0.5, bg: 'secondary.light', brad: 0.5 }">B</div>
        <div [sj]="{ p: 0.5, bg: 'info.light', brad: 0.5 }">C</div>
      </sj-stack>
    `,
  }),
};

export const Column: Story = {
  args: { direction: 'column', gap: 0.5 },
  render: (args) => ({
    props: args,
    template: `
      <sj-stack [direction]="direction" [gap]="gap">
        <div [sj]="{ p: 0.5, bg: 'primary.light', brad: 0.5 }">1</div>
        <div [sj]="{ p: 0.5, bg: 'secondary.light', brad: 0.5 }">2</div>
        <div [sj]="{ p: 0.5, bg: 'info.light', brad: 0.5 }">3</div>
      </sj-stack>
    `,
  }),
};

