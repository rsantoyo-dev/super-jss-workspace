# Super JSS Library

Super JSS is a dynamic CSS library designed for Angular applications, making styling with JavaScript objects a breeze. It's all about giving developers the power to create responsive designs effortlessly. With Super JSS, you're not just writing styles; you're crafting a responsive experience with the simplicity of JavaScript. It's fast, it's light, and it's built to supercharge your Angular apps with a flair of elegance and ease.

## 🌟 Features

- **Dynamic Styling**: Craft styles using JavaScript objects.
- **shorthand styles**: Simplify your styles and values with shorthand properties.
- **Responsive Design**: Adapt styles for various device breakpoints.
- **Theming**: Switch between different themes seamlessly.
- **Typography**: Enhanced support for HTML tags from H1 to H6, P, and span.

## 🚀 Getting Started

### Prerequisites

- An existing Angular project.
- Node.js and npm.

### Installation

```bash
npm i super-jss
```

### Integration

Import the `SjDirective` in your standalone component and apply the [sj] directive to the element you want to style. The directive accepts a single object or an array of objects. The object keys are the CSS properties, and the values are the responsive CSS values. The directive will automatically apply the styles to the element.

### Basic usage
It uses all keys from [CSS Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference) and [CSS Values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units_Reference) from MDN.
This elements used as a js object empower the programmer to add dynamic values easily

```typescript
import {SjDirective} from "super-jss";
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
### Responsive handling
The responsive values are defined within a css property using the following format: {xs: 'value', sm: 'value', md: 'value', lg: 'value', xl: 'value'}.

```typescript
import {SjDirective} from "super-jss";
@Component({
  standalone: true,
  selector: 'app-demo',
  template: `
    <div [sj]="{backgroundColor: '#aa5645', padding: {xs: '4px', sm: '6px', md: '8px', lg: '12px', xl:'18px', xxl: '24px'}">
        Welcome to Super JSS!
      </div>  
  `
})
export class DemoComponent {}
```
### Shorthand properties
properties for css key elements or values are intuitive and very handy for fast development. when using values, they are converted by 10px. This unit may be changed if desired
```typescript
import {SjDirective} from "super-jss";
@Component({
  standalone: true,
  selector: 'app-demo',
  template: `
    <div [sj]="{d: 'flex', fxDir: {xs: 'row', md: 'column'}} fxJustify: 'center'}">
      <div [sj]="{bg: '#aa5645', px:{xs: 2, md: 4}, py: {xs: 1, md: 3}}">
        Welcome to Super JSS!
      </div>
    </div>    
  `
})
export class DemoComponent {}
```

### Using palette

The palette is a set of colors that can be used in the application. each color is defined by 4 shades. Example: primary.main, primary.light, primary.dark, primary.contrast.

The options in the palette are primary, secondary, tertiary, success, info, warning, error, dark, neutral, light

```typescript
import {SjDirective} from "super-jss";
@Component({
  standalone: true,
  selector: 'app-demo',
  template: `
    <div [sj]="{ bg: 'primary', p: 2}">
      <div [sj]="{bg: 'secondary', px:{xs: 2, md: 4}, py: {xs: 1, md: 3}}">
        <h1 [sj]="{c: 'secondary.light'}">Welcome to Super JSS!</h1>
      </div>
    </div>    
  `
})
export class DemoComponent {}
```

### typography
The typography is defined by the following keys: h1, h2, h3, h4, h5, h6, p, span. Each key applies the corresponding style to the element. The styles are defined in the theme.

```typescript
import {SjDirective} from "super-jss";
@Component({
  standalone: true,
  selector: 'app-demo',
  template: `
    <h1 [sj]>Welcome to Super JSS!</h1>
  `
})
export class DemoComponent {}
```

### Using SjStyle as array
This may give a lot of power to the programmer to create dynamic styles. The array of styles is merged in order, so the last style will override the previous ones.
```typescript
import {SjDirective} from "super-jss";
@Component({
  standalone: true,
  selector: 'app-demo',
  template: `
    <div [sj]="[sjDemoClass, sjDemoBorder]">
      Welcome to Super JSS!
    </div>
  `
})
export class DemoComponent {
  sjDemoClass = {
    d: 'flex',
    fxDir: 'column',
    fxAItems: 'center',
    fxJustify: 'center',
    p: {xs: '4px', md: '8px'},
    bg: '#aa5645'
  };

  sjDemoBorder = {
    border: {xs: '1px solid black', md: '2px solid black'}
  };
}
```

### Update a theme item, such as palette, typography or breakpoints.

```typescript
import {SjDirective} from "super-jss";
@Component({
  standalone: true,
  selector: 'app-demo',
  template: `
    <div (click)="updateTheme()" [sj]="{bg: 'primary', p: 2}">
      <div  [sj]="{bg: 'secondary', px:{xs: 2, md: 4}, py: {xs: 1, md: 3}}">
        <h1 [sj]="{c: 'secondary.light'}">Welcome to Super JSS!</h1>
      </div>
    </div>    
  `
})
export class HeaderComponent {

  constructor(private th:SjThemeService) {
  }

  updateTheme() {
      this.th.setPalette({
        primary: {
          main: '#aa5645',
          light: '#aaa6a5',
          dark: '#aa0605',
          contrast: '#ffffff',
        },
        secondary: {
          main: this.th.colors().yellow[500],
          light: this.th.colors().yellow[200],
          dark: this.th.colors().yellow[700],
          contrast: this.th.colors().purple[700],
        }
      });
      
      this.th.setBreakpoints({
        sm: 630,
        md: 900,
      });
      
      this.th.setTypography({
        default: { fontFamily: 'Courier New'},
        H1: { fontSize: '2rem', fontWeight: 'bold'},
      });
  }
}
```

## 📖 Documentation

Dive deep into Super JSS's capabilities:

(below is the original documentation, it will be updated soon)
- [Official Documentation](https://rsantoyo-dev.github.io/super-jss/)

## 🎨 Demos

- Demo App: this Project can be seen in [StackBlitz](https://stackblitz.com/edit/super-js?file=src%2Fmain.ts),
[github repo](https://github.com/rsantoyo-dev/super-jss/tree/master/projects/super-jss-demo/src), or deployed to [superjss](https://superjss.netlify.app/),:
  Show typography, theme handler updating palette, fonts, and breakpoints. or [github repo](https://github.com/rsantoyo-dev/super-jss/tree/master/projects/super-jss-demo/src):

## 📖 Articles

- [How Super JSS Works](https://medium.com/@viejorichard/super-jss-a-library-for-responsive-css-styles-85691b210450)
- [Theming with Super JSS](https://medium.com/@viejorichard/super-jss-how-to-override-a-theme-64d8da14e3fb)

## 💖 Support

If you find Super JSS useful, consider supporting its development:


- ☕ ☕ ☕ [Buy me a coffee](https://www.buymeacoffee.com/rsantoyo)

- [Support Super JSS](https://www.paypal.com/paypalme/superjss)
- [Support Developer](https://www.paypal.com/paypalme/rsantoyodev)

## 📬 Contact

For inquiries, feedback, or issues, reach out at [ricardo.santoyo@hotmail.com](mailto:ricardo.santoyo@hotmail.com).

---
