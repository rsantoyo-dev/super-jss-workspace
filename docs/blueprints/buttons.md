# Button Blueprints

Button blueprints in Super JSS offer a collection of pre-styled, composable button styles. The `sjButton` blueprint is a function that provides several variants for common button use cases, from simple text buttons to contained buttons with shadows.

## Table of Contents
1. [Basic Usage](#basic-usage)
2. [Button Variants](#button-variants)
    - [Default Button (Contained Primary)](#default-button-contained-primary)
    - [Light Button](#light-button)
    - [Contained Button](#contained-button)
    - [Outlined Button](#outlined-button)
    - [Contained Light Button](#contained-light-button)
    - [Contained Dark Button](#contained-dark-button)
    - [Contained Secondary Button](#contained-secondary-button)
    - [Danger Button](#danger-button)
3. [Customizing Buttons](#customizing-buttons)

## Basic Usage

The `sjButton` blueprint is a function that returns an `SjStyle` object. You can apply it directly to a `<button>` or `<a>` element using the `[sj]` directive.

```typescript
import { Component } from '@angular/core';
import { SjDirective, sjButton } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-my-button',
  imports: [SjDirective],
  template: `
    <button [sj]="sjButton()">
      Click Me
    </button>
  `
})
export class MyButtonComponent {
  protected readonly sjButton = sjButton;
}
```

## Button Variants

The `sjButton` API provides several variants accessible via dot notation.

### Default Button (Contained Primary)
The default button is a contained button with the theme's primary color. It includes a shadow and hover effects.

- **Usage:** `sjButton()` or `sjButton.containedPrimary()`

```html
<button [sj]="sjButton()">Primary Button</button>
```

### Light Button
A light button with a subtle background and primary text color.

- **Usage:** `sjButton.light()`

```html
<button [sj]="sjButton.light()">Light Button</button>
```

### Contained Button
A contained button with a neutral background color.

- **Usage:** `sjButton.contained()`

```html
<button [sj]="sjButton.contained()">Contained Button</button>
```

### Outlined Button
An outlined button with a transparent background and a border.

- **Usage:** `sjButton.outlined()`

```html
<button [sj]="sjButton.outlined()">Outlined Button</button>
```

### Contained Light Button
A contained button with a light background color.

- **Usage:** `sjButton.containedLight()`

```html
<button [sj]="sjButton.containedLight()">Light Contained</button>
```

### Contained Dark Button
A contained button with a dark background color, suitable for dark themes.

- **Usage:** `sjButton.containedDark()`

```html
<button [sj]="sjButton.containedDark()">Dark Contained</button>
```

### Contained Secondary Button
A contained button using the theme's secondary color.

- **Usage:** `sjButton.containedSecondary()`

```html
<button [sj]="sjButton.containedSecondary()">Secondary Button</button>
```

### Danger Button
A button for actions that have destructive consequences, using the theme's error color.

- **Usage:** `sjButton.danger()`

```html
<button [sj]="sjButton.danger()">Danger Button</button>
```

## Customizing Buttons

All `sjButton` variants are functions that accept an `overrides` object, allowing you to customize any style property.

```typescript
import { Component } from '@angular/core';
import { SjDirective, sjButton } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-custom-button',
  imports: [SjDirective],
  template: `
    // Override padding and border-radius
    <button [sj]="sjButton({ p: 2, borderRadius: 1 })">
      Custom Padding & Radius
    </button>

    // Make an outlined button use the secondary color
    <button [sj]="sjButton.outlined({ borderColor: 'secondary.main', c: 'secondary.main' })">
      Custom Outlined
    </button>
  `
})
export class CustomButtonComponent {
  protected readonly sjButton = sjButton;
}
```
