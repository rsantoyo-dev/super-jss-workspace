# Installation

## Prerequisites

- An existing Angular project.
- Node.js and npm installed on your machine.

## Installation

To begin, install the Super JSS library using npm:

```bash
npm i super-jss
```
## Integration
### 1.  Importing the Directive in any component:

```typescript
import {SjDirective} from "super-jss";
@Component({
  standalone: true,
  selector: 'app-demo',
  template: `
     <div [sj]="{backgroundColor: '#aa5645', padding: '10px'}">
        Welcome to Super JSS!
      </div>    
  `
})
export class DemoComponent {}
```
---

[⬅️ Previous: Welcome to Super JSS](index.md) | [Next: Styling ➡️](styling.md)
