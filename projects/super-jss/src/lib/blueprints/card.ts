import { SjStyle } from '../models/interfaces';

// Simple, user-friendly building blocks for cards

/** Base border style used by card variants. */
export const sjBorder: SjStyle = {
  borderStyle: 'solid',
  borderWidth: 0.1,
  borderColor: 'light',
  borderRadius: 0.5,
};

/** Light shadow used by card variants. */
export const sjShadow: SjStyle = {
  boxShadow: '3px 2px 5px rgba(55, 55, 55, 0.09)',
};
export const sjShadowElevated: SjStyle = {
  ...sjShadow,
};

/** Convenience mixin combining border and shadow. */
export const sjBorderShadow: SjStyle = {
  ...sjBorder,
  ...sjShadow,
};

/** Smooth transition preset for interactive states. */
export const sjTransition: SjStyle = {
  transition: 'all 0.3s ease-in-out',
};

/** Preset styling for inline code snippet containers. */
const codeSnippetStyle: SjStyle = {
  bg: 'light.dark',
  p: 1,
  borderRadius: 1,
  d: 'inline-flex',          // play nicely alongside other flex children
  alignItems: 'center',
  maxW: '100%',              // keep it from overflowing its parent
  overflowX: 'auto',         // allow scrolling for long lines
  whiteSpace: 'pre',         // preserve formatting
  fontFamily: 'monospace',   // reflect code semantics
};

// Internal base style for cards (shared between variants)
/** Internal shared card foundation used by all variants. */
const sjCardBase = (): SjStyle => ({
  ...sjTransition,
  d: 'flex',
  fxDir: 'column',
  p: { xs: 0.5, md: 1, lg:2 }, 
  gap: { xs: 0.5, md: 1, lg:2 }, 
  borderRadius: 0.5,
});

// Function API with dot-variants for better DX and autocomplete
/** Function API for composing card styles with variant helpers. */
export type SjCardApi = ((overrides?: Partial<SjStyle>) => SjStyle) & {
  outlined: (overrides?: Partial<SjStyle>) => SjStyle;
  flat: (overrides?: Partial<SjStyle>) => SjStyle;
  elevated: (overrides?: Partial<SjStyle>) => SjStyle;
  interactive: (overrides?: Partial<SjStyle>) => SjStyle;
  primary: (overrides?: Partial<SjStyle>) => SjStyle;
  secondary: (overrides?: Partial<SjStyle>) => SjStyle;
  info: (overrides?: Partial<SjStyle>) => SjStyle;
  codeSnippet: (overrides?: Partial<SjStyle>) => SjStyle;
};

/**
 * Default card style; accepts overrides for fine-tuning.
 * @param overrides Partial style overrides.
 * @returns Composed SjStyle.
 */
const sjCardApi: SjCardApi = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  bg: 'light.light',
  ...overrides,
});

/** Low-elevation outlined card variant. */
sjCardApi.outlined = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  ...sjBorder,
    bg: 'transparent',
    borderColor: 'light.dark',
  ...overrides,
});

/** Flat card variant without shadow. */
sjCardApi.flat = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  ...overrides,
});

/** Elevated card with stronger shadow. */
sjCardApi.elevated = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  bg: 'light.light',
  ...sjShadow,
  ...overrides,
});

/** Interactive card variant with hover affordance. */
sjCardApi.interactive = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardApi(), // Based on the default sjCard
  ...sjBorderShadow,
  cursor: 'pointer',
  bg: 'light.light',
  textDecoration: 'none',
  userSelect: 'none',
  transform: 'translateY(0)',
  '&:hover': {
    transform: 'translateY(-2px)',
    ...sjShadowElevated,
  },
  ...overrides,
});

/** Primary-colored card with matching contrast text. */
sjCardApi.primary = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  bg: 'primary.main',
  c: 'primary.contrast',
  ...overrides,
});

/** Secondary-colored card with matching contrast text. */
sjCardApi.secondary = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  bg: 'secondary.main',
  c: 'secondary.contrast',
  borderColor: 'transparent',
  ...overrides,
});

/** Preset style for code snippets inside cards. */
sjCardApi.codeSnippet = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...codeSnippetStyle,
  ...overrides,
});

/** Informational card with subtle background. */
sjCardApi.info = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  d: 'block',
  bg: 'light.dark',
  mb: 2,
  ...overrides,
});

/** Public card API exposing default and variant builders. */
export const sjCard = sjCardApi as SjCardApi;

// Also export named variants for convenience/backward-compat
export const sjCardOutlined = sjCard.outlined;
export const sjCardFlat = sjCard.flat;
export const sjCardElevated = sjCard.elevated;
export const sjCardInteractive = sjCard.interactive;
export const sjCardPrimary = sjCard.primary;
export const sjCardSecondary = sjCard.secondary;
export const sjCardCodeSnippet = sjCard.codeSnippet;

// Legacy alias maintained
export const sjOutlinedCard = sjCard.outlined;
