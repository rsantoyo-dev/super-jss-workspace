# Basic Usage of Super JavaScript Stylesheets (SJSS)

Super JSS streamlines the application of dynamic styles in Angular applications. This guide provides a detailed overview of importing and using the `SjDirective`, complemented by basic examples to illustrate its practical application.

## Table of Contents
1. [Importing `SjDirective`](#importing-sjdirective)
2. [Applying `SjDirective`](#applying-sjdirective)
3. [Responsive Styling Example](#responsive-styling-example)
4. [Further Resources](#further-resources)

### Importing `SjDirective`

#### Import the Directive
To integrate Super JSS into your Angular component, start by importing `SjDirective`:

```typescript
import { SjDirective } from "super-jss";
```

### Applying `SjDirective`

#### Apply the Directive
`SjDirective` can be applied to any HTML element in your Angular template. It accepts either a single object or an array of objects for style definitions:

```typescript
import { Component } from '@angular/core';
import { SjDirective } from "super-jss";

@Component({
  selector: 'app-demo',
  template: `
    <div [sj]="{backgroundColor: '#aa5645', padding: '10px'}">
      Welcome to Super JSS!
    </div>
  `
})
export class DemoComponent {}
```

### Responsive Styling Example

In the above example, the `div` element is styled with a background color and padding. These styles are dynamically applied and responsive, showcasing the power and flexibility of Super JSS.

### Further Resources

For more information and advanced examples of using Super JSS, explore the following resources:
- [Super JSS on npm](https://www.npmjs.com/package/super-jss): Detailed package information and installation guide.
- [Super JSS Demos on StackBlitz](https://stackblitz.com/edit/super-js?file=src%2Fmain.ts): Interactive examples to understand Super JSS features better.

---


[⬅️ Previous: Installation](installation.md) | [Next: styling shortcuts ➡️](styling-shortcuts.md)

---
