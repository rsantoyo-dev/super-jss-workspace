# Card Blueprints

Blueprints are style builders (not components) that return `SjStyle` objects. The Card blueprint gives you reusable card surfaces. If you’re new to the concept, see the [Blueprints overview](./_index.md). Use `sjCard` directly or via `sj.sjCard` with autocomplete; variants are discoverable at `sj.sjCard.variants`.

## Table of Contents
1. [Basic usage](#basic-usage)
2. [Using with sj root API](#using-with-sj-root-api)
3. [Card variants](#card-variants)
    - [Default Card](#default-card)
    - [Outlined Card](#outlined-card)
    - [Flat Card](#flat-card)
    - [Elevated Card](#elevated-card)
    - [Interactive Card](#interactive-card)
    - [Primary Card](#primary-card)
    - [Secondary Card](#secondary-card)
    - [Info Card](#info-card)
    - [Code Snippet Card](#code-snippet-card)
4. [Customizing cards](#customizing-cards)

## Basic usage

The `sjCard` blueprint is a function that returns an `SjStyle` object. You can apply it directly to any element using the `[sj]` directive.

```typescript
import { Component } from '@angular/core';
import { SjDirective, sjCard } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-my-card',
  imports: [SjDirective],
  template: `
    <div [sj]="sjCard()">
      <h3>Default Card</h3>
      <p>This is a simple card using the default style.</p>
    </div>
  `
})
export class MyCardComponent {
  protected readonly sjCard = sjCard;
}
```

## Using with sj root API

Expose `sj` and compose with helpers and responsive overrides.

```ts
import { Component } from '@angular/core';
import { SjDirective, sj } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-card-api',
  imports: [SjDirective],
  template: `
    <div [sj]="[
      sj.sjCard(),
      sj.p({ xs: 1, md: 2 }),
      sj.bg(sj.bg.options.light.light)
    ]">
      Default via sj API
    </div>

    <div [sj]="sj.sjCard.elevated({ p: 2 })">Elevated + overrides</div>

    <div [sj]="sj.sjCard.primary({ gap: 1 })">
      <h3 [sj]="sj.c(sj.c.options.primary.contrast)">Primary Card</h3>
    </div>
  `,
})
export class CardApiComponent { readonly sj = sj; }
```

## Card variants

The `sjCard` API comes with several convenient variants accessible via dot notation.

### Default Card

The default card comes with a light background, padding, and subtle transitions.

- **Usage:** `sjCard()`
- **Description:** Default card with light background.

```html
<div [sj]="sjCard()">...</div>
```

### Outlined Card

An outlined card has a transparent background and a visible border.

- **Usage:** `sjCard.outlined()`
- **Description:** Outlined, transparent background, no shadow.

```html
<div [sj]="sjCard.outlined()">...</div>
```

### Flat Card

A flat card has no box shadow, making it appear flush with the background.

- **Usage:** `sjCard.flat()`
- **Description:** No shadow.

```html
<div [sj]="sjCard.flat()">...</div>
```

### Elevated Card

An elevated card has a more pronounced box shadow, making it appear to lift off the page.

- **Usage:** `sjCard.elevated()`
- **Description:** Stronger shadow.

```html
<div [sj]="sjCard.elevated()">...</div>
```

### Interactive Card

An interactive card includes hover effects, making it suitable for clickable elements.

- **Usage:** `sjCard.interactive()`
- **Description:** Card with hover effects.

```html
<div [sj]="sjCard.interactive()">...</div>
```

### Primary Card

A card styled with the theme's primary color for the background and a contrasting text color.

- **Usage:** `sjCard.primary()`
- **Description:** Primary background and contrast text.

```html
<div [sj]="sjCard.primary()">...</div>
```

### Secondary Card

A card styled with the theme's secondary color.

- **Usage:** `sjCard.secondary()`
- **Description:** Secondary background and contrast text.

```html
<div [sj]="sjCard.secondary()">...</div>
```

### Info Card

A card for displaying informational messages, often with a subtle background.

- **Usage:** `sjCard.info()`
- **Description:** Informational card with subtle background.

```html
<div [sj]="sjCard.info()">...</div>
```

### Code Snippet Card

A specialized card style for displaying preformatted code.

- **Usage:** `sjCard.codeSnippet()`
- **Description:** Preset style for code snippets inside cards.

```html
<pre [sj]="sjCard.codeSnippet()"><code>...</code></pre>
```

## Customizing cards

All `sjCard` variants are functions that accept an `overrides` object. This allows you to easily customize any style property of the card.

```typescript
import { Component } from '@angular/core';
import { SjDirective, sjCard } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-custom-card',
  imports: [SjDirective],
  template: `
    // Override background color of a default card
    <div [sj]="sjCard({ bg: 'secondary.main', c: 'secondary.contrast' })">
      Custom Background
    </div>

    // Override border radius of a primary card
    <div [sj]="sjCard.primary({ borderRadius: 4 })">
      Custom Border Radius
    </div>

    // Override padding of an elevated card
    <div [sj]="sjCard.elevated({ p: 3 })">
      Custom Padding
    </div>
  `
})
export class CustomCardComponent {
  protected readonly sjCard = sjCard;
}

You can also use the variants registry for string‑based selections in other APIs: `sj.sjCard.variants.outlined`, etc.
```
