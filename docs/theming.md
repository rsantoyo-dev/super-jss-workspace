# Comprehensive theming system

Super JSS provides a robust theming system that allows you to define and switch themes dynamically in your Angular applications. Theming is essential for creating consistent styling across your application and for enabling features like dark mode.

## Defining a theme

You can define a theme as a set of style properties that can be applied globally across your application. Themes in SJSS conform to the `SjTheme` interface.

```typescript
// src/app/my-custom-theme.ts
import { SjTheme, defaultTheme, deepMerge } from 'super-jss';

export const myCustomTheme: Partial<SjTheme> = deepMerge(defaultTheme, {
  palette: {
    primary: {
      main: '#6200EE', // A custom primary color (Deep Purple)
      light: '#9E47FF',
      dark: '#0000AA',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#03DAC6', // A custom secondary color (Teal)
      light: '#66FFF9',
      dark: '#00A896',
      contrast: '#000000',
    },
  },
  // You can override other theme properties like breakpoints, typography, spacing, etc.
});
```
*(Note: `deepMerge` is an internal utility of the `super-jss` library. For external use, you might need to implement your own deep merge function or manually construct the theme object.)*

## Applying a theme

SJSS offers two primary ways to apply a theme:

### 1. Initial theme provision (at application startup)

To set a theme for your entire application at startup, provide it using the `SJ_THEME` injection token. This is typically done in your `main.ts` file for standalone applications or in your root `AppModule` for NgModule-based applications.

```typescript
// src/main.ts (for standalone applications)
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { SJ_THEME } from 'super-jss'; // Import the injection token
import { myCustomTheme } from './app/my-custom-theme'; // Your custom theme

bootstrapApplication(AppComponent, {
  providers: [
    { provide: SJ_THEME, useValue: myCustomTheme }
  ]
}).catch(err => console.error(err));
```

### 2. Dynamic theme updates (at runtime)

To change the theme dynamically based on user interaction, application state, or other logic, use the `SjThemeService`.

```typescript
import { Component } from '@angular/core';
import { SjDirective, SjThemeService, defaultTheme } from 'super-jss';
import { myCustomTheme } from './my-custom-theme'; // Your custom theme

@Component({
  standalone: true,
  selector: 'app-theme-switcher',
  template: `
    <button (click)="toggleTheme()" [sj]="{ p: 1, bg: 'primary.main', color: 'primary.contrast', borderRadius: '4px', cursor: 'pointer' }">
      Toggle Theme
    </button>
  `,
})
export class ThemeSwitcherComponent {
  isCustomThemeActive = false;

  constructor(private sjThemeService: SjThemeService) {}

  toggleTheme(): void {
    this.isCustomThemeActive = !this.isCustomThemeActive;
    const themeToApply = this.isCustomThemeActive ? myCustomTheme : defaultTheme;
    this.sjThemeService.setTheme(themeToApply);
  }
}
```

## Theme-aware pseudo-selectors

SJSS allows you to define styles for pseudo-selectors (like `:hover`, `:active`, `:focus`) directly within your `[sj]` attribute. These pseudo-selector styles can also leverage your defined theme colors and properties.

```typescript
import { Component } from '@angular/core';
import { SjDirective, sj } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-themed-button',
  template: `
    <button [sj]="[
      { p: 1, bg: 'primary.main', c: 'primary.contrast', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s ease-in-out' },
      sj.hover({ bg: 'primary.dark', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }),
      sj.active({ transform: 'scale(0.98)' })
    ]">
      Themed Button
    </button>
  `,
})
export class ThemedButtonComponent {}
```

## Conclusion

By following these steps, you can effectively define, apply, and dynamically switch themes in your Super JSS application, ensuring a consistent and customizable user experience.

## Interactive theming demo

Open this StackBlitz to try theme switching live:

[sjss-theming-demo on StackBlitz](https://stackblitz.com/edit/sjss-theming-demo?file=src/app/app.component.ts&view=preview)

---

[⬅️ Previous: Typography](typography.md) | [Next: Examples ➡️](examples.md)
