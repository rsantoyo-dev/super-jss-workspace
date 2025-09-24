import { SjIconRenderOptions, renderMoonIcon, renderSunIcon } from './main-icons';

export const SJ_ICON_RENDERERS = {
  sun: renderSunIcon,
  moon: renderMoonIcon,
} as const;

export type SjIconName = keyof typeof SJ_ICON_RENDERERS;

export const icon = {
  sun: 'sun' as SjIconName,
  moon: 'moon' as SjIconName,
};

export const SJ_ICON_SVGS = {
  sun: renderSunIcon(),
  moon: renderMoonIcon(),
} as const;

export type SjIconOptions = SjIconRenderOptions;

export const renderIcon = (name: SjIconName, options?: SjIconOptions): string =>
  SJ_ICON_RENDERERS[name](options);
