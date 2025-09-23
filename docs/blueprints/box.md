# Box Blueprint

Box blueprints in Super JSS offer a composable flexbox foundation built for fast layout experimentation. The `sjBox` API follows the same ergonomic pattern as the card blueprint: call the function for a default flex container, or use dot-variants for common layouts.

## Table of Contents
1. [Basic Usage](#basic-usage)
2. [Layout Variants](#layout-variants)
3. [Composing With `with`](#composing-with-with)

## Basic Usage

The `sjBox` blueprint is a function that returns an `SjStyle` object. You can apply it directly to a `<div>` or any other element using the `[sj]` directive.

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

## Layout Variants

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
- `sjBox.centered()` – centers items both axes
- `sjBox.middle()` – column direction + centered
- `sjBox.between()` / `.around()` / `.evenly()` – spacing utilities
- `sjBox.wrap()` / `.nowrap()` – control wrapping behaviour
- `sjBox.grow()` – fluid child that fills remaining space

## Composing With `with`

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
