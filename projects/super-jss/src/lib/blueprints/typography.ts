import { SjStyle } from '../models/interfaces';

// Base styles for typography variants
const h1Style: SjStyle = {
  fontSize: { xs: 2.5, md: 4 },
  fontWeight: '800',
  lineHeight: { xs: 2.3, md: 3.7 },
  marginBlockEnd: 0.8,
  marginBlockStart: 0.8,
};

const h2Style: SjStyle = {
  fontSize: { xs: 2, md: 3.2 },
  fontWeight: '600',
  lineHeight: { xs: 1.75, md: 3.2 },
  marginBlockEnd: 0.8,
  marginBlockStart: 0.8,
};

const h3Style: SjStyle = {
  fontSize: { xs: 1.75, md: 2.7 },
  fontWeight: '600',
  lineHeight: { xs: 1.8, md: 2.8 },
  marginBlockEnd: 0.8,
  marginBlockStart: 0.8,
};

const h4Style: SjStyle = {
    fontSize: { xs: 1.5, md: 2 },
    fontWeight: '600',
    lineHeight: { xs: 1.3, md: 2.2 },
    marginBlockEnd: 0.8,
    marginBlockStart: 0.8,
};

const h5Style: SjStyle = {
    fontSize: { xs: 1.25, md: 1.75 },
    fontWeight: '600',
    lineHeight: { xs: 1.4, md: 2.2 },
    marginBlockEnd: 0.4,
    marginBlockStart: 0.4,
};

const h6Style: SjStyle = {
    fontSize: { xs: 1, md: 1.25 },
    fontWeight: '600',
    lineHeight: { xs: 1.2, md: 2.2 },
    marginBlockEnd: 0.4,
    marginBlockStart: 0.4,
};

const pStyle: SjStyle = {
    fontSize: 1,
    fontWeight: 'normal',
    lineHeight: { xs: 1.6, md: 1.8 },
    marginBlockEnd: 0.8,
    marginBlockStart: 0.4,
};

const spanStyle: SjStyle = {
    fontSize: 0.9,
    fontWeight: 'normal',
    lineHeight: { xs: 1.2, md: 1.4 },
    marginBlockEnd: 0.2,
    marginBlockStart: 0.2,
};

const strongStyle: SjStyle = {
    fontSize: 1,
    fontWeight: 'bold',
    lineHeight: { xs: 1.2, md: 1.4 },
    marginBlockEnd: 0.2,
    marginBlockStart: 0.2,
};

const bodyStyle: SjStyle = {
    fontSize: 1,
    fontWeight: 'normal',
    lineHeight: { xs: 1.6, md: 1.8 },
    marginBlockEnd: 0.5,
    marginBlockStart: 0.2,
};

const captionStyle: SjStyle = {
    fontSize: 0.8,
    fontWeight: 'normal',
    lineHeight: { xs: 1.2, md: 1.4 },
    marginBlockEnd: 0.2,
    marginBlockStart: 0.2,
};

const smallStyle: SjStyle = {
    fontSize: 0.75,
    fontWeight: 'normal',
    lineHeight: { xs: 0.5, md: 0.75 },
    marginBlockEnd: 0.15,
    marginBlockStart: 0.15,
};

const preStyle: SjStyle = {
    fontSize: 0.9,
    fontFamily: 'monospace',
    lineHeight: { xs: 1.2, md: 1.4 },
    marginBlockEnd: 0.2,
    marginBlockStart: 0.2,
};

/** Function API for composing typography styles with variant helpers. */
export type SjTypographyApi = ((overrides?: Partial<SjStyle>) => SjStyle) & {
  h1: (overrides?: Partial<SjStyle>) => SjStyle;
  h2: (overrides?: Partial<SjStyle>) => SjStyle;
  h3: (overrides?: Partial<SjStyle>) => SjStyle;
  h4: (overrides?: Partial<SjStyle>) => SjStyle;
  h5: (overrides?: Partial<SjStyle>) => SjStyle;
  h6: (overrides?: Partial<SjStyle>) => SjStyle;
  p: (overrides?: Partial<SjStyle>) => SjStyle;
  span: (overrides?: Partial<SjStyle>) => SjStyle;
  strong: (overrides?: Partial<SjStyle>) => SjStyle;
  body: (overrides?: Partial<SjStyle>) => SjStyle;
  caption: (overrides?: Partial<SjStyle>) => SjStyle;
  small: (overrides?: Partial<SjStyle>) => SjStyle;
  pre: (overrides?: Partial<SjStyle>) => SjStyle;
};

const sjTypographyApi: SjTypographyApi = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...pStyle,
  ...overrides,
});

sjTypographyApi.h1 = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...h1Style,
  ...overrides,
});

sjTypographyApi.h2 = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...h2Style,
  ...overrides,
});

sjTypographyApi.h3 = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...h3Style,
  ...overrides,
});

sjTypographyApi.h4 = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...h4Style,
    ...overrides,
});

sjTypographyApi.h5 = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...h5Style,
    ...overrides,
});

sjTypographyApi.h6 = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...h6Style,
    ...overrides,
});

sjTypographyApi.p = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...pStyle,
    ...overrides,
});

sjTypographyApi.span = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...spanStyle,
    ...overrides,
});

sjTypographyApi.strong = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...strongStyle,
    ...overrides,
});

sjTypographyApi.body = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...bodyStyle,
    ...overrides,
});

sjTypographyApi.caption = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...captionStyle,
    ...overrides,
});

sjTypographyApi.small = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...smallStyle,
    ...overrides,
});

sjTypographyApi.pre = (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...preStyle,
    ...overrides,
});

export const sjTypography = sjTypographyApi as SjTypographyApi;

export const sjH1 = sjTypography.h1;
export const sjH2 = sjTypography.h2;
export const sjH3 = sjTypography.h3;
export const sjH4 = sjTypography.h4;
export const sjH5 = sjTypography.h5;
export const sjH6 = sjTypography.h6;
export const sjP = sjTypography.p;
export const sjSpan = sjTypography.span;
export const sjStrong = sjTypography.strong;
export const sjBody = sjTypography.body;
export const sjCaption = sjTypography.caption;
export const sjSmall = sjTypography.small;
export const sjPre = sjTypography.pre;
