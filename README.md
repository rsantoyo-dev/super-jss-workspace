# Super JSS — Atomic CSS‑in‑JS for Angular 20

[![npm version](https://img.shields.io/npm/v/super-jss.svg)](https://www.npmjs.com/package/super-jss)
[![bundle size](https://img.shields.io/bundlephobia/minzip/super-jss?label=size)](https://bundlephobia.com/package/super-jss)
[![Storybook](https://img.shields.io/badge/Storybook-Visit-FF4785)](https://sjss-storybook.netlify.app/)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Open Source](https://img.shields.io/badge/OSI-Approved-3DA639)](https://opensource.org/licenses)

Super JavaScript Stylesheets (SJSS) is a tiny, runtime styling library for Angular 20. It generates atomic CSS as you use it, supports responsive breakpoints and theming, and gives you a minimal, ergonomic API.

- ⚡ Angular‑native: built on Signals
- 🎯 Atomic CSS generation: only what you use
- 📱 Responsive + theming: `xs…xxl` breakpoints and palette tokens
- 🎨 Pseudo‑selectors: `&:hover`, `&:focus`, etc.
- 🧩 Ready‑made building blocks: `<sj-paper>`, `<sj-card>`, `<sj-button>`, `<sj-icon>`, and `<sj-input>`

Docs: <https://sjss.dev>
Storybook: <https://sjss-storybook.netlify.app/>

## What's New?

- **`<sj-icon>`**: A versatile icon component with support for Material Icons, SVG, and font-based icons.
- **`<sj-input>`**: A customizable input component with built-in theming and validation styling.

## Why SJSS?

Traditional CSS-in-JS libraries ship massive bundles with every possible utility class. SJSS generates **only the atomic CSS you use**, keeping your bundle tiny while providing full theming and responsiveness.

## Install

```bash
npm install super-jss
```

## Quick start

This minimal Hero shows inline `[sj]` styles, a one‑line theme update, and a reactive breakpoint log.

```ts
import { Component, effect, inject } from '@angular/core';
import { SJ_BASE_COMPONENTS_IMPORTS, SjThemeService, sj } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-hero',
  imports: [SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-host
      [sj]="[
        sj.display(sj.display.options.flex),
        sj.flexDirection({
          xs: sj.flexDirection.options.column,
          md: sj.flexDirection.options.row
        }),
        sj.justifyContent(sj.justifyContent.options.center),
        sj.alignItems(sj.alignItems.options.center),
        sj.gap({ xs: 0.5, md: 1 }),
        sj.p(2),
        sj.bg(sj.bg.options.light.light)
      ]"
    >
      <sj-paper usePaint="primary" usePadding="default" useRounded="default">
        <h1 [sj]="[sj.m(0)]">Hello SJSS</h1>
      </sj-paper>

      <sj-button
        [sj]="[
          sj.p(2),
          sj.bg('primary.main'),
          sj.c('white'),
          sj.hover([ sj.backgroundColor(sj.bg.options.primary.dark) ])
        ]"
        (click)="updatePrimaryColor()"
      >
        Update Primary
      </sj-button>
    </sj-host>
  `,
})
export class HeroComponent {
  readonly theme = inject(SjThemeService);
  readonly sj = sj;

  private _bpLogger = effect(() => {
    console.log('current breakpoint:', this.theme.breakpoint());
  });

  updatePrimaryColor() {
    this.theme.setTheme({
      palette: {
        primary: { ...this.theme.sjTheme().palette.primary, main: '#4e3149ff' },
      } as any,
    });
  }
}
```

**Key concepts:**

- **camelCase properties**: `backgroundColor`, `justifyContent`, `borderRadius`
- **Responsive objects**: `{ xs: 1, md: 2, lg: 3 }` for breakpoint-specific values
- **Theme tokens**: `'primary.main'`, `'neutral.dark'` for consistent colors
- **Pseudo-selectors**: `'&:hover'`, `'&:focus'` for interactions

## The Best Example: Dynamic Theming

Here's a clean theming example showcasing SJSS components with different color schemes and responsive design.

**Component (TypeScript):**

```ts
import { Component, effect, inject } from '@angular/core';
import { SJ_BASE_COMPONENTS_IMPORTS, SjThemeService, sj } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-hero',
  imports: [SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-host
      [sj]="[
        sj.display(sj.display.options.flex),
        sj.flexDirection({
          xs: sj.flexDirection.options.column,
          md: sj.flexDirection.options.row
        }),
        sj.justifyContent(sj.justifyContent.options.center),
        sj.alignItems(sj.alignItems.options.center),
        sj.gap({ xs: 0.5, md: 1 }),
        sj.p(2),
        sj.bg(sj.bg.options.light.light)
      ]"
    >
      <sj-paper usePaint="primary" usePadding="default" useRounded="default">
        <h1 [sj]="[sj.m(0)]">Hello SJSS</h1>
      </sj-paper>

      <sj-button
        [sj]="[
          sj.p(2),
          sj.bg('primary.main'),
          sj.c('white'),
          sj.hover([sj.backgroundColor(sj.bg.options.primary.dark)])
        ]"
        (click)="updatePrimaryColor()"
      >
        Update Primary
      </sj-button>
    </sj-host>
  `,
})
export class HeroComponent {
  readonly theme = inject(SjThemeService);
  // expose sj to template
  readonly sj = sj;

  // Log breakpoint changes reactively
  private _bpLogger = effect(() => {
    console.log('current breakpoint:', this.theme.breakpoint());
  });

  // One‑liner theme update for primary color
  updatePrimaryColor() {
    // update only primary.main while keeping other shades; cast partial palette for brevity
    this.theme.setTheme({
      palette: {
        primary: { ...this.theme.sjTheme().palette.primary, main: '#4e3149ff' },
      } as any,
    });
  }
}

```

**What makes this example tremendous:**

- **Clean theming**: Three distinct visual themes using SJSS tokens
- **Component variants**: `sj-card` with `elevated` and `outlined` variants
- **Responsive grid**: Automatically adapts from 1 to 3 columns
- **Theme tokens**: Uses semantic colors like `primary.main`, `secondary.main`
- **Consistent spacing**: Leverages SJSS spacing scale
- **No complex logic**: Pure styling demonstration

## Core Features

### 🎨 Theming & Tokens

Use semantic palette tokens and responsive objects anywhere:

```ts
sj.backgroundColor('primary.main');
sj.color('primary.contrast');
sj.padding({ xs: 1, md: 2 });
```

### 🚀 Shorthands

Popular, ergonomic aliases:

```ts
sj.bg('primary.main');
sj.p(2);
sj.m({ xs: 1, md: 2 });
sj.c('neutral.dark');
sj.w('100%');
sj.h(200);
sj.brad(0.5);
sj.gap(1);
```

### 📐 Layout

Use the root CSS properties and `.options`:

```ts
sj.display(sj.display.options.flex);
sj.flexDirection(sj.flexDirection.options.column);
sj.justifyContent(sj.justifyContent.options.center);
sj.alignItems(sj.alignItems.options.center);
```

### 🎯 Pseudo-selectors

```ts
sj.hover([ sj.backgroundColor(sj.bg.options.primary.dark) ]);
sj.focus({ outline: '2px solid blue' });
sj.active({ transform: 'scale(0.95)' });
```

### 🧩 Components

Pre-built components with variants:

```html
<sj-paper usePadding="default">...</sj-paper>
<sj-card variant="elevated" [sj]="customStyles">...</sj-card>
<sj-button variant="contained">Click me</sj-button>
<sj-typography variant="h2">Heading</sj-typography>
```

### ⚡ Performance

- **Atomic CSS**: Generates only used styles
- **Bundled classes**: Single class per style object
- **Memoized rendering**: Avoids redundant computations
- **Signals integration**: Reactive updates without overhead

## API Overview

```ts
import { sj } from 'super-jss';

// CSS properties
sj.backgroundColor('red');
sj.padding(16);
sj.borderRadius('50%');

// Shorthands
sj.bg('primary');
sj.p(2);

// Helpers
sj.hover({ bg: 'dark' });

// Tokens
sj.palette.primary.main;
sj.breakpoints.md;

// Components
import { SJ_BASE_COMPONENTS_IMPORTS } from 'super-jss';
```

## SuperJSS vs. Material-UI for React

| Feature          | Material-UI for React | SuperJSS              |
| :--------------- | :-------------------- | :-------------------- |
| **Type**         | Component Library     | Styling Library       |
| **Design System**| Material Design       | Agnostic              |
| **Framework**    | React                 | Angular               |
| **Core Concept** | Pre-built components  | Utility-first styling |
| **Customization**| Theming system        | Theming system, direct style manipulation |

### 💖 Support
If you find Super JSS useful, consider supporting its development:

☕ ☕ ☕ Buy me a coffee
📬 Contact
For inquiries, feedback, or issues, reach out at <ricardo.santoyo@hotmail.com>.

Readme
Keywords
angularangular 20angular signalscss-in-jsatomic cssutility-firstdesign systemresponsivebreakpointsthemingruntime themingpalettetypographytailwind alternativestyle directiveangular styling
