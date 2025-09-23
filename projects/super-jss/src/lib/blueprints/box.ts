import { SjStyle } from '../models/interfaces';

type BoxBuilder = (overrides?: Partial<SjStyle>) => SjStyle;
type BoxPartial = Partial<SjStyle> | undefined;

export type SjBoxApi = BoxBuilder & {
  row: BoxBuilder;
  column: BoxBuilder;
  grid: BoxBuilder;
  centered: BoxBuilder;
  middle: BoxBuilder;
  between: BoxBuilder;
  around: BoxBuilder;
  evenly: BoxBuilder;
  wrap: BoxBuilder;
  nowrap: BoxBuilder;
  grow: BoxBuilder;
  with: (...partials: BoxPartial[]) => BoxBuilder;
};

const sjBoxBase = (): SjStyle => ({
  d: 'flex',
  fxDir: 'row',
});

const composeBox = (...partials: BoxPartial[]): BoxBuilder =>
  (overrides: Partial<SjStyle> = {}): SjStyle => ({
    ...sjBoxBase(),
    ...partials
      .filter((partial): partial is Partial<SjStyle> => Boolean(partial))
      .reduce<Partial<SjStyle>>((acc, partial) => ({ ...acc, ...partial }), {}),
    ...overrides,
  });

export const sjBox = Object.assign(composeBox(), {
  row: composeBox({ fxDir: 'row' }),
  column: composeBox({ fxDir: 'column' }),
  grid: composeBox({ d: 'grid', gridTemplateColumns: '25% 75%' }),
  centered: composeBox({ fxJustify: 'center', fxAItems: 'center' }),
  middle: composeBox({ fxDir: 'column', fxJustify: 'center', fxAItems: 'center' }),
  between: composeBox({ fxJustify: 'space-between' }),
  around: composeBox({ fxJustify: 'space-around' }),
  evenly: composeBox({ fxJustify: 'space-evenly' }),
  wrap: composeBox({ fxWrap: 'wrap' }),
  nowrap: composeBox({ fxWrap: 'nowrap' }),
  grow: composeBox({ fxGrow: 1, fxShrink: 1, minW: 0 }),
  with: (...partials: BoxPartial[]) => composeBox(...partials),
}) as SjBoxApi;

export const sjBoxRow = sjBox.row;
export const sjBoxColumn = sjBox.column;
export const sjBoxGrid = sjBox.grid;
export const sjBoxCentered = sjBox.centered;
export const sjBoxMiddle = sjBox.middle;
export const sjBoxBetween = sjBox.between;
export const sjBoxAround = sjBox.around;
export const sjBoxEvenly = sjBox.evenly;
export const sjBoxWrap = sjBox.wrap;
export const sjBoxNoWrap = sjBox.nowrap;
export const sjBoxGrow = sjBox.grow;
