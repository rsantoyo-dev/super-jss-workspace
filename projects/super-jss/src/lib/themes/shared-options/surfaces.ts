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
    5: { xs: 1.1, sm: 1.3, md: 1.6, lg: 1.8, xl: 2.0 },
    6: { xs: 1.25, sm: 1.5, md: 1.75, lg: 2.0, xl: 2.25 },
    7: { xs: 1.5, sm: 1.75, md: 2.0, lg: 2.25, xl: 2.5 },
    8: { xs: 1.75, sm: 2.0, md: 2.25, lg: 2.5, xl: 2.75 },
    9: { xs: 0.75, sm: 1.0, md: 1.25, lg: 1.5, xl: 1.75 }, // compact grids
    10: { xs: 2.0, sm: 2.25, md: 2.5, lg: 2.75, xl: 3.0 }, // spacious grids
    11: { xs: 0.5, sm: 0.6, md: 0.7, lg: 0.8, xl: 0.9 }, // tight lists
    12: { xs: 3.0, sm: 3.25, md: 3.5, lg: 3.75, xl: 4.0 }, // hero layouts
  },
  radius: {
    1: { xs: 0.1, sm: 0.15, md: 0.2, lg: 0.25, xl: 0.3 },
    2: { xs: 0.15, sm: 0.2, md: 0.25, lg: 0.3, xl: 0.35 },
    3: { xs: 0.3, sm: 0.4, md: 0.5, lg: 0.6, xl: 0.7 },
    4: { xs: 0.5, sm: 0.6, md: 0.7, lg: 0.8, xl: 0.9 },
    5: { xs: 1.25, sm: 1.5, md: 1.75, lg: 2.0, xl: 2.25 },
    6: { xs: 1.5, sm: 1.75, md: 2.0, lg: 2.25, xl: 2.5 },
    7: { xs: 1.75, sm: 2.0, md: 2.25, lg: 2.5, xl: 2.75 },
    8: { xs: 2.0, sm: 2.25, md: 2.5, lg: 2.75, xl: 3.0 },
    9: { xs: 0.75, sm: 1.0, md: 1.25, lg: 1.5, xl: 1.75 },
    10: { xs: 2.25, sm: 2.5, md: 2.75, lg: 3.0, xl: 3.25 },
    11: { xs: 0.5, sm: 0.75, md: 1.0, lg: 1.25, xl: 1.5 },
    12: { xs: 3.0, sm: 3.25, md: 3.5, lg: 3.75, xl: 4.0 },
  },
  border: {
    1: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }, // thin: 1px
    2: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }, // default: 2px
    3: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }, // medium: 3px
    4: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }, // thick: 4px
    5: { xs: 1, sm: 1, md: 1.5, lg: 1.5, xl: 2 }, // subtle emphasis
    6: { xs: 2, sm: 2, md: 2, lg: 3, xl: 3 }, // strong emphasis
    7: { xs: 0.5, sm: 0.75, md: 1, lg: 1, xl: 1 }, // hairline at xs/sm
    8: { xs: 4, sm: 4, md: 5, lg: 5, xl: 6 }, // ultra thick
    9: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1 },
    10: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 },
    11: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3 },
    12: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4 },
  },
};

// Optional presets composed as arrays of SjStyle (plain CSS objects).
// These can be spread in [sj] for richer/asymmetric density patterns.
export const DEFAULT_SURFACES_PRESETS = {
  padding: {
    // 1..4 mirror symmetric defaults
    1: [{ padding: { xs: 0.25, sm: 0.3, md: 0.4, lg: 0.5, xl: 0.6 } }],
    2: [{ padding: { xs: 0.5, sm: 0.6, md: 0.7, lg: 0.75, xl: 0.9 } }],
    3: [{ padding: { xs: 0.75, sm: 0.9, md: 1.0, lg: 1.25, xl: 1.5 } }],
    4: [{ padding: { xs: 1.0, sm: 1.25, md: 1.5, lg: 1.75, xl: 2.0 } }],
    // 5–8: left‑biased reading layouts
    5: [
      { padding: { xs: 0.25, sm: 0.3, md: 0.4, lg: 0.5, xl: 0.6 } },
      { paddingLeft: { xs: 0.4, md: 0.6, lg: 0.8 } },
    ],
    6: [
      { padding: { xs: 0.25, sm: 0.3, md: 0.4, lg: 0.5, xl: 0.6 } },
      { paddingLeft: { xs: 0.7, md: 1.0, lg: 1.2 } },
    ],
    7: [
      { padding: { xs: 0.25, sm: 0.3, md: 0.4, lg: 0.5, xl: 0.6 } },
      { paddingLeft: { xs: 1.0, md: 1.4, lg: 1.6 } },
    ],
    8: [
      { padding: { xs: 0.25, sm: 0.3, md: 0.4, lg: 0.5, xl: 0.6 } },
      { paddingLeft: { xs: 1.3, md: 1.8, lg: 2.0 } },
    ],
    // 9–12: other shapes
    9: [
      { px: { xs: 0.25, sm: 0.3, md: 0.4, lg: 0.5, xl: 0.6 } },
      { py: { xs: 1.0, md: 1.4, lg: 1.6 } },
    ],
    10: [
      { px: { xs: 1.0, sm: 1.2, md: 1.4, lg: 1.6, xl: 1.8 } },
      { py: { xs: 0.5, md: 0.7, lg: 0.9 } },
    ],
    11: [
      { py: { xs: 0.25, sm: 0.3, md: 0.4, lg: 0.5, xl: 0.6 } },
      { px: { xs: 1.0, md: 1.4, lg: 1.6 } },
    ],
    12: [
      { px: { xs: 2.0, sm: 2.2, md: 2.4, lg: 2.6, xl: 2.8 } },
      { py: { xs: 1.0, md: 1.4, lg: 1.6 } },
    ],
  },
};
