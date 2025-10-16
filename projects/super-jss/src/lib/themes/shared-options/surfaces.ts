import { SjTheme } from '../../../lib/models/interfaces';

export const DEFAULT_SURFACES: NonNullable<
  NonNullable<SjTheme['components']>['surfaces']
> = {
  padding: {
    1: { xs: 0.25, sm: 0.3, md: 0.4, lg: 0.5, xl: 0.6 },
    2: { xs: 0.5, sm: 0.6, md: 0.7, lg: 0.75, xl: 0.9 },
    3: { xs: 0.75, sm: 0.9, md: 1, lg: 1.25, xl: 1.5 },
    4: { xs: 1, sm: 1.25, md: 1.5, lg: 1.75, xl: 2 },
  },
  gap: {
    1: { xs: 0.25, sm: 0.3, md: 0.4, lg: 0.5, xl: 0.6 },
    2: { xs: 0.5, sm: 0.6, md: 0.7, lg: 0.75, xl: 0.9 },
    3: { xs: 0.75, sm: 0.9, md: 1, lg: 1.25, xl: 1.5 },
    4: { xs: 1, sm: 1.25, md: 1.5, lg: 1.75, xl: 2 },
  },
  radius: {
    1: { xs: 0.25, sm: 0.3, md: 0.4, lg: 0.5, xl: 0.6 },
    2: { xs: 0.5, sm: 0.6, md: 0.7, lg: 0.75, xl: 0.9 },
    3: { xs: 0.75, sm: 0.9, md: 1, lg: 1.25, xl: 1.5 },
    4: { xs: 1, sm: 1.25, md: 1.5, lg: 1.75, xl: 2 },
  },
};
