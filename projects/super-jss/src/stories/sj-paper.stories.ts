import type { Meta, StoryObj } from '@storybook/angular';
import { SjInput, SjPaperComponent, sj } from 'super-jss';

const meta: Meta = {
  title: 'SJ/Paper',
  component: SjPaperComponent as any,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'flat', 'outlined', 'filled'],
    },
    component: { control: 'select', options: ['div', 'section', 'article'] },
    usePadding: {
      control: 'select',
      options: [
        'none',
        'compact',
        'default',
        'comfortable',
        'spacious',
        1,
        2,
        3,
        4,
      ],
    },
    useRounded: {
      control: 'select',
      options: [
        'none',
        'compact',
        'default',
        'comfortable',
        'spacious',
        1,
        2,
        3,
        4,
      ],
    },
    playgroundSj: {
      control: 'object',
      description:
        'Use this to pass any style object to the component for live testing. This input always has the final say in styling.',
      table: {
        category: 'Playground',
        type: { summary: 'SjStyle | SjStyle[]' },
      },
    },
    // Colors are set via [sj] (e.g., sj.bg('primary.light'), sj.c('primary.contrast'))
  },
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  args: {
    variant: 'outlined',
    component: 'div',
    usePadding: 'default',
    useRounded: 'default',
    playgroundSj: {} as SjInput | undefined,
  },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-paper
        [variant]="variant"
        [component]="component"
        [usePadding]="usePadding"
        [useRounded]="useRounded"
        [sj]="playgroundSj ?? [ sj.bg('light.light'), sj.c('dark.contrast') ]"
      >
        Paper Playground
      </sj-paper>
    `,
  }),
};

export const Flat: Story = {
  args: { variant: 'flat', usePadding: 'default', useRounded: 'default' },
  render: (args) => ({
    props: { ...args, sj },
    template: `<sj-paper [variant]="variant" [usePadding]="usePadding" [useRounded]="useRounded">Flat paper</sj-paper>`,
  }),
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    usePadding: 'comfortable',
    useRounded: 'comfortable',
  },
  render: (args) => ({
    props: { ...args, sj },
    template: `<sj-paper [variant]="variant" [usePadding]="usePadding" [useRounded]="useRounded">Outlined paper</sj-paper>`,
  }),
};
