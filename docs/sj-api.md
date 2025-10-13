# `sj` API

`sj` is the single, typed entrypoint for Super JSS. It exposes:

- All CSS properties as functions directly at the root: `sj.display('flex')`, `sj.gridTemplateColumns('1fr 2fr')`.
- Curated shorthands at the root: `sj.p(1)`, `sj.bg('primary.main')`, `sj.fxJustify('space-between')`.
- Discoverable `.options` on popular props to reduce guesswork.
- Minimal tokens at root: `sj.palette` and `sj.breakpoints`.
- Blueprints at root with variants: `sj.sjCard`, `sj.sjButton`.
- Components for common UI: `<sj-paper>`, `<sj-card>`, `<sj-button>` (use `[variant]`).
- Host mode on surfaces: add `[host]` on `<sj-paper>` to apply styles to the parent element (wrapperless).

This lean surface is SSR‑safe and designed for fast authoring with great IDE autocomplete.

## Quick examples

```html
<!-- CSS properties at root -->
<div [sj]="[
  sj.display('grid'),
  sj.gridTemplateColumns({ xs: '1fr', sm: '25% 75%' })
]"></div>

<!-- Popular shorthands at root -->
<div [sj]="[
  sj.p({ xs: 1, md: 2 }),
  sj.bg(sj.palette.primary.light)
]"></div>

<!-- Pseudo helpers accept a style or an array of styles -->
<button [sj]="[
  sj.bg('primary.main'),
  sj.hover([ sj.bg('primary.dark'), sj.c('primary.contrast') ])
]"></button>

<!-- Components with variants -->
<sj-paper usePadding="default" useRounded="default">Surface</sj-paper>
<sj-card [variant]="'flat'" [sj]="{ p: 1 }">Card</sj-card>
<sj-card [variant]="'elevated'">Card</sj-card>

<!-- Tokens -->
<div [sj]="[
  sj.c(sj.palette.primary.contrast),
  sj.bg(sj.palette.primary.dark),
  sj.d(sj.d.options.grid)
]"></div>
```

## Root surface

- CSS property functions: any camelCase CSS prop is available at `sj.<prop>(value)`.
  - Examples: `sj.padding(...)`, `sj.backgroundColor(...)`, `sj.flexDirection(...)`, `sj.gridTemplateColumns(...)`.
  - Popular props include `.options` for discoverability:
    - `sj.display.options = { flex, grid, block, inline, inlineBlock, contents, none }`
    - `sj.position.options = { static, relative, absolute, fixed, sticky }`
    - `sj.width.options` / `sj.height.options` include sizing keywords like `auto`, `fitContent`, `maxContent`, `minContent`.
    - `sj.justifyContent.options` and `sj.alignItems.options` include friendly camelCase aliases like `spaceBetween`, `flexStart`.

- Shorthands (curated): `p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, gap, bg, c, w, h, minW, minH, maxW, maxH, brad, d, fxDir, fxJustify, fxAItems`.
  - Shorthands also expose `.options` where it makes sense: `sj.bg.options`, `sj.c.options`, `sj.d.options`, `sj.fxDir.options`, `sj.fxJustify.options`, `sj.fxAItems.options`.

- Helpers:
  - `sj.compose(...parts)` — Merge style parts left→right.
  - `sj.hover(style | style[])`, `sj.focus(...)`, `sj.active(...)`, `sj.disabled(...)` — Pseudo helpers that accept a single style or an array of styles.

- Tokens:
  - `sj.palette.<name>.<shade>` — semantic palette with `main|light|dark|contrast`.
  - `sj.breakpoints = { xs, sm, md, lg, xl, xxl }` — breakpoint names for responsive objects.

- Blueprints (builders) at root:
  - `sj.sjCard`, `sj.sjButton` are functions with dot‑variants, e.g. `sj.sjCard.elevated()`.
  - Components accept a `variant` string (e.g. `'outlined'`), or use the blueprint helpers.

## Responsive values

Any property or shorthand that accepts a value can take a responsive object:

```ts
{ xs: value, sm: value, md: value, lg: value, xl: value, xxl: value }
```

Example:

```html
<div [sj]="sj.flexDirection({ xs: 'column', sm: 'row' })"></div>
```

## Producer pattern

Blueprints (and helpers) can be passed as functions (producers). The `[sj]` directive will call them for you, so both forms work:

```html
<div [sj]="sj.sjCard.primary"></div>
<div [sj]="sj.sjCard.primary()"></div>
```

## Tips

- Prefer `sj.<cssProp>` for maximum clarity; use shorthands for speed on common properties.
- Use `.options` on props and shorthands to avoid guessing string literals.
- Use `sj.palette` and responsive objects frequently; arrays merge left→right, so keep overrides last.
