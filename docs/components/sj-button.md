---
title: sj-button Component
---

# sj-button

sj-button renders a button styled via the button blueprint. It accepts a variant and [sj] overrides that merge after the variant.

Usage

```html
<sj-button variant="outlined" [sj]="{ px: 1, py: 0.5 }">
  Outlined
</sj-button>

<sj-button variant="containedPrimary" [sj]="{ px: 1 }">Primary</sj-button>
```

API

| Input    | Type                      | Description                                    |
|----------|---------------------------|------------------------------------------------|
| `variant`| `SjButtonVariant\|string` | Button variant (e.g., 'outlined', 'danger', ...) |
| `sj`     | `SjStyle\|SjStyle[]`      | Additional styles merged after the variant     |

Variants

- default (contained primary)
- light, contained, outlined
- containedPrimary, containedSecondary, containedLight, containedDark
- danger

Notes

- [sj] overrides are merged after the variant so you can adjust spacing, colors, etc.
