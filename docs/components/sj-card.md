---
title: sj-card Component
---

# sj-card

sj-card is a surface component with card variants. By default it styles its own element; you can also enable host mode to apply styles to the parent element (wrapperless).

Usage

```html
<sj-card [variant]="'flat'" [sj]="[ sj.gap(0.5) ]">
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

| Input    | Type                   | Description                                    |
|----------|------------------------|------------------------------------------------|
| `variant`| `SjCardVariant\|string` | Card variant (e.g., 'flat', 'elevated', ...)   |
| `sj`     | `SjStyle\|SjStyle[]`    | Additional styles merged after the variant     |
| `useSurface` | `boolean`            | Enable density-driven padding + gap + rounded  |
| `usePadding` | `boolean`            | Enable density padding only                    |
| `useGap`     | `boolean`            | Enable density gap only                        |
| `useRounded` | `boolean`            | Enable density border radius only              |
| `density`    | `1\|2\|3\|4`         | Density level (default 2); prefer tokens       |
| `host`       | `boolean`             | If true, apply styles to parent element and remove wrapper |

Variants

- default
- outlined
- flat
- elevated
- interactive
- primary, secondary
- info, codeSnippet

Override precedence

- The [sj] input merges after the variant, so your styles win.

Host mode

```html
<div>
  <sj-card host useSurface [variant]="'elevated'">
    Content
  </sj-card>
  <!-- sj-card removes itself; the <div> becomes the card surface -->
</div>
```
