import { SjStyle } from '../models/interfaces';

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
  display: 'inline-flex',
  fxAItems: 'center',
  fxJustify: 'center',
  gap: 0.5,
  padding: { xs: 0.25, md: 0.5, xl: 0.75 },
  borderRadius: 0.5,
  borderStyle: 'solid',
  // 1px borders by default
  borderWidth: 0.0625,
  borderColor: 'transparent',
  textDecoration: 'none',
  cursor: 'pointer',
  userSelect: 'none',
  minWidth: 'fit-content',
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

// Adds a persistent "selected/active" UI state with a soft visual.
// No outlines here (focus-visible keeps outline for a11y). Selected subtly
// changes background and elevates slightly so it feels active but not noisy.
const applySelected = (style: SjStyle, extensions?: SjStyle): SjStyle => {
  const selected: SjStyle = {
    transform: 'translateY(-1px)',
    ...extensions,
  };
  style['&.active'] = { ...(style['&.active'] as SjStyle), ...selected };
  style['&[aria-current="page"]'] = {
    ...(style['&[aria-current="page"]'] as SjStyle),
    ...selected,
  };
  style['&.selected'] = { ...(style['&.selected'] as SjStyle), ...selected };
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
    backgroundColor: background,
    color: color,
    borderColor,
  };

  if (shadow) {
    style.boxShadow = shadow;
  }

  applyHover(style, hoverBg ? { backgroundColor: hoverBg } : undefined);
  applyFocus(style, {
    outlineColor: borderColor === 'transparent' ? background : borderColor,
  });
  applyDisabled(style, { backgroundColor: background, borderColor });
  // Softer selected: reuse hover color and add slight elevation
  applySelected(style, {
    backgroundColor: hoverBg || background,
    boxShadow: shadow || '0 6px 16px rgba(0,0,0,0.18)',
  });

  return style;
};

const createLightButton = (): SjStyle => {
  const style: SjStyle = {
    ...sjButtonBase(),
    backgroundColor: 'light.light',
    color: 'primary.dark',
  };

  applyHover(style, { backgroundColor: 'light.main' });
  applyFocus(style, { outlineColor: 'primary.main' });
  applyDisabled(style, {
    backgroundColor: 'light.light',
    borderColor: 'light.dark',
    color: 'neutral.dark',
  });
  // Softer selected for light buttons
  applySelected(style, {
    backgroundColor: 'light.main',
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
  });

  return style;
};

const createOutlinedButton = (): SjStyle => {
  const style = createLightButton();
  const disabled = (style['&:disabled'] as SjStyle) || {};

  style.borderColor = 'primary.main';
  applyHover(style, { bg: 'light.main' });
  applyFocus(style, { outlineColor: 'primary.main' });
  style['&:disabled'] = { ...disabled, borderColor: 'primary.main' };
  applySelected(style, {
    backgroundColor: 'light.main',
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
  });

  return style;
};

export type SjButtonApi = ((overrides?: Partial<SjStyle>) => SjStyle) & {
  light: (overrides?: Partial<SjStyle>) => SjStyle;
  contained: (overrides?: Partial<SjStyle>) => SjStyle;
  outlined: (overrides?: Partial<SjStyle>) => SjStyle;
  containedPrimary: (overrides?: Partial<SjStyle>) => SjStyle;
  containedLight: (overrides?: Partial<SjStyle>) => SjStyle;
  containedDark: (overrides?: Partial<SjStyle>) => SjStyle;
  containedSecondary: (overrides?: Partial<SjStyle>) => SjStyle;
  danger: (overrides?: Partial<SjStyle>) => SjStyle;
};

const sjButtonApi: SjButtonApi = (
  overrides: Partial<SjStyle> = {}
): SjStyle => ({
  ...createContainedButton('primary.main', 'primary.contrast', {
    hoverBg: 'primary.dark',
    shadow: '2px 4px 10px rgba(18, 51, 107, 0.14)',
  }),
  ...overrides,
});

sjButtonApi.light = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...createLightButton(),
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
  ...createOutlinedButton(),
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

sjButtonApi.containedSecondary = (
  overrides: Partial<SjStyle> = {}
): SjStyle => ({
  ...createContainedButton('secondary.main', 'secondary.contrast', {
    hoverBg: 'secondary.dark',
    shadow: '0 6px 16px rgba(59, 130, 246, 0.24)',
  }),
  ...overrides,
});

sjButtonApi.danger = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...createContainedButton('error.main', 'error.contrast', {
    hoverBg: 'error.dark',
    borderColor: 'error.dark',
    shadow: '0 6px 18px rgba(220, 38, 38, 0.32)',
  }),
  ...overrides,
});

export const sjButton = sjButtonApi as SjButtonApi;

export const sjButtonLight = sjButton.light;
export const sjButtonContained = sjButton.contained;
export const sjButtonOutlined = sjButton.outlined;
export const sjButtonContainedPrimary = sjButton.containedPrimary;
export const sjButtonContainedLight = sjButton.containedLight;
export const sjButtonContainedDark = sjButton.containedDark;
export const sjButtonContainedSecondary = sjButton.containedSecondary;
export const sjButtonDanger = sjButton.danger;
