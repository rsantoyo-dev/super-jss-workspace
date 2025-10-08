---
title: sj-button Component
---

# sj-button

`<sj-button>` is a surface-aware button component. It uses theme surfaces for padding/radius and provides simplified variants.

Usage

```html
<!-- Filled (default) -->
<sj-button>
  <sj-typography variant="span">Primary</sj-typography>
  <!-- Use sj-typography for theme font/size -->
  <!-- Color defaults to palette.primary -->
</sj-button>

<!-- Outlined secondary -->
<sj-button variant="outlined" color="secondary">
  <sj-typography variant="span">Outlined</sj-typography>
  <!-- Border uses palette.secondary.main -->
</sj-button>

<!-- Flat link-style -->
<sj-button variant="flat">
  <sj-typography variant="span">Flat</sj-typography>
</sj-button>

<!-- Router selection (active) -->
<sj-button routerLink="/home" routerLinkActive="active">
  <sj-typography variant="span">Home</sj-typography>
</sj-button>
```

API

| Input     | Type                       | Description                                        |
|-----------|----------------------------|----------------------------------------------------|
| `variant` | `'filled'\|'outlined'\|'flat'` | Visual variant (default `'filled'`)                 |
| `color`   | `keyof SjPalette`          | Palette key for accents (default `'primary'`)       |
| `density` | `1\|2\|3\|4`               | Surface density for padding/radius (default `2`)    |
| `sj`      | `SjStyle\|SjStyle[]`       | Overrides merged last                               |

States

- `:hover` → subtle lift; `:active` returns to rest
- `:focus-visible` → 2px outline with palette color
- Selected (persistent): `.active`, `[aria-current="page"]`, `.selected` → subtle background + lift + soft shadow

Notes

- Labels: wrap text with `<sj-typography variant="span">` to adopt theme typography
- Surface sizing: padding/radius come from theme surfaces (density)
- `[sj]` overrides always merge last
