# `<sj-typography>`

`<sj-typography>` provides consistent text styling with semantic variants. It renders text elements with predefined typography styles that follow your theme's design system.

## Quick start

```html
<sj-typography variant="h1">Main Heading</sj-typography>
<sj-typography variant="body">Regular body text content</sj-typography>
<sj-typography variant="caption">Small caption text</sj-typography>
```

## Variants

| Variant    | Description                          |
| ---------- | ------------------------------------ |
| `h1`       | Largest heading, main page titles    |
| `h2`       | Section headings                     |
| `h3`       | Subsection headings                  |
| `h4`       | Smaller headings                     |
| `h5`       | Small headings                       |
| `h6`       | Smallest headings                    |
| `p`        | Paragraph text                       |
| `span`     | Inline text                          |
| `strong`   | Bold/emphasized text                 |
| `body`     | Default body text                    |
| `caption`  | Small descriptive text               |
| `small`    | Fine print, legal text               |
| `pre`      | Preformatted text                    |
| `default`  | Unstyled text (inherits from parent) |

## Inputs

| Input     | Type                  | Description                          |
| --------- | --------------------- | ------------------------------------ |
| `variant` | `SjTypographyVariant` | Typography style variant             |
| `sj`      | `SjInput`             | Additional style overrides           |

## Usage examples

### Headings hierarchy

```html
<sj-typography variant="h1">Page Title</sj-typography>
<sj-typography variant="h2">Section Title</sj-typography>
<sj-typography variant="h3">Subsection Title</sj-typography>
<sj-typography variant="h4">Component Title</sj-typography>
```

### Mixed content

```html
<sj-typography variant="body">
  This is regular body text with <sj-typography variant="strong">bold emphasis</sj-typography> and
  <sj-typography variant="caption">caption text</sj-typography>.
</sj-typography>
```

### Custom styling

```html
<sj-typography variant="h2" [sj]="{ color: 'primary.main', textAlign: 'center' }">
  Centered Primary Heading
</sj-typography>
```

## Notes

- `<sj-typography>` is standalone; import it directly or via `SJ_BASE_COMPONENTS_IMPORTS`
- Variants follow semantic HTML conventions but with consistent theme-based styling
- Use `[sj]` input for additional customizations that override the variant styles
