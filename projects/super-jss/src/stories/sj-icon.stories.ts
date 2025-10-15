import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SjIconComponent, SjDirective, sj, icon } from 'super-jss';

const meta: Meta = {
  title: 'SJ/Icon',
  component: SjIconComponent as any,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [SjIconComponent, SjDirective] })],
  parameters: {
    docs: {
      description: {
        component:
          '<sj-icon> renders theme-aware SVG icons. Size is controlled by the host via `size` (px/rem). Colors accept palette tokens or raw CSS.',
      },
    },
  },
  argTypes: {
    name: { control: 'select', options: Object.values(icon) as any },
    size: { control: 'text', table: { type: { summary: 'string | number' } } },
    fill: { control: 'text' },
    stroke: { control: 'text' },
    fillOpacity: { control: { type: 'number', min: 0, max: 1, step: 0.05 } },
    strokeOpacity: { control: { type: 'number', min: 0, max: 1, step: 0.05 } },
    sj: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  args: {
    name: icon.superJson,
    size: '2rem',
    fill: undefined,
    stroke: undefined,
    fillOpacity: undefined,
    strokeOpacity: undefined,
    sj: [sj.c('primary.main')],
  },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <div [sj]="[ sj.d('flex'), sj.fxAItems('center'), sj.gap(0.5) ]">
        <sj-icon [name]="name" [size]="size" [fill]="fill" [stroke]="stroke" [fillOpacity]="fillOpacity" [strokeOpacity]="strokeOpacity" [sj]="sj"></sj-icon>
        <span [sj]="[ sj.c('neutral.dark') ]">{{ name }}</span>
      </div>
    `,
  }),
};

export const AllIcons: Story = {
  render: () => ({
    props: { sj, iconNames: Object.values(icon) },
    template: `
      <div [sj]="[ sj.d('grid'), sj.gridTemplateColumns('repeat(auto-fit, minmax(140px, 1fr))'), sj.gap(0.75) ]">
        <div *ngFor="let n of iconNames" [sj]="[ sj.d('flex'), sj.fxDir('column'), sj.fxAItems('center'), sj.gap(0.25), sj.p(0.5), sj.bg('light.light'), sj.brad(0.5) ]">
          <sj-icon [name]="n" size="2rem"></sj-icon>
          <code [sj]="[ sj.fs('0.8rem'), sj.c('neutral.dark') ]">{{ n }}</code>
        </div>
      </div>
    `,
  }),
};

export const Accessibility: Story = {
  render: () => ({
    props: { sj, icon },
    template: `
      <div [sj]="[ sj.d('flex'), sj.fxDir('column'), sj.gap(1) ]">
        <div>
          <p>This icon is decorative and is hidden from screen readers:</p>
          <sj-icon [name]="icon.sun"></sj-icon>
        </div>
        <div>
          <p>This icon has a label and is announced by screen readers:</p>
          <sj-icon [name]="icon.moon" label="Moon icon"></sj-icon>
        </div>
      </div>
    `,
  }),
};
