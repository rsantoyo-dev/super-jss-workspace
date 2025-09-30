# Super JSS — Atomic CSS‑in‑JS for Angular 20

[![npm version](https://img.shields.io/npm/v/super-jss.svg)](https://www.npmjs.com/package/super-jss)
[![bundle size](https://img.shields.io/bundlephobia/minzip/super-jss?label=size)](https://bundlephobia.com/package/super-jss)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](../LICENSE)

**Super JavaScript Stylesheets (SJSS)** is a lightweight, runtime styling library for Angular 20 that generates atomic CSS on the fly using Angular Signals. It delivers responsive breakpoints, theming (palette, typography, spacing), and pseudo‑selectors — without shipping a giant utility bundle.

- ⚡ **Angular‑native**: Built on Signals for instant reactive styling
- 🎯 **Atomic CSS generation**: Only the CSS you actually use
- 📱 **Theming + responsive**: Semantic palette, scales, and `xs…xxl` breakpoints
- 🎨 **Pseudo‑selectors**: `&:hover`, `&:focus`, etc.
- 🧩 **Shorthands & helpers**: `sj.sh.bg('primary')`, `sj.flex.center()`, `sj.grid.cols(3)`
- 🏗️ **Components**: `<sj-box>`, `<sj-card>`, `<sj-button>`, `<sj-typography>`, `<sj-icon>`
- 🎨 **Blueprints**: Pre-configured style objects for common UI patterns
- 🚀 **Performance**: Bundled classes, memoized styles, zero runtime overhead

Documentation: [https://sjss.dev](https://sjss.dev)  
Demo & lib workspace: [https://stackblitz.com/~/github.com/rsantoyo-dev/super-jss-workspace](https://stackblitz.com/~/github.com/rsantoyo-dev/super-jss-workspace?file=projects/super-jss-demo/src/app/app.component.ts)  
NPM: [https://www.npmjs.com/package/super-jss](https://www.npmjs.com/package/super-jss)

## Why SJSS? The Complete Styling Solution

Traditional CSS-in-JS libraries ship massive bundles with every possible utility class. SJSS generates **only the atomic CSS you use**, keeping your bundle tiny while providing full theming and responsiveness.

## Core Features

### 🎨 **Advanced Theming & Tokens**

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

### 🚀 **Powerful Shorthands**

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

### 📐 **Layout Helpers**

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

### 🎯 **Pseudo-Selectors**

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

### 🧩 **Pre-built Components**

Ready-to-use components with variants:

```html
<sj-box [sj]="sj.flex.center()">...</sj-box>
<sj-card variant="elevated" [sj]="customStyles">...</sj-card>
<sj-button variant="contained">Click me</sj-button>
<sj-typography variant="h2">Heading</sj-typography>
<sj-icon name="star" [sj]="iconStyle"></sj-icon>
```

### 🎨 **Blueprints System**

Pre-configured style objects for common UI patterns:

```ts
import { boxBlueprints, buttonBlueprints } from 'super-jss';

// Use pre-built styles
[sj]="[boxBlueprints.card, customStyles]"
[sj]="buttonBlueprints.primary"
```

### ⚡ **Performance Features**

- **Atomic CSS**: Generates only used styles
- **Bundled classes**: Single class per style object
- **Memoized rendering**: Avoids redundant computations
- **Signals integration**: Reactive updates without overhead

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

**Template (HTML with Angular directives):**

```html
<div [sj]="{ 
  display: 'flex', 
  justifyContent: 'center', 
  padding: { xs: 1, md: 2 }, 
  backgroundColor: 'primary.main',
  '&:hover': { backgroundColor: 'primary.dark' }
}">
  <h1 [sj]="{ color: 'primary.contrast', fontWeight: '600' }">Hello SJSS</h1>
</div>
```

## Theming Example

Here's a clean theming example showcasing SJSS components with different color schemes:

```html
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
```

## Installation & Setup

- [Installation Guide](installation.md): Your first step to transforming your Angular styling workflow.
- [Basic Usage](basic-usage.md): Learn the fundamentals of SJSS styling.
- [Responsive Design](responsive-style.md): Master responsive breakpoints and layouts.
- [Theming Guide](theming.md): Create beautiful, consistent themes.
- [Typography](typography.md): Control text styling with precision.
- [Spacing](spacing.md): Use the spacing system effectively.
- [Styling Shortcuts](styling-shortcuts.md): Boost productivity with shorthand properties.
- [API Reference](sj-api.md): Complete API documentation.

## Blueprint Documentation

- [Box Blueprint](blueprints/box.md): Flexible container layouts
- [Card Blueprints](blueprints/cards.md): Content container styles
- [Button Blueprints](blueprints/buttons.md): Interactive button styles
- [Typography Blueprints](blueprints/typography.md): Text styling functions

## Component Documentation

- [Box Component](components/sj-box.md): Flexible container component
- [Card Component](components/sj-card.md): Content containers with variants
- [Button Component](components/sj-button.md): Interactive button components
- [Typography Component](components/sj-typography.md): Text styling components
- [Icon Component](components/sj-icon.md): Icon components
- [Host Component](components/sj-host.md): Base component wrapper

## Community & Support

Join a growing community of developers pushing the boundaries of Angular styling. Connect, share, and contribute:

- 🌟 **Star us on GitHub:** [Super JSS on GitHub](https://github.com/rsantoyo-dev/super-jss-workspace)
- 📦 **Install via npm:** [Super JSS on npm](https://www.npmjs.com/package/super-jss)
- 🛠️ **Try live on StackBlitz:** [Super JSS on StackBlitz](https://stackblitz.com/edit/super-js?file=src%2Fmain.ts)

## Additional Resources

- [Articles by Richard on Medium](https://medium.com/@viejorichard)

## 🎨 Demos

This interactive demo provides a hands-on experience with the powerful theming capabilities of SuperJSS. Here's what you can explore:

- **Live Theme Switching:** Use the theme selector in the header to switch between different pre-built themes (e.g., Default, Desert, Ocean) and even a custom theme. Notice how the application's entire look and feel changes instantly.
- **Dynamic Color Palette:** The "Palette" section showcases the theme's color palette, including primary, secondary, tertiary, and other semantic colors. These colors automatically update when you switch themes.
- **Adaptive Typography:** The "Typography" section demonstrates how headings, paragraphs, and other text elements adapt to the new theme's typography settings.


    <iframe src="https://stackblitz.com/edit/sjss-theming-demo?embed=1&file=src/app/app.component.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=preview"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="sjss-theming-demo"
    allow="accelerometer; ambient-light-sensor; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts">
    </iframe>


## 💖☕ Support

If Super JSS empowers your projects, consider supporting its continued development:

- [☕ ☕ ☕ Buy me a coffee](https://buymeacoffee.com/superjss)

## 📬 Contact

For inquiries, feedback, or issues, reach out at [ricardo.santoyo@hotmail.com](mailto:ricardo.santoyo@hotmail.com).
