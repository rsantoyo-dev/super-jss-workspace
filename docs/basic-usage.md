# Basic Usage and Core Concepts

Super JSS streamlines the application of dynamic styles in Angular 20 applications. This guide provides a detailed overview of importing and using the `SjDirective`, complemented by basic examples to illustrate its practical application, including its on-the-fly CSS generation and support for pseudo-selectors.

## Table of Contents
1. [Importing `SjDirective`](#importing-sjdirective)
2. [Applying `SjDirective`](#applying-sjdirective)
3. [Composing Styles with Arrays](#composing-styles-with-arrays)
4. [Pseudo-selectors](#pseudo-selectors)
5. [Responsive Styling Example](#responsive-styling-example)
6. [Further Resources](#further-resources)

### Importing `SjDirective`

#### Import the Directive
To integrate Super JSS into your Angular component, start by importing `SjDirective`:

```typescript
import { SjDirective } from "super-jss";
```

### Applying `SjDirective`

#### Apply the Directive
`SjDirective` can be applied to any HTML element in your Angular template. It accepts either a single object or an array of objects for style definitions. SJSS automatically generates and injects CSS classes into the DOM only as needed, keeping your application lean and fast.

```typescript
import { Component } from '@angular/core';
import { SjDirective } from "super-jss";

@Component({
  standalone: true,
  selector: 'app-demo',
  template: `
    <div [sj]="{ p: 2, bg: 'primary.main', color: 'primary.contrast' }">
      Welcome to Super JSS!
    </div>
  `
})
export class DemoComponent {}
```

### Composing Styles with Arrays

One of the powerful features of SJSS is the ability to compose styles by providing an array of `SjStyle` objects to the `[sj]` directive. This allows you to create reusable "JavaScript classes" (which are essentially just `SjStyle` objects) and combine them dynamically.

This approach promotes modularity, reusability, and makes managing complex style sets much more intuitive. Styles from later objects in the array will override properties from earlier ones if there are conflicts.

```typescript
import { Component } from '@angular/core';
import { SjDirective, SjStyle } from 'super-jss';

// Define reusable style objects (your "JS classes")
const myPadding: SjStyle = { p: 2 };
const myResponsiveMargin: SjStyle = { m: { xs: 2, md: 4 } };
const myBorder: SjStyle = { border: '1px solid #ccc', borderRadius: '4px' };
const myShadow: SjStyle = { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };

@Component({
  standalone: true,
  selector: 'app-composed-styles-demo',
  template: `
    <div [sj]="[myPadding, myResponsiveMargin, myBorder, myShadow, { bg: 'lightblue' }]">
      This div uses composed styles!
    </div>
    <div [sj]="[myPadding, myShadow, { color: 'red' }]">
      Another div with different composition.
    </div>
  `,
})
export class ComposedStylesDemoComponent {
  // Make them available in the template
  protected readonly myPadding = myPadding;
  protected readonly myResponsiveMargin = myResponsiveMargin;
  protected readonly myBorder = myBorder;
  protected readonly myShadow = myShadow;
}
```

In this example, `myPadding`, `myResponsiveMargin`, `myBorder`, and `myShadow` are reusable `SjStyle` objects. They are combined in an array passed to `[sj]`, allowing for flexible and dynamic styling composition.

### Pseudo-selectors

SJSS supports CSS pseudo-selectors using the `&:` syntax within your style objects. This allows you to define styles for states like hover, focus, or active directly within your `[sj]` attribute.

```typescript
import { Component } from '@angular/core';
import { SjDirective } from "super-jss";

@Component({
  standalone: true,
  selector: 'app-button-demo',
  template: `
    <button [sj]="{
      p: 1,
      bg: 'secondary.main',
      color: 'secondary.contrast',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        bg: 'secondary.dark',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      },
      '&:active': {
        transform: 'scale(0.98)'
      }
    }">
      Click Me
    </button>
  `
})
export class ButtonDemoComponent {}
```

### Responsive Styling Example

SJSS makes responsive design intuitive. You can define different style values for various breakpoints (e.g., `xs`, `sm`, `md`, `lg`, `xl`, `xxl`) directly within your style properties.

```typescript
import { Component } from '@angular/core';
import { SjDirective } from "super-jss";

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

### Further Resources

For more information and advanced examples of using Super JSS, explore the following resources:
- [Super JSS on npm](https://www.npmjs.com/package/super-jss): Detailed package information and installation guide.
- [Super JSS Demos on StackBlitz](https://stackblitz.com/edit/super-js?file=src%2Fmain.ts): Interactive examples to understand Super JSS features better.

---

[⬅️ Previous: Installation](installation.md) | [Next: Styling Shortcuts ➡️](styling-shortcuts.md)
