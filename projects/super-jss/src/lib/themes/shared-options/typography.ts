import { SjTypography } from '../../models/interfaces';

const defaultStyle = {
  fontFamily:
    'system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  // Remove UA margins; set to zero for consistent spacing control
  marginBlockStart: '0',
  marginBlockEnd: '0',
  marginInlineStart: 0,
  marginInlineEnd: 0,
  color: 'inherit',
  fontWeight: '400',
};

export const DEFAULT_TYPOGRAPHY: SjTypography = {
  default: defaultStyle,
  H1: {
    // Minor third scale (≈1.2) across breakpoints
    // steps: xs: 2.488, sm/md: 2.986, lg: 3.583, xl: 4.299
    fontSize: { xs: 2.488, sm: 2.986, md: 2.986, lg: 3.583, xl: 4.299 },
  },
  H2: {
    // steps: xs: 2.074, sm/md: 2.488, lg: 2.986, xl: 3.583
    fontSize: { xs: 2.074, sm: 2.488, md: 2.488, lg: 2.986, xl: 3.583 },
  },
  H3: {
    // steps: xs: 1.728, sm/md: 2.074, lg: 2.488, xl: 2.986
    fontSize: { xs: 1.728, sm: 2.074, md: 2.074, lg: 2.488, xl: 2.986 },
  },
  H4: {
    // steps: xs: 1.44, sm/md: 1.728, lg: 2.074, xl: 2.488
    fontSize: { xs: 1.44, sm: 1.728, md: 1.728, lg: 2.074, xl: 2.488 },
  },
  H5: {
    // steps: xs: 1.2, sm/md: 1.44, lg: 1.728, xl: 2.074
    fontSize: { xs: 1.2, sm: 1.44, md: 1.44, lg: 1.728, xl: 2.074 },
  },
  H6: {
    // steps: xs: 1, sm/md: 1.2, lg: 1.44, xl: 1.728
    fontSize: { xs: 1, sm: 1.2, md: 1.2, lg: 1.44, xl: 1.728 },
  },
  P: {
    fontSize: { xs: 1, md: 1 },
    lineHeight: { xs: 1.35, md: 1.375 },
  },
  SPAN: {
    fontSize: { xs: 1, sm: 1, md: 1 },
  },
  BODY: {
    // Align body to the minor third neighbors around 1rem
    fontSize: { xs: 0.833, sm: 1, md: 1.2 },
  },
  CAPTION: {
    // Extra-small caption size
    fontSize: { xs: 0.694, sm: 0.694, md: 0.694 },
    opacity: 0.8,
  },
  SMALL: {
    // Small text per minor third (≈0.833rem)
    fontSize: { xs: 0.833, sm: 0.833, md: 0.833 },
  },
  PRE: {
    fontSize: { xs: 0.875, sm: 0.9375, md: 1 },
    fontFamily:
      '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Source Code Pro", monospace',
  },
};
