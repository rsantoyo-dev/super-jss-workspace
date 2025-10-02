# Spacing System

## Introduction to Spacing
In SJSS, spacing is a versatile feature that allows for consistent and scalable space management throughout your application. Spacing can be applied to various properties like padding, margin, gap, and others, using a simple numeric factor system.

## Default Spacing Configuration
The default spacing in SJSS is defined as a function that converts a numeric factor into rem units. This approach ensures uniformity and ease of adjustments across different UI components.

## Using Spacing
To apply spacing in SJSS, you can use shorthand properties with numeric factors. For example, `{ p: 1 }` translates to padding of 1 rem.

```typescript
import { Component } from "@angular/core";
import { SjDirective } from "super-jss";

@Component({
  standalone: true,
  selector: 'app-spacing-demo',
  template: `<div [sj]="{ p: 1, m: 2 }">Content with padding and margin</div>`
})
export class SpacingDemoComponent {}
```
In this example, `p: 1` applies 1 rem of padding, and `m: 2` applies 2 rem of margin to the element.

You can also compose spacing responsively and with arrays:

```html
<div [sj]="[
  { p: { xs: 1, md: 2 }, m: 1 },
  { gap: { xs: 0.5, md: 1 } }
]">
  Responsive spacing with gap
</div>
```

## Customizing Spacing
You can customize the spacing scale to fit the design needs of your application.

## Updating Spacing
The spacing can be updated using the `setTheme` method of `SjThemeService`. This method allows you to redefine how the numeric factors are translated into actual spacing values.

```typescript
import { Component } from "@angular/core";
import { SjDirective, SjThemeService } from "super-jss";

@Component({
  standalone: true,
  selector: 'app-spacing-update-demo',
  template: `
    <button (click)="updateSpacing()" [sj]="{ p: 1, bg: 'primary.main', c: 'primary.contrast', borderRadius: '4px', cursor: 'pointer' }">
      Update Spacing
    </button>
  `
})
export class SpacingUpdateDemoComponent {
  constructor(private sjTheme: SjThemeService) {}
  updateSpacing(): void {
    this.sjTheme.setTheme({
      spacing: (factor: number) => `${10 * factor}px` // Example: 1 unit now equals 10px
    });
  }
}
```

## Best Practices

* Use consistent spacing units across your application to maintain a harmonious layout.
* Choose spacing values that align with your design system or UI guidelines.
* Consider using multiples of a base unit (like 0.25 rem, 0.5 rem, etc.) for a harmonious and scalable spacing system.

By utilizing SJSS's spacing system, developers can ensure consistent and easy-to-manage spacing throughout their Angular applications, with the flexibility to adjust it as per their design requirements.
