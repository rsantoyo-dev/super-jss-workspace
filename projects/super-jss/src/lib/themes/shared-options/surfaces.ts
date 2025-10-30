import { SjTheme } from '../../../lib/models/interfaces';

export const DEFAULT_SURFACES: NonNullable<
  NonNullable<SjTheme['components']>['surfaces']
> = {
  padding: {
    1: { xs: 2, md: 3, xl: 4 },
    2: { xs: 4, md: 5, xl: 6 },
    3: { xs: 6, md: 7, xl: 8 },
    4: { xs: 8, md: 9, xl: 10 },
  },
  gap: {
    1: { xs: 2, md: 3, xl: 4 },
    2: { xs: 4, md: 5, xl: 6 },
    3: { xs: 6, md: 7, xl: 8 },
    4: { xs: 8, md: 9, xl: 10 },
  },
  radius: {
    1: { xs: 1, md: 2 },
    2: { xs: 2, md: 3 },
    3: { xs: 3, md: 4 },
    4: { xs: 4, md: 6 },
  },
  border: {
    1: { xs: '0.05rem', md: '0.1rem' },
    2: { xs: '0.1rem', md: '0.01rem' },
    3: { xs: '0.2rem', md: '0.3rem' },
    4: { xs: '0.3rem', md: '0.4rem' },
  },
};

// No presets; rely on densities (1..4) only
