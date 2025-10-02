# Color palette and theming
Super JavaScript Stylesheets (SJSS) provides a flexible, token-based color system. You can use semantic palette tokens like `primary.main` or raw shade tokens like `blue.500` anywhere you style with `[sj]`.

## Table of Contents

1. [Using the color tokens](#using-the-color-tokens)
2. [Personalize the color palette](#personalize-the-color-palette)
3. [Color palette default reference](#color-palette-default-reference)

## Using the color tokens

Use `bg` for background and `c` for text color. Both palette tokens (e.g., `primary.*`) and shade tokens (e.g., `blue.500`) are supported in styles.

```typescript
import { Component } from "@angular/core";
import { SjDirective } from "super-jss";

  @Component({
    standalone: true,
    selector: 'app-colorful-component',
    template: `
      <div [sj]="{ m: '2rem', p: '1rem', bg: 'blue.500' }">
       <div [sj]="{ bg: 'orange.300', c: 'orange.contrast' }">
        This is a colorful component!
       </div>        
      </div>
    `
  })
  export class ColorfulComponent {}

```

In this example, we set a background color with a raw shade token (`blue.500`), then a nested block with a shade background and its contrast text color from the same color family.

## Personalize the color palette

You can customize the raw shade map (`theme.colors`) via `SjThemeService.setTheme`. These shade maps power tokens like `blue.500` and include a `contrast` swatch commonly used for legible text.

Any palette item is defined as:

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
To update a color family, use the `setTheme` method from the `SjThemeService`:

```typescript
import { Component } from "@angular/core";
import { SjDirective, SjThemeService } from "super-jss";

@Component({
  standalone: true,
  selector: 'app-palette-update-demo',
  template: `
    <button (click)="updateColors()" [sj]="{ p: 1, bg: 'primary.main', c: 'primary.contrast', borderRadius: '4px', cursor: 'pointer' }">
      Update Pink Color
    </button>
  `
})

export class PaletteUpdateDemoComponent {
  constructor(private sjTheme: SjThemeService) {}
  updateColors(): void {
    this.sjTheme.setTheme({
      colors: {
        pink: {
          50: '#FCE4EC',
          100: '#F8BBD0',
          200: '#F48FB1',
          300: '#F06292',
          400: '#EC407A',
          500: '#E91E63',
          600: '#D81B60',
          700: '#C2185B',
          800: '#AD1457',
          900: '#880E4F',
          contrast: '#FFFFFF'
        }
      }
    });
  }
}

```

## Color palette default reference

| Color  | 50       | 100      | 200      | 300      | 400      | 500 (default) | 600      | 700      | 800      | 900      | Contrast |
|--------|----------|----------|----------|----------|----------|---------------|----------|----------|----------|----------|----------|
| Blue   | #E3F2FD  | #BBDEFB  | #90CAF9  | #64B5F6  | #42A5F5  | #3498DB       | #2E86C1  | #1976D2  | #1565C0  | #0D47A1  | #FFFFFF  |
| Indigo | #E8EAF6  | #C5CAE9  | #9FA8DA  | #7986CB  | #5C6BC0  | #3F51B5       | #3949AB  | #303F9F  | #283593  | #1A237E  | #FFFFFF  |
| Purple | #F3E5F5  | #E1BEE7  | #CE93D8  | #BA68C8  | #AB47BC  | #9C27B0       | #8E24AA  | #7B1FA2  | #6A1B9A  | #4A148C  | #FFFFFF  |
| Pink   | #FCE4EC  | #F8BBD0  | #F48FB1  | #F06292  | #EC407A  | #E91E63       | #D81B60  | #C2185B  | #AD1457  | #880E4F  | #FFFFFF  |
| Red    | #FFEBEE  | #FFCDD2  | #EF9A9A  | #E57373  | #EF5350  | #E74C3C       | #E53935  | #D32F2F  | #C62828  | #771010  | #FFFFFF  |
| Orange | #FFF3E0  | #FFE0B2  | #FFCC80  | #FFB74D  | #FFA726  | #F39C12       | #FB8C00  | #F57C00  | #EF6C00  | #bb4600  | #000000  |
| Yellow | #FFFDE7  | #FFF9C4  | #FFF59D  | #FFF176  | #FFEE58  | #FFEB3B       | #FDD835  | #FBC02D  | #F9A825  | #F57F17  | #000000  |
| Green  | #E8F5E9  | #C8E6C9  | #A5D6A7  | #81C784  | #66BB6A  | #4CAF50       | #43A047  | #388E3C  | #2E7D32  | #1B5E20  | #FFFFFF  |
| Teal   | #E0F2F1  | #B2DFDB  | #80CBC4  | #4DB6AC  | #26A69A  | #009688       | #00897B  | #00796B  | #00695C  | #004D40  | #FFFFFF  |
| Cyan   | #E0F7FA  | #B2EBF2  | #80DEEA  | #4DD0E1  | #26C6DA  | #00BCD4       | #00ACC1  | #0097A7  | #00838F  | #006064  | #000000  |
| Gray   | #FAFAFA  | #F5F5F5  | #EEEEEE  | #E0E0E0  | #BDBDBD  | #9E9E9E       | #757575  | #616161  | #424242  | #212121  | #000000  |
| Black  | -        | -        | -        | -        | -        | #000000       | -        | -        | -        | -        | -        |
| White  | -        | -        | -        | -        | -        | #FFFFFF       | -        | -        | -        | -        | -        |


---

[⬅️ Previous: Styling Shortcuts](styling-shortcuts.md) | [Next: Spacing ➡️](spacing.md)
