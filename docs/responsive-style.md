# Responsive Styling with SJSS

Super JavaScript Stylesheets (SJSS) provides a powerful and intuitive system for implementing responsive designs in Angular applications. Using a combination of predefined and customizable breakpoints, developers can easily define styles that adapt to different screen sizes.

## Breakpoint Upscaling in SJSS
In SJSS, breakpoints are designed with an 'upscaling' approach. This means:

- **Breakpoint Application**: A style defined for a smaller breakpoint (e.g., xs) will apply to larger breakpoints until a new style is specified.
- **Continuity Across Breakpoints**: If a style is set for xs, it will continue to be effective for sm, md, lg, etc., until a larger breakpoint explicitly overrides it.
- **Initial Definition**: If the initial style is defined for a larger breakpoint (e.g., md or above), xs and sm will adopt this style unless explicitly overridden.

## Example: Responsive Styling in a Component

Consider a scenario where you want your Angular component to adapt its style based on the screen size. SJSS makes this straightforward with responsive style properties. Here's an example:

```typescript
import { Component } from "@angular/core";
import { SjDirective } from "super-jss";

@Component({
  standalone: true,
  selector: 'app-responsive-demo',
  template: `
    <div [sj]="{
      p: {
        xs: '5px',    // Padding for extra small screens
        md: '10px',   // Padding for medium screens
        lg: '15px'    // Padding for large screens
        xl: '20px'   // Padding for extra large screens
        xxl: '25px'  // Padding for extra extra large screens        
      },
      bg: {
        xs: '#6699ff', // Background color for extra small screens
        md: '#99ff66', // Background color for medium screens
        lg: '#ff6699'  // Background color for large screens
      }
    }">
      Responsive SJSS Component!
    </div>
  `
})
export class ResponsiveDemoComponent {}
```


# Updating Breakpoints
To customize breakpoints in your Angular application, SJSS provides the SjThemeService, which is particularly powerful and user-friendly due to its use of Angular signals. This approach minimizes boilerplate and simplifies state management. Once set, these breakpoints are automatically recognized across the application through the sjDirective, ensuring a seamless and consistent responsive experience.

```typescript
import { Component } from "@angular/core";
import { SjDirective } from "super-jss";
import { SjThemeService } from "super-jss";

@Component({
  standalone: true,
  selector: 'app-responsive-demo',
  template: `
    <div (click)="updateBreakpoints()" [sj]="{p: { xs: '5px', md: '10px' }}">
      Responsive SJSS Component!
    </div>
  `
  })
  export class ResponsiveDemoComponent {
    //not recommended to change xs: unless your specifications does not care about mini devices, covered by xs
    constructor(private sjTheme: SjThemeService) {}
    updateBreakpoints(): void {
      this.sjTheme.setBreakpoints({
        sm: 660, // optional: a new breakpoint assiged to sm
        md: 980, // optional a new breakpoint assiged to md
        // add lg, xl, or xxl if needed.
      });
    }
  }
```
This flexibility in defining and updating breakpoints allows developers to tailor responsive behavior to specific needs, ensuring optimal user experience across all devices.
