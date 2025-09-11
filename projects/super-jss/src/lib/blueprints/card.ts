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
  boxShadow: '2px 3px 3px #0001',
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
  overflowX: 'hidden'
};

// Internal base style for cards (shared between variants)
/** Internal shared card foundation used by all variants. */
const sjCardBase = (): SjStyle => ({
  ...sjBorder,
  ...sjShadow,
  ...sjTransition,
  p: { xs: 1, md: 2 },
  d: 'grid',
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
  boxShadow: 'none',
  borderColor: 'light.dark',
  ...overrides,
});

/** Flat card variant without shadow. */
sjCardApi.flat = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  boxShadow: 'none',
  ...overrides,
});

/** Elevated card with stronger shadow. */
sjCardApi.elevated = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  boxShadow: '0 4px 12px rgba(0,0,0,0.16)',
  ...overrides,
});

/** Interactive card variant with hover affordance. */
sjCardApi.interactive = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardApi(), // Based on the default sjCard
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
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
  display: 'block',
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
