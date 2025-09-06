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

// Internal base style for cards (shared between variants)
const sjCardBase = (): SjStyle => ({
  ...sjBorder,
  ...sjShadow,
  ...sjTransition,
  p: {xs: 1, md: 2},
  d: 'flex',
  fxDir: 'column',
  borderRadius: 0.5,
});

// Function API with dot-variants for better DX and autocomplete
export type SjCardApi = ((overrides?: Partial<SjStyle>) => SjStyle) & {
  outlined: (overrides?: Partial<SjStyle>) => SjStyle;
  flat: (overrides?: Partial<SjStyle>) => SjStyle;
  ghost: (overrides?: Partial<SjStyle>) => SjStyle;
  elevated: (overrides?: Partial<SjStyle>) => SjStyle;
  interactive: (overrides?: Partial<SjStyle>) => SjStyle;
  primary: (overrides?: Partial<SjStyle>) => SjStyle;
  surface: (overrides?: Partial<SjStyle>) => SjStyle;
};

const sjCardImpl = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  bg: 'light.light',
  ...overrides,
});

sjCardImpl.outlined = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  ...overrides,
});

sjCardImpl.flat = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  boxShadow: 'none',
  ...overrides,
});

sjCardImpl.ghost = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  bg: undefined,
  borderWidth: 0,
  boxShadow: 'none',
  ...overrides,
});

sjCardImpl.elevated = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  boxShadow: '0 4px 12px rgba(0,0,0,0.16)',
  ...overrides,
});

sjCardImpl.interactive = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
  },
  ...overrides,
});

sjCardImpl.primary = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  bg: 'primary.main',
  c: 'primary.contrast',
  ...overrides,
});

sjCardImpl.surface = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  bg: 'light.main',
  ...overrides,
});

export const sjCard = sjCardImpl as SjCardApi;

// Also export named variants for convenience/backward-compat
export const sjCardOutlined = sjCard.outlined;
export const sjCardFlat = sjCard.flat;
export const sjCardGhost = sjCard.ghost;
export const sjCardElevated = sjCard.elevated;
export const sjCardInteractive = sjCard.interactive;
export const sjCardPrimary = sjCard.primary;
export const sjCardSurface = sjCard.surface;

// Legacy alias maintained
export const sjOutlinedCard = sjCard.outlined;
