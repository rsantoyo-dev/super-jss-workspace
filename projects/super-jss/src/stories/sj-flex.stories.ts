import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SjFlexComponent, SjDirective, sj, SjInput } from 'super-jss';
import { SjStyle } from '../lib/models/interfaces';

const meta: Meta = {
  title: 'SJ/Flex',
  component: SjFlexComponent as any,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A powerful and flexible layout component. Use the `use*` inputs for common flexbox patterns and density adjustments. For fine-grained control, including responsive layouts and properties like `justifyContent` or `alignItems`, use the `[sj]` input.',
      },
    },
  },
  decorators: [moduleMetadata({ imports: [SjDirective] })],
  argTypes: {
    component: {
      control: 'select',
      options: ['div', 'section', 'article', 'span'],
    },
    host: { control: 'boolean' },
    useCol: { control: 'boolean' },
    useWrap: { control: 'boolean' },
    useInline: { control: 'boolean' },
    useCenter: { control: 'boolean' },
    useBetween: { control: 'boolean' },
    useAround: { control: 'boolean' },
    useEvenly: { control: 'boolean' },

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
    // Playground-only: allow testing the [sj] input with object or array
    playgroundSj: {
      control: 'object',
      description:
        'Use this to pass any style object to the component. This is the primary way to apply detailed styles like `justifyContent`, `alignItems`, or responsive values. E.g., `{ justifyContent: "flex-end" }`.',
      table: {
        category: 'Playground',
        type: { summary: 'SjStyle | SjStyle[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  args: {
    component: 'section',
    host: false,
    useCol: false,
    useWrap: false,
    useInline: false,
    useCenter: false,
    useBetween: false,
    useAround: false,
    useEvenly: false,
    useGap: 'none',
    usePadding: 'none',
    playgroundSj: {} as SjInput | undefined,
  },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-flex
        [component]="component"
        [host]="host"
        [useCol]="useCol"
        [useWrap]="useWrap"
        [useInline]="useInline"
        [useCenter]="useCenter"
        [useBetween]="useBetween"
        [useAround]="useAround"
        [useEvenly]="useEvenly"
        [useGap]="useGap"
        [usePadding]="usePadding"
        [sj]="playgroundSj"
      >
        <div [sj]="[ sj.p(0.5), sj.c('primary.contrast'), sj.bg('primary'), sj.brad(0.5) ]">A</div>
        <div [sj]="[ sj.padding(0.5),  sj.color('secondary.contrast'), sj.backgroundColor('secondary'), sj.brad(0.5) ]">B</div>
        <div [sj]="{padding:0.5, color:'info.contrast', backgroundColor:'info', borderRadius:0.5}">C</div>
      </sj-flex>
    `,
  }),
};

export const BasicRow: Story = {
  args: {
    playgroundSj: {
      padding: '2px',
    },
  },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-flex [sj]="[ sj.p(3) ]">
        <div [sj]="[ sj.p(0.5), sj.bg('primary.light'), sj.brad(0.5) ]">One</div>
        <div [sj]="[ sj.p(0.5), sj.bg('secondary.light'), sj.brad(0.5) ]">Two</div>
      </sj-flex>
    `,
  }),
};

export const ColumnCentered: Story = {
  args: { useCol: true, useCenter: true, useGap: 'default' },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-flex [useCol]="useCol" [useCenter]="useCenter" [useGap]="useGap">
        <div [sj]="[ sj.p(0.5), sj.bg('primary.light'), sj.brad(0.5) ]">One</div>
        <div [sj]="[ sj.p(0.5), sj.bg('secondary.light'), sj.brad(0.5) ]">Two</div>
      </sj-flex>
    `,
  }),
};

export const WrapAndInline: Story = {
  args: { useWrap: true, useInline: true, useGap: 'default' },
  render: (args) => ({
    props: {
      ...args,
      sj,
      numbers: Array.from({ length: 40 }, (_, i) => i + 1),
    },
    template: `
      <sj-flex [useWrap]="useWrap" [useInline]="useInline" [useGap]="useGap" [sj]="[ sj.bg('light.light') ]">
        <div *ngFor="let n of numbers" [sj]="[ sj.p(0.3), sj.bg('neutral.light'), sj.mr(0.3), sj.mb(0.3) ]">{{ n }}</div>
      </sj-flex>
    `,
  }),
};

export const Alignment: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-flex [sj]="[{ justifyContent: 'space-between', alignItems: 'center' }, sj.minH(6), sj.p(0.5) ]">
        <div [sj]="[ sj.p(0.5), sj.bg('primary.light'), sj.brad(0.5) ]">Left</div>
        <div [sj]="[ sj.p(0.5), sj.bg('secondary.light'), sj.brad(0.5) ]">Right</div>
      </sj-flex>
    `,
  }),
};

export const DensityGap: Story = {
  args: { useGap: 'comfortable' },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-flex [useGap]="useGap">
        <div [sj]="[ sj.p(0.5), sj.bg('primary.light'), sj.brad(0.5) ]">A</div>
        <div [sj]="[ sj.p(0.5), sj.bg('secondary.light'), sj.brad(0.5) ]">B</div>
        <div [sj]="[ sj.p(0.5), sj.bg('info.light'), sj.brad(0.5) ]">C</div>
      </sj-flex>
    `,
  }),
};

export const DensityPadding: Story = {
  args: { usePadding: 'compact' },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-flex [usePadding]="usePadding">
        <div [sj]="[ sj.bg('primary.light') ]">A</div>
        <div [sj]="[ sj.bg('secondary.light') ]">B</div>
        <div [sj]="[ sj.bg('info.light') ]">C</div>
      </sj-flex>
    `,
  }),
};

export const ComponentPolymorphism: Story = {
  args: { component: 'section', useGap: 2 },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-flex [component]="component" [useGap]="useGap" [sj]="[ sj.bg('light.light') ]">
        <div [sj]="[ sj.p(0.5), sj.bg('primary.light'), sj.brad(0.5) ]">Section tag</div>
        <div [sj]="[ sj.p(0.5), sj.bg('secondary.light'), sj.brad(0.5) ]">With gap 2</div>
      </sj-flex>
    `,
  }),
};

export const ResponsiveOverride: Story = {
  args: { useGap: 'default' },
  render: (args) => ({
    props: { ...args, sj },
    template: `
      <sj-flex [useGap]="useGap" [sj]="[ sj.gap({ xs: .25, md: .75 }) ]">
        <div [sj]="[ sj.p(0.3), sj.bg('primary.light'), sj.brad(0.5) ]">xs/md gap override</div>
        <div [sj]="[ sj.p(0.3), sj.bg('secondary.light'), sj.brad(0.5) ]">(sj.gap wins)</div>
      </sj-flex>
    `,
  }),
};
