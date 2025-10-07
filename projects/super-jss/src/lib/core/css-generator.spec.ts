import { CssGenerator } from './css-generator';
import { TestBed } from '@angular/core/testing';
import { SjThemeService } from '../services';
import { generateAtomicClassName } from './class-name';

describe('CssGenerator', () => {
  let themeSvc: SjThemeService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    themeSvc = TestBed.inject(SjThemeService);
  });

  it('generates atomic css for simple styles and resolves palette/colors', () => {
    const theme = themeSvc.sjTheme();
    const gen = new CssGenerator(theme);
    const css = gen.generateAtomicCss({
      color: 'primary.main',
      backgroundColor: 'blue.500',
    });

    // ensure resolved values and property names are present in generated rules
    let foundColor = false;
    let foundBg = false;
    css.forEach((rule) => {
      if (rule.includes('color') && rule.includes(theme.palette.primary.main)) {
        foundColor = true;
      }
      if (rule.includes('background-color') && rule.includes(theme.colors.blue[500])) {
        foundBg = true;
      }
    });
    expect(foundColor).toBeTrue();
    expect(foundBg).toBeTrue();
  });

  it('generates responsive rules under media queries and applies spacing()', () => {
    const theme = themeSvc.sjTheme();
    const gen = new CssGenerator(theme);
    const css = gen.generateAtomicCss({ padding: { md: 2 } });

    // find any generated rule that contains the md media query and padding value
    let found = false;
    css.forEach((rule) => {
      if (
        rule.includes(`@media (min-width: ${theme.breakpoints.md}px)`) &&
        rule.includes('padding') &&
        rule.includes(theme.spacing(2))
      ) {
        found = true;
      }
    });
    expect(found).toBeTrue();
  });

  it('supports pseudo selectors via & and prefixes class names accordingly', () => {
    const theme = themeSvc.sjTheme();
    const gen = new CssGenerator(theme);
    const css = gen.generateAtomicCss({
      '&:hover': { color: 'secondary.dark' },
    });

    // ensure a :hover rule exists that uses the resolved secondary.dark color
    let foundHover = false;
    css.forEach((rule) => {
      if (rule.includes(':hover') && rule.includes(theme.palette.secondary.dark)) {
        foundHover = true;
      }
    });
    expect(foundHover).toBeTrue();
  });

  it('falls back to initial when responsive value is non-primitive', () => {
    const theme = themeSvc.sjTheme();
    const gen = new CssGenerator(theme);
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
    const theme2 = themeSvc.sjTheme();
    const gen2 = new CssGenerator(theme2);
    const css2 = gen2.generateAtomicCss({
      backgroundColor: 'primary',
      color: 'blue',
    });

    // ensure rules include resolved colors
    let foundBg2 = false;
    let foundC2 = false;
    css2.forEach((rule) => {
      if (rule.includes(theme2.palette.primary.main)) foundBg2 = true;
      if (rule.includes(theme2.colors.blue[500])) foundC2 = true;
    });
    expect(foundBg2).toBeTrue();
    expect(foundC2).toBeTrue();
  });

  it('resolves palette shade like primary.contrast', () => {
    const theme3 = themeSvc.sjTheme();
    const gen3 = new CssGenerator(theme3);
    const css3 = gen3.generateAtomicCss({ color: 'primary.contrast' });
    // ensure resolved contrast color appears in rules
    let foundContrast = false;
    css3.forEach((rule) => {
      if (rule.includes(theme3.palette.primary.contrast))
        foundContrast = true;
    });
    expect(foundContrast).toBeTrue();
  });

  it('uses initial when responsive value is undefined', () => {
    const theme4 = themeSvc.sjTheme();
    const gen4 = new CssGenerator(theme4);
    const css4 = gen4.generateAtomicCss({ margin: { lg: undefined } });
    let foundInitialRule = false;
    css4.forEach((rule) => {
      if (rule.includes('margin') && rule.includes('initial'))
        foundInitialRule = true;
    });
    expect(foundInitialRule).toBeTrue();
  });
});
