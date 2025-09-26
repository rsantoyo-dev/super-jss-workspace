# `<sj-box>`

`<sj-box>` is the component equivalent of the `sjBox` blueprint. It renders a
flex container out of the box and exposes a handful of convenience inputs for
common flexbox knobs. Because it is powered by the same Super JSS pipeline you
can still pass responsive values and blueprint overrides when needed.

## Quick start

```html
<sj-box display="column" gap="1">
  <h2>Profile</h2>
  <p>Contact info and preferences</p>
</sj-box>
```

By default `<sj-box>` renders a `display: flex` container with row direction.
Pass any content into the slot and it will be laid out accordingly.

## Inputs

| Input       | Type                             | Description                               |
| ----------- | -------------------------------- | ----------------------------------------- |
| `display`   | `'row'`\|`'column'`\|`'grid'`    | Layout mode: flex row, flex column, or grid. |
| `justify`   | `SjStyle['justifyContent']`      | Horizontal alignment (`center`, `space-between`, …). |
| `align`     | `SjStyle['alignItems']`          | Vertical alignment of children.           |
| `wrap`      | `SjStyle['flexWrap']`            | Enables wrapping (`wrap`, `nowrap`, responsive). |
| `gap`       | `SjStyle['gap']`                 | Gap between children (numeric or responsive). |
| `bg`        | `SjStyle['bg']`                  | Background color. |
| `color`     | `SjStyle['c']`                   | Text color. |

All inputs accept responsive objects just like any other Super JSS style.

## Overrides and composition

If you need additional styles, pass them through `[sj]` like any other element:

```html
<sj-box display="column" gap="0.75" [sj]="{ p: { xs: '1rem', md: '2rem' } }">
  ...
</sj-box>
```

You can also feed arrays of styles and they will be merged from left to right.

## Notes

- `<sj-box>` is standalone; import it directly or via your shared components
  module.
- Under the hood it forwards styles to the `SjDirective`, so shorthand helpers
  and responsive behaviour behave exactly like the blueprint.
- Need even more control? You can still drop down to the `sjBox` blueprint and
  pass the result to `[sj]` directly.
