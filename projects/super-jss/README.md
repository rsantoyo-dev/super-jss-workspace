# Super JavaScript Stylesheets (SJSS)

Super JavaScript Stylesheets (SJSS) is a dynamic, responsive, and incredibly lightweight styling library meticulously crafted for **Angular 20** applications. Leveraging Angular's powerful signals, SJSS transforms how you approach styling by generating only the CSS you use, on the fly, ensuring your applications are fast, lean, and effortlessly maintainable. It's all about empowering developers to create stunning UIs with unparalleled ease and efficiency.

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

## 🚀 Getting Started

### Prerequisites

- An existing Angular project (Angular 15+ recommended, Angular 20 for full signal benefits).
- Node.js and npm.

### Installation

```bash
npm install super-jss
```

### Basic Integration

Import the `SjDirective` in your standalone component and apply the `[sj]` directive to the element you want to style. SJSS automatically generates and injects the necessary CSS.

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

### Responsive Styling

SJSS makes responsive design intuitive. Define different style values for various breakpoints (e.g., `xs`, `sm`, `md`, `lg`, `xl`, `xxl`) directly within your style properties.

```typescript
import { Component } from '@angular/core';
import { SjDirective } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-responsive-div',
  template: `
    <div [sj]="{
      p: { xs: 1, md: 2, lg: 3 }, /* Padding changes based on screen size */
      bg: { xs: 'red', md: 'blue', lg: 'green' }, /* Background color changes */
      fontSize: { xs: 1, md: 1.5, lg: 2 }
    }">
      This div adapts to screen size!
    </div>
  `
})
export class ResponsiveDivComponent {}
```

### Styling Shorthands

SJSS simplifies styling with a range of shorthand properties. The `px`, `py`, `mx`, `my`, `bx`, and `by` shorthands are processed directly by the `SjDirective` for convenience.

```typescript
import { Component } from '@angular/core';
import { SjDirective } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-shorthand-demo',
  template: `
    <div [sj]="{
      d: 'flex', fxDir: {xs: 'row', md: 'column'}, fxJustify: 'center',
      bg: 'primary.main',
      px: 4, py: 2, /* Horizontal/Vertical Padding */
      mx: 2, my: 2, /* Horizontal/Vertical Margin */
      bx: '1px solid', by: '1px solid' /* Horizontal/Vertical Borders */
    }">
      Welcome to Super JSS!
    </div>
  `
})
export class ShorthandDemoComponent {}
```

### Theming with Palette

The palette is a set of colors that can be used in the application, defined by semantic names like `primary`, `secondary`, `success`, etc. Each color set typically includes `main`, `light`, `dark`, and `contrast` shades.

```typescript
import { Component } from '@angular/core';
import { SjDirective } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-palette-demo',
  template: `
    <div [sj]="{ bg: 'primary.main', p: 2}">
      <div [sj]="{bg: 'secondary.light', px: 2, py: 1}">
        <h1 [sj]="{c: 'secondary.contrast'}">Themed Content!</h1>
      </div>
    </div>
  `
})
export class PaletteDemoComponent {}
```

### Composing Styles with Arrays

Combine reusable `SjStyle` objects (your "JavaScript classes") by providing an array to the `[sj]` directive. This promotes modularity, reusability, and dynamic styling composition.

```typescript
import { Component } from '@angular/core';
import { SjDirective, SjStyle } from 'super-jss';

const myPadding: SjStyle = { p: 2 };
const myShadow: SjStyle = { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };

@Component({
  standalone: true,
  selector: 'app-composed-styles-demo',
  template: `
    <div [sj]="[myPadding, myShadow, { bg: 'lightblue' }]">
      Composed Styles!
    </div>
  `,
})
export class ComposedStylesDemoComponent {
  protected readonly myPadding = myPadding;
  protected readonly myShadow = myShadow;
}
```

### Flex-box Responsive Demo

Explore how Super JSS simplifies responsive flex-box layouts with this interactive StackBlitz example. See how `[sj]` attributes are used to create flexible and adaptive UI components that respond to different screen sizes.

- [StackBlitz: Flex-box Responsive Demo](https://stackblitz.com/edit/angular-ivy-ieshja?file=README.md,src%2Fapp%2Fapp.component.ts)

### Dynamic Theme Updates

Update any part of your theme (palette, typography, breakpoints, spacing) dynamically at runtime using the `SjThemeService.setTheme()` method.

```typescript
import { Component } from '@angular/core';
import { SjDirective, SjThemeService, defaultTheme, desertTheme } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-theme-updater',
  template: `
    <button (click)="toggleTheme()" [sj]="{ bg: 'primary.main', color: 'primary.contrast', p: 1, borderRadius: '4px', cursor: 'pointer' }">
      Toggle Theme
    </button>
  `
})
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

## 📖 Documentation

Dive deep into Super JSS's capabilities:

- [Official Documentation](https://sjss.dev/)

## 🎨 Demos

- Demo App: See SJSS in action on [StackBlitz](https://stackblitz.com/edit/super-js?file=src%2Fmain.ts).

## 💖 Support

If you find Super JSS useful, consider supporting its development:

- ☕ ☕ ☕ [Buy me a coffee](https://buymeacoffee.com/rsantoyo)

## 📬 Contact

For inquiries, feedback, or issues, reach out at [ricardo.santoyo@hotmail.com](mailto:ricardo.santoyo@hotmail.com).