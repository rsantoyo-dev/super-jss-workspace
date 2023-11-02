# Super JSS Library

Super JSS is a dynamic CSS library designed for Angular applications, making styling with JavaScript objects a breeze. It's all about giving developers the power to create responsive designs effortlessly. With Super JSS, you're not just writing styles; you're crafting a responsive experience with the simplicity of JavaScript. It's fast, it's light, and it's built to supercharge your Angular apps with a flair of elegance and ease.

## 🌟 Features

- **Dynamic Styling**: Craft styles using JavaScript objects.
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

Import the `SuperJssModule` in your `app.module.ts`:

```typescript
import { SuperJssModule } from 'super-jss';

@NgModule({
  imports: [SuperJssModule],
  ...
})
```
### Quick Example

```typescript
import {Component} from "@angular/core";
import {sjColor, sjSpace} from "super-jss";

@Component({
  selector: 'app-demo',
  template: `
    <div [sj]="{backgroundColor:'light-blue', padding:'8px'}">
      Welcome to Super JSS!
    </div>
  `
})
export class DemoComponent {}
```

### Advanced quick dynamic example customizing theme

```typescript
import {Component} from "@angular/core";
import {sjColor, sjSpace} from "super-jss";
import {sjTheme} from "./public-api";

@Component({
  selector: 'app-demo',
  template: `
    <div [sj]="[sjDemoClass, sjDemoBorder]">
      Welcome to Super JSS!
    </div>
  `
})
export class DemoComponent {
  sjDemoClass = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: {xs: sjSpace(1), md: sjSpace(2)},
    backgroundColor: sjColor.primary
  };

  sjDemoBorder = {
    border: {xs: sjSpace(1) + ' solid black', md: sjSpace(2) + ' solid black'}
  };

  appTheme = signal(defaultThemeConfig());

  constructor() {
    this.appTheme.mutate((theme) => {
      theme.color.primary = 'red';
    });
    // will update all components that use sjTheme
    sjTheme.set(this.appTheme);
  }
}
```

## 📖 Documentation

Dive deep into Super JSS's capabilities:

- [Official Documentation](https://rsantoyo-dev.github.io/super-jss/)

## 🎨 Demos

- Demo App: this Project can be seen in [StackBlitz](https://stackblitz.com/edit/angular-ivy-atzazr?file=src%2Fapp%2Fapp.component.ts),
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
