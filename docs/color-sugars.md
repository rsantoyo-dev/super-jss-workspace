---
title: Color sugars (useBg/useColor)
---

All base components (e.g., `<sj-paper>`, `<sj-flex>`) support two ergonomic color inputs:

- `useBg`: sets the background color
- `useColor`: sets the text color

These sugars reuse the same token system as `[sj]`, so you can pass either:

- Palette tokens: `primary`, `primary.light`, `secondary.dark`, `light.light`, etc.
- Raw CSS colors: `#111`, `white`, `rgb(0 0 0 / 0.5)`, etc.

## Auto-contrast

When `useBg` is a palette token, setting `useColor="auto"` automatically applies `<family>.contrast` for accessible text. For example:

```html
<sj-paper [useBg]="'primary'" [useColor]="'auto'">Readable on primary</sj-paper>
```

If you provide an explicit `useColor` (e.g., `useColor="white"`), your value is used. The `[sj]` input always merges last and can override both.

## Precedence

- `[sj]` overrides everything
- Component sugars (like variant defaults, padding styles) come before base color sugars
- Base sugars (`useBg`, `useColor`) override component defaults

This ensures you can quickly set a background/text color without losing the ability to refine styles with `[sj]`.

## Tips

- Use tokens for theme-aware colors and automatic contrast.
- Use raw CSS colors for ad-hoc shades or one-off demos.
- Set `useColor='none'` to skip text color if you only want to change the background.
