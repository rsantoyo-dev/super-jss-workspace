# Typography system

SJSS offers a robust, theme-driven typography system you can customize per element (H1, P, etc.). Defaults are responsive across breakpoints.

## Using Typography in Components
To apply these typography styles in SJSS, you can use the `[sj]` directive in your Angular components. For example:

```html
<p [sj]>This paragraph will use SJSS default styling.</p>
<p [sj]="{ c: 'primary.main' }">This paragraph will have the primary color.</p>
```
In these examples, the first paragraph will be rendered with the default SJSS styling for `<p>` elements. The second paragraph will additionally have a text color corresponding to the primary color from the palette.

## Typography default styles
SJSS provides default styles for various HTML elements. These are defined in the theme and can be customized. Below are the defaults:

| Element | Font-Size (xs/md) | Font-Weight | Line-Height (xs/md) |
|---------|-------------------|-------------|---------------------|
| Default | 1rem              | Normal      | 1.3 / 1.6          |
| H1      | 2.5rem / 4rem     | 800         | 2.3 / 3.7          |
| H2      | 2rem / 3.2rem     | 600         | 1.75 / 3.2         |
| H3      | 1.75rem / 2.7rem  | 600         | 1.8 / 2.8          |
| H4      | 1.5rem / 2rem     | 600         | 1.3 / 2.2          |
| H5      | 1.25rem / 1.75rem | 600         | 1.4 / 2.2          |
| H6      | 1rem / 1.25rem    | 600         | 1.2 / 2.2          |
| P       | 1rem              | Normal      | 1.6 / 1.8          |
| SPAN    | 0.9rem            | Normal      | 1.2 / 1.4          |
| STRONG  | 1rem              | Bold        | 1.2 / 1.4          |
| BODY    | 1rem              | Normal      | 1.6 / 1.8          |
| CAPTION | 0.8rem            | Normal      | 1.2 / 1.4          |
| SMALL   | 0.75rem           | Normal      | 0.5 / 0.75         |
| PRE     | 0.9rem            | Monospace   | 1.2 / 1.4          |

This table provides a comprehensive guide to the default typography settings in SJSS. Users can rely on this data to understand how text will be styled by default and make informed decisions about customizing these styles.

## Customizing typography
Use `SjThemeService.setTheme` to override specific typography entries by element key.

```typescript
import { Component } from "@angular/core";
import { SjDirective, SjThemeService } from "super-jss";
 
@Component({
  standalone: true,
  selector: 'app-typography-update-demo',
  template: `
    <button (click)="updateFont()" [sj]="{ p: 1, bg: 'primary.main', c: 'primary.contrast', borderRadius: '4px', cursor: 'pointer' }">
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
