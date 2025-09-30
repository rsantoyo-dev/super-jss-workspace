# Super JSS — Atomic CSS‑in‑JS for Angular 20

[![npm version](https://img.shields.io/npm/v/super-jss.svg)](https://www.npmjs.com/package/super-jss)
[![bundle size](https://img.shields.io/bundlephobia/minzip/super-jss?label=size)](https://bundlephobia.com/package/super-jss)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Super JavaScript Stylesheets (SJSS)** is a lightweight, runtime styling library for Angular 20 that generates atomic CSS on the fly using Angular Signals. It delivers responsive breakpoints, theming (palette, typography, spacing), and pseudo‑selectors — without shipping a giant utility bundle.

- ⚡ **Angular‑native**: Built on Signals for instant reactive styling
- 🎯 **Atomic CSS generation**: Only the CSS you actually use
- 📱 **Theming + responsive**: Semantic palette, scales, and `xs…xxl` breakpoints
- 🎨 **Pseudo‑selectors**: `&:hover`, `&:focus`, etc.
- 🧩 **Shorthands & helpers**: `sj.sh.bg('primary')`, `sj.flex.center()`, `sj.grid.cols(3)`
- 🏗️ **Components**: `<sj-box>`, `<sj-card>`, `<sj-button>`, `<sj-typography>`
- 🚀 **Performance**: Bundled classes, memoized styles, zero runtime overhead

Documentation: [https://sjss.dev](https://sjss.dev)  
Demo & lib workspace: [https://stackblitz.com/~/github.com/rsantoyo-dev/super-jss-workspace](https://stackblitz.com/~/github.com/rsantoyo-dev/super-jss-workspace?file=projects/super-jss-demo/src/app/app.component.ts)  
NPM: [https://www.npmjs.com/package/super-jss](https://www.npmjs.com/package/super-jss)

## Why SJSS?

Traditional CSS-in-JS libraries ship massive bundles with every possible utility class. SJSS generates **only the atomic CSS you use**, keeping your bundle tiny while providing full theming and responsiveness.

## Install

```bash
npm install super-jss
```

## Quick Start

SJSS uses camelCase CSS properties with responsive breakpoint objects. Apply styles via the `[sj]` directive:

**Component (TypeScript):**

```ts
import { Component } from '@angular/core';
import { SjDirective } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-hero',
  imports: [SjDirective],
  template: `
    <div [sj]="{ 
      display: 'flex', 
      justifyContent: 'center', 
      padding: { xs: 1, md: 2 }, 
      backgroundColor: 'primary.main',
      '&:hover': { backgroundColor: 'primary.dark' }
    }">
      <h1 [sj]="{ color: 'primary.contrast', fontWeight: '600' }">Hello SJSS</h1>
    </div>
  `,
})
export class HeroComponent {}
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
import { Component } from '@angular/core';
import { SJ_BASE_COMPONENTS_IMPORTS, sj, WithSj } from 'super-jss';

@Component({
  selector: 'app-theme-demo',
  standalone: true,
  imports: [SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-box [sj]="containerStyle">
      <sj-typography variant="h2">SJSS Theming</sj-typography>
      
      <sj-box [sj]="gridStyle">
        <sj-card variant="elevated" [sj]="primaryCardStyle">
          <sj-typography variant="h5">Primary Theme</sj-typography>
          <sj-typography variant="body">Clean and professional design</sj-typography>
          <sj-button variant="contained" [sj]="primaryButtonStyle">Primary Action</sj-button>
        </sj-card>
        
        <sj-card variant="outlined" [sj]="secondaryCardStyle">
          <sj-typography variant="h5">Secondary Theme</sj-typography>
          <sj-typography variant="body">Subtle and elegant styling</sj-typography>
          <sj-button variant="outlined" [sj]="secondaryButtonStyle">Secondary Action</sj-button>
        </sj-card>
        
        <sj-card [sj]="accentCardStyle">
          <sj-typography variant="h5">Accent Theme</sj-typography>
          <sj-typography variant="body">Bold and eye-catching</sj-typography>
          <sj-button variant="text" [sj]="accentButtonStyle">Accent Action</sj-button>
        </sj-card>
      </sj-box>
    </sj-box>
  `,
})
export class ThemeDemoComponent extends WithSj {
  readonly containerStyle = [
    sj.flex.column({ gap: 2 }),
    sj.css.padding(2),
    sj.css.backgroundColor(sj.tokens.palette.light.main),
  ];

  readonly gridStyle = [
    sj.grid.container(),
    sj.grid.columns({ xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }),
    sj.css.gap(1.5),
  ];

  readonly primaryCardStyle = [
    sj.flex.column({ gap: 1 }),
    sj.css.padding(1.5),
    sj.css.backgroundColor(sj.tokens.palette.primary.main),
    sj.css.color(sj.tokens.palette.primary.contrast),
    sj.css.borderRadius(0.75),
    sj.css.boxShadow('0 2px 8px rgba(0,0,0,0.1)'),
  ];

  readonly secondaryCardStyle = [
    sj.flex.column({ gap: 1 }),
    sj.css.padding(1.5),
    sj.css.border(`2px solid ${sj.tokens.palette.secondary.main}`),
    sj.css.borderRadius(0.75),
    sj.css.backgroundColor('transparent'),
  ];

  readonly accentCardStyle = [
    sj.flex.column({ gap: 1 }),
    sj.css.padding(1.5),
    sj.css.backgroundColor(sj.tokens.colors.blue[500]),
    sj.css.color('white'),
    sj.css.borderRadius(0.75),
    sj.css.boxShadow('0 4px 12px rgba(59, 130, 246, 0.3)'),
  ];

  readonly primaryButtonStyle = [
    sj.css.backgroundColor('white'),
    sj.css.color(sj.tokens.palette.primary.main),
    sj.css.marginTop('auto'),
  ];

  readonly secondaryButtonStyle = [
    sj.css.borderColor(sj.tokens.palette.secondary.main),
    sj.css.color(sj.tokens.palette.secondary.main),
    sj.css.marginTop('auto'),
  ];

  readonly accentButtonStyle = [
    sj.css.color('white'),
    sj.css.marginTop('auto'),
  ];
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

SJSS includes a complete design system with colors, spacing, typography, and breakpoints.

```ts
// Colors: semantic palette + full color scales
sj.css.backgroundColor(sj.tokens.palette.primary.main)
sj.css.color(sj.tokens.colors.blue[500])

// Spacing: consistent scales
sj.css.padding(sj.tokens.spacing(2)) // 16px

// Typography: variants
<sj-typography variant="h1">Title</sj-typography>

// Breakpoints: responsive objects
[sj]="{ p: { xs: 1, md: 2, lg: 3 } }"
```

### 🚀 Shorthands

Common properties have short aliases:

```ts
sj.sh.bg('primary.main')    // backgroundColor
sj.sh.p(2)                  // padding
sj.sh.m({ xs: 1, md: 2 })   // margin (responsive)
sj.sh.c('neutral.dark')     // color
sj.sh.w('100%')             // width
sj.sh.h(200)                // height
sj.sh.brad(0.5)             // borderRadius
sj.sh.gap(1)                // gap
```

### 📐 Layout Helpers

Powerful flexbox and grid utilities:

```ts
// Flexbox
sj.flex.center()           // d:flex, justify:center, align:center
sj.flex.column({ gap: 1 }) // d:flex, fxDir:column, gap:1
sj.flex.between()          // d:flex, fxJustify:space-between

// Grid
sj.grid.container()        // d:grid
sj.grid.cols(3)            // gridTemplateColumns: repeat(3, 1fr)
sj.grid.columns('1fr 2fr') // custom columns
sj.grid.gap(1)             // gap:1

// Stack (opinionated flex)
sj.stack({ direction: 'row', gap: 0.5, align: 'center' })
```

### 🎯 Pseudo-Selectors

Style interactions with pseudo-selectors:

```ts
[sj]="{ 
  bg: 'light.main',
  '&:hover': { bg: 'primary.main' },
  '&:focus': { outline: '2px solid blue' },
  '&:active': { transform: 'scale(0.98)' }
}"
```

Or use helpers:

```ts
sj.hover({ bg: 'primary.dark' })
sj.focus({ outline: '2px solid blue' })
sj.active({ transform: 'scale(0.95)' })
```

### 🧩 Components

Pre-built components with variants:

```html
<sj-box [sj]="sj.flex.center()">...</sj-box>
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

// CSS properties (any CSS property)
sj.css.backgroundColor('red')
sj.css.padding(16)
sj.css.borderRadius('50%')

// Shorthands
sj.sh.bg('primary')
sj.sh.p(2)

// Layout
sj.flex.row()
sj.grid.cols(3)

// Helpers
sj.compose(style1, style2)
sj.hover({ bg: 'dark' })

// Tokens
sj.tokens.palette.primary.main
sj.tokens.breakpoints.md
sj.tokens.spacing(2)

// Components
import { SjBoxComponent, SjCardComponent } from 'super-jss';
```

💖 Support
If you find Super JSS useful, consider supporting its development:

☕ ☕ ☕ Buy me a coffee
📬 Contact
For inquiries, feedback, or issues, reach out at <ricardo.santoyo@hotmail.com>.

Readme
Keywords
angularangular 20angular signalscss-in-jsatomic cssutility-firstdesign systemresponsivebreakpointsthemingruntime themingpalettetypographytailwind alternativestyle directiveangular styling
