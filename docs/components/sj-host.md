# `<sj-host>`

`sj-host` is a small utility component that lets you apply Super JSS styles when
you need a helper wrapper (dynamic component host, layout slots, etc.) without
leaving extra DOM once rendered.

## When to use it

- You are creating components dynamically and need a predictable anchor to
  attach `[sj]` styles.
- You want a shorthand wrapper that merges with its parent instead of adding a
  real `<div>`.
- You need to expose a `ViewContainerRef` for projected/dynamic child content
  while keeping the `sj` directive behaviour.

## Usage

```html
<sj-host [sj]="sjBox.column({ gap: 1 })">
  <h2>Settings</h2>
  <app-settings-panel></app-settings-panel>
</sj-host>
```

- Styles passed through `[sj]` are applied to the *parent* element once the
  component renders. The `<sj-host>` tag removes itself after projection.
- Slots (`<ng-content>`) render normally; you can combine text, components, and
  layout helpers freely.

## API

| Input | Type                     | Description                               |
| ----- | ------------------------ | ----------------------------------------- |
| `sj`  | `SjStyle \| SjStyle[]` | Styles forwarded to the parent element.   |

## Notes

- Because the styles move to the parent, make sure the parent is the element you
  intend to style (e.g., wrap in another div if you need isolation).
- `sj-host` depends on `SjDirective`, so all shorthand/responsive features are
  available.
- The component exposes the underlying `ViewContainerRef` should you need it
  when instantiating components programmatically.
