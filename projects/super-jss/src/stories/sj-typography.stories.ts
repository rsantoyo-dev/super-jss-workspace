import type { Meta, StoryObj } from '@storybook/angular';
import { SjTypographyComponent } from 'super-jss';

const meta: Meta<SjTypographyComponent> = {
  title: 'SJ/Typography',
  component: SjTypographyComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['h1','h2','h3','h4','h5','h6','p','span','strong','small','pre','body'] },
  },
};

export default meta;
type Story = StoryObj<SjTypographyComponent>;

export const Single: Story = {
  args: { variant: 'h4' },
  render: (args) => ({
    props: args,
    template: `<sj-typography [variant]="variant">Typography {{ variant }}</sj-typography>`,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:8px">
        <sj-typography variant="h1">Heading 1</sj-typography>
        <sj-typography variant="h2">Heading 2</sj-typography>
        <sj-typography variant="h3">Heading 3</sj-typography>
        <sj-typography variant="h4">Heading 4</sj-typography>
        <sj-typography variant="h5">Heading 5</sj-typography>
        <sj-typography variant="h6">Heading 6</sj-typography>
        <sj-typography variant="p">Paragraph text</sj-typography>
        <sj-typography variant="span">Span text</sj-typography>
        <sj-typography variant="strong">Strong text</sj-typography>
        <sj-typography variant="small">Small text</sj-typography>
        <sj-typography variant="pre">preformatted</sj-typography>
      </div>
    `,
  }),
};

