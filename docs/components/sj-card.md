---
title: sj-card Component
---

# sj-card

sj-card is a lean surface wrapper. It forwards to `<sj-paper>` under the hood and focuses on surface styling — not layout. Use `<sj-flex>` or `[sj]` inside the card for layout.

Usage

```html
<sj-card variant="flat" usePadding="default">
  <h3 [sj]="{ m: 0 }">Title</h3>
  <p [sj]="{ m: 0 }">Body</p>
  <sj-button [variant]="'outlined'" [sj]="{ px: 1 }">Action</sj-button>
  <!-- content -->
  <!-- footer -->
  <small [sj]="{ c: 'neutral' }">Meta</small>
  <!-- ... -->
</sj-card>
```

API

| Input      | Type                                                       | Description                                      |
|------------|------------------------------------------------------------|--------------------------------------------------|
| `variant`  | `'flat'|'outlined'|'elevated'|'interactive'`               | Surface style and behavior                       |
| `usePaint` | `'none'|'auto'|paletteFamily`                              | Full paint override; variant decides how to apply|
| `usePadding`| `1\|2\|3\|4|'compact'|'default'|'comfortable'|'spacious'|'none'` | Container padding from theme surfaces            |
| `useRounded`| `1\|2\|3\|4|'compact'|'default'|'comfortable'|'spacious'|'none'` | Border radius from theme surfaces                |
| `sj`       | `SjStyle\|SjStyle[]`                                       | Merges last; can override anything               |

Variants

- flat
- outlined
- elevated (adds shadow)
- interactive (hover raise)

Override precedence

- The [sj] input merges after the variant, so your styles win.

Notes

- For subtle color, prefer `[sj]="sj.bg('<family>.light')"` and `sj.c('...')`. For full color, use `usePaint`.
- Layout is not part of the card API. Use `<sj-flex>` or `[sj]` inside the card for stacks/rows.
