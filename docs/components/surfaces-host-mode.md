---
title: Surfaces — Host vs Normal
---

# Surfaces: Host vs Normal

`<sj-paper>` can style itself (normal) or style its parent element (host mode). Host mode removes the wrapper so the parent becomes the surface.

Why host mode?
- Wrapperless DOM when you need to style an existing container
- Keep semantics (e.g., style a native `<section>` or `<a>`)

Normal usage (self-styled)

```html
<sj-paper variant="flat" usePadding="default" useRounded="default">
  Content
  <!-- The <sj-paper> element is the surface -->
</sj-paper>
```

Host mode (wrapperless)

```html
<div>
  <sj-paper host variant="elevated" usePadding="default" useRounded="default">
    Content
  </sj-paper>
  <!-- sj-paper removes itself; the <div> becomes the surface -->
</div>
```

Live demo

<iframe
  src="https://sjssdemo.netlify.app/hero"
  style="width: 100%; height: 520px; border: 1px solid var(--md-default-fg-color--lightest); border-radius: 8px;"
  loading="lazy"
></iframe>

Notes

- Use `usePadding` and `useRounded` with density tokens ('compact'|'default'|'comfortable'|'spacious' or 1..4).
- `[sj]` overrides always merge last.
- Cards forward to paper internally; host mode is provided by `<sj-paper>`.
