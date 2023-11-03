# Theming with Super JSS

Super JSS provides a robust theming system that allows you to define and switch themes dynamically in your Angular applications. Theming is essential for creating consistent styling across your application and for enabling features like dark mode.

## Defining a Theme

You can define a theme as a set of style properties that can be applied globally across your application.

```typescript
import { defaultThemeConfig, SJTheme } from 'super-jss';

const myTheme: SJTheme = defaultThemeConfig();
myTheme.palette.primary.main = '#007bff'; // Blue
myTheme.palette.secondary.main = '#dc3545'; // Red
```
Applying a Theme
Once you have defined a theme, you can apply it using the sjTheme.set method.
```typescript
import { sjTheme } from 'super-jss';

// Apply the theme globally
sjTheme.set(myTheme);
```

## Conclusion

By following these steps, you can effectively override the default theme in SuperJSS, ensuring your application adheres to your specific design requirements. Remember, responsibly managing your subscriptions by unsubscribing in the `ngOnDestroy` method is crucial to prevent memory leaks and maintain optimal performance in your Angular applications.

---

[← Typography](typography.md) | [Home](index.md) | [Examples →](examples.md)
