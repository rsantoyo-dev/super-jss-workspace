# FAQs — Super JSS (SJSS)

This FAQ consolidates the most common questions about Super JavaScript Stylesheets for Angular. If something is missing, open an issue — we’ll add it.

## Basics

- Q: What is SJSS in one sentence?
  - A: A tiny, Angular‑native CSS‑in‑JS approach that turns JavaScript style objects into atomic CSS classes at runtime, with theming, responsive breakpoints, and pseudo‑selectors.

- Q: Is SJSS the same as inline styles?
  - A: No. You author JS objects, but SJSS emits real CSS classes and injects them once (deduped). You get proper cascade, media queries, and pseudo‑selectors (like `:hover`, `:focus`).
  - See also: [Basic Usage](basic-usage.md)

- Q: What Angular versions are supported?
  - A: Angular 20 for best results (Signals). It can work on 15+, but Signals‑based reactivity is optimized for 20.

## Tailwind / Material / Other Tools

- Q: Isn’t Tailwind enough?
  - A: Tailwind is great, but ships a huge utility set whether you use it or not (you purge, but you still carry mental overhead). SJSS generates only what you use on demand. It’s also very natural in Angular templates with Signals and typed configs.
  - See also: [Basic Usage](basic-usage.md), [Responsive Styling](responsive-style.md)

- Q: Do I need Angular Material?
  - A: No. Use SJSS alone or combine them: SJSS for layout, tokens, and dynamic theming; Material for ready‑made components if you like.

- Q: How does SJSS compare to styled‑components or Emotion?
  - A: Those are component‑scoped CSS‑in‑JS for React. SJSS is Angular‑native, atomic, and signal‑driven. Similar flexibility (theming, pseudo‑selectors), different ecosystem and ergonomics.

## How It Works

- Q: How do I write styles?
  - A: Provide a style object (or an array of objects to compose) to `[sj]`. Numeric values go through the theme’s `spacing()`; strings pass through unchanged and can reference theme tokens.

  ```html
  <div [sj]="{
    d: 'flex', fxJustify: 'center',
    p: { xs: 1, md: 2 },          // responsive padding
    bg: 'primary.main',           // themed color
    '&:hover': { bg: 'primary.dark' }
  }"></div>
  ```
  - See also: [Basic Usage](basic-usage.md), [Styling Shortcuts](styling-shortcuts.md), [Examples](examples.md)

- Q: What are the class names like?
  - A: Atomic and predictable: `sj-{kebab-prop}-{value}`. Responsive: `sj-{prop}-{bp}-{value}`. Pseudo‑variant prefixes: `hover-sj-{prop}-{value}`.

  Examples:
  - `sj-bg-primary_main`
  - `sj-p-md-2`
  - `hover-sj-c-secondary_dark`
  - See also: [Basic Usage](basic-usage.md)

- Q: What tokens can I use for colors?
  - A: Palette (`primary.main`, `primary.dark`, `primary.contrast`, etc.) and scales (`blue.500`, `green.300`). Hex/rgb/hsl strings also work.
  - See also: [Colors](colors.md), [Palette](palette.md)

- Q: What shorthands are available?
  - A: Padding/margin (`p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml`), sizes (`w, h, minW, maxW, minH, maxH`), borders (`b, bt, br, bb, bl, bs, bw, bc, brad`), colors (`bg, c`), flexbox (`d, fxDir, fxWrap, fxFlow, fxJustify, fxAItems, fxAContent, fxOrder, fxGrow, fxShrink, fxBasis, fxASelf`).
  - See also: [Styling Shortcuts](styling-shortcuts.md)

- Q: How do responsive values work?
  - A: Provide an object with keys in your theme breakpoints (`xs, sm, md, lg, xl, xxl`). Each key emits a min‑width media rule.
  - See also: [Responsive Styling](responsive-style.md)

## Theming & Typography

- Q: How do I set or update the theme?
  - A: Inject `SjThemeService` and call `setTheme(partialTheme)`. It deep‑merges, clears CSS cache, and re‑applies.

  ```ts
  constructor(private th: SjThemeService) {}
  toggleDark() { this.isDark = !this.isDark; this.th.setTheme(this.isDark ? desertDarkTheme : defaultTheme); }
  ```
  - See also: [Theming](theming.md)

- Q: Can I pre‑configure a theme?
  - A: Yes, provide `SJ_THEME` with a theme at bootstrap/component level to set defaults.
  - See also: [Theming](theming.md)

- Q: Does SJSS apply default typography?
  - A: Yes. The directive auto‑applies default typography for tags like `H1…H6, P, SPAN, STRONG, BODY, CAPTION, SMALL`. Your `[sj]` styles merge on top.
  - See also: [Typography](typography.md)

- Q: How do I opt out of auto typography?
  - A: Options:
    - Override via `[sj]` (e.g., set your own `fontSize`, `lineHeight`, etc.).
    - Use a wrapper element that doesn’t match the auto tags.
    - Define a neutral `typography.default` in your theme.
  - See also: [Typography](typography.md)

## Units, Values, and Gotchas

- Q: Why is my `zIndex: 10` becoming `10rem`?
  - A: Numbers are interpreted via `spacing()` (by design). For unitless props (e.g., `zIndex`, `lineHeight`, `fontWeight`, `opacity`, `order`, `flexGrow`, `flexShrink`) pass strings: `'10'`, `'600'`, `'1.4'`.
  - See also: [Spacing](spacing.md)

- Q: Can I use raw CSS values?
  - A: Yes. Any string is emitted as‑is: `'2px solid'`, `'100%'`, `'calc(100vh - 64px)'`, `'rgba(0,0,0,.1)'`.
  - See also: [Basic Usage](basic-usage.md)

- Q: Pseudo‑selectors support?
  - A: Supported via nested `&:` keys (e.g., `&:hover`, `&:focus`). Complex combinators like `& > *` or `& + *` are not supported yet.
  - See also: [Styling Shortcuts](styling-shortcuts.md)

- Q: Custom media queries?
  - A: SJSS generates min‑width media queries based on your theme’s `breakpoints`. When you update the theme via `SjThemeService.setTheme({ breakpoints: ... })`, the CSS cache is cleared and rules are regenerated — so the new breakpoint values take effect automatically. Arbitrary media features (e.g., `print`, `prefers-reduced-motion`, `orientation`) are not supported yet.
  - See also: [Responsive Styling](responsive-style.md)

## Performance & CSS Output

- Q: How big does the CSS get?
  - A: Only what you use. Rules are deduped by class name and appended to a single `<style data-sjss>` tag. If you generate many unique values (e.g., hundreds of unique pixel values), you’ll grow the sheet accordingly.

- Q: How is reactivity handled?
  - A: Angular Signals. Breakpoint and theme changes re‑render affected elements and reuse cached classes.

- Q: How do I clear the CSS?
  - A: Theme changes call `clearCache()` automatically. You can inject `SjCssGeneratorService` and call `clearCache()` manually if needed.
  - See also: [Theming](theming.md)

## SSR & Browser Support

- Q: Does SSR work?
  - A: Client‑side is fully supported. SSR/Prerender is on the roadmap: collect generated CSS during server render, inline it with a nonce, and hydrate cache on the client to avoid flashes/duplication.

- Q: Browser support?
  - A: Evergreen browsers. No autoprefixer is bundled; modern CSS works as passed through. Add prefixes manually in style strings if you need legacy support.

## Interop & Best Practices

- Q: Can I use SJSS with Tailwind/Material/any CSS?
  - A: Yes. SJSS only adds classes; you can mix frameworks freely.

- Q: Will classes collide with mine?
  - A: Class names are namespaced with `sj-` and include property/value segments. Collisions are unlikely. Specificity is low (single class) — apply order controls which wins.

- Q: How to avoid over‑generation?
  - A: Prefer tokens (`blue.500`, `primary.main`) and spacing units instead of many ad‑hoc pixel strings. Reuse composed style objects and arrays (e.g., `sjCard()` helpers).
  - See also: [Styling Shortcuts](styling-shortcuts.md), [Colors](colors.md), [Spacing](spacing.md)

- Q: Sticky header example?
  - A:
  ```html
  <div [sj]="{ position: 'sticky', top: 0, zIndex: '1000' }">
    <app-header></app-header>
  </div>
  ```
  - See also: [Examples](examples.md)

- Q: Dynamic theme toggle?
  - A:
  ```ts
  isDark = false;
  constructor(private th: SjThemeService) {}
  toggle() { this.isDark = !this.isDark; this.th.setTheme(this.isDark ? desertDarkTheme : defaultTheme); }
  ```
  - See also: [Theming](theming.md)

## Testing & Troubleshooting

- Q: How do I test styles?
  - A: In unit tests, render the element, then use `getComputedStyle(el)` for concrete values, or read the injected stylesheet’s `textContent` for class rules.

- Q: My responsive styles don’t apply.
  - A: Ensure the viewport width triggers the breakpoint (in tests, set `window.innerWidth` and dispatch a `resize`). Also verify you used breakpoint keys present in your theme.

- Q: Styles appear but values are wrong.
  - A: Check units (numbers → spacing rem; unitless must be strings). Verify color tokens exist (`primary.contrast`, `blue.500`).

## Roadmap

- SSR/Prerender support with style registry and cache hydration
- Unitless property allowlist (e.g., `lineHeight`, `zIndex`) to avoid needing strings
- Custom media queries and variant plugins
- Optional autoprefix step for legacy browsers

Have more questions? Open an issue or reach out — we’re happy to help.
