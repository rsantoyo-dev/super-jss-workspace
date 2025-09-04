import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { SjCssGeneratorService } from './sj-css-generator.service';
import { defaultTheme } from '../themes';

describe('SjCssGeneratorService', () => {
  let service: SjCssGeneratorService;
  let documentRef: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SjCssGeneratorService],
    });
    service = TestBed.inject(SjCssGeneratorService);
    documentRef = TestBed.inject(DOCUMENT);
  });

  function getServiceStyleEl(): HTMLStyleElement {
    // Access the exact style element owned by this service instance
    return (service as any).styleEl as HTMLStyleElement;
  }

  it('creates a single <style data-sjss> tag and appends CSS once per class', () => {
    expect(getServiceStyleEl()).toBeTruthy();
    const styles = { c: 'primary.main', p: 1 } as any;

    const classes1 = service.getOrGenerateClasses(styles, defaultTheme);
    const styleEl1 = getServiceStyleEl();
    const cssTextAfterFirst = styleEl1.textContent || '';

    // calling again with same styles should not duplicate rules
    const classes2 = service.getOrGenerateClasses(styles, defaultTheme);
    const styleEl2 = getServiceStyleEl();
    const cssTextAfterSecond = styleEl2.textContent || '';

    expect(classes1).toEqual(classes2);
    expect(cssTextAfterSecond.length).toBe(cssTextAfterFirst.length);
  });

  it('clears cache and resets style tag on clearCache()', () => {
    // Generate once to ensure CSS exists
    service.getOrGenerateClasses({ c: 'secondary.dark' } as any, defaultTheme);
    const before = getServiceStyleEl();
    expect((before.textContent || '').length).toBeGreaterThan(0);

    service.clearCache();
    const after = getServiceStyleEl();
    expect(after).not.toBe(before);
    expect(after.getAttribute('data-sjss')).toBe('');
    expect(after.textContent).toBe('');

    // Generating again should append new CSS
    service.getOrGenerateClasses({ c: 'secondary.dark' } as any, defaultTheme);
    expect((getServiceStyleEl().textContent || '').length).toBeGreaterThan(0);
  });
});
