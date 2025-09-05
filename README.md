# Super JSS — Atomic CSS‑in‑JS for Angular 20 (Signals)

[![npm version](https://img.shields.io/npm/v/super-jss.svg)](https://www.npmjs.com/package/super-jss)
[![bundle size](https://img.shields.io/bundlephobia/minzip/super-jss?label=size)](https://bundlephobia.com/package/super-jss)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Super JavaScript Stylesheets (SJSS) is a lightweight, runtime styling library for Angular 20 that generates atomic CSS on the fly using Angular Signals. It delivers responsive breakpoints, theming (palette, typography, spacing), and pseudo‑selectors — without shipping a giant utility bundle.

- Angular‑native: built on Signals for instant reactive styling
- Atomic CSS generation: only the CSS you actually use
- Theming + responsive: semantic palette, scales, and `xs…xxl` breakpoints
- Pseudo‑selectors: `&:hover`, `&:focus`, etc.

Documentation: https://sjss.dev
Demo: https://stackblitz.com/edit/super-js?file=src%2Fmain.ts
NPM: https://www.npmjs.com/package/super-jss

## Install

```bash
npm install super-jss
```

## Quick Start

```ts
import { Component } from '@angular/core';
import { SjDirective } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-hero',
  imports: [SjDirective],
  template: `
    <div [sj]="{ d:'flex', fxJustify:'center', p:{xs:1, md:2}, bg:'primary.main', '&:hover':{ bg:'primary.dark' } }">
      <h1 [sj]="{ c:'primary.contrast', fontWeight:'600' }">Hello SJSS</h1>
    </div>
  `,
})
export class HeroComponent {}
```

## Workspace

This repo contains both the library and a demo app.

- Library: `projects/super-jss`
- Demo: `projects/super-jss-demo`

Build the library:

```bash
npm run sj-build
```

Run the demo:

```bash
npm start
```

## Contributing

Issues and PRs welcome. Please open discussions for feature requests.

## License

MIT © Ricardo Santoyo
