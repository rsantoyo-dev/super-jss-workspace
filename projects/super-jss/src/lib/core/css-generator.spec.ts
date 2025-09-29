import { CssGenerator } from './css-generator';
import { defaultTheme } from '../themes';

describe('CssGenerator', () => {
  it('generates atomic css for simple styles and resolves palette/colors', () => {
    const gen = new CssGenerator(defaultTheme);
    const css = gen.generateAtomicCss({
      color: 'primary.main',
      backgroundColor: 'blue.500',
    });

    // class names should be predictable
    expect(css.has('sj-color-primary_main')).toBeTrue();
    expect(css.get('sj-color-primary_main')).toContain('color');
    expect(css.get('sj-color-primary_main')).toContain(
      defaultTheme.palette.primary.main
    );

    expect(css.has('sj-background-color-blue_500')).toBeTrue();
    expect(css.get('sj-background-color-blue_500')).toContain(
      'background-color'
    );
    expect(css.get('sj-background-color-blue_500')).toContain(
      defaultTheme.colors.blue[500]
    );
  });

  it('generates responsive rules under media queries and applies spacing()', () => {
    const gen = new CssGenerator(defaultTheme);
    const css = gen.generateAtomicCss({ padding: { md: 2 } });

    const className = 'sj-padding-md-2';
    expect(css.has(className)).toBeTrue();
    const rule = css.get(className)!;
    expect(rule).toContain('@media (min-width: ');
    expect(rule).toContain('padding');
    expect(rule).toContain(defaultTheme.spacing(2));
  });

  it('supports pseudo selectors via & and prefixes class names accordingly', () => {
    const gen = new CssGenerator(defaultTheme);
    const css = gen.generateAtomicCss({
      '&:hover': { color: 'secondary.dark' },
    });

    const className = 'hover-sj-color-secondary_dark';
    expect(css.has(className)).toBeTrue();
    const rule = css.get(className)!;
    expect(rule).toContain(':hover');
    // color should resolve to palette secondary.dark
    expect(rule).toContain(defaultTheme.palette.secondary.dark);
  });

  it('falls back to initial when responsive value is non-primitive', () => {
    const gen = new CssGenerator(defaultTheme);
    const css = gen.generateAtomicCss({
      padding: { md: { foo: 'bar' } as any },
    });

    // find any generated rule and assert it sets padding to initial
    let foundInitial = false;
    css.forEach((rule) => {
      if (rule.includes('padding') && rule.includes('initial')) {
        foundInitial = true;
      }
    });
    expect(foundInitial).toBeTrue();
  });

  it('resolves single-segment keys: palette -> .main and colors -> 500', () => {
    const gen2 = new CssGenerator(defaultTheme);
    const css2 = gen2.generateAtomicCss({
      backgroundColor: 'primary',
      color: 'blue',
    });

    const bgRule = css2.get('sj-background-color-primary');
    const cRule = css2.get('sj-color-blue');
    expect(bgRule).toContain(defaultTheme.palette.primary.main);
    expect(cRule).toContain(defaultTheme.colors.blue[500]);
  });

  it('resolves palette shade like primary.contrast', () => {
    const gen3 = new CssGenerator(defaultTheme);
    const css3 = gen3.generateAtomicCss({ color: 'primary.contrast' });
    const rule = css3.get('sj-color-primary_contrast')!;
    expect(rule).toContain(defaultTheme.palette.primary.contrast);
  });

  it('uses initial when responsive value is undefined', () => {
    const gen4 = new CssGenerator(defaultTheme);
    const css4 = gen4.generateAtomicCss({ margin: { lg: undefined } });
    const rule = css4.get('sj-margin-lg-undefined')!;
    expect(rule).toContain('margin');
    expect(rule).toContain('initial');
  });
});
