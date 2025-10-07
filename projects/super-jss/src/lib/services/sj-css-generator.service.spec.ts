import { TestBed } from '@angular/core/testing';
import { SjCssGeneratorService } from './sj-css-generator.service';
import { SjThemeService } from './sj-theme.service';

describe('SjCssGeneratorService', () => {
  let cssSvc: SjCssGeneratorService;
  let themeSvc: SjThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    cssSvc = TestBed.inject(SjCssGeneratorService);
    themeSvc = TestBed.inject(SjThemeService);
  });

  it('generates a bundle class once and caches it', () => {
    const theme = themeSvc.sjTheme();
    const styles = { backgroundColor: 'primary.main', padding: 1 } as any;
    const classes1 = cssSvc.getOrGenerateClassBundle(styles, theme, themeSvc.themeVersion());
    const classes2 = cssSvc.getOrGenerateClassBundle(styles, theme, themeSvc.themeVersion());
    expect(classes1[0]).toBe(classes2[0]);

    const styleEl = (cssSvc as any).styleEl as HTMLStyleElement;
    const cssText = styleEl.textContent || '';
    // Class should appear only once in stylesheet
    const occurrences = (cssText.match(new RegExp(classes1[0], 'g')) || []).length;
    expect(occurrences).toBe(1);
  });

  it('clears cache and resets style element on clearCache()', () => {
    const theme = themeSvc.sjTheme();
    const styles = { color: 'secondary.main' } as any;
    cssSvc.getOrGenerateClassBundle(styles, theme, themeSvc.themeVersion());

    const styleElBefore = (cssSvc as any).styleEl as HTMLStyleElement;
    expect(styleElBefore.textContent).toContain('color');

    cssSvc.clearCache();
    const styleElAfter = (cssSvc as any).styleEl as HTMLStyleElement;
    expect(styleElAfter).not.toBe(styleElBefore);
    expect(styleElAfter.textContent).toBe('');
  });
});

