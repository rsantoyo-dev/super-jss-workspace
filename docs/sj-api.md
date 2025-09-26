# `sj` API

`sj` is the single, typed entrypoint for Super JSS in templates and code. It
organizes style functions, layout helpers, tokens, and blueprints in clear
namespaces so IDE autocomplete is predictable and onboarding is smooth.

## Quick examples

```html
<!-- Neutral CSS names -->
<div [sj]="[
  sj.css.display('grid'),
  sj.css.gridTemplateColumns({ xs: '1fr', sm: '25% 75%' })
]"></div>

<!-- Popular shorthands -->
<div [sj]="[
  sj.sh.p({ xs: 1, md: 2 }),
  sj.sh.bg(sj.palette.primary.light)
]"></div>

<!-- Ergonomic layout families -->
<div [sj]="[
  sj.flex.row(),
  sj.flex.align('center'),
  sj.flex.gap(1)
]"></div>

<div [sj]="[
  sj.grid.container(),
  sj.grid.columns({ xs: '1fr', sm: '25% 75%' })
]"></div>

<div [sj]="sj.stack({ direction: { xs: 'column', md: 'row' }, gap: 1 })"></div>

<!-- Blueprints and variants -->
<div [sj]="sj.blueprints.sjCard.flat({ p: 1 })"></div>
<sj-card [variant]="sj.variants.sjCard.elevated">Card</sj-card>

<!-- Tokens -->
<div [sj]="[
  sj.css.color(sj.palette.primary.contrast),
  sj.css.backgroundColor(sj.tokens.colors.blue[500]),
  sj.css.display(sj.tokens.display.grid)
]"></div>
```

## Namespaces

- `sj.css` — All CSS properties as functions (from `csstype`).
  - Examples: `sj.css.padding(...)`, `sj.css.backgroundColor(...)`,
    `sj.css.flexDirection(...)`, `sj.css.gridTemplateColumns(...)`.
  - Use when you want neutral, standard CSS names.

- `sj.sh` — Curated, popular shorthands.
  - Spacing: `p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, gap`
  - Color: `bg, c`
  - Size: `w, h, minW, minH, maxW, maxH`
  - Borders: `brad`
  - Layout: `d, fxDir, fxJustify, fxAItems` (use `sj.flex.*` for more clarity)

- `sj.flex` — Ergonomic flex helpers.
  - Presets: `row(), column(), center(), middle(), between(), around(), evenly(), wrap(), nowrap(), grow(), shrink()`
  - Knobs: `direction(value)`, `align(value)`, `justify(value)`, `gap(value)`
  - Tokens: `sj.tokens.flex.direction.row`, `...justify.between`, `...align.center`, `...wrap.wrap`

- `sj.grid` — Grid helpers.
  - Container: `container(overrides)`
  - Templates: `columns(value)`, `rows(value)`, `areas(value)`, `cols(count)`
  - Flow/placement: `autoFlow(value)`, `placeItems(value)`, `placeContent(value)`, `placeSelf(value)`, `gap(value)`

- `sj.stack(options)` — Quick, readable stacks.
  - Options: `direction` (`'row' | 'column'` or responsive), `gap`, `align`, `justify`
  - Default: column with `gap: 0.5`

- `sj.blueprints` — Design primitives (builders) with dot-variants.
  - `sjBox`, `sjCard`, `sjButton`
  - Use as producers (call or pass the function):
    - `[sj]="sj.blueprints.sjCard.flat({ p: 1 })"`
    - `[sj]="sj.blueprints.sjCard.primary"` (producer pattern)

- `sj.variants` — Literal registries for IDE autocomplete.
  - `sj.variants.sjCard.[default|outlined|flat|elevated|interactive|primary|secondary|info|codeSnippet]`
  - `sj.variants.sjButton.[default|light|contained|outlined|containedPrimary|containedLight|containedDark|containedSecondary|danger]`

- `sj.palette` and `sj.tokens` — Typed design tokens.
  - `sj.palette.<name>.<shade>` — palette tokens with contrast.
  - `sj.tokens.colors.<scale>[shade]` — color scales with 50..900 and `contrast`.
  - `sj.tokens.display.[flex|grid|block|inline|inlineBlock|contents|none]`
  - `sj.tokens.breakpoints.[xs|sm|md|lg|xl|xxl]`
  - `sj.tokens.typography.[default|H1..H6|P|SPAN|SMALL|…]`
  - `sj.tokens.spacing(factor)` — returns the spacing factor (theme maps factors to CSS lengths).
  - `sj.tokens.flex.direction/justify/align/wrap` — typed flex literal values.

## Helpers (root)

- `sj.compose(...parts)` — Merge style parts left→right.
- `sj.hover(style)` / `sj.focus(style)` / `sj.active(style)` / `sj.disabled(style)` — Pseudo helpers.

## Responsive values

Any property or helper that accepts a value can take a responsive object:

```ts
{ xs: value, sm: value, md: value, lg: value, xl: value, xxl: value }
```

Example:

```html
<div [sj]="sj.css.flexDirection({ xs: 'column', sm: 'row' })"></div>
```

## Producer pattern

Blueprints (and some helpers) can be passed as functions (producers). The
`[sj]` directive will call them for you, so both forms work:

```html
<div [sj]="sj.blueprints.sjCard.primary"></div>
<div [sj]="sj.blueprints.sjCard.primary()"></div>
```

## Tips

- Prefer `sj.css.*` for clarity with team members familiar with CSS.
- Reach for `sj.flex`/`sj.grid`/`sj.stack` to improve readability on layout code.
- Use `sj.tokens` and `sj.palette` to avoid guessing string literals and unlock
  autocomplete in templates.
- Arrays merge left→right, so keep overrides last.

