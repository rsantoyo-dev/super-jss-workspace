# Super JSS Library

## Introduction

Super JSS is a powerful CSS library for Angular applications. It leverages the capabilities of JavaScript to provide a responsive and dynamic styling solution. With Super JSS, developers can easily integrate responsive designs and themes into their Angular projects.

## Features

- **Dynamic Styling**: Use JavaScript objects to define styles and apply them dynamically to your components.
- **Responsive Design**: Define styles for different breakpoints to ensure your application looks great on all devices.
- **Theming**: Easily integrate and switch between different themes for your application.

## Installation & Setup

1. Install the Super JSS library from npm:

```bash
npm i super-jss
```

2. Import the `SuperJssModule` in your `app.module.ts`:

```typescript
import { SuperJssModule } from 'super-jss';

@NgModule({
  imports: [SuperJssModule],
  ...
})
```

## Usage

### Basic Styling

Apply styles to your HTML elements using the `[sj]` directive:

```html
<div [sj]="{backgroundColor: 'red', color:'white'}">HELLO WORLD</div>
```

### Combining Multiple Styles

Super JSS allows you to combine multiple styles by passing them as an array:

in Typescript:
```typescript
centered: SJssStyles = {display: 'flex', justifyContent: 'center', alignItems: 'center'};
```
in Html:
```html
<div [sj]="[{padding: theme.spacing(3)}, centered]">Centered Content</div>
```

or just in Html:
```html
<div [sj]="[{padding: theme.spacing(3)}, {display: 'flex', justifyContent: 'center', alignItems: 'center'}]">Centered Content</div>
```

### Responsive Design

Define styles for different breakpoints:

```html
<div [sj]="{backgroundColor: {xs:'red', sm:'blue', md:'green', lg:'purple', xl:'orange'}}">RESPONSIVE DIV</div>
```

## Typography
Use any html tag from H1 to H6, P or span, and add the directive Sjss
```html
<h1 [sj]>Hello world H1</h1>
<h2 [sj]>Hello world H1</h2>
<h3 [sj]>Hello world H3</h3>
<h4 [sj]>Hello world h4</h4>
<h5 [sj]>Hello world H5</h5>
<h6 [sj]>Hello world H6</h6>
<p [sj]>Hello world P</p>
<span [sj]>Hello world span</span>
```
## Theming

Super JSS provides a theming mechanism. You can subscribe to theme changes in any component and update the theme as needed. [More details on theming...](https://medium.com/@viejorichard/super-jss-how-to-override-a-theme-64d8da14e3fb)

## How it works
>
>[Super JSS: A Library for Responsive CSS Styles](https://medium.com/@viejorichard/super-jss-a-library-for-responsive-css-styles-85691b210450)
> 
>[Super JSS: How to override a theme](https://medium.com/@viejorichard/super-jss-how-to-override-a-theme-64d8da14e3fb)
> 




## stackblitz
>
>[basic usage example](https://stackblitz.com/edit/angular-ivy-vewzoz?file=src%2Fapp%2Fapp.component.html)
> 
>[Flex-box Responsive Demo](https://stackblitz.com/edit/angular-ivy-ieshja)
> 
>[Theme Handler Demo](https://stackblitz.com/edit/angular-ivy-atzazr)

 
## quick demo
>[https://superjss.netlify.app/](https://superjss.netlify.app/)

## Fundraise me
Help me to continue working on the library

>[Paypal me superjss](https://www.paypal.com/paypalme/superjss)
>
>[Paypal me rsantoyodev](https://www.paypal.com/paypalme/rsantoyodev)

## Contact me

>[ricardo.santoyo@hotmail.com](mailto:ricardo.santoyo@hotmail.com)
