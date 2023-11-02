import { SJssStyles, sjColor, sjSpace, defaultThemeConfig } from 'super-jss';
import {signal} from "@angular/core";

export const appTheme = signal(defaultThemeConfig());
export const sjBorder: SJssStyles = {
    borderStyle: 'solid',
    borderWidth: sjSpace(0.1),
    borderColor: sjColor.lightDark,
    borderRadius: sjSpace(0.5),
};

export const sjShadow: SJssStyles = {
    boxShadow: `${sjSpace(0.2)} ${sjSpace(0.3)} ${sjSpace(0.3)}  #0001`,
};

export const sjBorderShadow: SJssStyles = {
    ...sjBorder,
    ...sjShadow,
};

