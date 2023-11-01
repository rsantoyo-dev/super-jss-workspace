import { SJssStyles, sjColor, sjSpace } from 'projects/super-jss/src/lib';

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

