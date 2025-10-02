---
title: sj-card Component
---

# sj-card

sj-card is a lightweight wrapper that applies a card blueprint to its parent via sj-host and accepts variant and [sj] overrides.

Usage

```html
<sj-card [variant]="'flat'" [sj]="[ sj.gap(0.5) ]">
  <h3 [sj]="{ m: 0 }">Title</h3>
  <p [sj]="{ m: 0 }">Body</p>
  <a [sj]="sj.sjButton.outlined({ px: 1 })">Action</a>
  <!-- content -->
  <!-- footer -->
  <small [sj]="{ c: 'neutral' }">Meta</small>
  <!-- ... -->
</sj-card>
```

API

| Input    | Type                   | Description                                    |
|----------|------------------------|------------------------------------------------|
| `variant`| `SjCardVariant\|string` | Card variant (e.g., 'flat', 'elevated', ...)   |
| `sj`     | `SjStyle\|SjStyle[]`    | Additional styles merged after the variant     |

Variants

- default (sjCard())
- outlined
- flat
- elevated
- interactive
- primary, secondary
- info, codeSnippet

Override precedence

- The [sj] input merges after the variant, so your styles win.

