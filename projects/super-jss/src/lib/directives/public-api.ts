import { signal } from "@angular/core";
import { defaultThemeConfig } from "../themes";
import { Breakpoints } from "../model";

export const theme = signal(defaultThemeConfig());
export const innerWidth = signal(window.innerWidth);
export const breakPoint = signal(Breakpoints.XS);
export const sjSpace = (x:number) => theme().spacing(x);
