# `<sj-box>`

`<sj-box>` is the component equivalent of the `sjBox` blueprint. It no longer exposes layout inputs like `display` or `gap`; all styling is applied via the `[sj]` directive using the root `sj` API or plain style objects. Because it's already a box, you don't need to call `sjBox`—use direct helpers like `sj.fxDir`, `sj.gap`, `sj.justifyContent`, and `sj.alignItems`.

## Quick start

```html
<sj-box [sj]="[ sj.fxDir(sj.fxDir.options.column), sj.gap(1) ]">
  <h2>Profile</h2>
  <p>Contact info and preferences</p>
</sj-box>
```

Style it through `[sj]` using the `sj.*` helpers and compose freely with arrays.

## API

| Input | Type                     | Description                             |
| ----- | ------------------------ | --------------------------------------- |
| `sj`  | `SjStyle \| SjStyle[]` | Styles applied to the host container.   |

## Compose with sj helpers

Compose any layout you need using `sj.*` helpers. Later entries override earlier ones.

```html
<sj-box [sj]="[
  sj.fxDir(sj.fxDir.options.row),
  sj.gap({ xs: 0.5, md: 1 }),
  sj.justifyContent(sj.justifyContent.options.center),
  sj.alignItems(sj.alignItems.options.center),
  sj.p({ xs: 1, md: 2 }),
  sj.bg(sj.bg.options.light.light)
]">
  <ng-container *ngFor="let item of items">
    <div [sj]="{ p: 0.5, brad: 0.5, bg: 'light.main' }">{{ item }}</div>
  </ng-container>
</sj-box>
```

## Notes

- `<sj-box>` is standalone; import it directly or via your shared components
  module.
- Styles are applied via `SjDirective`, so shorthand helpers and responsive values work the same as with any element.
- Need even more control? You can still drop down to the `sjBox` blueprint and pass the result to `[sj]` directly.
