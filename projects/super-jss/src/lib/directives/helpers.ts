import { signal } from "@angular/core";
import {Breakpoints, SJss, SJssStyles, SJssTheme, SjQuick} from "../model";
import { defaultThemeConfig } from "../themes";

export const theme = signal(defaultThemeConfig())

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

const setStyleProperties = (el: HTMLElement, styleObj: SJssStyles, theme: SJssTheme, screenWidth: number) => {
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
  if (styleValue === 'sj-primary') {
    return theme.palette.primary.main;
  }
  else if (styleValue === SjQuick.primaryLight) {
    return theme.palette.primary.light;
  }
  else if (styleValue === 'sj-secondary') {
    return theme.palette.secondary.main;
  }
  else if (styleValue === 'sj-gray-light') {
    return theme.palette.common.gray.light;
  }
  else if (styleValue === 'sj-gray-dark') {
    return theme.palette.common.gray.dark;
  }
  else if (styleValue === 'sj-gray-dark') {
    return theme.palette.common.gray.dark;
  }
  else {
    return styleValue;
  }
}

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

