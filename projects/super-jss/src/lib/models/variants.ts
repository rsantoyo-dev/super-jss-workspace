// Centralized variant registries to enable IDE autocomplete in templates

export const SjCardVariants = {
  default: 'default',
  outlined: 'outlined',
  flat: 'flat',
  elevated: 'elevated',
  interactive: 'interactive',
  primary: 'primary',
  secondary: 'secondary',
  info: 'info',
  codeSnippet: 'codeSnippet',
} as const;

export type SjCardVariant = typeof SjCardVariants[keyof typeof SjCardVariants];

export const SjPaperVariants = {
  default: 'default',
  flat: 'flat',
  outlined: 'outlined',
  filled: 'filled',
} as const;

export type SjPaperVariant = typeof SjPaperVariants[keyof typeof SjPaperVariants];

export const SjButtonVariants = {
  default: 'default',
  light: 'light',
  contained: 'contained',
  outlined: 'outlined',
  containedPrimary: 'containedPrimary',
  containedLight: 'containedLight',
  containedDark: 'containedDark',
  containedSecondary: 'containedSecondary',
  danger: 'danger',
  // New simplified variants
  filled: 'filled',
  flat: 'flat',
} as const;

export type SjButtonVariant = typeof SjButtonVariants[keyof typeof SjButtonVariants];

export const SjTypographyVariants = {
  default: 'default',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  strong: 'strong',
  body: 'body',
  caption: 'caption',
  small: 'small',
  pre: 'pre',
} as const;

export type SjTypographyVariant = typeof SjTypographyVariants[keyof typeof SjTypographyVariants];
