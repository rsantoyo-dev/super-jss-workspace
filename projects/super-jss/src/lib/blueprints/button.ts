import { SjStyle } from '../models/interfaces';
import { sjTransition } from './card';

/** Smooth transition preset shared across button variants. */
const sjButtonTransition: SjStyle = {
  transition: 'all 0.2s ease-in-out',
};

const baseHoverStyles: SjStyle = {
  transform: 'translateY(-1px)',
};

const baseActiveStyles: SjStyle = {
  transform: 'translateY(0)',
};

const baseFocusVisibleStyles: SjStyle = {
  outline: '2px solid rgba(33, 150, 243, 0.55)',
  outlineOffset: '2px',
};

const baseDisabledStyles: SjStyle = {
  cursor: 'not-allowed',
  opacity: 0.6,
  pointerEvents: 'none',
  boxShadow: 'none',
};

const sjButtonBase = (): SjStyle => ({
  ...sjTransition,
  d: 'inline-flex',
  fxAItems: 'center',
  fxJustify: 'center',
  gap: 0.5,
  p: { xs: 0.5, md: 1 },
  borderRadius: 0.5,
  border: 'none', 
  textDecoration: 'none',
  cursor: 'pointer',
  userSelect: 'none',
  minW: 'fit-content',
  transform: 'translateY(0)',
  '&:hover': { ...baseHoverStyles },
  '&:active': { ...baseActiveStyles },
  '&:focus-visible': { ...baseFocusVisibleStyles },
  '&:disabled': { ...baseDisabledStyles },
});

const applyHover = (style: SjStyle, extensions?: SjStyle): SjStyle => {
  if (extensions) {
    style['&:hover'] = { ...baseHoverStyles, ...extensions };
  }
  return style;
};

const applyFocus = (style: SjStyle, extensions?: SjStyle): SjStyle => {
  if (extensions) {
    style['&:focus-visible'] = { ...baseFocusVisibleStyles, ...extensions };
  }
  return style;
};

const applyDisabled = (style: SjStyle, extensions?: SjStyle): SjStyle => {
  if (extensions) {
    style['&:disabled'] = { ...baseDisabledStyles, ...extensions };
  }
  return style;
};

const createContainedButton = (
  background: string,
  color: string,
  options: {
    hoverBg?: string;
    borderColor?: string;
    shadow?: string;
  } = {}
): SjStyle => {
  const { hoverBg, borderColor = 'transparent', shadow } = options;
  const style: SjStyle = {
    ...sjButtonBase(),
    bg: background,
    c: color,
    borderColor,
  };

  if (shadow) {
    style.boxShadow = shadow;
  }

  applyHover(style, hoverBg ? { bg: hoverBg } : undefined);
  applyFocus(style, { outlineColor: borderColor === 'transparent' ? background : borderColor });
  applyDisabled(style, { bg: background, borderColor });

  return style;
};

const createOutlinedButton = (
  color: string,
  options: {
    hoverBg?: string;
    borderColor?: string;
  } = {}
): SjStyle => {
  const { hoverBg = 'primary.light', borderColor = color } = options;
  const style: SjStyle = {
    ...sjButtonBase(),
    bg: 'transparent',
    c: color,
    borderColor,
  };

  applyHover(style, { bg: hoverBg });
  applyFocus(style, { outlineColor: borderColor });
  applyDisabled(style, { bg: 'transparent', borderColor, c: color });

  return style;
};

const createLightButton = (): SjStyle => {
  const style: SjStyle = {
    ...sjButtonBase(),
    bg: 'light.light',
    c: 'primary.dark',
    borderColor: 'light.dark',
  };

  applyHover(style, { bg: 'light.main' });
  applyFocus(style, { outlineColor: 'primary.main' });
  applyDisabled(style, { bg: 'light.light', borderColor: 'light.dark', c: 'neutral.dark' });

  return style;
};

const createTextButton = (color: string): SjStyle => {
  const style: SjStyle = {
    ...sjButtonBase(),
    bg: 'transparent',
    c: color,
    borderColor: 'transparent',
    px: { xs: 0.5, md: 0.75 },
    py: { xs: 0.25, md: 0.5 },
    boxShadow: 'none',
  };

  applyHover(style, { bg: 'primary.light', textDecoration: 'underline' });
  applyFocus(style, { outlineColor: color });
  applyDisabled(style, { bg: 'transparent', c: 'neutral.dark' });

  return style;
};

export type SjButtonApi = ((overrides?: Partial<SjStyle>) => SjStyle) & {
  light: (overrides?: Partial<SjStyle>) => SjStyle;
  text: (overrides?: Partial<SjStyle>) => SjStyle;
  contained: (overrides?: Partial<SjStyle>) => SjStyle;
  outlined: (overrides?: Partial<SjStyle>) => SjStyle;
  containedPrimary: (overrides?: Partial<SjStyle>) => SjStyle;
  containedLight: (overrides?: Partial<SjStyle>) => SjStyle;
  containedDark: (overrides?: Partial<SjStyle>) => SjStyle;
  containedSecondary: (overrides?: Partial<SjStyle>) => SjStyle;
};

const sjButtonApi: SjButtonApi = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...createContainedButton('primary.main', 'primary.contrast', {
    hoverBg: 'primary.dark',
    shadow: '2px 4px 4px rgba(18, 51, 107, 0.1)',
  }),
  ...overrides,
});

sjButtonApi.light = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...createLightButton(),
  ...overrides,
});

sjButtonApi.text = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...createTextButton('primary.main'),
  ...overrides,
});

sjButtonApi.contained = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...createContainedButton('neutral.main', 'neutral.contrast', {
    hoverBg: 'neutral.dark',
    shadow: '0 6px 16px rgba(15, 23, 42, 0.2)',
  }),
  ...overrides,
});

sjButtonApi.outlined = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...createOutlinedButton('primary.main', { hoverBg: 'primary.light' }),
  ...overrides,
});

sjButtonApi.containedPrimary = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...createContainedButton('primary.main', 'primary.contrast', {
    hoverBg: 'primary.dark',
    shadow: '0 8px 20px rgba(18, 51, 107, 0.24)',
  }),
  ...overrides,
});

sjButtonApi.containedLight = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...createContainedButton('light.main', 'primary.dark', {
    hoverBg: 'light.dark',
    borderColor: 'light.dark',
    shadow: '0 4px 12px rgba(15, 23, 42, 0.12)',
  }),
  ...overrides,
});

sjButtonApi.containedDark = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...createContainedButton('dark.main', 'dark.contrast', {
    hoverBg: 'dark.dark',
    borderColor: 'dark.main',
    shadow: '0 6px 18px rgba(15, 23, 42, 0.45)',
  }),
  ...overrides,
});

sjButtonApi.containedSecondary = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...createContainedButton('secondary.main', 'secondary.contrast', {
    hoverBg: 'secondary.dark',
    shadow: '0 6px 16px rgba(59, 130, 246, 0.24)',
  }),
  ...overrides,
});

export const sjButton = sjButtonApi as SjButtonApi;

export const sjButtonLight = sjButton.light;
export const sjButtonText = sjButton.text;
export const sjButtonContained = sjButton.contained;
export const sjButtonOutlined = sjButton.outlined;
export const sjButtonContainedPrimary = sjButton.containedPrimary;
export const sjButtonContainedLight = sjButton.containedLight;
export const sjButtonContainedDark = sjButton.containedDark;
export const sjButtonContainedSecondary = sjButton.containedSecondary;

