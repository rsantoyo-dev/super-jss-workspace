import { SjTypography } from '../../models/interfaces';

const defaultStyle = {
  fontFamily: 'system-ui, "Helvetica", "Arial", sans-serif',
  color: 'dark.dark', //
};

export const DEFAULT_TYPOGRAPHY: SjTypography = {
  default: defaultStyle,
  H1: {
    ...defaultStyle,
    fontSize: { xs: 2.5, md: 4 },
    fontWeight: '800',
    lineHeight: { xs: 2.3, md: 3.7 },
  },
  H2: {
    ...defaultStyle,
    fontSize: { xs: 2, md: 3.2 },
    fontWeight: '600',
    lineHeight: { xs: 1.75, md: 3.2 },
  },
  H3: {
    ...defaultStyle,
    fontSize: { xs: 1.75, md: 2.7 },
    fontWeight: '600',
    lineHeight: { xs: 1.8, md: 2.8 },
  },
  H4: {
    ...defaultStyle,
    fontSize: { xs: 1.5, md: 2 },
    fontWeight: '600',
    lineHeight: { xs: 1.3, md: 2.2 },
  },
  H5: {
    ...defaultStyle,
    fontSize: { xs: 1.25, md: 1.75 },
    fontWeight: '600',
    lineHeight: { xs: 1.4, md: 2.2 },
  },
  H6: {
    ...defaultStyle,
    fontSize: { xs: 1, md: 1.25 },
    fontWeight: '600',
    lineHeight: { xs: 1.2, md: 2.2 },
  },
  P: {
    ...defaultStyle,
    fontSize: 1,
    fontWeight: 'normal',
    lineHeight: { xs: 1.6, md: 1.8 },
  },
  SPAN: {
    ...defaultStyle,
    fontSize: 0.9,
    fontWeight: 'normal',
    lineHeight: { xs: 1.2, md: 1.4 },
  },
  STRONG: {
    ...defaultStyle,
    fontSize: 1,
    fontWeight: 'bold',
    lineHeight: { xs: 1.2, md: 1.4 },
  },
  BODY: {
    ...defaultStyle,
    fontSize: 1,
    fontWeight: 'normal',
    lineHeight: { xs: 1.6, md: 1.8 },
  },
  CAPTION: {
    ...defaultStyle,
    fontSize: 0.8,
    fontWeight: 'normal',
    lineHeight: { xs: 1.2, md: 1.4 },
  },
  SMALL: {
    ...defaultStyle,
    fontSize: 0.75,
    fontWeight: 'normal',
    lineHeight: { xs: 0.5, md: 0.75 },
  },
  PRE: {
    ...defaultStyle,
    fontSize: 0.9,
    fontFamily: 'monospace', // Specific override
    lineHeight: { xs: 1.2, md: 1.4 },
  },
};
