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

export const sjCard = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  bg: 'light.light',
  ...overrides,
});

// Consistent, autocomplete-friendly variants
export const sjCardOutlined = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  ...overrides,
});

export const sjCardFlat = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  boxShadow: 'none',
  ...overrides,
});

export const sjCardGhost = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  bg: undefined,
  borderWidth: 0,
  boxShadow: 'none',
  ...overrides,
});

export const sjCardElevated = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  boxShadow: '0 4px 12px rgba(0,0,0,0.16)',
  ...overrides,
});

export const sjCardInteractive = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
  },
  ...overrides,
});

export const sjCardPrimary = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjCardBase(),
  bg: 'primary.main',
  c: 'primary.contrast',
  ...overrides,
});



// Backward compatible alias
export const sjOutlinedCard = sjCardOutlined;
