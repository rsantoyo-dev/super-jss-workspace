
// Import necessary modules
import { signal } from "@angular/core";
import { Breakpoints, SJss, SJssStyles, SJssTheme, sjColor } from "../model";
import { sjInnerWidth, sjBreakPoint } from "./public-api";

// Create a signal to track active listeners
export const activeListeners = signal(false);

// Function to handle window resize events
export const onResize = (theme: SJssTheme) => {
  // Update the innerWidth signal with the current window width
  sjInnerWidth.set(window.innerWidth);
  // Determine the current breakpoint based on the updated innerWidth signal
  const bp = determineBreakpoint(theme, sjInnerWidth());
  // Update the sjBreakPoint signal if the breakpoint has changed
  sjBreakPoint.set((bp !== sjBreakPoint()) ? bp : sjBreakPoint());
}

// Function to determine the current breakpoint based on the theme and innerWidth
export const determineBreakpoint = (theme: SJssTheme, innerWidth: number): Breakpoints => {
  // Set the default breakpoint to XS
  let breakpoint: Breakpoints = Breakpoints.XS;
  // Loop through each breakpoint in the theme
  for (const key in theme.breakpoints) {
    // If the current breakpoint is less than or equal to the innerWidth, update the breakpoint
    if (theme.breakpoints[key as Breakpoints] <= innerWidth) {
      breakpoint = key as Breakpoints;
    } else {
      // If the current breakpoint is greater than the innerWidth, break out of the loop
      break;
    }
  }
  // Return the current breakpoint
  return breakpoint;
}

// Function to apply typography styles to an element
export const applyTypography = (el: HTMLElement, theme: SJssTheme, screenWidth: number) => {
  // Loop through each typography style in the theme
  Object.keys(theme.typography).forEach(key => {
    // Set the default style to the default typography style
    const jss: SJssStyles = { marginBlockStart: '0', marginBlockEnd: '0', ...theme.typography.default };
    // Get the specific style for the current element if it exists
    const specificStyle: SJss | undefined = theme.typography[key as keyof typeof theme.typography];
    // If the current element matches the current typography style, apply the style to the element
    if (el.nodeName === key && specificStyle) {
      applyStylesToElement(el, { ...jss, ...specificStyle }, theme, screenWidth);
    }
  });
};

// Function to check if an SJss object is empty
export const isEmptySj = (sj: SJss) => !sj || sj && Object.keys(sj).length === 0 && Object.keys(sj).length === 0;

// Function to apply styles to an element
export const applyStylesToElement = (el: HTMLElement, jssStyle: SJss, theme: SJssTheme, screenWidth: number) => {
  // If the style object is empty or the element is null, return
  if ((isEmptySj(jssStyle) && el)) {
    return;
  }
  // If the style object is an array, loop through each style object and apply the styles to the element
  if (jssStyle && Object.keys(jssStyle).length >= 0 || Array.isArray(jssStyle)) {
    if (Array.isArray(jssStyle)) {
      jssStyle.forEach(styleObj => {
        setStyleProperties(el, styleObj, theme, screenWidth);
      });
    } else {
      // If the style object is not an array, apply the styles to the element
      setStyleProperties(el, jssStyle as SJssStyles, theme, screenWidth);
    }
  }
}

// Function to set style properties on an element
export const setStyleProperties = (el: HTMLElement, styleObj: SJssStyles, theme: SJssTheme, screenWidth: number) => {
  // Loop through each style property and apply the style to the element
  Object.keys(styleObj).forEach(key => {
     try {
       // Apply the style to the element
       // @ts-ignore
       el.style[key] = applyStyle(styleObj[key], screenWidth, theme)
     } catch (error) {
       // Log an error if the style could not be applied
       console.error(`Failed to apply style for key: ${key}`, error);
     }
  });
};

// Function to convert a quick access style value to a full style value
export const convertQuickAccessToStyle = (styleValue: string, theme: SJssTheme): string => {
  // Define mappings for each quick access style value
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
    [sjColor.lightDark]: theme.palette.common.light.dark,
    [sjColor.lightLight]: theme.palette.common.light.light,

    [sjColor.neutral]: theme.palette.common.neutral.main,
    [sjColor.neutralDark]: theme.palette.common.neutral.dark,
    [sjColor.neutralLight]: theme.palette.common.neutral.light,
  };

  // Return the full style value if it exists in the mappings, otherwise return the original style value
  return mappings[styleValue as keyof typeof mappings] || styleValue;
};

// Function to apply a style value to an element
const applyStyle = (styleValue: SJssStyles | string, screenWidth: number, theme: SJssTheme): string => {
  let style: string = "";
  // If the style value is a string, convert it to a full style value and return it
  if (typeof styleValue === "string") {
    return convertQuickAccessToStyle(styleValue, theme);
  }
  // If the style value is an object, loop through each breakpoint and apply the style to the element if the screen width is greater than the breakpoint
  else if (typeof styleValue === 'object') {
    Object.keys(styleValue).forEach(key => {
      if (Object.values(Breakpoints).includes(key as Breakpoints) &&
        styleValue[key] &&
        screenWidth>theme.breakpoints[key as Breakpoints])
      {
        style =  convertQuickAccessToStyle(styleValue[key]! as string, theme);
      }
    });
  }
  // Return the style value
  return style;
};
