# Shorthand Properties

Super JavaScript Stylesheets (SJSS) offers a flexible approach to styling in Angular applications. While you can use convenient shorthand properties for padding, margin, and border, SJSS also accepts traditional camelCase CSS properties, ensuring you can style elements in the way that works best for you.

## Quick Reference Table

| Shorthand | Traditional CSS Property   | Description                         |
|-----------|----------------------------|-------------------------------------|
| `px`      | `paddingLeft`, `paddingRight` | Horizontal padding (left & right) |
| `py`      | `paddingTop`, `paddingBottom`  | Vertical padding (top & bottom)   |
| `mx`      | `marginLeft`, `marginRight`   | Horizontal margin (left & right)  |
| `my`      | `marginTop`, `marginBottom`   | Vertical margin (top & bottom)    |
| `m`       | `margin`                      | Margin on all sides                |
| `mt`      | `marginTop`                   | Margin-top                         |
| `ml`      | `marginLeft`                  | Margin-left                        |
| `mr`      | `marginRight`                 | Margin-right                       |
| `mb`      | `marginBottom`                | Margin-bottom                      |
| `bx`      | `borderLeft`, `borderRight`   | Horizontal border (left & right)  |
| `by`      | `borderTop`, `borderBottom`   | Vertical border (top & bottom)    |

## Shorthand is Optional
The use of shorthand properties in SJSS is entirely optional. You can choose to use them for a more concise style definition or stick with the traditional camelCase properties for padding, margin, and border. SJSS is designed to accommodate your preferred styling approach.

## Example with Shorthand:

```typescript
  import {SjDirective} from "super-jss";
    @Component({selector: 'app-demo',
      template: `
          <div [sj]="{
            py: '8px', // Vertical padding
            mx: '10px', // Horizontal margin
            by: '2px solid black' // Top and bottom border
          }">
            Welcome to Super JSS!
          </div>
        `
    })
    export class DemoComponent {}
```

## Example with Traditional Properties:

```typescript
  import {SjDirective} from "super-jss";
    @Component({selector: 'app-demo',
      template: `
          <div [sj]="{
            paddingTop: '8px',
            paddingBottom: '8px',
            marginLeft: '10px',
            marginRight: '10px',
            borderTop: '2px solid black',
            borderBottom: '2px solid black'
          }">
            Welcome to Super JSS!
          </div>
        `
    })
    export class DemoComponent {}
```

Both examples achieve the same styling effect. The choice between shorthand and traditional properties depends on your coding style and project requirements.
