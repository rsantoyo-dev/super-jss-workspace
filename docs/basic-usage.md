## Basic Usage

Super JSS simplifies the process of applying dynamic styles in Angular applications. Below is a guide to importing and using `SjDirective` and some basic examples to get you started.

### Importing and Using `SjDirective`

1. **Import the Directive:**
   To use Super JSS in your component, first import the `SjDirective` from the Super JSS package.

```typescript
  import { SjDirective } from "super-jss";
```
2. **Apply the Directive:**
    Apply the SjDirective to the element you want to style. The directive accepts a single object or an array of objects. The object keys are the CSS properties, and the values are the responsive CSS values. The directive will automatically apply the styles to the element.

```typescript
  import {SjDirective} from "super-jss";
    @Component({selector: 'app-demo',
      template: `
          <div [sj]="{backgroundColor: '#aa5645', padding: '10px'}">
            Welcome to Super JSS!
          </div>
        `
    })
    export class DemoComponent {}
```

The div will have varying padding sizes depending on the screen width, thanks to the responsive design capabilities of Super JSS.

This section of the documentation provides a clear and straightforward guide for developers to start using Super JSS in their Angular projects. It demonstrates the ease with which they can apply dynamic and responsive styles, highlighting the library's flexibility and power.
