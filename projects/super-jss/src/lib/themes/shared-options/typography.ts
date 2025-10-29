import { SjTypography } from '../../models/interfaces';

const defaultStyle = {
  fontFamily:
    'system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  color: 'dark.dark',
  marginBlockStart: 'auto',
  marginBlockEnd: 'auto',
  marginInlineStart: 0,
  marginInlineEnd: 0,
};

export const DEFAULT_TYPOGRAPHY: SjTypography = {
  default: defaultStyle,
  H1: {
    fontSize: { xs: 2.25, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
    fontWeight: '700',
  },
  H2: {
    fontSize: { xs: 1.875, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
    fontWeight: '600',
  },
  H3: {
    fontSize: { xs: 1.5, sm: 1.75, md: 2, lg: 2.25, xl: 2.5 },
    fontWeight: '600',
  },
  H4: {
    fontSize: { xs: 1.25, sm: 1.375, md: 1.5, lg: 1.75, xl: 2 },
    fontWeight: '600',
  },
  H5: {
    fontSize: { xs: 1.125, sm: 1.25, md: 1.375, lg: 1.5, xl: 1.75 },
    fontWeight: '600',
  },
  H6: {
    fontSize: { xs: 1, sm: 1.125, md: 1.25, lg: 1.375, xl: 1.5 },
    fontWeight: '600',
  },
  P: {
    fontSize: { xs: 1, md: 1.075 },
    fontWeight: '400',
    lineHeight: { xs: 1.35, md: 1.375 },
  },
  SPAN: {
    fontSize: { xs: 0.875, sm: 0.9375, md: 1 },
    fontWeight: '400',
  },
  STRONG: {
    fontSize: 'inherit',
    fontWeight: '700',
    lineHeight: 'inherit',
  },
  BODY: {
    fontSize: { xs: 0.875, sm: 1, md: 1.125 },
    fontWeight: '400',
  },
  CAPTION: {
    fontSize: { xs: 0.75, sm: 0.8125, md: 0.875 },
    fontWeight: '400',
    opacity: 0.8,
  },
  SMALL: {
    fontSize: { xs: 0.75, sm: 0.8125, md: 0.875 },
    fontWeight: '400',
  },
  PRE: {
    fontSize: { xs: 0.875, sm: 0.9375, md: 1 },
    fontFamily:
      '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Source Code Pro", monospace',
  },
};
