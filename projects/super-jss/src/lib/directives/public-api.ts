import { signal } from "@angular/core";
import { defaultThemeConfig } from "../themes";
import { Breakpoints } from "../model";
import { convertQuickAccessToStyle } from "./helpers";

export const theme = signal(defaultThemeConfig());
export const innerWidth = signal(window.innerWidth);
export const breakPoint = signal(Breakpoints.XS);
export const sjGetBreakpointValue = (x:Breakpoints) => theme().breakpoints[x]+'px';
export const sjSpace = (x:number) => theme().spacing(x);
export const sjGetStyle = (x:string) => convertQuickAccessToStyle(x, theme());