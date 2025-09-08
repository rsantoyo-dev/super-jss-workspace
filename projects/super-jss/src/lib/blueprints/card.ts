import { SjStyle } from '../models/interfaces';

// Simple, user-friendly building blocks for cards

export const sjBorder: SjStyle = {
  borderStyle: 'solid',
  borderWidth: 0.1,
  borderColor: 'light',
  borderRadius: 0.5,
};

export const sjShadow: SjStyle = {
  boxShadow: '2px 3px 3px #0001',
};

export const sjBorderShadow: SjStyle = {
  ...sjBorder,
  ...sjShadow,
};

export const sjTransition: SjStyle = {
  transition: 'all 0.3s ease-in-out',
};

const codeSnippetStyle: SjStyle = {
  bg: 'light.dark',
  p: 1,
  borderRadius: 1,
  overflowX: 'auto'
};

// Internal base style for cards (shared between variants)
const sjCardBase = (): SjStyle => ({
  ...sjBorder,
  ...sjShadow,
  ...sjTransition,
  p: { xs: 1, md: 2 },
  d: 'grid',
  borderRadius: 0.5,
});

// Function API with dot-variants for better DX and autocomplete
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

const sjCardApi: SjCardApi = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  bg: 'light.light',
  ...overrides,
});

sjCardApi.outlined = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  boxShadow: 'none',
  borderColor: 'light.dark',
  ...overrides,
});

sjCardApi.flat = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  boxShadow: 'none',
  ...overrides,
});

sjCardApi.elevated = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  boxShadow: '0 4px 12px rgba(0,0,0,0.16)',
  ...overrides,
});

sjCardApi.interactive = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardApi(), // Based on the default sjCard
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
  },
  ...overrides,
});

sjCardApi.primary = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  bg: 'primary.main',
  c: 'primary.contrast',
  ...overrides,
});

sjCardApi.secondary = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  bg: 'secondary.main',
  c: 'secondary.contrast',
  borderColor: 'transparent',
  ...overrides,
});

sjCardApi.codeSnippet = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...codeSnippetStyle,
  ...overrides,
});

sjCardApi.info = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  display: 'block',
  bg: 'light.dark',
  mb: 2,
  ...overrides,
});

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