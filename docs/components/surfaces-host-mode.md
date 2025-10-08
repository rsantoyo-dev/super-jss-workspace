---
title: Surfaces — Host vs Normal
---

# Surfaces: Host vs Normal

Surfaces (`<sj-paper>`, `<sj-card>`) can either style themselves (normal) or style their parent element (host mode). Host mode removes the wrapper so the parent becomes the surface.

Why host mode?
- Wrapperless DOM when you need to style an existing container
- Keep semantics (e.g., style a native `<section>` or `<a>`)

Normal usage

```html
<sj-card useSurface variant="flat" [density]="sj.density.options.default">
  Content
  <!-- The <sj-card> element is the surface -->
  <!-- padding/gap/radius from theme surfaces -->
</sj-card>
```

Host mode (wrapperless)

```html
<div>
  <sj-card host useSurface variant="elevated">
    Content
  </sj-card>
  <!-- sj-card removes itself; the <div> becomes the surface -->
</div>
```

Live demo

<iframe
  src="https://sjssdemo.netlify.app/hero"
  style="width: 100%; height: 520px; border: 1px solid var(--md-default-fg-color--lightest); border-radius: 8px;"
  loading="lazy"
></iframe>

Notes
- `useSurface` enables padding+gap+rounded from the current `density`
- Individual toggles: `usePadding`, `useGap`, `useRounded`
- `[sj]` overrides always merge last

