# Blueprints overview

Blueprints are prebuilt style builders for common UI building blocks. Think of them as ergonomic factory functions that return an SjStyle you can plug straight into `[sj]`.

- Purpose: speed up layout and component styling with sensible defaults
- What they are: plain functions that return styles; you can pass overrides
- Where they live: exposed at the root API (sj.sjBox, sj.sjCard, sj.sjButton) and as named imports
- How they fit: combine them with any `sj.*` helpers and responsive values

Why this is different

- Unlike design systems that ship heavy components, blueprints are style blueprints. They don’t render elements or bring runtime weight—they only return styles.
- You stay in control of markup and behavior while reusing good defaults.

Two ways to use

1. Direct import

```ts
import { SjDirective, sjBox } from 'super-jss';

@Component({
  standalone: true,
  imports: [SjDirective],
  template: `<div [sj]="sjBox()">Hello</div>`
})
export class Demo {
  readonly sjBox = sjBox;
}
```

1. Via sj root API (autocomplete + .options)

```ts
import { SjDirective, sj } from 'super-jss';

@Component({
  standalone: true,
  imports: [SjDirective],
  template: `
    <div [sj]="[
      sj.sjBox.column({ gap: { xs: 0.5, md: 1 } }),
      sj.p(2),
      sj.bg(sj.bg.options.light.light)
    ]"></div>
  `
})
export class DemoApi { readonly sj = sj; }
```

Available blueprints

- Box (sjBox): flex/grid layout helpers like row, column, centered, wrap, grow
- Card (sjCard): card surfaces with variants (outlined, flat, elevated, interactive, primary, secondary, info, codeSnippet)
- Button (sjButton): button styles with variants (contained, outlined, light, dark, secondary, danger, etc.)

Next: see details and examples for each blueprint:

- Box → [blueprints/box.md](box.md)
- Cards → [blueprints/cards.md](cards.md)
- Buttons → [blueprints/buttons.md](buttons.md)

