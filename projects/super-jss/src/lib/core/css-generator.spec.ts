import { CssGenerator } from './css-generator';
import { defaultTheme } from '../themes';

describe('CssGenerator', () => {
  it('generates atomic css for simple styles and resolves palette/colors', () => {
    const gen = new CssGenerator(defaultTheme);
    const css = gen.generateAtomicCss({ c: 'primary.main', bg: 'blue.500' });

    // class names should be predictable
    expect(css.has('sj-c-primary_main')).toBeTrue();
    expect(css.get('sj-c-primary_main')).toContain('color');
    expect(css.get('sj-c-primary_main')).toContain(
      defaultTheme.palette.primary.main
    );

    expect(css.has('sj-bg-blue_500')).toBeTrue();
    expect(css.get('sj-bg-blue_500')).toContain('background-color');
    expect(css.get('sj-bg-blue_500')).toContain(defaultTheme.colors.blue[500]);
  });

  it('generates responsive rules under media queries and applies spacing()', () => {
    const gen = new CssGenerator(defaultTheme);
    const css = gen.generateAtomicCss({ p: { md: 2 } });

    const className = 'sj-p-md-2';
    expect(css.has(className)).toBeTrue();
    const rule = css.get(className)!;
    expect(rule).toContain('@media (min-width: ');
    expect(rule).toContain('padding');
    expect(rule).toContain(defaultTheme.spacing(2));
  });

  it('supports pseudo selectors via & and prefixes class names accordingly', () => {
    const gen = new CssGenerator(defaultTheme);
    const css = gen.generateAtomicCss({ '&:hover': { c: 'secondary.dark' } });

    const className = 'hover-sj-c-secondary_dark';
    expect(css.has(className)).toBeTrue();
    const rule = css.get(className)!;
    expect(rule).toContain(':hover');
    // color should resolve to palette secondary.dark
    expect(rule).toContain(
      defaultTheme.palette.secondary.dark
    );
  });

  it('falls back to initial when responsive value is non-primitive', () => {
    const gen = new CssGenerator(defaultTheme);
    const css = gen.generateAtomicCss({ p: { md: { foo: 'bar' } as any } });

    // find any generated rule and assert it sets padding to initial
    let foundInitial = false;
    css.forEach((rule) => {
      if (rule.includes('padding') && rule.includes('initial')) {
        foundInitial = true;
      }
    });
    expect(foundInitial).toBeTrue();
  });
});

