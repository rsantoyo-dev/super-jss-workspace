import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SjDirective, sj } from 'super-jss';

const meta: Meta = {
  title: 'SJ/Interactions',
  decorators: [moduleMetadata({ imports: [SjDirective] })],
  parameters: {
    docs: {
      description: {
        component:
          'Advanced interactions using sj.hover (and friends). These examples combine transitions, transforms, shadows, palette tokens, and even responsive hover amplitudes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const CtaPrimaryHover: Story = {
  name: 'CTA — token colors + hover darken',
  render: () => ({
    props: { sj },
    template: `
      <button [sj]="[
        sj.px('16px'), sj.py('10px'), sj.brad('8px'),
        sj.bg('primary.main'), sj.c('primary.contrast'),
        sj.transition('background .15s ease, transform .15s ease, box-shadow .15s ease'),
        sj.hover([ sj.bg('primary.dark'), sj.transform('translateY(-1px)'), sj.boxShadow('0 10px 28px rgba(15,23,42,.24)') ])
      ]">Primary CTA (hover me)</button>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<button [sj]="[
  sj.px('16px'), sj.py('10px'), sj.brad('8px'),
  sj.bg('primary.main'), sj.c('primary.contrast'),
  sj.transition('background .15s ease, transform .15s ease, box-shadow .15s ease'),
  sj.hover([ sj.bg('primary.dark'), sj.transform('translateY(-1px)'), sj.boxShadow('0 10px 28px rgba(15,23,42,.24)') ])
]">Primary CTA (hover me)</button>`
      }
    }
  }
};

export const InteractiveCard: Story = {
  name: 'Interactive card — elevate on hover',
  render: () => ({
    props: { sj },
    template: `
      <div [sj]="[
        sj.p('16px'), sj.brad('12px'), sj.bg('light.light'),
        sj.transition('transform .15s ease, box-shadow .15s ease'),
        sj.hover([ sj.transform('translateY(-2px)'), sj.boxShadow('0 12px 32px rgba(0,0,0,.18)') ])
      ]">
        Card content — hover to elevate
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div [sj]="[
  sj.p('16px'), sj.brad('12px'), sj.bg('light.light'),
  sj.transition('transform .15s ease, box-shadow .15s ease'),
  sj.hover([ sj.transform('translateY(-2px)'), sj.boxShadow('0 12px 32px rgba(0,0,0,.18)') ])
]">Card content — hover to elevate</div>`
      }
    }
  }
};

export const ResponsiveHoverAmplitude: Story = {
  name: 'Responsive hover — transform scales with breakpoint',
  render: () => ({
    props: { sj },
    template: `
      <div [sj]="[
        sj.p('16px'), sj.brad('8px'), sj.bg('light.light'),
        sj.transition('transform .15s ease'),
        sj.hover([ sj.transform({ xs: 'scale(1.01)', md: 'scale(1.03)', xl: 'scale(1.05)' }) ])
      ]">
        Hover scale: xs 1.01 → md 1.03 → xl 1.05
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div [sj]="[
  sj.p('16px'), sj.brad('8px'), sj.bg('light.light'),
  sj.transition('transform .15s ease'),
  sj.hover([ sj.transform({ xs: 'scale(1.01)', md: 'scale(1.03)', xl: 'scale(1.05)' }) ])
]">Hover scale: xs 1.01 → md 1.03 → xl 1.05</div>`
      }
    }
  }
};

export const FocusVisiblePlusHover: Story = {
  name: 'Focus-visible ring + hover motion',
  render: () => ({
    props: { sj },
    template: `
      <button [sj]="[
        sj.px('14px'), sj.py('10px'), sj.brad('8px'), sj.bg('light.light'),
        sj.transition('transform .15s ease, box-shadow .15s ease'),
        sj.hover([ sj.transform('translateY(-1px)'), sj.boxShadow('0 8px 20px rgba(0,0,0,.16)') ]),
        { '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '2px' } }
      ]">Focus me (Tab) and hover</button>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<button [sj]="[
  sj.px('14px'), sj.py('10px'), sj.brad('8px'), sj.bg('light.light'),
  sj.transition('transform .15s ease, box-shadow .15s ease'),
  sj.hover([ sj.transform('translateY(-1px)'), sj.boxShadow('0 8px 20px rgba(0,0,0,.16)') ]),
  { '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '2px' } }
]">Focus me (Tab) and hover</button>`
      }
    }
  }
};

