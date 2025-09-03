import { SjTypography } from '../../models/interfaces';

export const DEFAULT_TYPOGRAPHY: SjTypography = {
  default: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 1,
    lineHeight: 1.3,
    transition: 'all 0.2s ease-in-out', // Added transition
  },
  H1: { fontSize: { xs: 2.5, md: 4 }, fontWeight: '800', lineHeight: 2, margin:0,  marginBlockEnd: 2, marginBlockStart: 2  },
  H2: { fontSize: { xs: 2, md: 3.2 }, fontWeight: '600', lineHeight: 1.5, marginBlockEnd: 1.8, marginBlockStart: 1.8  },
  H3: { fontSize: { xs: 1.75, md: 2.7 }, fontWeight: '600', lineHeight: 1.4, marginBlockEnd: 1.5, marginBlockStart: 1.5  },
  H4: { fontSize: { xs: 1.5, md: 2 }, fontWeight: '600', lineHeight: 1.3 , marginBlockEnd: 0.8, marginBlockStart: 0.8  },
  H5: { fontSize: { xs: 1.25, md: 1.75 }, fontWeight: '600', lineHeight: 1.2 , marginBlockEnd: 0.6, marginBlockStart: 0.6  },
  H6: { fontSize: { xs: 1, md: 1.25 }, fontWeight: '600', lineHeight: 1.2 , marginBlockEnd: 0.4, marginBlockStart: 0.4  },
  P: { fontSize: 1, fontWeight: 'normal', lineHeight: 1.6 , marginBlockEnd: 0.8, marginBlockStart: 0.4  },
  SPAN: { fontSize: 0.9, fontWeight: 'normal', lineHeight: 1.2, marginBlockEnd: 0.2, marginBlockStart: 0.2  },
  STRONG: { fontSize: 1, fontWeight: 'bold', lineHeight: 1.2, marginBlockEnd: 0.2, marginBlockStart: 0.2 },
  BODY: { fontSize: 1, fontWeight: 'normal', lineHeight: 1.6 , marginBlockEnd: 0.5, marginBlockStart: 0.2  },
  CAPTION: { fontSize: 0.8, fontWeight: 'normal', lineHeight: 1.2, marginBlockEnd: 0.2, marginBlockStart: 0.2 },
  SMALL: { fontSize: 0.75, fontWeight: 'normal', lineHeight: 1.2, marginBlockEnd: 0.15, marginBlockStart: 0.15  },
};