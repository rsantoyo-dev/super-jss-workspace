import { SjStyle } from "projects/super-jss/src/lib/models/interfaces";

export const sjBorder: SjStyle = {
    borderStyle: 'solid',
    borderWidth: 0.1,
    borderColor: 'light',
    borderRadius: 0.5,
};

export const sjShadow: SjStyle = {
    boxShadow: `2px 3px 3px #0001`,
};

export const sjBorderShadow: SjStyle = {
    ...sjBorder,
    ...sjShadow,
};

