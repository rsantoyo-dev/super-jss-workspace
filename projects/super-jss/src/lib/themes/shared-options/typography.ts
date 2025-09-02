import { SjTypography } from '../../models/interfaces';

export const DEFAULT_TYPOGRAPHY: SjTypography = {
  default: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 1,
    lineHeight: 1.6,
  },
  H1: { fontSize: { xs: 2.5, md: 3.5 }, fontWeight: '600', lineHeight: 4 },
  H2: { fontSize: { xs: 2, md: 3 }, fontWeight: '600', lineHeight: 3.5 },
  H3: { fontSize: { xs: 1.75, md: 2.5 }, fontWeight: '600', lineHeight: 3 },
  H4: { fontSize: { xs: 1.5, md: 2 }, fontWeight: '600', lineHeight: 2 },
  H5: { fontSize: { xs: 1.25, md: 1.75 }, fontWeight: '600', lineHeight: 2 },
  H6: { fontSize: { xs: 1, md: 1.25 }, fontWeight: '600', lineHeight: 1.5 },
  P: { fontSize: 1, fontWeight: 'normal', lineHeight: 1.4 },
  SPAN: { fontSize: 0.9, fontWeight: 'normal', lineHeight: 1.2 },
  STRONG: { fontSize: 1, fontWeight: 'bold', lineHeight: 1.2 },
  BODY: { fontSize: 1, fontWeight: 'normal', lineHeight: 1.2 },
  CAPTION: { fontSize: 0.8, fontWeight: 'normal', lineHeight: 1.2 },
  SMALL: { fontSize: 0.85, fontWeight: 'normal', lineHeight: 1.2 },
};
