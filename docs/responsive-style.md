# Responsive Styling with Breakpoints

Super JavaScript Stylesheets ([SJSS](https://www.npmjs.com/package/super-jss)) offers a powerful and intuitive approach to implementing responsive designs in Angular applications. Through a system of breakpoints, developers can create styles that adapt seamlessly to various screen sizes.

## Table of Contents
1. [Breakpoint Upscaling in SJSS](#breakpoint-upscaling-in-sjss)
2. [Responsive Styling Example](#responsive-styling-example)
3. [Updating Breakpoints](#updating-breakpoints)
4. [Further Learning Resources](#further-learning-resources)

### Breakpoint Upscaling in SJSS
SJSS employs an 'upscaling' approach for breakpoints:

- **Breakpoint Application**: [Learn more about breakpoint application](#breakpoint-application)
- **Continuity Across Breakpoints**: [Understand breakpoint continuity](#continuity-across-breakpoints)
- **Initial Definition**: [Explore initial style definitions](#initial-definition)

### Responsive Styling Example
Here's how to apply responsive styling in an Angular component using SJSS:

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
          xl: '20px',   // Padding for extra large screens
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

For interactive examples and more, visit [SJSS on StackBlitz](https://stackblitz.com/edit/super-js?file=src%2Fmain.ts).

### Updating Breakpoints
To customize breakpoints, use the `SjThemeService` in SJSS, which is particularly powerful and user-friendly due to its use of Angular signals. This approach minimizes boilerplate and simplifies state management.

```typescript
import { Component } from "@angular/core";
import { SjDirective, SjThemeService } from "super-jss";

@Component({
  standalone: true,
  selector: 'app-responsive-demo',
  template: `
    <button (click)="updateBreakpoints()" [sj]="{ p: 1, bg: 'primary.main', color: 'primary.contrast', borderRadius: '4px', cursor: 'pointer' }">
      Update Breakpoints
    </button>
  `
})
export class ResponsiveDemoComponent {
  constructor(private sjTheme: SjThemeService) {}
  updateBreakpoints(): void {
    this.sjTheme.setTheme({
      breakpoints: {
        sm: 660, // optional: a new breakpoint assigned to sm
        md: 980, // optional: a new breakpoint assigned to md
        // add lg, xl, or xxl if needed.
      }
    });
  }
}
```
This example demonstrates how to update breakpoints in SJSS. For more examples, visit [SJSS on StackBlitz](https://stackblitz.com/edit/super-js?file=src%2Fmain.ts).

### Further Learning Resources
For additional information and examples on responsive styling with SJSS, explore the following resources:
- [SJSS on npm](https://www.npmjs.com/package/super-jss): Detailed package information and installation guide.
- [Interactive Examples on StackBlitz](https://stackblitz.com/edit/super-js?file=src%2Fmain.ts): Explore hands-on examples and see SJSS in action.

---
[⬅️ Previous: Styling Shortcuts](styling-shortcuts.md) | [Next: Colors ➡️](colors.md)