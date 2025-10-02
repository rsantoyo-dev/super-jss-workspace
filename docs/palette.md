# Palette in SJSS

## Introduction to Palette Theming

SJSS uses a theming approach that allows you to define semantic color sets, like primary, secondary, and tertiary, using the provided color palette. This approach ensures consistency in the application's color scheme and enhances the ease of applying styles.

## Example: Demonstrating Palette with Shorthand Styles

The palette's flexibility allows for easy styling of components with semantic colors. Here's an example showing palette usage with spacing shorthands:

```typescript
  import { Component } from "@angular/core";
  import { SjDirective } from "super-jss";
  
  @Component({
    standalone: true,
    selector: 'app-themed-component',
    template: `
      <div [sj]="{ bg: 'primary.main', c: 'primary.contrast', p: 2, m: 1}">
        Primary Themed Content
        <div [sj]="{ bg: 'secondary.light', c: 'secondary.contrast', p: 1, m: 0.5 }">
          Secondary Light Theme
        </div>
        <div [sj]="{ bg: 'success.main', c: 'success.contrast', p: 1, m: 0.5 }">
          Success Theme
        </div>
      </div>
    `
  })
  export class ThemedComponent {}

```
In this example:

- The outer div is styled with the primary color theme, along with padding (p) and margin (m) for spacing.
- The inner divs use the secondary and success color themes, each with their own padding and margin for clear visual separation.

## Customizing the palette

### Structure and Default Sets

The default SJSS palette includes semantic color sets like primary, secondary, and success. Each set is structured with main, light, dark, and contrast shades for flexibility.

### Updating the palette

To customize the palette according to your branding or design preferences:

1. Use SjThemeService to apply a partial theme update at runtime.
2. Modify semantic colors via setTheme({ palette: { ... } }):

```typescript
import { Component } from "@angular/core";
import { SjDirective, SjThemeService } from "super-jss";

@Component({
  standalone: true,
  selector: 'app-themed-component',
  template: `
    <div (click)="updateColor()" [sj]="{ bg: 'primary.main', c: 'primary.contrast', p: 2, m: 1}">
      Primary Themed Content
    </div>
  `
})
export class ThemedComponent {
  constructor(private sjTheme: SjThemeService) {}
  updateColor(): void {
    this.sjTheme.setTheme({
      palette: {
        primary: {
          main: '#ffdb58',
          light: '#ffecb3',
          dark: '#ffca28',
          contrast: '#000000'
        },
        tertiary: {
          main: '#9C27B0',
          light: '#CE93D8',
          dark: '#6A1B9A',
          contrast: '#FFFFFF'
        }
      }
    });
  }
}
```
This example showcases how SJSS's theming and shorthand styles enable developers to create visually appealing and consistent designs with ease.


## Default palette configuration

The default palette configuration is as follows:

| theme.palette. | main      | light     | dark      | contrast |
|----------------|-----------|-----------|-----------|----------|
| primary        | blue[500] | blue[300] | blue[700] | white    |
| secondary      | orange[500] | orange[300] | orange[700] | black    |
| tertiary       | red[500]  | red[300]  | red[700]  | white    |
| success        | green[500] | green[300] | green[700] | white    |
| info           | cyan[500] | cyan[300] | cyan[700] | black    |
| warning        | orange[500] | orange[300] | orange[700] | black    |
| error          | red[500]  | red[300]  | red[700]  | white    |
| dark           | gray[800] | gray[600] | black     | white    |
| neutral        | gray[500] | gray[300] | gray[700] | black    |
| light          | gray[200] | gray[50]  | gray[400] | gray[900] |

