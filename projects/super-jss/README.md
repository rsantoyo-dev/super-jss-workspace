### ...what is new?
  - use [sj] instead of [sjss] for quicker use
  - responsive theme and breakpoints
# @super-jss/core

Super Jss is a css library, with the power of javascript, but with responsive superpowers.


# Installing
Start by installing the Super JSS library from npm
> npm i super-jss

app.module.ts
 > import { SuperJssModule } from 'super-jss';<br />
 > ...<br />
> @NgModule({</br>
> ...</br>
 &nbsp; imports: [SuperJssModule], </br>
> ...</br>
 > })
>

# How to use

##  inline code
>[basic usage example](https://stackblitz.com/edit/angular-ivy-vewzoz?file=src%2Fapp%2Fapp.component.html)


SuperJss is ready to be used by using [sj] = "{...jssObject}" in any html tag 
```html
<h2>Example of code</h2>

<div [sj]="{
    backgroundColor: 'red', 
    color:'white', 
    display: 'flex',
    justifyContent: 'center', 
    padding: '3rem'}">
  HELLO WORLD
</div>
```
## Variables definition in class
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

## Responsive implementation
>[Flex-box Responsive Demo](https://stackblitz.com/edit/angular-ivy-ieshja)
>
Every property is responsive by adding breakpoints inside the object

```html
<h2>Example of code</h2>

<div [sj]="{
    backgroundColor: {xs:'red', sm:'blue', md:'green', lg:'purple', xl:'orange'}, 
    color:{xs:'white', md:'gray'}, 
    display: 'flex',
    justifyContent: 'center', 
    padding: '3rem'}">
  HELLO WORLD
</div>
```

app.component.html
```html
<div [sj]="myClass">HELLO WORLD, SJss Class</div>
```

## Using theme
>[Theme Handler Demo](https://stackblitz.com/edit/angular-ivy-atzazr)
>
Theme may be applied by the directive SuperJssService </br>
app.component.ts
```js
export class AppComponent {
  theme: SJssTheme;
  constructor(superJssService: SuperJssService) {
    this.theme =superJssService.defaultTheme();
  }
}
```
app.component.html
```html
<div [sj]="{xs:theme.palette.primary.main, sm:theme.palette.primary.light}">HELLO WORLD, SJss Class</div>
```

## Reactive theme
Use this if you need to override, or update the theme any time in the app.

Step1: create a directive that will handle the theme.

```js
@Injectable({
  providedIn: 'root'
})
export class ThemeHandlerService {

  _theme: SJssTheme
  themeChanges: BehaviorSubject<SJssTheme>;

  constructor(superJssService: SuperJssService) {
    this._theme =superJssService.defaultTheme();
    this.themeChanges = new BehaviorSubject<SJssTheme>(this._theme);
  }
  setTheme(newValue:SJssTheme): void {
    this._theme = newValue;
    this.themeChanges.next(this._theme);
  }
  getTheme(): Observable<SJssTheme> {
    return this.themeChanges.asObservable();
  }
}
```
step2: get the theme by subscribing to themeService.getTheme to apply it in any class
```js
export class Component1 {

  theme: SJssTheme;

  constructor(themeService: ThemeHandlerService) {
    this.theme = themeService._theme;
    themeService.getTheme().subscribe((theme) => {this.theme = theme})
  }
}
```

step2: set or update the theme by using ThemeHandlerService.setTheme(newTheme:SJssTheme) to apply it in any class
```js
export class Component2 {

  theme: SJssTheme;

  constructor(themeService: ThemeHandlerService) {
    this.theme = themeService._theme;
    themeService.getTheme().subscribe((theme) => {this.theme = theme})
    updateTheme();
  }
  updateTheme(){
    let myTheme:SJssTheme | null = {...this.theme}
    myTheme.palette.primary.main === '#ff3366'
    myTheme.palette.primary.light === '#ff6699'
    this.themeService.setTheme(th);
  }
}
```
NOTE: The default theme object is the following, any value may be updated.
```js
{
  breakpoints: {xs: 0, sm: 600, md: 900, lg: 1200, xl: 1320},
  spacing: (factor) => `${0.25 * factor}rem`,
    typography: {
  default: {fontFamily: '"Roboto","Helvetica"', fontSize: '1.2em'},
    H1: {fontSize: {xs: '3em', md: '3.5em'}, fontWeight: 'bold'},
    H2: {fontSize: {xs: '2.5em', md: '3em'}, fontWeight: 'bolder'},
    H3: {fontSize: {xs: '2.0em', md: '2.5em'}, fontWeight: 'bolder'},
    H4: {fontSize: {xs: '1.8em', md: '2em'}, fontWeight: 'bolder'},
    H5: {fontSize: {xs: '1.5em', md: '1.8em'}, fontWeight: 'bolder'},
    H6: {fontSize: {xs: '1em', md: '1.2em'}, fontWeight: 'bolder'},
    P: {fontSize: '1em', fontWeight: 'normal'},
    SPAN: {fontSize: '0.8em', fontWeight: 'normal'},
  },
  palette: {
    common: {
      black: "#030303",
        white: "#fafafa",
        gray: {
        main: '#888888',
          light: '#aaaaaa',
          dark: '#555555',
          contrastText: '#dddddd',
      }
    },
    primary: {
      main: '#147a81',
        light: '#5aeae7',
        dark: '#0f5d73',
        contrastText: '#f9fff7',
    },
    secondary: {
      main: '#a724cc',
        light: '#d54ffa',
        dark: '#840c9f',
        contrastText: '#e7d9bf',
    },
    error: {
      main: '#cc1d1d',
        light: '#e3543d',
        dark: '#801f13',
        contrastText: '#e7d9bf',
    },
    warning: {
      main: '#be5419',
        light: '#f39363',
        dark: '#b03c08',
        contrastText: '#e7d9bf',
    },
    info: {
      main: '#0b619f',
        light: '#3795d9',
        dark: '#073556',
        contrastText: '#e7d9bf',
    },
    success: {
      main: '#35850e',
        light: '#7eee47',
        dark: '#163807',
        contrastText: '#e7d9bf',
    },
    text: {
      primary: '#e7e7e7',
        secondary: '#1a1a1a',
        disabled: 'rgba(16,16,16,0.39)',
    },
  }

}
```


# quick links
some useful links
## quick demo
>[https://superjss.netlify.app/](https://superjss.netlify.app/)

## stackblitz
>[Flex-box Responsive Demo](https://stackblitz.com/edit/angular-ivy-ieshja)
> 
>[Theme Handler Demo](https://stackblitz.com/edit/angular-ivy-atzazr)
> 
>[basic usage example](https://stackblitz.com/edit/angular-ivy-vewzoz?file=src%2Fapp%2Fapp.component.html)

## Fundraise me
Help me to continue working on the library

>[Paypal me superjss](https://www.paypal.com/paypalme/superjss)
>
>[Paypal me rsantoyodev](https://www.paypal.com/paypalme/rsantoyodev)

## Contact me

>[ricardo.santoyo@hotmail.com](mailto:ricardo.santoyo@hotmail.com)





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
