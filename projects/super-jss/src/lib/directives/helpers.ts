
import { signal } from "@angular/core";
import { Breakpoints, SJss, SJssStyles, SJssTheme, sjColor } from "../model";
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

export const applyShortcuts = (styleValue: string, theme: SJssTheme): string => {
  const mappings = {
    [sjColor.primary]: theme.palette.primary.main,
    [sjColor.primaryLight]: theme.palette.primary.light,
    [sjColor.primaryDark]: theme.palette.primary.dark,
    [sjColor.primaryContrast]: theme.palette.primary.contrastText,

    [sjColor.secondary]: theme.palette.secondary.main,
    [sjColor.secondaryLight]: theme.palette.secondary.light,
    [sjColor.secondaryDark]: theme.palette.secondary.dark,
    [sjColor.secondaryContrast]: theme.palette.secondary.contrastText,

    [sjColor.tertiary]: theme.palette.tertiary.main,
    [sjColor.tertiaryLight]: theme.palette.tertiary.light,
    [sjColor.tertiaryDark]: theme.palette.tertiary.dark,
    [sjColor.tertiaryContrast]: theme.palette.tertiary.contrastText,

    [sjColor.error]: theme.palette.error.main,
    [sjColor.errorLight]: theme.palette.error.light,
    [sjColor.errorDark]: theme.palette.error.dark,

    [sjColor.warning]: theme.palette.warning.main,
    [sjColor.warningLight]: theme.palette.warning.light,
    [sjColor.warningDark]: theme.palette.warning.dark,

    [sjColor.info]: theme.palette.info.main,
    [sjColor.infoLight]: theme.palette.info.light,
    [sjColor.infoDark]: theme.palette.info.dark,

    [sjColor.success]: theme.palette.success.main,
    [sjColor.successLight]: theme.palette.success.light,
    [sjColor.successDark]: theme.palette.success.dark,

    [sjColor.dark]: theme.palette.common.dark.main,
    [sjColor.darkDark]: theme.palette.common.dark.dark,
    [sjColor.darkLight]: theme.palette.common.dark.light,

    [sjColor.light]: theme.palette.common.light.main,
    [sjColor.lighDark]: theme.palette.common.light.dark,
    [sjColor.lightLight]: theme.palette.common.light.light,

    [sjColor.neutral]: theme.palette.common.neutral.main,
    [sjColor.neutralDark]: theme.palette.common.neutral.dark,
    [sjColor.neutralLight]: theme.palette.common.neutral.light,
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

