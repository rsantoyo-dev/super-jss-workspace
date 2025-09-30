import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { SjDirective } from './sj.directive';
import { SjCssGeneratorService } from '../services';

@Component({
  standalone: true,
  imports: [SjDirective],
  template: `
    <button id="btn" [sj]="{ '&:hover': { c: 'secondary.dark' } }">
      Hover Me
    </button>
  `,
})
class PseudoTestComponent {}
import { generateAtomicClassName } from '../core/class-name';

describe('SjDirective pseudo selector support', () => {
  let fixture: ComponentFixture<PseudoTestComponent>;
  let documentRef: Document;
  let cssService: SjCssGeneratorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PseudoTestComponent],
    }).compileComponents();
    documentRef = TestBed.inject(DOCUMENT);
    cssService = TestBed.inject(SjCssGeneratorService);
    fixture = TestBed.createComponent(PseudoTestComponent);
    fixture.detectChanges();
  });

  it('injects a :hover rule in the style sheet', () => {
    // Access the specific style node used by the CSS generator service
    const styleEl = (cssService as any).styleEl as HTMLStyleElement;
    expect(styleEl).withContext('style element not found').toBeTruthy();

    const cssText = styleEl!.textContent || '';
    expect(cssText).toContain(':hover');
    // The generated rule may either use an atomic hover- prefixed class, or
    // when bundling/merging is enabled, use a canonical bundle id (sjb-...). Accept
    // either case so tests are robust to bundling.
    const atomicPattern = generateAtomicClassName(
      'hover-',
      'color',
      undefined,
      'secondary.dark'
    );
    const bundlePattern = 'sjb-[a-z0-9]+';
    expect(cssText).toMatch(
      new RegExp(`\\.(?:${atomicPattern}|${bundlePattern}):hover`)
    );
  });
});
