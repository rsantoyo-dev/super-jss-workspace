import type { Meta, StoryObj } from '@storybook/angular';
import { SjCardComponent } from '../lib/components/sj-card.component';

const meta: Meta<SjCardComponent> = {
  title: 'SJ/Card',
  component: SjCardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['flat', 'outlined', 'elevated', 'interactive'] },
    usePaint: {
      control: 'select',
      options: ['none', 'auto', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'dark', 'neutral', 'light'],
    },
    usePadding: { control: 'select', options: [undefined, 'none', 1, 2, 3, 4, 'compact', 'default', 'comfortable', 'spacious'] },
    useRounded: { control: 'select', options: [undefined, 'none', 1, 2, 3, 4, 'compact', 'default', 'comfortable', 'spacious'] },
    sj: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<SjCardComponent>;

export const Playground: Story = {
  args: {
    variant: 'flat',
    usePaint: 'none',
  },
  render: (args) => ({
    props: args,
    template: `<sj-card [variant]="variant" [usePaint]="usePaint" [usePadding]="usePadding" [useRounded]="useRounded" [sj]="sj">Card Content</sj-card>`,
  }),
};
