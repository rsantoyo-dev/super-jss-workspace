# `<sj-icon>`

`<sj-icon>` renders SVG icons with theme-aware styling. It provides a collection of built-in icons that automatically adapt to your theme colors.

## Quick start

```html
<sj-icon name="star"></sj-icon>
<sj-icon name="heart" [sj]="{ color: 'primary.main' }"></sj-icon>
<sj-icon name="check" size="2rem" fill="green"></sj-icon>
```

## Available icons

The component includes a curated set of icons. Common ones include:

- `star`, `heart`, `check`, `close`, `menu`, `search`
- `sun`, `moon`, `user`, `settings`, `bell`
- `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`
- `plus`, `minus`, `edit`, `trash`, `download`, `upload`

## Inputs

| Input         | Type              | Description                              |
| ------------- | ----------------- | ----------------------------------------- |
| `name`        | `SjIconName`      | Icon identifier                          |
| `size`        | `string \| number` | Icon size (CSS units)                    |
| `fill`        | `string`          | Fill color (theme tokens or CSS colors)  |
| `stroke`      | `string`          | Stroke color                             |
| `fillOpacity` | `number`          | Fill opacity (0-1)                       |
| `strokeOpacity` | `number`        | Stroke opacity (0-1)                     |
| `ariaHidden`  | `boolean`         | Hide from screen readers (default: true) |
| `role`        | `string \| null`  | ARIA role                                |
| `label`       | `string \| null`  | Accessible label                         |
| `sj`          | `SjInput`         | Additional style overrides               |

## Usage examples

### Basic icons

```html
<sj-icon name="star"></sj-icon>
<sj-icon name="heart"></sj-icon>
<sj-icon name="check"></sj-icon>
```

### Themed icons

```html
<sj-icon name="sun" [sj]="{ color: 'warning.main' }"></sj-icon>
<sj-icon name="moon" fill="primary.main"></sj-icon>
<sj-icon name="bell" stroke="secondary.main" fillOpacity="0.8"></sj-icon>
```

### Different sizes

```html
<sj-icon name="star" size="1rem"></sj-icon>
<sj-icon name="star" size="2rem"></sj-icon>
<sj-icon name="star" size="3rem"></sj-icon>
```

### Accessible icons

```html
<sj-icon name="warning" ariaHidden="false" label="Warning message" role="img"></sj-icon>
```

### With custom styling

```html
<sj-icon name="check" size="1.5rem" [sj]="{ color: 'success.main', cursor: 'pointer' }" (click)="handleClick()"></sj-icon>
```

## Notes

- `<sj-icon>` is standalone; import it directly or via `SJ_BASE_COMPONENTS_IMPORTS`
- Icons automatically adapt to theme changes
- Use theme tokens for `fill` and `stroke` to maintain consistency
- Set `ariaHidden="false"` and provide `label` for interactive or decorative icons
- Icons are rendered as inline-flex elements with zero line-height
