# Theming in SuperJSS

Theming is a powerful feature in SuperJSS that allows for consistent styling across your application. By defining a theme, you can ensure that components maintain a uniform appearance in line with your design guidelines. However, there are times when you might need to override these default styles. Here's how you can do it effectively and safely.

## Overriding a Theme

To customize your application's look and feel, you might need to override the default theme provided by SuperJSS. This process involves using the `SJssThemeService` and responsibly managing your subscriptions to prevent memory leaks.

Here's a step-by-step guide:

### Step 1: Subscribing to Theme Changes

First, you need to subscribe to the theme changes in your component. This step ensures that your component stays updated with the latest theme information.

```typescript
import { Component, OnDestroy } from '@angular/core';
import { SJssTheme, SJssThemeService } from 'superjss';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-demo',
  template: `
    <div [style.backgroundColor]="theme?.palette.primary.main">
      Themed Component
    </div>
  `
})
export class ThemeDemoComponent implements OnDestroy {
  theme: SJssTheme | null = null;
  private themeSubscription: Subscription;

  constructor(private sjssThemeService: SJssThemeService) {
    this.themeSubscription = this.sjssThemeService.themeChanges().subscribe((newTheme) => {
      this.theme = newTheme;
    });
  }

  ngOnDestroy() {
    // Prevent memory leaks by unsubscribing when the component is destroyed
    this.themeSubscription.unsubscribe();
  }
}
```

### Step 2: Overriding the Theme

You can modify the theme's properties according to your project's requirements. Here's how you can do it:

```typescript


modifyTheme() {
  // Clone the current theme to avoid mutating the original object
  const updatedTheme: SJssTheme = { ...this.theme };

  // Customize the theme's properties
  updatedTheme.palette.primary.main = '#003366'; // Change the primary color
  // ... (other modifications)

  // Update the theme globally
  this.sjssThemeService.setTheme(updatedTheme);
}
```

### Step 3: Unsubscribing from Observables

When your component is destroyed, it's crucial to unsubscribe from the theme changes subscription. Failing to do so can lead to memory leaks, as the subscription remains active and continues to listen for changes.

```typescript
// ... (inside the ThemeDemoComponent class)

ngOnDestroy() {
  // Clean up the subscription to prevent memory leaks
  this.themeSubscription.unsubscribe();
}
```

## Conclusion

By following these steps, you can effectively override the default theme in SuperJSS, ensuring your application adheres to your specific design requirements. Remember, responsibly managing your subscriptions by unsubscribing in the `ngOnDestroy` method is crucial to prevent memory leaks and maintain optimal performance in your Angular applications.
