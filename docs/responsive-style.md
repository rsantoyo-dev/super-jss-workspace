# Responsive styling

Every property in SJSS accepts a responsive object: `{ xs, sm, md, lg, xl, xxl }`. Values cascade up—smaller breakpoints apply to larger ones unless overridden.

## Examples

Inline object

```html
<div [sj]="{
  p: { xs: 1, md: 2 },
  backgroundColor: { xs: 'light.light', md: 'primary.main' },
  fontSize: { xs: 1, lg: 1.5 }
}">Responsive</div>
```

With sj helpers and arrays

```html
<div [sj]="[
  sj.p({ xs: 1, md: 2 }),
  sj.bg({ xs: 'light.light', md: 'primary.main' }),
  sj.d(sj.d.options.flex),
  sj.fxDir({ xs: sj.fxDir.options.column, md: sj.fxDir.options.row }),
  sj.justifyContent(sj.justifyContent.options.center),
  sj.alignItems(sj.alignItems.options.center)
]"></div>
```

On components (e.g., sj-paper)

```html
<sj-paper [sj]="[
  sj.d(sj.d.options.flex),
  sj.fxDir({ xs: sj.fxDir.options.column, md: sj.fxDir.options.row }),
  sj.gap({ xs: 0.5, md: 1 })
]"></sj-paper>
```

## Breakpoints

Default breakpoint tokens: `xs, sm, md, lg, xl, xxl`. You can customize numeric values in your theme.

Updating breakpoints at runtime

```ts
import { Component } from '@angular/core';
import { SjDirective, SjThemeService } from 'super-jss';

@Component({
  standalone: true,
  imports: [SjDirective],
  template: `<button (click)="update()" [sj]="sj.button.outlined({ px: 1 })">Update breakpoints</button>`
})
export class Demo {
  constructor(private sjTheme: SjThemeService) {}
  update() {
    this.sjTheme.setTheme({
      breakpoints: { sm: 660, md: 980 }
    });
  }
}
```

Notes

- Any property (shorthand or full CSS) can use a responsive object.
- Arrays merge left → right; responsive values are merged like regular ones.
- Prefer the root `sj` API for autocomplete and `.options`.

See also: [Basic usage](basic-usage.md), [SJ API](sj-api.md), and [Styling shortcuts](styling-shortcuts.md).

---
[⬅️ Previous: Styling Shortcuts](styling-shortcuts.md) | [Next: Colors ➡️](colors.md)
