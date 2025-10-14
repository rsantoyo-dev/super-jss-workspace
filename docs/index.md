<div align="center">

<h1>SJSS — Design Systems. Reimagined for Angular.</h1>
<p>Build dynamic, token‑driven, and responsive UIs using Angular Signals.<br>
SJSS brings Tailwind’s speed and MUI’s theming — natively in Angular 20.</p>

<p>
  <a href="/installation" class="md-button md-button--primary">🚀 Get Started</a>
  <a href="https://sjssdemo.netlify.app/" class="md-button">👀 View Demo</a>
  <a href="https://sjss-storybook.netlify.app/" class="md-button">📚 Open Storybook</a>
  <a href="https://stackblitz.com/~/github.com/rsantoyo-dev/super-jss-workspace?file=projects/super-jss-demo/src/app/app.component.ts" class="md-button">⚡ Try on StackBlitz</a>
</p>

</div>

# Super JSS — Atomic CSS‑in‑JS for Angular 20

[![npm version](https://img.shields.io/npm/v/super-jss.svg)](https://www.npmjs.com/package/super-jss)
[![bundle size](https://img.shields.io/bundlephobia/minzip/super-jss?label=size)](https://bundlephobia.com/package/super-jss)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](../LICENSE)

Super JavaScript Stylesheets (SJSS) is a tiny, runtime styling library for Angular 20. It generates atomic CSS as you use it, supports responsive breakpoints and theming, and gives you a minimal, ergonomic API.

- ⚡ Angular‑native: built on Signals
- 🎯 Atomic CSS generation: only what you use
- 📱 Responsive + theming: `xs…xxl` breakpoints and palette tokens
- 🎨 Pseudo‑selectors: `&:hover`, `&:focus`, etc.
- 🧩 Ready‑made building blocks: `<sj-paper>`, `<sj-card>`, `<sj-button>`

## Important links

- Documentation: <https://sjss.dev>
- Demo & lib workspace (StackBlitz): <https://stackblitz.com/~/github.com/rsantoyo-dev/super-jss-workspace?file=projects/super-jss-demo/src/app/app.component.ts>
- GitHub repository: <https://github.com/rsantoyo-dev/super-jss-workspace>
- Deployed demo: <https://sjssdemo.netlify.app/>
- Storybook: <https://sjss-storybook.netlify.app/>
- NPM: <https://www.npmjs.com/package/super-jss>
- Open Source Licenses (OSI): <https://opensource.org/licenses>

## Why SJSS

- Angular‑native, powered by Signals; no build‑time plugin required.
- Atomic CSS at runtime: ship only the CSS you use.
- Token‑driven theming with responsive objects on every property.
- Minimal, ergonomic API: write plain CSS (or shorthands) as TS objects.

### Compare at a glance

| Library           | Type               | Theming/Tokens         | Angular 20 | Notes |
|-------------------|--------------------|------------------------|------------|------|
| Tailwind CSS      | Utility framework  | Limited via config     | Generic    | Build‑time, globals |
| Angular Material  | Component library  | Material tokens        | Yes        | Prescriptive UI components |
| PrimeNG           | Component library  | Theme packs            | Yes        | Theming via CSS variables |
| MUI (React)       | Component library  | Rich theming (React)   | No         | React‑only |
| SJSS              | Styling library    | Tokens + responsive API| Yes        | Atomic CSS‑in‑JS, Signals‑native |

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
    <sj-host
      [sj]="[
        sj.display(sj.display.options.flex),
        sj.flexDirection({ xs: sj.flexDirection.options.column, md: sj.flexDirection.options.row }),
        sj.justifyContent(sj.justifyContent.options.center),
        sj.alignItems(sj.alignItems.options.center),
        sj.gap({ xs: 0.5, md: 1 }),
        sj.p(2),
        sj.bg(sj.bg.options.light.light)
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
    </sj-host>
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

// Composition helpers
// Prefer passing an array to [sj] instead of composing in TS
```

## Components and blueprints

Ship simple styles fast using built‑ins:

```ts
import { SJ_BASE_COMPONENTS_IMPORTS, sj } from 'super-jss';

@Component({
  standalone: true,
  imports: [SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-paper usePadding="default">Content</sj-paper>
    <sj-card variant="elevated" usePadding="default">Card content</sj-card>
    <sj-button variant="filled" [sj]="{ w: 'fit-content' }">Click</sj-button>
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
