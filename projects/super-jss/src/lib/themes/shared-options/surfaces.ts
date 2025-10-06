import { SjTheme } from '../../../lib/models/interfaces';

export const DEFAULT_SURFACES: NonNullable<
  NonNullable<SjTheme['components']>['surfaces']
> = {
  padding: {
    1: { xs: 0.15, lg: 0.5 },
    2: { xs: 0.3, sm: 0.45, md: 0.6, lg: 0.75, xl: 0.9 },
    3: { xs: 0.4, sm: 0.6, md: 0.8, lg: 1, xl: 1.2 },
    4: { xs: 0.5, sm: 0.75, md: 1, lg: 1.25, xl: 1.5 },
  },
  gap: {
    1: { xs: 0.15, lg: 0.5 },
    2: { xs: 0.3, sm: 0.45, md: 0.6, lg: 0.75, xl: 0.9 },
    3: { xs: 0.4, sm: 0.6, md: 0.8, lg: 1, xl: 1.2 },
    4: { xs: 0.5, sm: 0.75, md: 1, lg: 1.25, xl: 1.5 },
  },
  radius: {
    1: { xs: 0.15, lg: 0.3 },
    2: { xs: 0.2, sm: 0.25, md: 0.3, lg: 0.4, xl: 0.5 },
    3: { xs: 0.3, sm: 0.4, md: 0.5, lg: 0.6, xl: 0.75 },
    4: { xs: 0.4, sm: 0.5, md: 0.75, lg: 1, xl: 1.25 },
  },
};
