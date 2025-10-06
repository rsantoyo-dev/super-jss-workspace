/*
 * Public API Surface of super-jss
 */

export * from './lib/services/sj-theme.service';
export * from './lib/services/sj-css-generator.service';
export * from './lib/directives/sj.directive';
export * from './lib/models/interfaces';
export * from './lib/blueprints';
export * from './lib/components';
export * from './lib/icons';
export * from './lib/api/sj';
export * from './lib/imports';
// Expose shared theme options and default theme for secondary entry usage
export { DEFAULT_BREAKPOINTS } from './lib/themes/shared-options/breakpoints';
export { DEFAULT_COLORS } from './lib/themes/shared-options/colors';
export { DEFAULT_SPACING } from './lib/themes/shared-options/spacing';
export { DEFAULT_TYPOGRAPHY } from './lib/themes/shared-options/typography';
export { defaultTheme, defaultDarkTheme } from './lib/themes/theme-definitions/default-theme';
