# Headfire Core (PoC)

A minimal TypeScript/Node foundation for a CSS library prototype. Ships a small style -> CSS serializer with nested selectors and media queries.

## Quick start

- Install deps (from this folder):
  - npm install
- Run hello world:
  - npm run dev
- Build library:
  - npm run build

## API sketch

```ts
import { classCss } from 'headfire-core';

const { selector, cssText } = classCss('hf-btn', {
  backgroundColor: 'black',
  color: 'white',
  padding: 8,
  '&:hover': { opacity: 0.9 },
  '@media (min-width: 768px)': { padding: 12 },
});
```

Outputs:

```
.hf-btn { background-color: black; color: white; padding: 8; }
.hf-btn:hover { opacity: 0.9; }
@media (min-width: 768px) {
  .hf-btn { padding: 12; }
}
```

## Notes
- Uses CommonJS for simple TS/ts-node execution.
- `fast-glob` is included for future file scanning (not used yet).
- Future steps: atomic class generation, hashing, file scanning, runtime stylesheet manager.

