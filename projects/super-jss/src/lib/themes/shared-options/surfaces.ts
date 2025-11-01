import { SjTheme } from '../../../lib/models/interfaces';

export const DEFAULT_SURFACES: NonNullable<
  NonNullable<SjTheme['components']>['surfaces']
> = {
  padding: {
    1: { xs: 1, md: 2 },
    2: { xs: 2, md: 3, lg: 4 },
    3: { xs: 3, md: 4, lg: 5 },
    4: { xs: 4, md: 6, lg: 7 },
  },
  gap: {
    1: { xs: 1, md: 2 },
    2: { xs: 2, md: 3 },
    3: { xs: 3, md: 4 },
    4: { xs: 4, md: 6 },
  },
  radius: {
    1: { xs: 1, md: 2 },
    2: { xs: 2, md: 3 },
    3: { xs: 3, md: 4 },
    4: { xs: 4, md: 6 },
  },
  border: {
    1: { xs: '0.065rem', md: '0.065remrem' },
    2: { xs: '0.065rem', md: '0.1rem' },
    3: { xs: '0.1rem', md: '0.1rem' },
    4: { xs: '0.15rem', md: '0.2rem' },
  },
};

// No presets; rely on densities (1..4) only
