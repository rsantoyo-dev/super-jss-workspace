# Responsive Styles
With Super JSS, you can define responsive styles that adapt based on the device's width.

### Simple Example
Apply a responsive background color directly in your component's HTML:

```html
<div [sj]="{backgroundColor: {xs:'red', sm:'blue', md:'green', lg:'purple', xl:'orange'}}">Responsive Background Color Div</div>
```

In this example:

- The div will have a red background on extra small devices.
- A blue background on small devices.
- A green background on medium devices.
- A purple background on large devices.
- And an orange background on extra large devices.

### Advanced Example
For more intricate designs, you can define responsive styles:

```typescript
// Define some styles
const responsiveBackgroundColor: SJssStyles = {
  backgroundColor: {
  xs: 'red',
  sm: 'blue',
  md: 'green',
  lg: 'yellow',
  xl: 'purple'
  }
};
// Define some more styles
const responsiveFlexLayout: SJssStyles = {
  display: 'flex',
  flexDirection: {xs: 'column', md: 'row'}
};
```
Applying these combined responsive styles in your component's HTML:
```html
<div [sj]="[responsiveBackgroundColor, responsiveFlexLayout]">
  <p>Advanced Styled Div</p>
  <p>Super-jss</p>
</p>
```

With the combined styles:

- The div will have a responsive background color based on the device width.
- The div will also have a flex layout, with its direction changing from column on smaller devices to row on larger devices.
