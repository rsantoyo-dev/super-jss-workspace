# Components

These are lightweight, standalone wrappers powered by the same `[sj]` directive you use everywhere. Styling is applied via `[sj]` only; some components expose a `variant` input. There are no layout inputs like `display` or `gap`—use the root `sj` API instead (e.g., `sj.sjBox.*`).

- [`<sj-host>`](sj-host.md) — Base wrapper that forwards `[sj]` to its parent
- [`<sj-flex>`](sj-flex.md) — A powerful and flexible layout component for flexbox.
- [`<sj-card>`](sj-card.md) — Content container with variants + `[sj]` overrides
- [`<sj-button>`](sj-button.md) — Button styles with variants + `[sj]` overrides
