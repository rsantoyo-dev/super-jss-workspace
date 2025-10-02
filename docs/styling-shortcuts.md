# Styling shorthands

SJSS provides a small, curated set of shorthands that cover the most common layout and spacing needs. You can always use any full CSS property in camelCase as well.

Tip: Every shorthand accepts responsive values too, e.g. `p: { xs: 1, md: 2 }`.

## Example in a component

```ts
import { Component } from '@angular/core';
import { SjDirective } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-shorthand-demo',
  imports: [SjDirective],
  template: `
    <div [sj]="{
      py: 1,
      px: 2,
      m: 2,
      border: '1px solid black',
      d: 'flex',
      fxJustify: 'center',
      fxAItems: 'center',
      gap: 1,
      bg: '#aa5645'
    }">
      Welcome to Super JSS!
    </div>
  `,
})
export class ShorthandDemoComponent {}
```

Prefer typed values and autocomplete? Use the root `sj` helper functions with `.options`:

```html
<div [sj]="[
  sj.d(sj.d.options.flex),
  sj.fxDir(sj.fxDir.options.row),
  sj.fxJustify(sj.fxJustify.options.center),
  sj.fxAItems(sj.fxAItems.options.center),
  sj.p(2), sj.gap(1), sj.bg(sj.bg.options.primary.light)
]"></div>
```

## Shorthand reference

### Spacing

| Shorthand | CSS Property                         | Description          |
|-----------|--------------------------------------|----------------------|
| `p`       | `padding`                            | Padding (all sides)  |
| `pt`      | `paddingTop`                         | Padding top          |
| `pr`      | `paddingRight`                       | Padding right        |
| `pb`      | `paddingBottom`                      | Padding bottom       |
| `pl`      | `paddingLeft`                        | Padding left         |
| `px`      | `paddingLeft`, `paddingRight`        | Horizontal padding   |
| `py`      | `paddingTop`, `paddingBottom`        | Vertical padding     |
| `m`       | `margin`                             | Margin (all sides)   |
| `mt`      | `marginTop`                          | Margin top           |
| `mr`      | `marginRight`                        | Margin right         |
| `mb`      | `marginBottom`                       | Margin bottom        |
| `ml`      | `marginLeft`                         | Margin left          |
| `mx`      | `marginLeft`, `marginRight`          | Horizontal margin    |
| `my`      | `marginTop`, `marginBottom`          | Vertical margin      |
| `gap`     | `gap`                                | Gap between items    |

### Sizes

| Shorthand | CSS Property   | Description       |
|-----------|----------------|-------------------|
| `w`       | `width`        | Width             |
| `h`       | `height`       | Height            |
| `minW`    | `minWidth`     | Minimum width     |
| `minH`    | `minHeight`    | Minimum height    |
| `maxW`    | `maxWidth`     | Maximum width     |
| `maxH`    | `maxHeight`    | Maximum height    |

### Borders / radius

| Shorthand | CSS Property    | Description     |
|-----------|-----------------|-----------------|
| `brad`    | `borderRadius`  | Border radius   |

Note: Use full CSS properties for borders (e.g., `border`, `borderTop`, `borderColor`, ...).

### Colors

| Shorthand | CSS Property      | Description       |
|-----------|-------------------|-------------------|
| `bg`      | `backgroundColor` | Background color  |
| `c`       | `color`           | Text color        |

### Flexbox quick layout

| Shorthand   | CSS Property     | Description        |
|-------------|------------------|--------------------|
| `d`         | `display`        | Display            |
| `fxDir`     | `flexDirection`  | Flex direction     |
| `fxJustify` | `justifyContent` | Main‑axis align    |
| `fxAItems`  | `alignItems`     | Cross‑axis align   |

Discover typed options on these shorthands via `sj.*.options` (e.g., `sj.d.options.flex`, `sj.fxDir.options.row`, `sj.bg.options.primary.main`).

---

[⬅️ Previous: Basic Usage](basic-usage.md) | [Next: Responsive Styling ➡️](responsive-style.md)
