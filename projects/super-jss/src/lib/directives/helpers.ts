
import { signal } from "@angular/core";
import {Breakpoints, SJss, SJssStyles, SJssTheme, SjQuick} from "../model";
import { innerWidth, breakPoint } from "./public-api";

export const activeListeners = signal(false);

export const onResize = (theme: SJssTheme) => {
  innerWidth.set(window.innerWidth);
  const bp = determineBreakpoint(theme, innerWidth());
  breakPoint.set((bp !== breakPoint()) ? bp : breakPoint());
}

export const determineBreakpoint = (theme: SJssTheme, innerWidth: number): Breakpoints => {
  let breakpoint: Breakpoints = Breakpoints.XS;
  for (const key in theme.breakpoints) {
    if (theme.breakpoints[key as Breakpoints] <= innerWidth) {
      breakpoint = key as Breakpoints;
    } else {
      break;
    }
  }
  return breakpoint;
}

export const applyTypography = (el: HTMLElement, theme: SJssTheme, screenWidth: number) => {
  Object.keys(theme.typography).forEach(key => {
    const jss: SJssStyles = { marginBlockStart: '0', marginBlockEnd: '0', ...theme.typography.default };
    const specificStyle: SJss | undefined = theme.typography[key as keyof typeof theme.typography];
    if (el.nodeName === key && specificStyle) {
      applyStylesToElement(el, { ...jss, ...specificStyle }, theme, screenWidth);
    }
  });
};

export const isEmptySj = (sj: SJss) => !sj || sj && Object.keys(sj).length === 0 && Object.keys(sj).length === 0;

export const applyStylesToElement = (el: HTMLElement, jssStyle: SJss, theme: SJssTheme, screenWidth: number) => {
  if ((isEmptySj(jssStyle) && el)) {
    return;
  }
  if (jssStyle && Object.keys(jssStyle).length >= 0 || Array.isArray(jssStyle)) {
    if (Array.isArray(jssStyle)) {
      jssStyle.forEach(styleObj => {
        setStyleProperties(el, styleObj, theme, screenWidth);
      });
    } else {
      setStyleProperties(el, jssStyle as SJssStyles, theme, screenWidth);
    }
  }
}

export const setStyleProperties = (el: HTMLElement, styleObj: SJssStyles, theme: SJssTheme, screenWidth: number) => {
  Object.keys(styleObj).forEach(key => {
     try {
       // @ts-ignore
       el.style[key] = applyStyle(styleObj[key], screenWidth, theme)
     } catch (error) {
       console.error(`Failed to apply style for key: ${key}`, error);
     }
  });
};

const applyShortcuts = (styleValue: string, theme: SJssTheme): string => {
  const mappings = {
    [SjQuick.primary]: theme.palette.primary.main,
    [SjQuick.primaryLight]: theme.palette.primary.light,
    [SjQuick.primaryDark]: theme.palette.primary.dark,
    [SjQuick.primaryContrast]: theme.palette.primary.contrastText,

    [SjQuick.secondary]: theme.palette.secondary.main,
    [SjQuick.secondaryLight]: theme.palette.secondary.light,
    [SjQuick.secondaryDark]: theme.palette.secondary.dark,
    [SjQuick.secondaryContrast]: theme.palette.secondary.contrastText,

    [SjQuick.tertiary]: theme.palette.tertiary.main,
    [SjQuick.tertiaryLight]: theme.palette.tertiary.light,
    [SjQuick.tertiaryDark]: theme.palette.tertiary.dark,
    [SjQuick.tertiaryContrast]: theme.palette.tertiary.contrastText,

    [SjQuick.error]: theme.palette.error.main,
    [SjQuick.errorLight]: theme.palette.error.light,
    [SjQuick.errorDark]: theme.palette.error.dark,

    [SjQuick.warning]: theme.palette.warning.main,
    [SjQuick.warningLight]: theme.palette.warning.light,
    [SjQuick.warningDark]: theme.palette.warning.dark,

    [SjQuick.info]: theme.palette.info.main,
    [SjQuick.infoLight]: theme.palette.info.light,
    [SjQuick.infoDark]: theme.palette.info.dark,

    [SjQuick.success]: theme.palette.success.main,
    [SjQuick.successLight]: theme.palette.success.light,
    [SjQuick.successDark]: theme.palette.success.dark,

    [SjQuick.dark]: theme.palette.common.dark.main,
    [SjQuick.darkDark]: theme.palette.common.dark.dark,
    [SjQuick.darkLight]: theme.palette.common.dark.light,

    [SjQuick.light]: theme.palette.common.light.main,
    [SjQuick.lighDark]: theme.palette.common.light.dark,
    [SjQuick.lightLight]: theme.palette.common.light.light,

    [SjQuick.neutral]: theme.palette.common.neutral.main,
    [SjQuick.neutralDark]: theme.palette.common.neutral.dark,
    [SjQuick.neutralLight]: theme.palette.common.neutral.light,
  };

  return mappings[styleValue as keyof typeof mappings] || styleValue;
};


const applyStyle = (styleValue: SJssStyles | string, screenWidth: number, theme: SJssTheme): string => {
  let style: string = "";
  if (typeof styleValue === "string") {
    return applyShortcuts(styleValue, theme);
  }
  else if (typeof styleValue === 'object') {
    Object.keys(styleValue).forEach(key => {
      if (Object.values(Breakpoints).includes(key as Breakpoints) &&
        styleValue[key] &&
        screenWidth>theme.breakpoints[key as Breakpoints])
      {
        style =  applyShortcuts(styleValue[key]! as string, theme);
      }
    });
  }
  return style;
};

