# Styling with Super JSS

Super JSS enhances Angular applications with dynamic styling capabilities, allowing you to define styles using JavaScript objects for a more interactive and responsive user experience.

## 1. Basic Styling:

The `[sj]` directive in Super JSS accepts either a single object or an array of objects conforming to the `SJssStyles` interface. Each object represents a set of CSS properties, with keys as the camel-cased version of the CSS property names.

```html
<div [sj]="{backgroundColor: 'red', padding: '1rem'}">Stylish Component</div>
```

### 2.  Combining Styles:
Super JSS supports combining multiple styles, which can be defined as class properties and then applied together in your template.

Here's a standalone class example:

```typescript
import { Component } from '@angular/core';
import { SJssStyles } from 'super-jss';

@Component({
  selector: 'app-demo',
  template: `
    <div [sj]="[styleOne, globalBorder]">Combined Styles</div>
  `
})
export class DemoComponent {
  styleOne: SJssStyles = {
    backgroundColor: 'red',
    padding: '1rem'
  };
}

// Assuming globalBorder is a global style defined elsewhere in the application:
export const globalBorder: SJssStyles = {
  border: '1px solid black',
  borderRadius: '4px'
};

```
In your component's HTML:

```html
<div [sj]="[styleOne, styleTwo]">Combined Styles</div>
```

---

[← Installation](installation.md) | [Home](index.md) | [Responsive Styles →](responsive-style.md)
