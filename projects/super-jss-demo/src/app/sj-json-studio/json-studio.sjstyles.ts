import { sjCard, SjStyle, sj } from 'super-jss';

// Outer container (card-like) for the studio
export const editorShell: SjStyle = sjCard();

// Header bar for title / actions
export const headerBar: SjStyle = {
  d: 'flex',
  fxJustify: 'space-between',
  fxAItems: 'center',
  pb: 1,
  mb: 1,
  bb: '1px solid',
  bc: 'light.dark',
};



export const studioContainer: SjStyle = sjCard({
  p: 0,
  bs: sj.tokens.border.style.none,
  bw: 0,
  w: '100%',
})


// export const editorPanel: SjStyle = {
//   d: 'grid',
//   bg: 'red',
//   b: '1px solid',
//   bc: 'light.dark',

// };

export const editorPanel: SjStyle = sjCard({
  p: 0,
  bs: sj.tokens.border.style.none,
  bw: 0,
  d: 'flex',
  fxDir: 'column',
});

export const textareaStyle: SjStyle = sjCard.flat({
  w: '100%',
  // Fill available space from flex parent
  fxGrow: '1',
  fxBasis: '0',
  
  minH: 0,

  fontFamily: 'monospace',
  boxSizing: 'border-box',
  resize: 'none',
  overflowX: 'auto',
  overflowY: 'auto',
});

export const errorStyle: SjStyle = {
  c: 'error.main',
  p: 0.5,
  b: '1px solid',
  bc: 'error.light',
  brad: 0.5,
  bg: 'error.main',
  '& p': { c: 'error.contrast' },
};

// Panel sub-header inside each panel
export const panelHeader: SjStyle = {
  d: 'flex',
  fxJustify: 'space-between',
  fxAItems: 'center',
  h: '30px',
  gap: 0.5,
};

// Small action button style
export const headerBtn: SjStyle = {
  cursor: 'pointer',
  px: 0.5,
  py: 0.25,
  brad: 0.5,
  b: '1px solid',
  bc: 'light.dark',
  bg: 'light.main',
  fontSize: '12px',
  lineHeight: 1,
  '&:hover': { bg: 'light.light' },
};
