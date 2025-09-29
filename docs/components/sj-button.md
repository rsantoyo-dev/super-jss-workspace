---
title: sj-button Component
---

# sj-button

sj-button renders a button styled via the button blueprint. It accepts a variant and [sj] overrides that merge after the variant.

Usage

```html
<sj-button [variant]="sj.variants.sjButton.outlined" [sj]="{ px: 1, py: 0.5 }">
  Outlined
</sj-button>

<sj-button [sj]="sj.button.containedPrimary({ px: 1 })">
  Primary
</sj-button>
```

Variants

- default (contained primary)
- light, contained, outlined
- containedPrimary, containedSecondary, containedLight, containedDark
- danger

Notes

- [sj] overrides are merged after the variant so you can adjust spacing, colors, etc.

