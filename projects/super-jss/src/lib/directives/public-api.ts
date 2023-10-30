import { signal } from "@angular/core";
import { defaultThemeConfig } from "../themes/s-jss-default-theme";
import { Breakpoints } from "../model";

export const theme = signal(defaultThemeConfig());
export const innerWidth = signal(window.innerWidth);
export const breakPoint = signal(Breakpoints.XS); 