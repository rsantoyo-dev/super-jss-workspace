# Typography System

SJSS offers a robust typography system that allows for the customization of text styles across various HTML elements.

## Using Typography in Components
To apply these typography styles in SJSS, you can use the `[sj]` directive in your Angular components. For example:

```html
<p [sj]>This paragraph will use SJSS default styling.</p>
<p [sj]="{ c: 'primary.main' }">This paragraph will have the primary color.</p>

```
In these examples, the first paragraph will be rendered with the default SJSS styling for `<p>` elements. The second paragraph will additionally have a text color corresponding to the primary color from the palette.

## Typography Default Styles
SJSS provides default styles for various HTML elements. These styles are defined in the `SjThemeService` and can be customized as per your application's needs. The following table lists the default typography styles in SJSS:

| Element | Font-Size (xs/md) | Font-Weight | Line-Height |
|---------|-------------------|-------------|-------------|
| Default | 1rem              | Normal      | 1.6         |
| H1      | 2.5rem / 3.5rem   | 600         | 4           |
| H2      | 2rem / 3rem       | 600         | 3.5         |
| H3      | 1.75rem / 2.5rem  | 600         | 3           |
| H4      | 1.5rem / 2rem     | 600         | 2           |
| H5      | 1.25rem / 1.75rem | 600         | 2           |
| H6      | 1rem / 1.25rem    | 600         | 1.5         |
| P       | 1rem              | Normal      | 1.4         |
| SPAN    | 0.9rem            | Normal      | 1.2         |
| STRONG  | 1rem              | Bold        | 1.2         |
| BODY    | 1rem              | Normal      | 1.2         |
| CAPTION | 0.8rem            | Normal      | 1.2         |

This table provides a comprehensive guide to the default typography settings in SJSS. Users can rely on this data to understand how text will be styled by default and make informed decisions about customizing these styles.

## Customizing Typography
SJSS allows for easy customization of typography styles. You can use the `SjThemeService` to update the default typography settings.

```typescript
import { Component } from "@angular/core";
import { SjDirective, SjThemeService } from "super-jss";
 
@Component({
  standalone: true,
  selector: 'app-typography-update-demo',
  template: `
    <button (click)="updateFont()" [sj]="{ p: 1, bg: 'primary.main', color: 'primary.contrast', borderRadius: '4px', cursor: 'pointer' }">
      Update H3 Font
    </button>
  `
})
export class TypographyUpdateDemoComponent {
  constructor(private sjTheme: SjThemeService) {}
  updateFont(): void {
    this.sjTheme.setTheme({
      typography: {
        H3: {
          fontSize: '2rem',
          fontWeight: '600',
          lineHeight: 3
        }
      }
    });
  }
}
```

---

[⬅️ Previous: Responsive Styles](responsive-style.md) | [Next: Theming ➡️](theming.md)