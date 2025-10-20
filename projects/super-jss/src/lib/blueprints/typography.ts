import { SjStyle, SjResolvedTheme } from '../models/interfaces';

/** Function API for composing typography styles with variant helpers. */
export type SjTypographyApi = ((overrides?: Partial<SjStyle>) => SjStyle) & {
  h1: (overrides?: Partial<SjStyle>) => SjStyle;
  h2: (overrides?: Partial<SjStyle>) => SjStyle;
  h3: (overrides?: Partial<SjStyle>) => SjStyle;
  h4: (overrides?: Partial<SjStyle>) => SjStyle;
  h5: (overrides?: Partial<SjStyle>) => SjStyle;
  h6: (overrides?: Partial<SjStyle>) => SjStyle;
  p: (overrides?: Partial<SjStyle>) => SjStyle;
  paragraph: (overrides?: Partial<SjStyle>) => SjStyle;
  span: (overrides?: Partial<SjStyle>) => SjStyle;
  strong: (overrides?: Partial<SjStyle>) => SjStyle;
  body: (overrides?: Partial<SjStyle>) => SjStyle;
  caption: (overrides?: Partial<SjStyle>) => SjStyle;
  small: (overrides?: Partial<SjStyle>) => SjStyle;
  pre: (overrides?: Partial<SjStyle>) => SjStyle;
};

export function createSjTypographyApi(theme: SjResolvedTheme) {
  const omitFontFamily = (
    s: Partial<SjStyle> | undefined
  ): Partial<SjStyle> => {
    if (!s) return {};
    const { fontFamily, ...rest } = s as any;
    return rest as any;
  };
  // Use default style without fontFamily so classes don't emit it by default
  const defaultNoFF: Partial<SjStyle> = omitFontFamily(
    theme.typography.default as any
  );
  const defaultFfVal = (theme.typography as any)?.default?.fontFamily as any;
  const defaultFfStr = Array.isArray(defaultFfVal)
    ? (defaultFfVal as any).join(', ')
    : (defaultFfVal as any);
  const defaultFfProp: Partial<SjStyle> = defaultFfStr
    ? { fontFamily: `var(--sj-ff, ${defaultFfStr})` }
    : {};
  // Base styles for typography variants
  const h1Style: SjStyle = {
    ...(theme.typography.H1 || {}),
  };

  const h2Style: SjStyle = {
    ...(theme.typography.H2 || {}),
  };

  const h3Style: SjStyle = {
    ...(theme.typography.H3 || {}),
  };

  const h4Style: SjStyle = {
    ...(theme.typography.H4 || {}),
  };

  const h5Style: SjStyle = {
    ...(theme.typography.H5 || {}),
  };

  const h6Style: SjStyle = {
    ...(theme.typography.H6 || {}),
  };

  const pStyle: SjStyle = {
    ...(theme.typography.P || {}),
  };

  const spanStyle: SjStyle = {
    ...(theme.typography.SPAN || {}),
  };

  const strongStyle: SjStyle = {
    ...(theme.typography.STRONG || {}),
  };

  const bodyStyle: SjStyle = {
    ...(theme.typography.BODY || {}),
  };

  const captionStyle: SjStyle = {
    ...(theme.typography.CAPTION || {}),
  };

  const smallStyle: SjStyle = {
    ...(theme.typography.SMALL || {}),
  };

  const preStyle: SjStyle = {
    ...(theme.typography.PRE || {}),
  };

  const sjTypographyApi: SjTypographyApi = (
    overrides: Partial<SjStyle> = {}
  ): SjStyle => ({
    // Opt-in application of theme font only for Typography API
    ...(defaultFfProp as any),
    // Include defaults (without fontFamily) so shared props like color are present
    ...(defaultNoFF || {}),
    ...(theme.typography.P || {}),
    ...overrides,
  });

  sjTypographyApi.h1 = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...(defaultFfProp as any),
    ...(defaultNoFF || {}),
    ...(theme.typography.H1 || {}),
    ...overrides,
  });

  sjTypographyApi.h2 = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...(defaultFfProp as any),
    ...(defaultNoFF || {}),
    ...(theme.typography.H2 || {}),
    ...overrides,
  });

  sjTypographyApi.h3 = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...(defaultFfProp as any),
    ...(defaultNoFF || {}),
    ...(theme.typography.H3 || {}),
    ...overrides,
  });

  sjTypographyApi.h4 = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...(defaultFfProp as any),
    ...(defaultNoFF || {}),
    ...(theme.typography.H4 || {}),
    ...overrides,
  });

  sjTypographyApi.h5 = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...(defaultFfProp as any),
    ...(defaultNoFF || {}),
    ...(theme.typography.H5 || {}),
    ...overrides,
  });

  sjTypographyApi.h6 = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...(defaultFfProp as any),
    ...(defaultNoFF || {}),
    ...(theme.typography.H6 || {}),
    ...overrides,
  });

  sjTypographyApi.p = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...(defaultFfProp as any),
    ...(defaultNoFF || {}),
    ...(theme.typography.P || {}),
    ...overrides,
  });

  sjTypographyApi.paragraph = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...(defaultFfProp as any),
    ...(defaultNoFF || {}),
    ...(theme.typography.P || {}),
    ...overrides,
  });

  sjTypographyApi.span = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...(defaultFfProp as any),
    ...(defaultNoFF || {}),
    ...(theme.typography.SPAN || {}),
    ...overrides,
  });

  sjTypographyApi.strong = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...(defaultFfProp as any),
    ...(defaultNoFF || {}),
    ...(theme.typography.STRONG || {}),
    ...overrides,
  });

  sjTypographyApi.body = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...(defaultFfProp as any),
    ...(defaultNoFF || {}),
    ...(theme.typography.BODY || {}),
    ...overrides,
  });

  sjTypographyApi.caption = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...(defaultFfProp as any),
    ...(defaultNoFF || {}),
    ...(theme.typography.CAPTION || {}),
    ...overrides,
  });

  sjTypographyApi.small = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...(defaultFfProp as any),
    ...(defaultNoFF || {}),
    ...(theme.typography.SMALL || {}),
    ...overrides,
  });

  sjTypographyApi.pre = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...(defaultFfProp as any),
    ...(defaultNoFF || {}),
    ...(theme.typography.PRE || {}),
    ...overrides,
  });

  return sjTypographyApi as SjTypographyApi;
}
