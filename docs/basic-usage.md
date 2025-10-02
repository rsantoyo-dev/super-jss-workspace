# Basic usage: the core of SJSS

SJSS centers around one idea: write styles as plain TypeScript objects (or arrays of them) and bind them to `[sj]`. You can use any camelCase CSS property and every property also accepts a responsive object.

This page walks you from the simplest inline example to using the `sj` root API for autocomplete and discoverable options.

## 1) The minimal component (core pattern)

```ts
import { Component } from '@angular/core';
import { SjDirective } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-demo',
  imports: [SjDirective],
  template: `
    <div [sj]="{ p: 2, bg: 'primary.main', color: 'primary.contrast' }">
      Welcome to Super JSS!
    </div>
  `,
})
export class DemoComponent {}
```

What’s happening:

- CSS as TS object: properties are camelCase (`backgroundColor` → `backgroundColor`, or shorthand `bg`).
- Theme tokens: values like `'primary.main'` are resolved via the active theme.
- Atomic CSS at runtime: SJSS generates minimal CSS classes for you.


## 2) Any CSS prop supports responsive values

Any property (or shorthand) can take a responsive object with breakpoint keys `{ xs, sm, md, lg, xl, xxl }`.

```html
<div [sj]="{
  p: { xs: 1, md: 2 },
  backgroundColor: { xs: 'light.main', md: 'primary.main' },
  fontSize: { xs: 1, md: 1.25, lg: 1.5 }
}"></div>
```

You can mix shorthands and full CSS names interchangeably.

## 3) Arrays compose styles (left → right)

`[sj]` also accepts an array. Later entries override earlier ones. This is a clean way to reuse and override.

```ts
import { Component } from '@angular/core';
import { SjDirective, SjStyle } from 'super-jss';

const base: SjStyle = { p: 1, bg: 'light.light', borderRadius: '6px' };
const interactive: SjStyle = {
  cursor: 'pointer',
  transition: 'all .2s ease',
  '&:hover': { bg: 'primary.main', color: 'primary.contrast' },
};

@Component({
  standalone: true,
  selector: 'app-compose',
  imports: [SjDirective],
  template: `
    <div [sj]="[ base, interactive, { p: { md: 2 } } ]">Composed</div>
  `,
})
export class ComposeComponent {
  protected readonly base = base;
  protected readonly interactive = interactive;
}
```

## 4) sjRootApi: functions with autocomplete and `.options`

While plain objects work everywhere, using the `sj` helper unlocks great DX: typed functions for every CSS prop and curated shorthands—each with discoverable `.options`.

Expose `sj` to your template for autocomplete:

```ts
import { Component } from '@angular/core';
import { SjDirective, sj } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-sj-api',
  imports: [SjDirective],
  template: `
    <div [sj]="[
      sj.display(sj.display.options.flex),
      sj.flexDirection({ xs: sj.flexDirection.options.column, md: sj.flexDirection.options.row }),
      sj.justifyContent(sj.justifyContent.options.center),
      sj.alignItems(sj.alignItems.options.center),
      sj.p(2),
      sj.bg(sj.bg.options.primary.main)
    ]">Using sjRootApi</div>
  `,
})
export class SjApiComponent {
  readonly sj = sj; // expose to template
}
```

Highlights:

- `sj.<cssProp>(value)` for any CSS prop, plus shorthands like `sj.p`, `sj.bg`, `sj.c`, `sj.gap`.
- `.options` reveals common, typed values (e.g., `sj.display.options.flex`, `sj.position.options.absolute`).
- Works in arrays; combine with plain objects freely.

See the full API: [sj API](sj-api.md) and [Styling shortcuts](styling-shortcuts.md).

## 5) Pseudo‑selectors two ways

You can write pseudo‑selectors inline with `&:` or use helpers that accept a style or an array of styles.

```html
<button [sj]="{
  p: 1,
  bg: 'secondary.main',
  color: 'secondary.contrast',
  '&:hover': { bg: 'secondary.dark' },
  '&:active': { transform: 'scale(0.98)' }
}">Click</button>
```

Or with helpers:

```html
<button [sj]="[
  sj.p(1),
  sj.bg('secondary.main'),
  sj.c('secondary.contrast'),
  sj.hover([ sj.bg('secondary.dark') ]),
  sj.active({ transform: 'scale(0.98)' })
]"></button>
```

## 6) Reuse styles from TypeScript

Define `SjStyle` objects in code and compose them in the template. You can also compose in TS with `sj.compose(...)`.

```ts
import { SjStyle, sj } from 'super-jss';

const cardBase: SjStyle = sj.compose(
  sj.p(1),
  sj.brad(0.5),
  sj.bg('light.light')
);

const cardPrimary: SjStyle = sj.compose(
  cardBase,
  sj.bg('primary.main'),
  sj.c('primary.contrast')
);
```

## Where to go next

- Discover all functions and `.options`: [sj API](sj-api.md)
- Popular shorthands: [Styling shortcuts](styling-shortcuts.md)
- Responsive techniques: [Responsive Style](responsive-style.md)
- Themes and tokens: [Theming](theming.md)

Tip: You can also use the prebuilt components and blueprints for faster starts. See the homepage Quick Start and [Components](components/_index.md).
