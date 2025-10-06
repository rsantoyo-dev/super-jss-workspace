---
title: sj-paper Component
---

# sj-paper

sj-paper is a visual surface with simple variants and density-driven defaults.

Usage

```html
<!-- Neutral surface (no spacing/rounding) -->
<sj-paper variant="flat">Content</sj-paper>

<!-- Apply default spacing (density 2) to padding/gap/rounded -->
<sj-paper useSurface [density]="sj.density.options.default">Content</sj-paper>

<!-- Compact padding only -->
<sj-paper usePadding [density]="sj.density.options.compact">Content</sj-paper>

<!-- Comfortable padding + rounded; override child spacing via [sj] -->
<sj-paper usePadding useRounded [density]="sj.density.options.comfortable" [sj]="{ gap: 0 }">
  Content
</sj-paper>

<!-- Override anything via [sj] (always wins) -->
<sj-paper useSurface [sj]="{ p: 0, brad: 0 }">Content</sj-paper>
```

Inputs

- `variant`: `flat | outlined | filled`
- `useSurface`: boolean — enables padding + gap + rounded using current `density`
- `usePadding`, `useGap`, `useRounded`: boolean — enable per concern
- `density`: 1 | 2 | 3 | 4 (default 2). Prefer tokens: `sj.density.options.compact|default|comfortable|spacious`.
- `[sj]`: fine-grained overrides (merges last)

Tokens

- `sj.density.options.compact` → 1
- `sj.density.options.default` → 2
- `sj.density.options.comfortable` → 3
- `sj.density.options.spacious` → 4

Theme overrides

Customize density maps via your theme under `components.surfaces` (padding, gap, radius). Values are numbers/responsive numbers that flow through `theme.spacing()`.
