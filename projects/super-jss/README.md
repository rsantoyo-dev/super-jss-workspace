# Super JSS — Atomic CSS‑in‑JS for Angular 20

[![npm version](https://img.shields.io/npm/v/super-jss.svg)](https://www.npmjs.com/package/super-jss)
[![bundle size](https://img.shields.io/bundlephobia/minzip/super-jss?label=size)](https://bundlephobia.com/package/super-jss)
[![Storybook](https://img.shields.io/badge/Storybook-Visit-FF4785)](https://sjss-storybook.netlify.app/)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Super JavaScript Stylesheets (SJSS) is a tiny, runtime styling library for Angular 20. It generates atomic CSS as you use it, supports responsive breakpoints and theming, and gives you a minimal, ergonomic API.

- ⚡ Angular‑native: built on Signals
- 🎯 Atomic CSS generation: only what you use
- 📱 Responsive + theming: `xs…xxl` breakpoints and palette tokens
- 🎨 Pseudo‑selectors: `&:hover`, `&:focus`, etc.
- 🧩 Ready‑made building blocks: `<sj-paper>`, `<sj-card>`, `<sj-button>`

## Quick links

- Docs: https://sjss.netlify.app/
- StackBlitz — sjRootApi: https://stackblitz.com/edit/stackblitz-starters-lgwyvmd2?file=src%2Fmain.ts
- StackBlitz — Padding & Flex: https://stackblitz.com/edit/stackblitz-starters-wkjbpaq7?file=src%2Fmain.ts
- Demo: https://sjssdemo.netlify.app/
- GitHub: https://github.com/rsantoyo-dev/super-jss-workspace
- Storybook: https://sjss-storybook.netlify.app/


## Why SJSS (in 30 seconds)

- Angular‑native, powered by Signals; no build‑time plugin required.
- Atomic CSS at runtime: ship only what you use.
- Token‑driven theming with responsive objects on every property.
- Tiny API: write plain CSS (or shorthands) as TypeScript objects.

### Compare at a glance

| Library           | Type                 | Theming/Tokens         | Angular 20 | Notes |
|-------------------|----------------------|------------------------|------------|------|
| Tailwind CSS      | Utility framework    | Limited via config     | Generic    | Build‑time, globals |
| Angular Material  | Component library    | Material tokens        | Yes        | Heavy components, prescriptive UI |
| PrimeNG           | Component library    | Theme packs            | Yes        | Large bundle, theming via CSS vars |
| MUI (React)       | Component library    | Rich theming (React)   | No         | React‑only |
| SJSS              | Styling library      | Tokens + responsive API| Yes        | Atomic CSS‑in‑JS, Signals‑native |

## Install

```bash
npm install super-jss
```

## Quick start

This minimal Hero shows inline `[sj]` styles, a one‑line theme update, and a reactive breakpoint log.

```ts
import { Component, effect, inject } from '@angular/core';
import { SJ_BASE_COMPONENTS_IMPORTS, SjThemeService, sj } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-hero',
  imports: [SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-paper
      usePadding="default"
      useRounded="default"
      [sj]="[
        sj.display(sj.display.options.flex),
        sj.flexDirection({ xs: sj.flexDirection.options.column, md: sj.flexDirection.options.row }),
        sj.justifyContent(sj.justifyContent.options.center),
        sj.alignItems(sj.alignItems.options.center),
        sj.gap({ xs: 0.5, md: 1 }),
        sj.p(2),
        sj.bg(sj.palette.light.light)
      ]"
    >
      <sj-paper usePaint="primary" useRounded="default" usePadding="default">
        <h1 [sj]="[ sj.m(0) ]">Hello SJSS</h1>
      </sj-paper>

      <sj-button
        [sj]="[
          sj.p(2),
          sj.bg('primary.main'),
          sj.c('white'),
          sj.hover([ sj.backgroundColor(sj.bg.options.primary.dark) ])
        ]"
        (click)="updatePrimaryColor()"
      >
        Update Primary
      </sj-button>
    </sj-paper>
  `,
})
export class HeroComponent {
  readonly theme = inject(SjThemeService);
  readonly sj = sj;

  // Log the current breakpoint reactively
  private _bp = effect(() => console.log('breakpoint:', this.theme.breakpoint()));

  // One‑liner theme update for primary color
  updatePrimaryColor() {
    this.theme.setTheme({
      palette: { primary: { ...this.theme.sjTheme().palette.primary, main: '#4e3149ff' } } as any,
    });
  }
}
```

### Key ideas

- camelCase CSS properties: `backgroundColor`, `justifyContent`, `borderRadius`
- Responsive objects: `{ xs: 1, md: 2 }`
- Theme tokens: `sj.palette.primary.main`, `sj.palette.light.dark`
- Pseudo‑selectors: `sj.hover({ ... })`, `sj.focus({ ... })`

## Minimal API surface (v1)

The root API gives you two things:

1) Any CSS property function
2) A few curated shorthands with `.options`

```ts
import { sj } from 'super-jss';

// CSS properties
sj.backgroundColor('primary.main');
sj.padding({ xs: 1, md: 2 });
sj.width(sj.width.options.fitContent);
sj.position(sj.position.options.absolute);

// Shorthands (popular)
sj.p(2);         // padding
sj.m({ md: 1 }); // margin
sj.bg('primary.main');
sj.c('primary.contrast');

// Discoverable options for common props
sj.display.options;         // { flex, grid, block, inline, inlineBlock, contents, none }
sj.flexDirection.options;   // { row, rowReverse, column, columnReverse }
sj.justifyContent.options;  // { flexStart, flexEnd, center, spaceBetween, spaceAround, spaceEvenly }
sj.alignItems.options;      // { flexStart, flexEnd, center, stretch, baseline }
sj.width.options;           // { auto, fitContent, maxContent, minContent }
sj.height.options;          // { auto, fitContent, maxContent, minContent }
sj.position.options;        // { static, relative, absolute, fixed, sticky }

// Tokens available at root
sj.palette.primary.main;
sj.breakpoints.md;
```

## Live examples (StackBlitz)

Note: Some Markdown renderers (e.g., GitHub) may strip iframes. If you don’t see the embeds below, use the direct links above.

<!-- Padding & Flex example -->
<iframe
  src="https://stackblitz.com/edit/stackblitz-starters-wkjbpaq7?embed=1&file=src%2Fmain.ts&hideExplorer=1&hideNavigation=1&view=preview"
  title="SJSS • Padding & Flex"
  style="width:100%; height:520px; border:0; border-radius:8px; overflow:hidden;"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; clipboard-write"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

<!-- sjRootApi example -->
<iframe
  src="https://stackblitz.com/edit/stackblitz-starters-lgwyvmd2?embed=1&file=src/main.ts&hideExplorer=1&hideNavigation=1&view=preview"
  title="SJSS • sjRootApi"
  style="width:100%; height:520px; border:0; border-radius:8px; overflow:hidden;"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; clipboard-write"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Components and blueprints

Ship simple styles fast using built‑ins:

```ts
import { SJ_BASE_COMPONENTS_IMPORTS, sj } from 'super-jss';

@Component({
  standalone: true,
  imports: [SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-paper usePadding="default">Content</sj-paper>
    <sj-paper variant="outlined" usePadding="default" useRounded="default">Surface</sj-paper>
    <sj-card [variant]="'elevated'" [sj]="{ p: 1 }">Card content</sj-card>
    <sj-button [variant]="'filled'" [sj]="{ w: 'fit-content' }">Click</sj-button>
  `,
})
export class DemoComponent {
  box = [sj.p(1), sj.bg('light.light')];
}
```

Blueprints are also callable:

```ts
sj.sjCard();                 // default card
sj.sjCard.outlined();        // outlined
sj.sjCard.elevated();        // elevated
sj.sjCard.info();            // info blueprint (not a component variant)
```

## Responsive examples

```html
<div
  [sj]="[
    sj.display('flex'),
    sj.flexDirection({ xs: 'column', md: 'row' }),
    sj.gap({ xs: 0.5, md: 1 }),
  ]"
></div>
```

## Surfaces (density‑driven spacing)

Use `<sj-paper>` for neutral surfaces and enable consistent padding and rounding via density levels sourced from your theme.

Define densities in theme (TypeScript):

```ts
// Align surfaces globally via the active theme
theme.setTheme({
  components: {
    surfaces: {
      padding: { 2: { xs: 0.5, md: 0.75, lg: 1 } },
      gap:     { 2: { xs: 0.5, md: 0.75, lg: 1 } },
      radius:  { 2: 0.5 }
    }
  }
});
```

Use in templates (HTML):

```html
<!-- Component form: padding+gap+rounded by density -->
<sj-paper variant="outlined" usePadding="default" useRounded="default">
  Content
</sj-paper>

<!-- Individual toggles (still density‑driven) -->
<sj-paper variant="outlined" usePadding="default">…</sj-paper>
<sj-paper variant="outlined" useRounded="default">…</sj-paper>
```

Host mode (apply surface to the parent element):

```html
<div>
  <sj-paper host usePadding="default" useRounded="default">
    Content
  </sj-paper>
</div>
```

Notes

- Densities live under `theme.components.surfaces` (padding, gap, radius) and use your theme.spacing units.
- `[sj]` merges last; explicit overrides always win.


## FAQ

Q: Why this approach vs. utility frameworks or huge token bags?
A: SJSS generates only the atomic CSS you actually use, at runtime. No prebuilt megabundle. You write plain CSS properties, enhanced with `.options` for discoverability. Compared to utility-first CSS, you: (1) keep styling colocated with your component logic, (2) get type‑safe, theme‑aware values, and (3) ship less. Compared to heavy design-token bags, we keep only the essentials at root: `sj.palette` and `sj.breakpoints`.

Q: How do I maintain theming long-term?
A: Use semantic palette tokens everywhere (`'primary.main'`, `'light.dark'`). Centralize your theme in one place (theme service/config). Because styles reference semantic tokens, swapping a palette or adjusting contrast cascades automatically without touching components. Prefer semantic tokens over raw hex in app code.

Q: What’s the responsive story?
A: Every property supports responsive objects: `{ xs, sm, md, lg, xl, xxl }`. This keeps responsive intent in one place per style. Example: `sj.flexDirection({ xs: 'column', md: 'row' })` and `sj.gap({ xs: 0.5, md: 1 })`.

Q: Is it SSR‑friendly and fast?
A: Yes. The library avoids direct DOM access during import and only generates minimal, deterministic atomic classes at runtime. Styles are memoized, deduped, and composed; pseudo‑selectors are compiled into atomic rules and reused. Result: tiny CSS, predictable ordering, and quick first paint.

Q: How do I discover valid values fast?
A: Use `.options` on common props: `sj.display.options`, `sj.flexDirection.options`, `sj.justifyContent.options`, `sj.alignItems.options`, `sj.width.options`, `sj.height.options`, `sj.position.options`. Your IDE will autocomplete ergonomic aliases like `spaceBetween`, `flexStart`, etc.

Q: Can I mix literal values with tokens?
A: Absolutely. Use literals where convenient (`'fit-content'`, `'1fr 2fr'`, `600`) and tokens for theme consistency (`'primary.main'`, `'neutral.contrast'`).

Q: How do I center with flex quickly?
A: `sj.display(sj.display.options.flex)`, `sj.justifyContent(sj.justifyContent.options.center)`, and `sj.alignItems(sj.alignItems.options.center)`. That’s it.

## 💖 Support

If you find Super JSS useful, consider supporting its development:

- ☕ ☕ ☕ [Buy me a coffee](https://buymeacoffee.com/rsantoyo)

## 📬 Contact

For inquiries, feedback, or issues, reach out at [ricardo.santoyo@hotmail.com](mailto:ricardo.santoyo@hotmail.com).

## License

MIT © Ricardo Santoyo
