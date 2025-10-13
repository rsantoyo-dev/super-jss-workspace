---
title: sj-paper Component
---

# sj-paper

sj-paper is a visual surface with simple variants and a few ergonomic sugars for padding, rounding, and colors.

## Usage

```html
<!-- Neutral surface (no spacing/rounding) -->
<sj-paper variant="flat">Content</sj-paper>

<!-- Padding only (compact) -->
<sj-paper usePadding="compact">Content</sj-paper>

<!-- Comfortable padding + rounded; override via [sj] if needed -->
<sj-paper usePadding="comfortable" useRounded="comfortable" [sj]="{ gap: 0 }">
  Content
</sj-paper>

<!-- Color sugars (base component): tint vs paint -->
<sj-paper [useBg]="'primary'" [useColor]="'auto'">Tinted surface</sj-paper>
<sj-paper variant="outlined" usePaint="primary">Outlined paint</sj-paper>
<sj-paper variant="filled" usePaint="primary">Filled paint</sj-paper>

<!-- Override anything via [sj] (always wins) -->
<sj-paper [sj]="{ p: 0, brad: 0 }">Content</sj-paper>
```

## Inputs

- `variant`: `flat | outlined | filled`
- `usePadding`: `1|2|3|4 | 'compact'|'default'|'comfortable'|'spacious'|'none'|true|''` — theme density for padding
- `useRounded`: `1|2|3|4 | 'compact'|'default'|'comfortable'|'spacious'|'none'|true|''` — theme density for border radius
- `useBg`: `string | 'none'` — background token or CSS color; e.g., `primary`, `primary.light`, `#222`, `white`
- `useColor`: `string | 'auto' | 'none'` — text color token or CSS color; `auto` picks `<family>.contrast` when `useBg` is a palette token
- `usePaint`: `'none'|'auto'|palette` — full paint override; behavior depends on `variant`:
  - `filled`/`default`: bg=`<family>.main`, color=`<family>.contrast`
  - `outlined`: border/text=`<family>.main` (transparent bg)
  - `flat`: text=`<family>.main`
- `component`: render element tag (default `'div'`)
- `host`: if `true`, apply styles to the parent and remove the wrapper
- `[sj]`: fine-grained overrides (merges last and takes precedence)

### Precedence and merge order

For sj-paper, styles merge in this order:

1. Variant defaults (e.g., `outlined`, `filled`)
2. Paper sugars: padding, rounded (via theme densities)
3. Base sugars: `useBg`/`useColor` (can override variant background)
4. `[sj]` input (always final)


## Theme hooks

Customize density maps under `theme.components.surfaces` (padding, radius). Values are numbers/responsive numbers that flow through `theme.spacing()`.

## Host mode

```html
<!-- Apply surface to the parent element (wrapperless) -->
<div>
  <sj-paper host usePadding="default">
    Content
  </sj-paper>
  <!-- sj-paper removes itself; the <div> becomes the surface -->
  <!-- content becomes the parent’s children -->
</div>
```
