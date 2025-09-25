import * as CSS from 'csstype';
import { ResponsiveStyle, SjShorthandCustomStyle, SjShorthandStyle, SjStyle } from '../models/interfaces';
import { sjBox, SjBoxApi } from '../blueprints/box';
import { sjCard, SjCardApi } from '../blueprints/card';
import { sjButton, SjButtonApi } from '../blueprints/button';

// Responsive value helper: allow raw or responsive object
type Responsive<T> = T | ResponsiveStyle;

// Map every CSS property to a function producing an SjStyle
type CssFunctions = {
  [K in keyof CSS.Properties<string | number>]-?: (value: Responsive<CSS.Properties<string | number>[K]>) => SjStyle;
};

// Map shorthand keys to functions as well
type ShorthandFunctions = {
  [K in keyof SjShorthandStyle]-?: (value: SjShorthandStyle[K]) => SjStyle;
} & {
  [K in keyof SjShorthandCustomStyle]-?: (value: SjShorthandCustomStyle[K]) => SjStyle;
};

export type SjApi = CssFunctions & ShorthandFunctions & {
  // Compose multiple partial styles into one object (left-to-right)
  compose: (...styles: Array<Partial<SjStyle> | undefined | null | false>) => SjStyle;
  // Pseudo helpers for convenience
  hover: (style: SjStyle) => SjStyle;
  focus: (style: SjStyle) => SjStyle;
  active: (style: SjStyle) => SjStyle;
  disabled: (style: SjStyle) => SjStyle;
  // Namespaced blueprints access
  blueprints: SjBlueprints;
  quick: SjBlueprints;
  help: SjBlueprints;
};

export type SjBlueprints = {
  // Canonical names matching blueprint exports
  sjBox: SjBoxApi;
  sjCard: SjCardApi;
  sjButton: SjButtonApi;

};

// CSS-first API: expose only plain CSS property functions (no shorthands) + helpers

// Base proxy: if a real property exists, return it; otherwise return a setter function
const baseTarget: Record<string | symbol, any> = {};
const base = new Proxy(baseTarget, {
  get: (target, propKey: PropertyKey, receiver) => {
    if (typeof propKey === 'symbol' || Reflect.has(target, propKey)) {
      return Reflect.get(target, propKey, receiver);
    }
    return (value: any): SjStyle => ({ [propKey as string]: value } as SjStyle);
  },
});

// Small helpers implemented explicitly and merged into the proxy
const helpers = {
  compose: (...styles: Array<Partial<SjStyle> | undefined | null | false>): SjStyle => {
    const parts = styles.filter((s): s is Partial<SjStyle> => Boolean(s));
    return parts.reduce((acc, s) => Object.assign(acc, s), {} as SjStyle);
  },

  hover: (style: SjStyle): SjStyle => ({ '&:hover': style }),
  focus: (style: SjStyle): SjStyle => ({ '&:focus': style }),
  active: (style: SjStyle): SjStyle => ({ '&:active': style }),
  disabled: (style: SjStyle): SjStyle => ({ '&:disabled': style }),
};

/**
 * sj helper API
 * - Autocompletes all CSS properties (from csstype)
 * - Includes SuperJSS shorthands (p, m, d, bg, fxDir, ...)
 * - Each function returns a Partial<SjStyle> and accepts responsive values
 *
 * Examples:
 *   [sj]="[ sj.padding({ xs: 2, md: 3 }), sj.bg('primary.main') ]"
 *   [sj]="sj.compose(sj.d('flex'), sj.fxJustify('center'), sj.p(1))"
 *   [sj]="sj.hover({ bg: 'light.dark' })"
 */
const blueprintNamespace: SjBlueprints = {
  sjBox: sjBox,
  sjCard: sjCard,
  sjButton: sjButton,

};

export const sj: SjApi = Object.assign(base, helpers, {
  blueprints: blueprintNamespace,
  quick: blueprintNamespace,
  help: blueprintNamespace,
}) as SjApi;

export default sj;
