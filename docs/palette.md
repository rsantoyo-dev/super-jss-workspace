# Palette in SJSS

## Introduction to Palette Theming

SJSS uses a theming approach that allows you to define semantic color sets, like primary, secondary, and tertiary, using the provided color palette. This approach ensures consistency in the application's color scheme and enhances the ease of applying styles.

## Example: Demonstrating Palette with Shorthand Styles

It's palette's flexibility allows for easy styling of components with various color themes. Here's an enhanced example showing the use of the palette along with shorthand styles for padding, margin, and more:

```typescript
  import { Component } from "@angular/core";
  import { SjDirective } from "super-jss";
  
  @Component({
    standalone: true,
    selector: 'app-themed-component',
    template: `
      <div [sj]="{ bg: 'primary.main', color: 'primary.contrast', p: 2, m: 1}">
        Primary Themed Content
        <div [sj]="{ bg: 'secondary.light', color: 'secondary.contrast', p: 1, m: 0.5 }">
          Secondary Light Theme
        </div>
        <div [sj]="{ bg: 'success.main', color: 'success.contrast', p: 1, m: 0.5 }">
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

# Customizing the Palette
### Structure and Default Sets
The default SJSS palette includes semantic color sets like primary, secondary, and success. Each set is structured with main, light, dark, and contrast shades for flexibility.

### Updating the Palette
To customize the color sets according to your branding or design preferences:

1.  **Accessing the Palette**: Utilize the SjThemeService to work with the current palette.

2.  **Modifying Colors**: Use setColors in SjThemeService to update the color sets:

```typescript
import { Component } from "@angular/core";
import { SjDirective, SjThemeService } from "super-jss";

@Component({
  standalone: true,
  selector: 'app-themed-component',
  template: `
    <div (click)="updateColor()" [sj]="{ bg: 'primary.main', color: 'primary.contrast', p: 2, m: 1}">
      Primary Themed Content
    </div>
  `
})
export class ThemedComponent {
  constructor(private sjTheme: SjThemeService) {}
  updateColor(): void {
    this.sjTheme.setColors({
      primary: {
        main: '#ffdb58',
        light: '#ffecb3',
        dark: '#ffca28',
        contrast: '#000000'
      },
      // colors from the library may be used as well      
      tertiary: {
        main: this.sjTheme.colors.purple,
        light: this.sjTheme.colors.purple[300],
        dark: this.sjTheme.colors.purple[700],
        contrast: this.sjTheme.colors.purple.contrast
      }
    });
  }
}
```
This example showcases how SJSS's theming and shorthand styles enable developers to create visually appealing and consistent designs with ease.






## Default Palette Configuration
The default palette configuration is as follows:

| theme.palette. | main | light | dark | contrast |
|----------------|------|-------|------|----------|
| primary        | blue[500]   | blue[300]   | blue[700]   | yellow[500]   |
| secondary      | orange[500] | orange[300] | orange[700] | blue[300]     |
| tertiary       | red[500]    | red[300]    | red[700]    | white         |
| success        | green[500]  | green[300]  | green[700]  | gray[50]      |
| info           | cyan[500]   | cyan[300]   | cyan[700]   | gray[50]      |
| warning        | orange[500] | orange[300] | orange[700] | gray[50]      |
| error          | red[500]    | red[300]    | red[700]    | gray[50]      |
| dark           | gray[800]   | gray[600]   | black       | gray[50]      |
| neutral        | gray[500]   | gray[300]   | gray[700]   | gray[50]      |
| light          | gray[200]   | gray[50]    | gray[400]   | gray[900]     |
