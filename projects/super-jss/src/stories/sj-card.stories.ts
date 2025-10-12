import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SjCardComponent, SjDirective, sj } from 'super-jss';
import type { SjInput } from 'super-jss';

const meta: Meta = {
  title: 'SJ/Card',
  component: SjCardComponent as any,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [SjDirective] })],
  parameters: {
    docs: {
      description: {
        component:
          'Surface for a self-contained item. Spacing/shape via usePadding/useGap/useRounded (density-based). Variants set base look; optional useTint adds a subtle palette tint. [sj] merges last and can override anything.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'flat', 'outlined', 'elevated', 'interactive', 'codeSnippet'],
    },
    usePadding: {
      control: 'select',
      options: [
        undefined,
        'none',
        1,
        2,
        3,
        4,
        'compact',
        'default',
        'comfortable',
        'spacious',
      ],
    },
    useGap: {
      control: 'select',
      options: [
        undefined,
        'none',
        1,
        2,
        3,
        4,
        'compact',
        'default',
        'comfortable',
        'spacious',
      ],
    },
    useRounded: {
      control: 'select',
      options: [
        undefined,
        'none',
        1,
        2,
        3,
        4,
        'compact',
        'default',
        'comfortable',
        'spacious',
      ],
    },
    useTint: {
      control: 'select',
      options: [
        undefined,
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
        'dark',
        'neutral',
        'light',
      ],
    },

    playgroundSj: {
      control: 'object',
      description:
        'Optional [sj] override for the card. This merges last and can override any style from the variant or density sugars.',
      table: { category: 'Playground', type: { summary: 'SjStyle | SjStyle[]' } },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  args: {
    variant: 'outlined',
    usePadding: 'default',
    useGap: 'none',
    useRounded: 'default',
    useTint: undefined,
    playgroundSj: {} as SjInput | undefined,
  },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-card
        [variant]="variant"
        [usePadding]="usePadding"
        [useGap]="useGap"
        [useRounded]="useRounded"
        [useTint]="useTint"
        [sj]="playgroundSj ?? [ sj.bg('light.light'), sj.c('dark.contrast') ]"
      >
        <div [sj]="[ sj.fw(600) ]">Card Playground</div>
        <div [sj]="[ sj.fs(0.9), sj.c('neutral.dark') ]">Use controls to tweak variant, density and spacing.</div>
      </sj-card>
    `,
  }),
};

export const Flat: Story = {
  args: { variant: 'flat', usePadding: 'default', useRounded: 'default' },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-card [variant]="variant" [usePadding]="usePadding" [useRounded]="useRounded">
        <div [sj]="[ sj.fw(600) ]">Flat</div>
        <div [sj]="[ sj.c('neutral.dark') ]">No border or shadow by default.</div>
      </sj-card>
    `,
  }),
};

export const Outlined: Story = {
  args: { variant: 'outlined', usePadding: 'default', useRounded: 'default' },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-card [variant]="variant" [usePadding]="usePadding" [useRounded]="useRounded">
        <div [sj]="[ sj.fw(600) ]">Outlined</div>
        <div [sj]="[ sj.c('neutral.dark') ]">Subtle stroke; great for lists.</div>
      </sj-card>
    `,
  }),
};

export const Elevated: Story = {
  args: { variant: 'elevated', usePadding: 'default', useRounded: 'default' },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-card [variant]="variant" [usePadding]="usePadding" [useRounded]="useRounded">
        <div [sj]="[ sj.fw(600) ]">Elevated</div>
        <div [sj]="[ sj.c('neutral.dark') ]">Light shadow for emphasis.</div>
      </sj-card>
    `,
  }),
};

export const Interactive: Story = {
  args: { variant: 'interactive', usePadding: 'default', useRounded: 'default' },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-card [variant]="variant" [usePadding]="usePadding" [useRounded]="useRounded" [sj]="[ sj.td('none') ]">
        <div [sj]="[ sj.fw(600) ]">Interactive</div>
        <div [sj]="[ sj.c('neutral.dark') ]">Hover raises slightly; use as a link region.</div>
      </sj-card>
    `,
  }),
};

export const PrimaryTint: Story = {
  args: { variant: 'flat', usePadding: 'default', useRounded: 'default', useTint: 'primary' },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-card [variant]="variant" [usePadding]="usePadding" [useRounded]="useRounded" [useTint]="useTint">
        <div [sj]="[ sj.fw(600) ]">Primary</div>
        <div>Subtle primary tint via useTint.</div>
      </sj-card>
    `,
  }),
};

export const SecondaryTint: Story = {
  args: { variant: 'flat', usePadding: 'default', useRounded: 'default', useTint: 'secondary' },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-card [variant]="variant" [usePadding]="usePadding" [useRounded]="useRounded" [useTint]="useTint">
        <div [sj]="[ sj.fw(600) ]">Secondary</div>
        <div>Subtle secondary tint via useTint.</div>
      </sj-card>
    `,
  }),
};

export const InfoTint: Story = {
  args: { variant: 'flat', usePadding: 'default', useRounded: 'default', useTint: 'info' },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-card [variant]="variant" [usePadding]="usePadding" [useRounded]="useRounded" [useTint]="useTint">
        <div [sj]="[ sj.fw(600) ]">Info</div>
        <div>Subtle info tint for notices.</div>
      </sj-card>
    `,
  }),
};

export const CodeSnippet: Story = {
  args: { variant: 'codeSnippet' },
  render: (args) => ({
    props: { ...args, sj, code: 'npm i super-jss' },
    template: `
      <sj-card [variant]="variant">
        <code>{{ code }}</code>
      </sj-card>
    `,
  }),
};
