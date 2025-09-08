import { SjTypography } from '../../models/interfaces';

export const DEFAULT_TYPOGRAPHY: SjTypography = {
  default: {
    fontFamily: 'system-ui, "Helvetica", "Arial", sans-serif',
    fontSize: 1,
    lineHeight: { xs: 1.3, md: 1.6 }, 
    transition: 'all 0.1s ease-in-out',
    color: 'dark.dark', //
  },
  H1: { fontSize: { xs: 2.5, md: 4 }, fontWeight: '800', lineHeight: { xs: 2.3, md: 3.7 }, marginBlockEnd: 0.8, marginBlockStart: 0.8 },
  H2: { fontSize: { xs: 2, md: 3.2 }, fontWeight: '600', lineHeight: { xs: 1.75, md: 3.2 }, marginBlockEnd: 0.8, marginBlockStart: 0.8 },
  H3: { fontSize: { xs: 1.75, md: 2.7 }, fontWeight: '600', lineHeight: { xs: 1.8, md: 2.8 }, marginBlockEnd: 0.8, marginBlockStart: 0.8 },
  H4: { fontSize: { xs: 1.5, md: 2 }, fontWeight: '600', lineHeight: { xs: 1.3, md: 2.2 }, marginBlockEnd: 0.8, marginBlockStart: 0.8 },
  H5: { fontSize: { xs: 1.25, md: 1.75 }, fontWeight: '600', lineHeight: { xs: 1.4, md: 2.2 }, marginBlockEnd: 0.4, marginBlockStart: 0.4 },
  H6: { fontSize: { xs: 1, md: 1.25 }, fontWeight: '600', lineHeight: { xs: 1.2, md: 2.2 }, marginBlockEnd: 0.4, marginBlockStart: 0.4 },
  P: { fontSize: 1, fontWeight: 'normal', lineHeight: { xs: 1.6, md: 1.8 }, marginBlockEnd: 0.8, marginBlockStart: 0.4 },
  SPAN: { fontSize: 0.9, fontWeight: 'normal', lineHeight: { xs: 1.2, md: 1.4 }, marginBlockEnd: 0.2, marginBlockStart: 0.2 },
  STRONG: { fontSize: 1, fontWeight: 'bold', lineHeight: { xs: 1.2, md: 1.4 }, marginBlockEnd: 0.2, marginBlockStart: 0.2 },
  BODY: { fontSize: 1, fontWeight: 'normal', lineHeight: { xs: 1.6, md: 1.8 }, marginBlockEnd: 0.5, marginBlockStart: 0.2 },
  CAPTION: { fontSize: 0.8, fontWeight: 'normal', lineHeight: { xs: 1.2, md: 1.4 }, marginBlockEnd: 0.2, marginBlockStart: 0.2 },
  SMALL: { fontSize: 0.75, fontWeight: 'normal', lineHeight: { xs: 1.2, md: 1.4 }, marginBlockEnd: 0.15, marginBlockStart: 0.15 },
  PRE: { fontSize: 0.9, fontFamily: 'monospace', lineHeight: { xs: 1.2, md: 1.4 }, marginBlockEnd: 0.2, marginBlockStart: 0.2 },
};