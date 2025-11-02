import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { SjDirective, sj } from 'super-jss';
import type { SjStyle } from 'super-jss';

@Component({
  standalone: true,
  selector: 'story-sj-basic-class',
  imports: [SjDirective],
  template: ` <div [sj]="box">bound to class property typed as SjStyle</div> `,
})
class SjBasicClassExampleComponent {
  box: SjStyle = {
    padding: '24px',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
  };
}

// Use custom MDX page for the Docs tab so examples + code match exactly.
// The MDX file renders our Stories in order with paired <Source> blocks.
// See typings.d.ts for mdx module declaration.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - mdx module provided by Storybook's webpack
import DocsPage from './sj-directive-basics.mdx';

const meta: Meta = {
  title: 'SJ/[sj] Basic',
  decorators: [moduleMetadata({ imports: [SjDirective, SjBasicClassExampleComponent] })],
  parameters: {
    layout: 'padded',
    docs: {
      page: DocsPage,
      description: {
        component:
          '[sj] lets you author styles as plain JS objects. Start with a simple object, then evolve to the sj Root API for typed props, tokens, responsive values, and pseudo‑states.\n\nKey ideas:\n- [sj] accepts a single object or an array of SjStyle objects.\n- The sj Root API (e.g., sj.padding, sj.bg) returns SjStyle objects you compose in an array.\n- Use plain CSS values or theme tokens; both work.\n- Pseudo‑selectors work with both plain objects and sj helpers (e.g., sj.hover([...])).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Padding: Story = {
  name: 'Padding (simple object)',
  render: () => ({
    props: {},
    template: `
      <div [sj]="{ padding: '24px', backgroundColor: '#f7f7f7', borderRadius: '8px' }">
        div with padding: 24px (plain CSS units)
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div [sj]="{ padding: '24px', backgroundColor: '#f7f7f7', borderRadius: '8px' }">
  div with padding: 24px (plain CSS units)
</div>`,
      },
    },
  },
};

export const ApiArray: Story = {
  name: 'Same example via sj API (array of SjStyle)',
  render: () => ({
    props: { sj },
    template: `
      <div [sj]="[ sj.padding('24px'), sj.backgroundColor('#f7f7f7'), sj.borderRadius('8px') ]">
        same result, using sj.* API (array of SjStyle)
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div [sj]="[ sj.padding('24px'), sj.backgroundColor('#f7f7f7'), sj.borderRadius('8px') ]">
  same result, using sj.* API (array of SjStyle)
</div>`,
      },
    },
  },
};

export const ApiResponsive: Story = {
  name: 'Responsive via sj API',
  render: () => ({
    props: { sj },
    template: `
      <div [sj]="[ sj.padding({ xs: '16px', sm: '24px', md: '32px' }), sj.bg('#f7f7f7'), sj.brad('8px') ]">
        responsive padding with sj.padding(&#123; xs, sm, md &#125;)
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div [sj]="[ sj.padding({ xs: '16px', sm: '24px', md: '32px' }), sj.bg('#f7f7f7'), sj.brad('8px') ]">
  responsive padding with sj.padding({ xs, sm, md })
</div>`,
      },
    },
  },
};

export const HoverTraditional: Story = {
  name: 'Hover (plain object)',
  render: () => ({
    props: {},
    template: `
      <button [sj]="{
        padding: '12px 16px',
        backgroundColor: '#e5e7eb',
        borderRadius: '8px',
        transition: 'all .15s ease',
        '&:hover': { backgroundColor: '#d1d5db', transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }
      }">
        hover me (plain object)
      </button>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<button [sj]="{
  padding: '12px 16px',
  backgroundColor: '#e5e7eb',
  borderRadius: '8px',
  transition: 'all .15s ease',
  '&:hover': { backgroundColor: '#d1d5db', transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }
}">hover me (plain object)</button>`,
      },
    },
  },
};

export const HoverApi: Story = {
  name: 'Hover (sj.hover helper)',
  render: () => ({
    props: { sj },
    template: `
      <button [sj]="[
        sj.px('16px'), sj.py('12px'), sj.brad('8px'), sj.bg('#e5e7eb'), sj.transition('all .15s ease'),
        sj.hover([ sj.bg('#d1d5db'), sj.transform('translateY(-1px)'), sj.boxShadow('0 4px 12px rgba(0,0,0,0.12)') ])
      ]">
        hover me (sj.hover)
      </button>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<button [sj]="[
  sj.px('16px'), sj.py('12px'), sj.brad('8px'), sj.bg('#e5e7eb'), sj.transition('all .15s ease'),
  sj.hover([ sj.bg('#d1d5db'), sj.transform('translateY(-1px)'), sj.boxShadow('0 4px 12px rgba(0,0,0,0.12)') ])
]">hover me (sj.hover)</button>`,
      },
    },
  },
};
