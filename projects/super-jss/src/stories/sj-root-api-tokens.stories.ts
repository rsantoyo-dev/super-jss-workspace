import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SjDirective, sj } from 'super-jss';

const meta: Meta = {
  title: 'SJ/sjRootApi + Theming & Tokens',
  decorators: [moduleMetadata({ imports: [SjDirective] })],
  parameters: {
    docs: {
      description: {
        component:
          'Use theme palette tokens and `.options` for discoverable, theme-aware styling. Also shows sj.compose for merging style parts.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const TokensAndOptions: Story = {
  name: 'Tokens & .options',
  render: () => ({
    props: { sj },
    template: `
      <div [sj]="[
        sj.bg(sj.bg.options.primary.main),
        sj.c(sj.c.options.primary.contrast),
        sj.p('12px'),
        sj.brad('8px')
      ]">
        Using palette tokens via .options (primary.main / primary.contrast)
      </div>
    `,
  }),
};

// Compose helper removed: prefer passing an array [ ... ] to [sj]
