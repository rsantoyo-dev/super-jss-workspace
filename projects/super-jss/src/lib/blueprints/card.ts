import { ResponsiveStyle, SjStyle } from '../models/interfaces';

// Base tokens
export const sjBorder: SjStyle = {
  borderStyle: 'solid',
  borderWidth: 0.1,
  borderColor: 'light',
  borderRadius: 0.5,
};

export const sjShadow = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
  ...overrides,
});

export const sjBorderShadow = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjBorder,
  ...sjShadow(),
  ...overrides,
});

// Backwards-friendly style constants
export const sjShadowStyle: SjStyle = sjShadow();
export const sjBorderShadowStyle: SjStyle = sjBorderShadow();

export const sjTransition: SjStyle = {
  transition: 'all 0.3s ease-in-out',
};

// Elevation presets
const ELEVATION_SHADOWS: Record<number, string> = {
  0: 'none',
  1: '0 1px 3px rgba(0,0,0,0.12)',
  2: '0 2px 6px rgba(0,0,0,0.14)',
  3: '0 4px 12px rgba(0,0,0,0.16)',
  4: '0 8px 24px rgba(0,0,0,0.18)',
  5: '0 12px 32px rgba(0,0,0,0.2)',
};

export type SjCardConfig = {
  padding?: ResponsiveStyle | string | number;
  direction?: ResponsiveStyle | string; // flexDirection
  background?: ResponsiveStyle | string | number; // bg token
  radius?: ResponsiveStyle | string | number; // border radius
  outlined?: boolean; // if true, keep border; background optional
  elevation?: 0 | 1 | 2 | 3 | 4 | 5; // preset shadows
  interactive?: boolean; // adds hover lift effect
  gap?: ResponsiveStyle | string | number;
  alignItems?: ResponsiveStyle | string; // align items
  justifyContent?: ResponsiveStyle | string; // justify content
  width?: ResponsiveStyle | string | number;
  height?: ResponsiveStyle | string | number;
  overrides?: Partial<SjStyle>; // final overrides
};

export const sjCardConfig = (
  cfg: SjCardConfig = {},
  overrides: Partial<SjStyle> = {}
): SjStyle => {
  const {
    padding = 1,
    direction = 'column',
    background = 'light.light',
    radius,
    outlined = false,
    elevation = 2,
    interactive = false,
    gap,
    alignItems,
    justifyContent,
    width,
    height,
  } = cfg;

  const base: SjStyle = {
    d: 'flex',
    fxDir: direction,
    p: padding,
    bg: outlined ? undefined : (background as any),
    ...sjBorder,
    ...sjTransition,
    brad: radius as any,
    gap,
    fxAItems: alignItems,
    fxJustify: justifyContent,
    w: width as any,
    h: height as any,
  };

  const shadow: SjStyle = {
    boxShadow: ELEVATION_SHADOWS[elevation] || ELEVATION_SHADOWS[2],
  };

  const hover: SjStyle = interactive
    ? {
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: ELEVATION_SHADOWS[Math.min((elevation || 2) + 1, 5)],
        },
        cursor: 'pointer',
      }
    : {};

  const style: SjStyle = {
    ...base,
    ...shadow,
    ...hover,
    ...(cfg.overrides || {}),
    ...overrides,
  };

  // If outlined, ensure transparent-ish background and visible border
  if (outlined) {
    style.bg = style.bg ?? undefined;
    style.bc = style.bc ?? 'light';
    style.bw = style.bw ?? '1px';
  }

  return style;
};

// Backward compatibility alias (internal use)
const sjConfigCard = (config: Partial<SjStyle> = {}): SjStyle => {
  return sjCardConfig({ overrides: config });
};

export const sjCard = (overrides: Partial<SjStyle> = {}): SjStyle =>
  sjCardConfig({ overrides });

export const sjOutlinedCard = (overrides: Partial<SjStyle> = {}): SjStyle =>
  sjCardConfig({ outlined: true, overrides });
