# Color Palette with SJSS

## Color Palette with SJSS
Super JavaScript Stylesheets (SJSS) provides a flexible and powerful system for managing color palettes in Angular applications. Utilizing the SJSS color palette, you can define and apply a consistent color scheme throughout your app.

## Using the Color Palette
In SJSS, colors can be accessed and used within components, either through direct styling or as part of responsive and shorthand styles. Here's an example of how to use the color palette in a component:
```typescript
import { Component } from "@angular/core";
import { SjDirective } from "super-jss";

  @Component({
    standalone: true,
    selector: 'app-colorful-component',
    template: `
      <div [sj]="{ m: '2rem', p: '1rem', bg: 'blue' }">
       <div [sj]="{ bg: 'orange.300', color: 'orange.contrast' }">
        This is a colorful component!
       </div>        
      </div>
    `
  })
  export class ColorfulComponent {}

```

in this example, we're using the color palette to apply a background color to a div. We're also using the color palette to apply a background color and text color to a nested div.

## Personalize the Color Palette

The color palette can be accessed and modified through the SjThemeService. This service provides a powerful and user-friendly way to customize the color palette in your Angular application. Once set, these colors are automatically recognized across the application through the sjDirective, ensuring a seamless and consistent experience.

any palette item is defined as
```typescript
  {
    50: string,
    100: string,
    200: string,
    300: string,
    400: string,
    500: string, // Default shade
    600: string,
    700: string,
    800: string,
    900: string,
    contrast: string
  } 
```
to update a color, please use the `updatePalette` method from the `SjThemeService` as follows:
```typescript
import { Component } from "@angular/core";
import { SjDirective } from "super-jss";

@Component({
  standalone: true,
  selector: 'app-colorful-component',
  template: `
    <div (click)="updateColor()" [sj]="{ m: '2rem', p: '1rem', bg: 'blue' }">
     <div [sj]="{ bg: 'orange.300', color: 'orange.contrast' }">
      This is a colorful component!
     </div>        
    </div>
  `
})

export class PaletteDemoComponent {
  //not recommended to change xs: unless your specifications does not care about mini devices, covered by xs
  constructor(private sjTheme: SjThemeService) {}
  updateColor(): void {
    this.sjTheme.setColors(
      pink: {
        50: '#dc3545',
        100: '#d8bbd0',
        200: '#d48fb1',
        300: '#fd06292',
        400: '#fc407a',
        500: '#f91e63',
        600: '#a81b60',
        700: '#82185b',
        800: '#8d1457',
        900: '#680e4f',
        contrast: '#d59242'
      }
    )
  }
}

```

## Color Palette Default Reference

| Color  | 50       | 100      | 200      | 300      | 400      | 500 (default) | 600      | 700      | 800      | 900      | Contrast |
|--------|----------|----------|----------|----------|----------|---------------|----------|----------|----------|----------|----------|
| Blue   | #E3F2FD  | #BBDEFB  | #90CAF9  | #64B5F6  | #42A5F5  | #3498DB       | #2E86C1  | #1976D2  | #1565C0  | #0D47A1  | #c26d29  |
| Indigo | #E8EAF6  | #C5CAE9  | #9FA8DA  | #7986CB  | #5C6BC0  | #3F51B5       | #3949AB  | #303F9F  | #283593  | #1A237E  | #f59242  |
| Purple | #F3E5F5  | #E1BEE7  | #CE93D8  | #BA68C8  | #AB47BC  | #9C27B0       | #8E24AA  | #7B1FA2  | #6A1B9A  | #4A148C  | #f59242  |
| Pink   | #FCE4EC  | #F8BBD0  | #F48FB1  | #F06292  | #EC407A  | #E91E63       | #D81B60  | #C2185B  | #AD1457  | #880E4F  | #f59242  |
| Red    | #FFEBEE  | #FFCDD2  | #EF9A9A  | #E57373  | #EF5350  | #E74C3C       | #E53935  | #D32F2F  | #C62828  | #771010  | #f59242  |
| Orange | #FFF3E0  | #FFE0B2  | #FFCC80  | #FFB74D  | #FFA726  | #F39C12       | #FB8C00  | #F57C00  | #EF6C00  | #bb4600  | #f59242  |
| Yellow | #FFFDE7  | #FFF9C4  | #FFF59D  | #FFF176  | #FFEE58  | #FFEB3B       | #FDD835  | #FBC02D  | #F9A825  | #F57F17  | #f59242  |
| Green  | #E8F5E9  | #C8E6C9  | #A5D6A7  | #81C784  | #66BB6A  | #4CAF50       | #43A047  | #388E3C  | #2E7D32  | #1B5E20  | #f59242  |
| Teal   | #E0F2F1  | #B2DFDB  | #80CBC4  | #4DB6AC  | #26A69A  | #009688       | #00897B  | #00796B  | #00695C  | #004D40  | #f59242  |
| Cyan   | #E0F7FA  | #B2EBF2  | #80DEEA  | #4DD0E1  | #26C6DA  | #00BCD4       | #00ACC1  | #0097A7  | #00838F  | #006064  | #f59242  |
| Gray   | #FAFAFA  | #F5F5F5  | #EEEEEE  | #E0E0E0  | #BDBDBD  | #9E9E9E       | #757575  | #616161  | #424242  | #212121  | #f59242  |
| Black  | -        | -        | -        | -        | -        | #000000       | -        | -        | -        | -        | -        |
