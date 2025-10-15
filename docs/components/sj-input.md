---
title: sj-input Component
---

# sj-input

`<sj-input>` is a minimal, theme-aware text input that follows the same surface + density + paint patterns as `<sj-paper>` and `<sj-button>`. It renders a native `<input>` inside an SJ surface so you get predictable variants, spacing, and focus rings with a small API.

## Usage

```html
<!-- Outlined input with default spacing/rounding -->
<sj-input variant="outlined" usePadding="default" useRounded="default" placeholder="Email"></sj-input>

<!-- Filled paint + full width -->
<sj-input variant="filled" usePaint="primary" fullWidth placeholder="Search"></sj-input>

<!-- Flat variant (no border), author text size via [sj] -->
<sj-input variant="flat" [sj]="[ sj.fs('1rem') ]" placeholder="Promo code"></sj-input>
```

## Prefix/Suffix

Project content using the `prefix` / `suffix` attributes.

```html
<sj-input variant="outlined" usePadding="default" useRounded="default" placeholder="Search">
  <sj-icon prefix name="superJson" size="1rem"></sj-icon>
  <span suffix [sj]="[ sj.c('neutral.dark') ]">@</span>
  <!-- Any element with the attribute prefix/suffix is projected -->
</sj-input>
```

## Inputs

- `variant`: `'outlined' | 'filled' | 'flat'` — visual style (outlined default)
- `type`: `'text'|'email'|'password'|'search'|'number'|'url'` — native input type
- `usePadding`: `1|2|3|4|'compact'|'default'|'comfortable'|'spacious'|'none'` — control padding via surface density
- `useRounded`: `1|2|3|4|'compact'|'default'|'comfortable'|'spacious'|'none'` — border radius via surface density
- `usePaint`: `'none'|'auto'|palette` — full paint override. Behavior by variant:
  - filled: bg=`<family>.main`, color=`<family>.contrast`
  - outlined: border/text=`<family>.main`, transparent bg
  - flat: text=`<family>.main`
- `fullWidth`: boolean — makes the control width 100%
- `disabled`: boolean — dims + disables interactions
- `invalid`: boolean — shows an error border/outline (uses theme `error.main`)
- `placeholder`: string — native placeholder
- `value`: string — current value; use `(valueChange)` for two-way binding
- `sj`: `SjStyle | SjStyle[]` — container overrides (merged last)

## States

- `:hover` — subtle background on flat/outlined
- `:focus-within` — 2px outline using `usePaint` family (or theme primary)
- `:disabled` — reduced opacity and pointer-events disabled
- `invalid` — outlined: borderColor = `error.main`; others: outline = `error.main`

## Notes

- The native `<input>` inside inherits font and color; customize with `[sj]` (e.g., `sj.fs('1rem')`).
- Placeholder uses `neutral.dark` at a reduced opacity; override via `[sj]` if desired.
- Prefix/suffix are opt-in slots; the component doesn’t reserve space unless they’re projected.

