# Super JavaScript Stylesheets (SJSS)

[![npm version](https://img.shields.io/npm/v/super-jss.svg)](https://www.npmjs.com/package/super-jss)
[![bundle size](https://img.shields.io/bundlephobia/minzip/super-jss?label=size)](https://bundlephobia.com/package/super-jss)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

Super JavaScript Stylesheets (SJSS) is a dynamic, responsive, and incredibly lightweight styling library meticulously crafted for **Angular 20** applications. Leveraging Angular's powerful Signals, SJSS transforms how you approach styling by generating only the CSS you use — on the fly — ensuring your applications are fast, lean, and effortlessly maintainable.

## 🌟 Features

*   📱 **Effortless Responsiveness:** Design truly adaptive layouts that look flawless on any screen size.
*   ✨ **Dynamic Control:** Update styles in real-time based on application state or user interactions.
*   🎨 **Simplified Theming:** Implement comprehensive theming capabilities with ease.
*   ⚡ **Angular-Native Performance:** Blazing-fast performance with minimal overhead, thanks to Angular 20 signals.
*   🧩 **On-the-Fly CSS Generation:** Generates only the CSS you use, keeping your app lean and fast.
*   🪶 **Incredibly Lightweight:** Minimal footprint, under 8KB minified (less than 3KB gzipped).
*   ✍️ **Familiar & Intuitive:** Uses a syntax natural to CSS and JavaScript developers.
*   🚀 **Standalone & Flexible:** Integrates seamlessly with any Angular component as a standalone directive.
*   🅰️ **Enhanced Typography:** Gain precise control over text elements.
*   🔗 **Composing Styles with Arrays:** Combine reusable style objects for modular and dynamic styling.
*   Pseudo-selectors: Apply styles for states like `:hover`, `:active`, `:focus` directly.

### ✨ The Core Concept

> The principle is very simple: I take any CSS property, convert it to camelCase, and accept an object of breakpoints → all transformed into a CSS class for an ultra-lightweight experience. ✨ With added capabilities like a powerful theme system, where the entire look & feel is controlled in a single object — very fast and fluid thanks to Signals, for better integration with Angular.

In `super-jss`, you can take any CSS property, write it in `camelCase`, and assign it a value. For responsive design, you can use an object with breakpoint keys. This is all transformed into highly efficient CSS classes on the fly.

Here is a practical example of how you can apply themed, responsive styles to an element:

```html
<div [sj]="{
  backgroundColor: this.anyVariable ? 'primary.main' : 'transparent',
  padding: { xs: 2, md: 4 }
  // You can also use shortcuts for convenience:
  // bg: this.anyVariable ? 'primary.main' : 'transparent',
  // p: { xs: 2, md: 4 }
}">
  Themed + Responsive Content
</div>
```

### A Quick Example: The "Hello Super JSS" Header

Let's see how easy it is to create a good-looking, responsive header.

```typescript
import { Component } from '@angular/core';
import { SjDirective } from 'super-jss';

@Component({
  selector: 'app-welcome-header',
  standalone: true,
  imports: [SjDirective],
  template: `
    <h1 [sj]="{
      color: 'primary.main',
      textAlign: 'center',
      padding: { xs: 2, md: 4 },
      backgroundColor: 'light.main',
      borderRadius: 2,
      boxShadow: 'shadows.default'
    }">
      Hello Super JSS!
    </h1>
  `
})
export class WelcomeHeaderComponent {
}
```
This small example demonstrates theming (`primary.main`, `light.main`), responsive padding, and other styles, all with a clean and concise syntax.

## 🚀 Getting Started

### Prerequisites

- An existing Angular project (Angular 15+ recommended, Angular 20 for full signal benefits).
- Node.js and npm.

### Installation

```bash
npm install super-jss
```

### Basic Usage

Import the `SjDirective` in your standalone component and apply the `[sj]` directive to the element you want to style.

```typescript
import { Component } from '@angular/core';
import { SjDirective } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-my-component',
  template: `
    <div [sj]="{ p: 2, bg: 'primary.main', color: 'primary.contrast' }">
      Hello from SJSS!
    </div>
  `,
})
export class MyComponent {}
```

## Key Features

### Responsive Styling

SJSS makes responsive design intuitive. Define different style values for various breakpoints directly within your style properties.

```html
<div [sj]="{
  padding: { xs: 1, md: 2, lg: 3 },
  backgroundColor: { xs: 'red', md: 'blue', lg: 'green' },
  fontSize: { xs: '1rem', md: '1.5rem', lg: '2rem' }
}">
  This div adapts to screen size!
</div>
```

### Theming with Palette

Use semantic color names from your theme's palette.

```html
<div [sj]="{ backgroundColor: 'primary.main', padding: 2 }">
  <h1 [sj]="{ color: 'primary.contrast' }">Themed Content!</h1>
</div>
```

### Composing Styles with Arrays

Combine reusable `SjStyle` objects for modular and dynamic styling.

```typescript
// In your component.ts
const myPadding: SjStyle = { padding: 2 };
const myShadow: SjStyle = { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };
```
```html
<!-- In your template -->
<div [sj]="[myPadding, myShadow, { backgroundColor: 'lightblue' }]">
  Composed Styles!
</div>
```

### Dynamic Theme Updates

Update the theme at runtime using the `SjThemeService`.

```typescript
// In your component.ts
import { SjThemeService, defaultTheme, desertTheme } from 'super-jss';

// ...
export class ThemeUpdaterComponent {
  isDesertTheme = false;
  constructor(private th: SjThemeService) {}

  toggleTheme() {
    this.isDesertTheme = !this.isDesertTheme;
    const themeToApply = this.isDesertTheme ? desertTheme : defaultTheme;
    this.th.setTheme(themeToApply);
  }
}
```
```html
<!-- In your template -->
<button (click)="toggleTheme()" [sj]="{ backgroundColor: 'primary.main', color: 'primary.contrast', padding: 1, borderRadius: '4px', cursor: 'pointer' }">
  Toggle Theme
</button>
```

### Styling Shorthands

For convenience, SJSS provides a range of shorthand properties.

```html
<div [sj]="{
  d: 'flex', 
  fxDir: {xs: 'row', md: 'column'}, 
  fxJustify: 'center',
  bg: 'primary.main',
  px: 4, // padding-left & padding-right
  py: 2, // padding-top & padding-bottom
  mx: 2, // margin-left & margin-right
  my: 2  // margin-top & margin-bottom
}">
  Welcome to Super JSS!
</div>
```

### Flex-box Responsive Demo

Explore how Super JSS simplifies responsive flex-box layouts with this interactive StackBlitz example. See how `[sj]` attributes are used to create flexible and adaptive UI components that respond to different screen sizes.

- [StackBlitz: Flex-box Responsive Demo](https://stackblitz.com/edit/angular-ivy-ieshja?file=README.md,src%2Fapp%2Fapp.component.ts)

## 📖 Documentation

Dive deep into Super JSS's capabilities:

- Official site & docs: https://sjss.dev/

## 🎨 Demos

- Demo App: See SJSS in action on [StackBlitz](https://stackblitz.com/edit/super-js?file=src%2Fmain.ts).

## 💖 Support

If you find Super JSS useful, consider supporting its development:

- ☕ ☕ ☕ [Buy me a coffee](https://buymeacoffee.com/rsantoyo)

## 📬 Contact

For inquiries, feedback, or issues, reach out at [ricardo.santoyo@hotmail.com](mailto:ricardo.santoyo@hotmail.com).
