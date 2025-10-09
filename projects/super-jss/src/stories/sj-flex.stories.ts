import type { Meta, StoryObj } from '@storybook/angular';
import { SjFlexComponent } from 'super-jss';

const meta: Meta = {
  title: 'SJ/Flex',
  component: SjFlexComponent as any,
  tags: ['autodocs'],
  argTypes: {
    component: { control: 'select', options: ['div','section','article','span'] },
  },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  args: { component: 'div' },
  render: (args) => ({
    props: args,
    template: `
      <sj-flex [component]="component">
        <div [sj]="{ p: 0.5, bg: 'primary.light', brad: 0.5, d: 'inline-block', mr: 0.5 }">A</div>
        <div [sj]="{ p: 0.5, bg: 'secondary.light', brad: 0.5, d: 'inline-block', mr: 0.5 }">B</div>
        <div [sj]="{ p: 0.5, bg: 'info.light', brad: 0.5, d: 'inline-block' }">C</div>
      </sj-flex>
    `,
  }),
};
