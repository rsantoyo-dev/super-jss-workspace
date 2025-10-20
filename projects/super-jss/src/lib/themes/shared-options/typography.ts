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
    lineHeight: { xs: 2.5, sm: 2.75, md: 3, lg: 3.25, xl: 3.5 },
    marginBottom: { xs: 1, md: 1.5 },
  },
  H2: {
    fontSize: { xs: 1.875, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
    fontWeight: '600',
    lineHeight: { xs: 2, sm: 2.25, md: 2.5, lg: 2.75, xl: 3 },
    marginBottom: { xs: 0.75, md: 1.25 },
  },
  H3: {
    fontSize: { xs: 1.5, sm: 1.75, md: 2, lg: 2.25, xl: 2.5 },
    fontWeight: '600',
    lineHeight: { xs: 1.75, sm: 2, md: 2.25, lg: 2.5, xl: 2.75 },
    marginBottom: { xs: 0.5, md: 1 },
  },
  H4: {
    fontSize: { xs: 1.25, sm: 1.375, md: 1.5, lg: 1.75, xl: 2 },
    fontWeight: '600',
    lineHeight: { xs: 1.5, sm: 1.625, md: 1.75, lg: 2, xl: 2.25 },
    marginBottom: { xs: 0.5, md: 0.75 },
  },
  H5: {
    fontSize: { xs: 1.125, sm: 1.25, md: 1.375, lg: 1.5, xl: 1.75 },
    fontWeight: '600',
    lineHeight: { xs: 1.375, sm: 1.5, md: 1.625, lg: 1.75, xl: 2 },
    marginBottom: { xs: 0.5, md: 0.75 },
  },
  H6: {
    fontSize: { xs: 1, sm: 1.125, md: 1.25, lg: 1.375, xl: 1.5 },
    fontWeight: '600',
    lineHeight: { xs: 1.25, sm: 1.375, md: 1.5, lg: 1.625, xl: 1.75 },
    marginBottom: { xs: 0.5, md: 0.75 },
  },
  P: {
    fontSize: { xs: 0.875, sm: 1, md: 1.125 },
    fontWeight: '400',
    lineHeight: { xs: 1.5, sm: 1.625, md: 1.75 },
    marginBottom: { xs: 1, md: 1.25 },
  },
  SPAN: {
    fontSize: { xs: 0.875, sm: 0.9375, md: 1 },
    fontWeight: '400',
    lineHeight: { xs: 1.25, sm: 1.375, md: 1.5 },
  },
  STRONG: {
    fontSize: 'inherit',
    fontWeight: '700',
    lineHeight: 'inherit',
  },
  BODY: {
    fontSize: { xs: 0.875, sm: 1, md: 1.125 },
    fontWeight: '400',
    lineHeight: { xs: 1.5, sm: 1.625, md: 1.75 },
  },
  CAPTION: {
    fontSize: { xs: 0.75, sm: 0.8125, md: 0.875 },
    fontWeight: '400',
    lineHeight: { xs: 1.25, sm: 1.375, md: 1.5 },
    opacity: 0.8,
  },
  SMALL: {
    fontSize: { xs: 0.75, sm: 0.8125, md: 0.875 },
    fontWeight: '400',
    lineHeight: { xs: 1, sm: 1.125, md: 1.25 },
  },
  PRE: {
    fontSize: { xs: 0.875, sm: 0.9375, md: 1 },
    fontFamily:
      '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Source Code Pro", monospace',
    lineHeight: { xs: 1.25, sm: 1.375, md: 1.5 },
    marginBottom: { xs: 1, md: 1.25 },
  },
};
