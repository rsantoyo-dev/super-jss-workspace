import { InjectionToken } from '@angular/core';
import { ResponsiveStyle, SjTheme } from '../models/interfaces';

/**
 * Injection token used to provide a base SjTheme at bootstrap.
 * Consumers can override it to switch themes application-wide.
 */
export const SJ_THEME = new InjectionToken<SjTheme>('sj-theme');

// ------- Surfaces configuration (optional, theme-driven) -------

export type SjDensityLevel = 1 | 2 | 3 | 4;

export type SjDensityMap<T = number | string> = Partial<
  Record<SjDensityLevel, ResponsiveStyle | T>
>;

export interface SjSurfacesConfig {
  padding?: SjDensityMap<number>;
  gap?: SjDensityMap<number>;
  radius?: SjDensityMap<number | string>;
}

/**
 * Optional app-level override for surface density maps (padding/gap/radius).
 * If not provided, components should fall back to built-in defaults or theme.
 */
export const SJ_SURFACES_CONFIG = new InjectionToken<SjSurfacesConfig>(
  'sj-surfaces-config'
);

export const DEFAULT_SURFACE_DENSITIES: Required<
  Pick<SjSurfacesConfig, 'padding' | 'gap' | 'radius'>
> = {
  padding: {
    1: { xs: 0.25, md: 0.5, lg: 0.75 },
    2: { xs: 0.5, md: 0.75, lg: 1 },
    3: { xs: 0.75, md: 1, lg: 1.25 },
    4: { xs: 1, md: 1.25, lg: 1.5 },
  },
  gap: {
    1: { xs: 0.25, md: 0.5, lg: 0.75 },
    2: { xs: 0.5, md: 0.75, lg: 1 },
    3: { xs: 0.75, md: 1, lg: 1.25 },
    4: { xs: 1, md: 1.25, lg: 1.5 },
  },
  radius: {
    1: 0.25,
    2: 0.5,
    3: 0.75,
    4: 1,
  },
};
