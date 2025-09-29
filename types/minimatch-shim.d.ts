// Temporary shim for mismatched minimatch/@types versions in this workspace.
// Provides minimal types expected by @types/glob to avoid TS errors during `tsc` runs.

declare module 'minimatch' {
  // Re-export the class Minimatch and provide alias types used upstream
  export class Minimatch {
    constructor(pattern: string, options?: any);
  }

  export type IOptions = any;
  export interface IMinimatch {
    pattern: string;
  }

  export default Minimatch;
}
