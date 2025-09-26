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

