import { signal } from "@angular/core";
import { defaultThemeConfig } from "../themes";
import { Breakpoints } from "../model";
import { convertQuickAccessToStyle } from "./helpers";

export const sjTheme = signal(defaultThemeConfig());
export const sjInnerWidth = signal(window.innerWidth);
export const sjBreakPoint = signal(Breakpoints.XS);
export const sjGetBreakpointValue = (x:Breakpoints) => sjTheme().breakpoints[x]+'px';
export const sjSpace = (x:number) => sjTheme().spacing(x);
export const sjGetStyle = (x:string) => convertQuickAccessToStyle(x, sjTheme());
