# Super JSS — Atomic CSS‑in‑JS for Angular 20

[![npm version](https://img.shields.io/npm/v/super-jss.svg)](https://www.npmjs.com/package/super-jss)
[![bundle size](https://img.shields.io/bundlephobia/minzip/super-jss?label=size)](https://bundlephobia.com/package/super-jss)
[![Storybook](https://img.shields.io/badge/Storybook-Visit-FF4785)](https://sjss-storybook.netlify.app/)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Ship less CSS. Style with Signals. Theme everything at runtime.

Super JavaScript Stylesheets (SJSS) is a tiny, runtime styling library for Angular 20. It generates atomic CSS as you use it, supports responsive breakpoints and theming, and gives you a minimal, ergonomic API.

- ⚡ Angular‑native: built on Signals
- 🎯 Atomic CSS generation: only what you use
- 📱 Responsive + theming: `xs…xxl` breakpoints and palette tokens
- 🎨 Pseudo‑selectors: `&:hover`, `&:focus`, etc.
- 🧩 Ready‑made building blocks: `<sj-paper>`, `<sj-card>`, `<sj-button>`

## 60‑second start

- Install

```bash
npm install super-jss
```

- Use a standalone component (Angular 20)

```ts
import { Component } from '@angular/core';
import { SjDirective, SjButtonComponent, sj } from 'super-jss';

@Component({
  selector: 'hello-sjss',
  standalone: true,
  imports: [SjDirective, SjButtonComponent],
  template: `
    <div [sj]="[ sj.display('flex'), sj.gap({ xs: 0.5, md: 1 }) ]">
      Hello SJSS
    </div>

    <sj-button [usePaint]="'primary'">Action</sj-button>
  `,
})
export class HelloSjssComponent {
  // Expose the root API to the template
  readonly sj = sj;
}
```

### Responsive sugars at a glance

- `usePadding`, `useGap` are density‑driven responsive sugars sourced from your theme. Aliases map to density levels:
  - `compact` → 1, `default` → 2, `comfortable` → 3, `spacious` → 4
  - Each density resolves to a responsive object you define in the theme, e.g. `components.surfaces.padding[1] = { xs: 0.5, md: 0.75, lg: 1 }`
  - That means writing `usePadding="compact"` expands to `{ xs, md, lg }` automatically at runtime.
- `usePaint` is palette‑aware: it applies background/border/text using theme tokens and the component variant (`filled`, `outlined`, `flat`) with auto‑contrast defaults.

Example — a fully theme‑responsive surface in one line:

```html
<sj-paper
  variant="outlined"
  usePadding="compact"
  useRounded="default"
  [usePaint]="'primary'"
>
  Themed surface
</sj-paper>
```

Try it live:

- [Demo](https://sjssdemo.netlify.app)
- [Storybook](https://sjss-storybook.netlify.app)
- [Docs](https://sjss.dev)

## Quick links

- [Docs](https://sjss.dev)
- [Live Demo](https://sjssdemo.netlify.app/) — theme editor in action
- [Storybook](https://sjss-storybook.netlify.app/) — component reference
- [StackBlitz · sjRootApi](https://stackblitz.com/edit/stackblitz-starters-lgwyvmd2?file=src%2Fmain.ts)
- [StackBlitz · Padding & Flex](https://stackblitz.com/edit/stackblitz-starters-wkjbpaq7?file=src%2Fmain.ts)
- [StackBlitz · Palette](https://stackblitz.com/edit/sjss-palette?file=src%2Fmain.ts)
- [StackBlitz · Typography](https://stackblitz.com/edit/sjss-typography?file=src%2Fmain.ts)
- [StackBlitz · Spacing](https://stackblitz.com/edit/sjss-spacing?file=src%2Fmain.ts)
- [StackBlitz · Padding System](https://stackblitz.com/edit/sjss-padding-system?file=src%2Fmain.ts)
- [StackBlitz · Colors (theme.colors)](https://stackblitz.com/edit/sjss-colors?file=src%2Fmain.ts)
- [GitHub](https://github.com/rsantoyo-dev/super-jss-workspace)

<a href="https://sjssdemo.netlify.app/" target="_blank" rel="noreferrer">
  <img src="https://raw.githubusercontent.com/rsantoyo-dev/super-jss-workspace/refs/heads/master/sjss-doc/static/img/theme-editor.png" alt="SJSS live theme editor demo" width="720" />
</a>


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

A quick visual of SJSS authoring with strict typing and autocomplete:

<img src="https://raw.githubusercontent.com/rsantoyo-dev/super-jss-workspace/refs/heads/master/sjss-doc/static/img/sjss-coding-example.png" alt="SJSS coding example showing typed sj API with IDE autocomplete" width="720" />

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
