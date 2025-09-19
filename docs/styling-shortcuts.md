# Styling Shorthands and Advanced Properties

Super JavaScript Stylesheets ([SJSS](https://www.npmjs.com/package/super-jss)) simplifies styling in Angular applications with a range of shorthand properties, covering everything from padding and margin to flexbox layouts.

## Table of Contents
1. [Example Usage in a Component](#example-usage-in-a-component)
2. [Shorthand Properties](#shorthand-properties)
  - [Padding and Margin](#padding-and-margin)
  - [Sizes](#sizes)
  - [Borders](#borders)
  - [Colors](#colors)
  - [Flexbox](#flexbox)

### Example Usage in a Component
Consider styling a `div` within an Angular component using SJSS shorthand properties:

```typescript
  import { Component } from "@angular/core";
  import { SjDirective } from "super-jss";
  
  @Component({
    standalone: true,
    selector: 'app-shorthand-demo',
    template: `
        <div [sj]="{
          py: 1,
          px: 2,
          m: 2,
          b: '1px solid black',
          d: 'flex',
          fxJustify: 'center',
          fxAItems: 'center',
          bg: '#aa5645'
        }">
          Welcome to Super JSS!
        </div>
      `
})
export class ShorthandDemoComponent {}
```

For interactive examples and more detailed usage, visit [SJSS on StackBlitz](https://stackblitz.com/edit/super-js?file=src%2Fmain.ts).

Now, let's delve into the details of these shorthand properties.

- **note**: they are just shorthands, you can use the full css property in camelCase if you prefer. The `px`, `py`, `mx`, `my`, `bx`, and `by` shorthands are processed directly by the `SjDirective` for convenience.

## Shorthand Properties

### Padding and Margin

| Shorthand | CSS Property   | Description         |
|-----------|----------------|---------------------|
| `p`       | `padding`      | Padding on all sides|
| `pt`      | `paddingTop`   | Padding top         |
| `pr`      | `paddingRight` | Padding right       |
| `pb`      | `paddingBottom`| Padding bottom      |
| `pl`      | `paddingLeft`  | Padding left        |
| `m`       | `margin`       | Margin on all sides |
| `mt`      | `marginTop`    | Margin top          |
| `mr`      | `marginRight`  | Margin right        |
| `mb`      | `marginBottom` | Margin bottom       |
| `ml`      | `marginLeft`   | Margin left         |
| `px`      | `paddingLeft`, `paddingRight` | Horizontal padding |
| `py`      | `paddingTop`, `paddingBottom` | Vertical padding   |
| `mx`      | `marginLeft`, `marginRight` | Horizontal margin |
| `my`      | `marginTop`, `marginBottom` | Vertical margin   |

### Sizes

| Shorthand | CSS Property   | Description   |
|-----------|----------------|---------------|
| `w`       | `width`        | Width         |
| `h`       | `height`       | Height        |
| `minW`    | `minWidth`     | Minimum width |
| `minH`    | `minHeight`    | Minimum height|
| `maxW`    | `maxWidth`     | Maximum width |
| `maxH`    | `maxHeight`    | Maximum height|

### Borders

| Shorthand | CSS Property   | Description      |
|-----------|----------------|------------------|
| `b`       | `border`       | Border on all sides |
| `bt`      | `borderTop`    | Border top       |
| `br`      | `borderRight`  | Border right     |
| `bb`      | `borderBottom` | Border bottom    |
| `bl`      | `borderLeft`   | Border left      |
| `bs`      | `borderStyle`  | Border style     |
| `bw`      | `borderWidth`  | Border width     |
| `bc`      | `borderColor`  | Border color     |
| `brad`    | `borderRadius` | Border radius    |
| `bx`      | `borderLeft`, `borderRight` | Horizontal borders |
| `by`      | `borderTop`, `borderBottom` | Vertical borders   |

### Colors

| Shorthand | CSS Property      | Description     |
|-----------|-------------------|-----------------|
| `bg`      | `backgroundColor` | Background color|
| `c`       | `color`           | Text color      |

### Flexbox

| Shorthand  | CSS Property   | Description            |
|------------|----------------|------------------------|
| `d`        | `display`      | Display property       |
| `fxDir`    | `flexDirection`| Flex direction         |
| `fxWrap`   | `flexWrap`     | Flex wrap              |
| `fxFlow`   | `flexFlow`     | Flex flow              |
| `fxJustify`| `justifyContent`| Justify content       |
| `fxAItems` | `alignItems`   | Align items            |
| `fxAContent`| `alignContent` | Align content         |
| `fxOrder`  | `order`        | Flex item order        |
| `fxGrow`   | `flexGrow`     | Flex grow              |
| `fxShrink` | `flexShrink`   | Flex shrink            |
| `fxBasis`  | `flexBasis`    | Flex basis             |
| `fxASelf`  | `alignSelf`    | Align self             |


---

[⬅️ Previous: Basic Usage](basic-usage.md) | [Next: Responsive Styling ➡️](responsive-style.md)