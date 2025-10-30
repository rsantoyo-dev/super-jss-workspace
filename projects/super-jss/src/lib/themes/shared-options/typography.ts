import { SjTypography } from '../../models/interfaces';

const defaultStyle = {
  // UI font family
  fontFamily:
    'Inter, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  // Remove UA margins; set to zero for consistent spacing control
  marginBlockStart: '0',
  marginBlockEnd: '0',
  marginInlineStart: 0,
  marginInlineEnd: 0,
  color: 'inherit',
  fontWeight: 400,
};

export const DEFAULT_TYPOGRAPHY: SjTypography = {
  default: defaultStyle,
  H1: {
    fontFamily: '"Bricolage Grotesque", Inter, system-ui, sans-serif',
    fontSize: { xs: '36px', sm: '40px', md: '48px', lg: '56px', xl: '64px' },
    fontWeight: 700,
  },
  H2: {
    fontFamily: '"Bricolage Grotesque", Inter, system-ui, sans-serif',
    fontSize: { xs: '30px', sm: '32px', md: '40px', lg: '48px', xl: '56px' },
    fontWeight: 700,
  },
  H3: {
    fontFamily: '"Bricolage Grotesque", Inter, system-ui, sans-serif',
    fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px', xl: '40px' },
    fontWeight: 600,
  },
  H4: {
    fontFamily: '"Bricolage Grotesque", Inter, system-ui, sans-serif',
    fontSize: { xs: '20px', sm: '22px', md: '24px', lg: '28px', xl: '32px' },
    fontWeight: 600,
  },
  H5: {
    fontFamily: '"Bricolage Grotesque", Inter, system-ui, sans-serif',
    fontSize: { xs: '18px', sm: '20px', md: '22px', lg: '24px', xl: '28px' },
    fontWeight: 600,
  },
  H6: {
    fontFamily: '"Bricolage Grotesque", Inter, system-ui, sans-serif',
    fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '22px', xl: '24px' },
    fontWeight: 600,
  },
  P: {
    fontSize: { xs: '16px', md: '17.2px' },
    fontWeight: 400,
    lineHeight: { xs: 1.35, md: 1.375 },
  },
  SPAN: {
    fontSize: { xs: '14px', sm: '15px', md: '16px' },
    fontWeight: 400,
  },
  BODY: { fontSize: { xs: '14px', sm: '16px', md: '18px' }, fontWeight: 400 },
  CAPTION: {
    fontSize: { xs: '12px', sm: '13px', md: '14px' },
    opacity: 0.8,
  },
  SMALL: {
    fontSize: { xs: '12px', sm: '13px', md: '14px' },
  },
  PRE: {
    fontSize: { xs: '14px', sm: '15px', md: '16px' },
    fontFamily:
      'Menlo, "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Source Code Pro", monospace',
  },
};
