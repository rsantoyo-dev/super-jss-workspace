import { SjStyle } from 'projects/super-jss/src/lib/models/interfaces';

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

export const sjTransition: SjStyle = {
     transition: 'all 0.3s ease-in-out'
}

export const sjCard = (overrides: Partial<SjStyle> = {}): SjStyle => {
  return {
    ...sjBorder,
    ...sjShadow,
    ...sjTransition,
    p: 1,
    d:'flex',
    fxDir: "column",
    borderRadius: 0.5,
    bg: 'light.light',
    ...overrides,
  };
};

export const sjOutlinedCard = (overrides: Partial<SjStyle> = {}): SjStyle => {
  return {
    ...sjBorder,
    ...sjShadow,
    ...sjTransition,
    p: 1,
    d:'flex',
    fxDir: "column",
    borderRadius: 0.5,
    ...overrides,
  };
};
