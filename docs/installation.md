Based on your provided content, I'll enhance the `installation.md` with deep linking and some improvements for clarity and user engagement. Here's the updated version:

---

# Installation of Super JavaScript Stylesheets (SJSS)

This section provides a step-by-step guide on installing and integrating Super JavaScript Stylesheets (SJSS) into your Angular projects, ensuring a smooth setup process.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Integration](#integration)
4. [Importing the Directive](#importing-the-directive)


## Prerequisites

Before proceeding with the installation of Super JavaScript Stylesheets (SJSS), make sure your development environment is ready:

- **Angular Project**: An existing Angular project is required. If you don't have one, you can start by creating a new Angular project following the [Angular documentation](https://angular.io/guide/setup-local).

- **Node.js and npm**: Your machine must have [Node.js](https://nodejs.org/) and npm (Node Package Manager) installed. npm, which is essential for managing JavaScript packages, comes bundled with Node.js. You can verify the installation by running `node -v` and `npm -v` in your terminal.

- **Super JSS Library**: Familiarize yourself with the Super JSS library on npm. For detailed information, visit the [Super JSS npm package page](https://www.npmjs.com/package/super-jss).


This update provides a clearer path for users to understand and prepare their environment for SJSS, including direct access to relevant resources.
## Installation Steps

To install the Super JSS library, use the following npm command:

```bash
npm i super-jss
```

This command installs the latest version of Super JSS from [npm](https://www.npmjs.com/package/super-jss).

## Integration

### Importing the Directive

To integrate Super JSS into your Angular components, follow these steps:

1. **Import the SJSS Directive**:

   First, import the `SjDirective` from the Super JSS package.

    ```typescript
    import { SjDirective } from "super-jss";
    ```

2. **Applying the Directive**:

   In your Angular component, apply the SJSS directive as shown below. This example sets the background color and padding for a div element.

    ```typescript
    @Component({
      standalone: true,
      selector: 'app-demo',
      template: `
        <div [sj]="{backgroundColor: '#aa5645', padding: '10px'}">
          Welcome to Super JSS!
        </div>    
      `
    })
    export class DemoComponent {}
    ```

For a live demonstration of Super JSS in action, visit our [StackBlitz example](https://stackblitz.com/edit/super-js?file=src%2Fmain.ts).

---

[⬅️ Previous: Welcome to Super JSS](index.md) | [Next: Basic Usage ➡️](basic-usage.md)

---
