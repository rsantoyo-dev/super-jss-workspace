# Box Blueprint

Blueprints are ergonomic factory functions that return styles. The Box blueprint gives you flex/grid layouts with sensible defaults. If this concept is new, start at the [Blueprints overview](./_index.md). You can use `sjBox` directly or via the root `sj` API for autocomplete and composition.

## Table of Contents
- [Box Blueprint](#box-blueprint)
  - [Table of Contents](#table-of-contents)
  - [Basic usage](#basic-usage)
  - [Using with sj root API](#using-with-sj-root-api)
  - [Layout variants](#layout-variants)
  - [Composing with `with`](#composing-with-with)

## Basic usage

The `sjBox` blueprint returns an `SjStyle`. Apply it with the `[sj]` directive.

```typescript
import { Component } from '@angular/core';
import { SjDirective, sjBox } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-my-box',
  imports: [SjDirective],
  template: `
    <div [sj]="sjBox()">
      <p>This is a box.</p>
    </div>
  `
})
export class MyBoxComponent {
  protected readonly sjBox = sjBox;
}
```

## Using with sj root API

Expose `sj` for template autocomplete and compose with other helpers.

```ts
import { Component } from '@angular/core';
import { SjDirective, sj } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-my-box-api',
  imports: [SjDirective],
  template: `
    <div [sj]="[
      sj.sjBox.column({ gap: { xs: 0.5, md: 1 } }),
      sj.p({ xs: 1, md: 2 }),
      sj.bg(sj.bg.options.light.light)
    ]">
      Column with gap and padding
    </div>

    <div [sj]="sj.sjBox.centered({ minH: '50vh' })">
      Perfectly centered
    </div>
  `,
})
export class MyBoxApiComponent {
  readonly sj = sj;
}
```

## Layout variants

Each variant still accepts overrides, so responsive values remain fully supported.

```typescript
<div [sj]="sjBox.column({ gap: { xs: 0.5, md: 1 } })">
  <span>Stacked item A</span>
  <span>Stacked item B</span>
</div>

<div [sj]="sjBox.centered({ minH: '50vh' })">
  <span>Perfectly centered</span>
</div>

<div [sj]="sjBox.wrap({ gap: 0.75 })">
  <ng-container *ngFor="let chip of chips">
    <span [sj]="sjBox.grow({ bg: 'light.main', px: 0.75, py: 0.25 })">{{ chip }}</span>
  </ng-container>
</div>
```

Available helpers:

- `sjBox.row()` – horizontal flow (default)
- `sjBox.column()` – vertical stacking
- `sjBox.grid()` – 2-column grid (25% / 75%) for sidebar layouts
- `sjBox.centered()` – centers items both axes
- `sjBox.middle()` – column direction + centered
- `sjBox.between()` / `.around()` / `.evenly()` – spacing utilities
- `sjBox.wrap()` / `.nowrap()` – control wrapping behaviour
- `sjBox.grow()` – fluid child that fills remaining space

## Composing with `with`

Need a reusable preset? Compose partial styles and reuse them across views.

```typescript
const heroLayout = sjBox.with(
  { fxJustify: 'center', fxAItems: 'center' },
  { minH: '70vh', px: { xs: 1, md: 2 } },
  { bg: 'primary.main', c: 'primary.contrast' }
);

<section [sj]="heroLayout({ gap: { xs: 1, lg: 2 } })"></section>
```

You can still pass responsive overrides when you finally render:

```typescript
<section [sj]="heroLayout({ fxDir: { xs: 'column', md: 'row' } })">
  ...
</section>
```

Tip: You can also combine with `sj` helpers in arrays:

```html
<section [sj]="[ heroLayout(), sj.gap(1), sj.p({ md: 2 }) ]"></section>
```
