import type { Meta, StoryObj } from '@storybook/angular';
import { SjCardComponent } from '../lib/components/sj-card.component';

const meta: Meta<SjCardComponent> = {
  title: 'SJ/Card',
  component: SjCardComponent,
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

export const InteractiveAccessibility: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem;">
        <a href="#" style="text-decoration: none; color: inherit;">
          <sj-card variant="interactive" usePadding="default" useRounded="default">
            <h3>Navigational Card</h3>
            <p>This card is wrapped in an anchor tag and navigates on click.</p>
          </sj-card>
        </a>
        <sj-card variant="interactive" usePadding="default" useRounded="default" role="button" tabindex="0" (click)="onClick()">
          <h3>Action Card</h3>
          <p>This card has a role of "button" and a click handler.</p>
        </sj-card>
      </div>
    `,
    props: {
      onClick: () => alert('Card clicked!'),
    },
  }),
};
