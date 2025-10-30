import { SjStyle } from '../models/interfaces';

// Paper: a neutral surface wrapper with simple variants

type PaperBuilder = (overrides?: Partial<SjStyle>) => SjStyle;

export type SjPaperApi = PaperBuilder & {
  flat: PaperBuilder;
  outlined: PaperBuilder;
  filled: PaperBuilder;
};

const sjPaperBase = (): SjStyle => ({
  display: 'flex',
  fxDir: 'column',
});

const borderThin: SjStyle = {
  borderStyle: 'solid',
  borderWidth: 0.05, // ~0.8px hairline on common DPRs
  borderColor: 'light.dark',
};

const sjPaperApi: SjPaperApi = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  // default mirrors a filled neutral surface
  ...sjPaperBase(),
  backgroundColor: 'light.light',
  ...overrides,
});

sjPaperApi.flat = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjPaperBase(),
  ...overrides,
});

sjPaperApi.outlined = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjPaperBase(),
  ...borderThin,
  backgroundColor: 'transparent',
  ...overrides,
});

sjPaperApi.filled = (overrides: Partial<SjStyle> = {}): SjStyle => ({
  ...sjPaperBase(),
  backgroundColor: 'light.light',
  ...overrides,
});

export const sjPaper = sjPaperApi as SjPaperApi;

export const sjPaperFlat = sjPaper.flat;
export const sjPaperOutlined = sjPaper.outlined;
export const sjPaperFilled = sjPaper.filled;
