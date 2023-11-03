## Responsive Styles with Super JSS

Super JSS simplifies the creation of responsive styles in Angular applications, allowing styles to adapt based on the device's width without the complexity of signals for style definitions.

## Simple Example

Define responsive styles directly in your component's template using the `[sj]` directive to apply a responsive background color:

```html
<div [sj]="responsiveBackground">Responsive Background Color Div</div>
```

In your component's TypeScript file:
```typescript
import { SJssStyles } from 'super-jss';

export class MyComponent {
  responsiveBackground: SJssStyles = {
    backgroundColor: {
      xs: 'red',
      sm: 'blue',
      md: 'green',
      lg: 'purple',
      xl: 'orange'
    }
  };
}

```
With this setup, the div will display:

A red background on extra small devices.
Blue on small devices.
Green on medium devices.
Purple on large devices.
Orange on extra large devices.

### Advanced Example
For more complex responsive designs, define and combine multiple responsive styles in your TypeScript:

```typescript
import { SJssStyles } from 'super-jss';

export class MyComponent {
  responsiveBackgroundColor: SJssStyles = {
    backgroundColor: {
      xs: 'red',
      sm: 'blue',
      md: 'green',
      lg: 'yellow',
      xl: 'purple'
    }
  };

  responsiveFlexLayout: SJssStyles = {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row'
    }
  };
}

```
Applying these combined responsive styles in your component's HTML:
```html
<div [sj]="[responsiveBackgroundColor, responsiveFlexLayout]">
  <p>Advanced Styled Div</p>
  <p>Super-jss</p>
</div>
```

With these combined styles:

The div's background color will change responsively based on the screen width.
The flex layout will switch from a column arrangement on smaller screens to a row arrangement on larger screens, providing an optimal layout across different devices.
---

[← Styling](styling.md) | [Home](index.md) | [Typography →](typography.md)
