import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SjDirective } from 'super-jss';

const meta: Meta = {
  title: 'SJ/[sj] Basic + Shortcuts',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [SjDirective] })],
  parameters: {
    docs: {
      description: {
        component:
          'Popular shorthand keys for common CSS: p, px, py, m, mx, my, brad, bg, c, w, h, d, fxDir, fxJustify, fxAItems, gap.\n' +
          'Shorthands are authoring sugar — the generator outputs full CSS behind the scenes. These examples still use plain CSS values (no theming).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ShorthandsSimple: Story = {
  name: 'Shorthands (simple object)',
  render: () => ({
    template: `
      <div [sj]="{ bg: '#036', c: '#fff', p: '12px', brad: '8px' }">
        bg:#036, c:#fff, p:12px, brad:8px
      </div>
    `,
  }),
};

export const SpacingAxes: Story = {
  name: 'Spacing axes (px/py/m)',
  render: () => ({
    template: `
      <div [sj]="{ px: '16px', py: '8px', m: '4px', bg: '#f7f7f7', brad: '6px' }">
        px:16px, py:8px, m:4px
      </div>
    `,
  }),
};

export const ResponsiveShorthands: Story = {
  name: 'Responsive shorthands',
  render: () => ({
    template: `
      <div [sj]="{
        p: { xs: '8px', md: '16px' },
        brad: { xs: '4px', md: '8px' },
        bg: '#f7f7f7'
      }">
        p: xs 8px → md 16px, brad: xs 4px → md 8px
      </div>
    `,
  }),
};

export const QuickLayout: Story = {
  name: 'Quick layout (d/flex + fx*)',
  render: () => ({
    template: `
      <div [sj]="{ d: 'flex', fxDir: 'row', fxJustify: 'space-between', fxAItems: 'center', gap: '8px', bg: '#f0f0f0', p: '8px', brad: '6px' }">
        <div [sj]="{ bg: '#ccc', p: '4px', brad: '4px' }">A</div>
        <div [sj]="{ bg: '#ccc', p: '4px', brad: '4px' }">B</div>
        <div [sj]="{ bg: '#ccc', p: '4px', brad: '4px' }">C</div>
      </div>
    `,
  }),
};
