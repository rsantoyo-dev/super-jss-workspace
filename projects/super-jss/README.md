# @super-jss/core

Super Jss is a css library, with the power of javascript, but with responsive superpowers.


# Installing
Start by installing the Super JSS library from npm
> npm i super-jss

## app.module.ts
 > import { SuperJssModule } from 'super-jss';<br />
 > ...<br />
> @NgModule({</br>
> ...</br>
 &nbsp; imports: [SuperJssModule], </br>
> ...</br>
 > })
>
After this configuration, SuperJss is ready to be used by using [sJss] = "{...jssObject}" in any html tag 

```html
<h2>Example of code</h2>

<div [sJss]="{
    backgroundColor: 'red', 
    color:'white', 
    display: 'flex',
    justifyContent: 'center', 
    padding: '3rem'}">
  HELLO WORLD
</div>
```

Every property is responsive by adding breakpoints inside the object

```html
<h2>Example of code</h2>

<div [sJss]="{
    backgroundColor: {xs:'red', sm:'blue', md:'green', lg:'purple', xl:'orange'}, 
    color:{xs:'white', md:'gray'}, 
    display: 'flex',
    justifyContent: 'center', 
    padding: '3rem'}">
  HELLO WORLD
</div>
```

Variables may be defined in ts</br>
app.component.ts
```js
export class AppComponent {
  myClass: SJss = {
    backgroundColor: {xs:'red', sm:'blue', md:'green', lg:'purple', xl:'orange'},
    color:{xs:'white', md:'gray'},
    display: 'flex',
    justifyContent: 'center',
    padding: '3rem',
  };
}
```
app.component.html
```html
<div [sJss]="myClass">HELLO WORLD, SJss Class</div>
```

## quick links
##quick demo
[https://superjss.netlify.app/](https://superjss.netlify.app/)

##stackblitz
[flex Demo](https://stackblitz.com/edit/angular-ivy-vewzoz?file=src%2Fapp%2Fapp.component.html)
</br>
[header example](https://stackblitz.com/edit/angular-ivy-vewzoz?file=src%2Fapp%2Fapp.component.html)

##Fundraise me
Help me to continue working on the library

[Paypal me superjss](https://www.paypal.com/paypalme/superjss)
[Paypal me rsantoyodev](https://www.paypal.com/paypalme/rsantoyodev)



<!---
## Build

Run `ng build super-jss` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build super-jss`, go to the dist folder `cd dist/super-jss` and run `npm publish`.

## Running unit tests

Run `ng test super-jss` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

-->
