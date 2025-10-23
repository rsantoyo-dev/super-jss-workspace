# Headfire (PoC)

Zero‑config CSS utilities and a tiny DSL that compiles to plain CSS.

Usage (CSS‑only)
- import 'headfire/dist/headfire.css'
- import 'headfire/dist/themes/light.css'  // or 'themes/dark.css'
- document.documentElement.setAttribute('data-hf-theme','light')

Optional: Runtime DSL (no build plugins)
- import 'headfire/dist/dsl-runtime.js'
- <style data-headfire>
    .btn { padding: responsive(xs(8px), md(12px)); background: theme(primary); color: theme(primary-contrast); }
  </style>

Optional: JS helper
- import { applyTheme } from 'headfire/dist/applyTheme.js'
- applyTheme({ primary: '#6366f1', 'primary-contrast':'#fff' })

This is a PoC layout for local testing; not yet published.

