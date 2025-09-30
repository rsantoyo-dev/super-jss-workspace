import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SjDirective } from './sj.directive';
import { SjCssGeneratorService, SjThemeService } from '../services';
import { generateAtomicClassName } from '../core/class-name';
import { defaultTheme } from '../themes';

// Helper function to introduce a micro-delay for the event loop
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Component({
  standalone: true,
  imports: [SjDirective],
  template: `
    <h2
      [sj]="{
        backgroundColor: '#003366',
        padding: { xs: 1, md: 2, lg: 4 },
        margin: 2
      }"
    >
      About
    </h2>
    <h3 [sj]="{ backgroundColor: 'primary.main', color: 'blue.500' }">
      Quote of the day:
    </h3>
    <h4
      [sj]="[
        {
          backgroundColor: 'primary.main',
          paddingLeft: 4,
          paddingRight: 4,
          paddingTop: 2,
          paddingBottom: 2,
          marginLeft: 2,
          marginRight: 2,
          marginTop: 2,
          marginBottom: 2,
          borderLeft: '1px solid',
          borderRight: '1px solid',
          borderTop: '1px solid',
          borderBottom: '1px solid',
        },
        { color: 'secondary.500' }
      ]"
    >
      Quote of the day:
    </h4>
    <h5 [sj]="{ backgroundColor: 'blue.300', padding: { md: 2 } }">About</h5>
  `,
})
class TestComponent {}

describe('SuperJssDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let themeService: SjThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SjDirective, TestComponent],
      providers: [SjThemeService],
    }).compileComponents();

    themeService = TestBed.inject(SjThemeService);

    const testTheme = {
      ...defaultTheme,
      spacing: (factor: number) => `${factor * 8}px`, // 1 unit = 8px
    };
    themeService.setTheme(testTheme);

    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
    });
    window.dispatchEvent(new Event('resize'));

    fixture = TestBed.createComponent(TestComponent);
  });

  it('should handle color shorthands', async () => {
    fixture.detectChanges();
    await sleep(0);

    const h3: HTMLElement = fixture.nativeElement.querySelector('h3');
    const computedStyle = window.getComputedStyle(h3);
    // c:'blue.500' -> default blue 500 is #3498DB
    expect(computedStyle.color).toBe('rgb(52, 152, 219)');
  });

  it('should handle palette colors and produce responsive padding CSS', async () => {
    fixture.detectChanges();
    await sleep(0);

    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const computedStyle = window.getComputedStyle(h2);

    const hexToRgb = (hex: string) => {
      const h = hex.replace('#', '');
      const full =
        h.length === 3
          ? h
              .split('')
              .map((c) => c + c)
              .join('')
          : h;
      const num = parseInt(full, 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      return `rgb(${r}, ${g}, ${b})`;
    };

    // bg color resolves directly
    const expectedBg = hexToRgb('#003366');
    expect(computedStyle.backgroundColor).toBe(expectedBg);

    // Verify responsive CSS rules exist independent of viewport size
    const cssSvc = TestBed.inject(SjCssGeneratorService) as any;
    const cssText: string =
      (cssSvc.styleEl as HTMLStyleElement).textContent || '';
    const mdMin = themeService.sjTheme().breakpoints.md;
    const expectedPadding = themeService.sjTheme().spacing(2);
  expect(cssText).toContain(`@media (min-width: ${mdMin}px)`);
  const expectedClass = generateAtomicClassName('', 'padding', 'md', 2);
  expect(cssText).toContain(expectedClass);
  expect(cssText).toContain(`padding: ${expectedPadding}`);

    // Non-responsive margin applies immediately
    const expectedMargin = themeService.sjTheme().spacing(2);
    expect(computedStyle.marginTop).toBe(expectedMargin);
    expect(computedStyle.marginRight).toBe(expectedMargin);
    expect(computedStyle.marginBottom).toBe(expectedMargin);
    expect(computedStyle.marginLeft).toBe(expectedMargin);
  });

  it('should process custom shorthands for padding, margin, and border', async () => {
    fixture.detectChanges();
    await sleep(0);

    const h4: HTMLElement = fixture.nativeElement.querySelector('h4');
    const computedStyle = window.getComputedStyle(h4);

    // px: 4 -> 32px
    expect(computedStyle.paddingLeft).toBe('32px');
    expect(computedStyle.paddingRight).toBe('32px');
    // py: 2 -> 16px
    expect(computedStyle.paddingTop).toBe('16px');
    expect(computedStyle.paddingBottom).toBe('16px');
    // mx: 2 -> 16px
    expect(computedStyle.marginLeft).toBe('16px');
    expect(computedStyle.marginRight).toBe('16px');
    // my: 2 -> 16px
    expect(computedStyle.marginTop).toBe('16px');
    expect(computedStyle.marginBottom).toBe('16px');
    // bx: '1px solid'
    expect(computedStyle.borderLeft).toBe('1px solid rgb(0, 0, 0)');
    expect(computedStyle.borderRight).toBe('1px solid rgb(0, 0, 0)');
    // by: '1px solid'
    expect(computedStyle.borderTop).toBe('1px solid rgb(0, 0, 0)');
    expect(computedStyle.borderBottom).toBe('1px solid rgb(0, 0, 0)');
  });

  it('should get palette color from theme', async () => {
    fixture.detectChanges();
    await sleep(0);

    const h3: HTMLElement = fixture.nativeElement.querySelector('h3');
    const computedStyle = window.getComputedStyle(h3);
    // bg:'primary.main' -> default primary main is blue 500 -> #3498DB
    expect(computedStyle.backgroundColor).toBe('rgb(52, 152, 219)');
  });
});
