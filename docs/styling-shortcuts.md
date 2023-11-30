# SJSS Styling Shortcuts

Super JavaScript Stylesheets (SJSS) simplifies styling in Angular applications with a range of shorthand properties. These properties cover everything from padding and margin to flexbox layouts, making your code more concise and readable.

## Example: Using SJSS Shorthand in a Component
Consider a scenario where you want to style a div within an Angular component. Using SJSS shorthand properties, you can easily define the styles directly within the component:
```typescript
  import { Component } from "@angular/core";
  import { SjDirective } from "super-jss";
  
  @Component({
    standalone: true,
    selector: 'app-demo',
    template: `
      <div [sj]="{
        py: '10px',
        px: '20px',
        m: '20px',
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
  export class DemoComponent {}
```

In this example, we're using SJSS to apply padding, margin, border, flexbox properties, and background color to a div. The shorthand properties like p for padding, m for margin, b for border, and bg for background color, demonstrate the simplicity and power of SJSS.

Now, let's delve into the details of these shorthand properties.

- **note**: they are just shorthands, you can use the full css property in camelCase if you prefer.

## Padding and Margin

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

## Sizes

| Shorthand | CSS Property   | Description   |
|-----------|----------------|---------------|
| `w`       | `width`        | Width         |
| `h`       | `height`       | Height        |
| `minW`    | `minWidth`     | Minimum width |
| `minH`    | `minHeight`    | Minimum height|
| `maxW`    | `maxWidth`     | Maximum width |
| `maxH`    | `maxHeight`    | Maximum height|

## Borders

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

## Colors

| Shorthand | CSS Property      | Description     |
|-----------|-------------------|-----------------|
| `bg`      | `backgroundColor` | Background color|
| `c`       | `color`           | Text color      |

## Flexbox

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
