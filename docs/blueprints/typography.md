# Typography Blueprint

Typography blueprints in Super JSS provide consistent text styling with semantic variants. The `sjTypography` API offers functions for headings, body text, and other typography elements with responsive sizing and proper spacing.

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [Typography Variants](#typography-variants)
3. [Composing With Overrides](#composing-with-overrides)

## Basic Usage

The `sjTypography` blueprint provides functions for different text styles. Each function returns an `SjStyle` object that can be applied to any element.

```typescript
import { Component } from '@angular/core';
import { SjDirective, sjTypography } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-typography-demo',
  imports: [SjDirective],
  template: `
    <div [sj]="sjTypography.h1()">
      <h1>Main Heading</h1>
    </div>
    <div [sj]="sjTypography.body()">
      <p>Body text content</p>
    </div>
  `
})
export class TypographyDemoComponent {
  protected readonly sjTypography = sjTypography;
}
```

## Typography Variants

| Variant  | Description                          | Typical Use Case          |
| -------- | ------------------------------------ | ------------------------- |
| `h1()`   | Largest heading, main page titles    | Page titles, hero sections |
| `h2()`   | Section headings                     | Major sections            |
| `h3()`   | Subsection headings                  | Subsection headers        |
| `h4()`   | Smaller headings                     | Component titles          |
| `h5()`   | Small headings                       | Card titles, labels       |
| `h6()`   | Smallest headings                    | Small labels              |
| `p()`    | Paragraph text                       | Body paragraphs           |
| `body()` | Default body text                    | General content           |
| `span()` | Inline text                          | Inline elements           |
| `strong()` | Bold/emphasized text               | Emphasized content        |
| `caption()` | Small descriptive text            | Image captions, footnotes |
| `small()` | Fine print                           | Legal text, disclaimers   |
| `pre()`  | Preformatted text                    | Code blocks, monospace    |

## Responsive Typography

All typography variants include responsive font sizes that scale appropriately across breakpoints:

```typescript
// h1 scales from 2.5rem (mobile) to 4rem (desktop)
sjTypography.h1()

// body text scales from 1rem (mobile) to 1.125rem (desktop)
sjTypography.body()
```

## Composing With Overrides

Typography functions accept override objects to customize the base styles:

```typescript
import { Component } from '@angular/core';
import { SjDirective, sjTypography } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-custom-typography',
  imports: [SjDirective],
  template: `
    <div [sj]="sjTypography.h2({ color: 'primary.main', textAlign: 'center' })">
      <h2>Centered Primary Heading</h2>
    </div>
    <div [sj]="sjTypography.body({ fontSize: 1.2, lineHeight: 1.8 })">
      <p>Larger body text with custom line height</p>
    </div>
  `
})
export class CustomTypographyComponent {
  protected readonly sjTypography = sjTypography;
}
```

## Direct Function Imports

For convenience, you can import specific typography functions directly:

```typescript
import { sjH1, sjH2, sjBody, sjCaption } from 'super-jss';

@Component({
  template: `
    <h1 [sj]="sjH1({ color: 'primary.main' })">Title</h1>
    <p [sj]="sjBody()">Content</p>
    <span [sj]="sjCaption()">Caption</span>
  `
})
export class MyComponent {
  protected readonly sjH1 = sjH1;
  protected readonly sjBody = sjBody;
  protected readonly sjCaption = sjCaption;
}
```

## Notes

- Typography variants include responsive font sizes, weights, and spacing
- All variants accept override objects for customization
- Use the `<sj-typography>` component for semantic HTML with variant props
- Typography styles follow your theme's design tokens
