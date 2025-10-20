import { Component, signal } from '@angular/core';
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
  template: ` <div [sj]="styleInput"></div> `,
})
class TestComponent {
  styleInput = signal<any>(null);
}

describe('SuperJssDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let themeService: SjThemeService;
  let cssGenerator: SjCssGeneratorService;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SjDirective, TestComponent],
      providers: [SjThemeService, SjCssGeneratorService],
    }).compileComponents();

    themeService = TestBed.inject(SjThemeService);
    cssGenerator = TestBed.inject(SjCssGeneratorService);

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
    component = fixture.componentInstance;
  });

  describe('Style Merging', () => {
    it('should merge array of style objects', async () => {
      component.styleInput.set([
        { backgroundColor: 'primary.main' },
        { color: 'secondary.main' },
      ]);
      fixture.detectChanges();
      await sleep(0);

      const div: HTMLElement = fixture.nativeElement.querySelector('div');
      const computedStyle = window.getComputedStyle(div);
      expect(computedStyle.backgroundColor).toBe('rgb(52, 152, 219)'); // primary.main
      expect(computedStyle.color).toBe('rgb(243, 156, 18)'); // secondary.main
    });

    it('should merge styles with producer functions', async () => {
      component.styleInput.set([
        { backgroundColor: 'primary.main' },
        () => ({ color: 'blue.500' }),
      ]);
      fixture.detectChanges();
      await sleep(0);

      const div: HTMLElement = fixture.nativeElement.querySelector('div');
      const computedStyle = window.getComputedStyle(div);
      expect(computedStyle.backgroundColor).toBe('rgb(52, 152, 219)');
      expect(computedStyle.color).toBe('rgb(52, 152, 219)');
    });

    it('should handle deep merging of nested objects', async () => {
      component.styleInput.set([
        { paddingTop: 1, paddingBottom: 1 },
        { paddingLeft: 2, paddingRight: 2 },
      ]);
      fixture.detectChanges();
      await sleep(0);

      const div: HTMLElement = fixture.nativeElement.querySelector('div');
      const computedStyle = window.getComputedStyle(div);
      expect(computedStyle.paddingTop).toBe('8px');
      expect(computedStyle.paddingBottom).toBe('8px');
      expect(computedStyle.paddingLeft).toBe('16px');
      expect(computedStyle.paddingRight).toBe('16px');
    });
  });

  describe('Caching', () => {
    it('should cache resolved styles for same input reference', async () => {
      const styleObj = { backgroundColor: 'primary.main' };
      component.styleInput.set(styleObj);
      fixture.detectChanges();
      await sleep(0);

      // Change input to same reference
      component.styleInput.set(styleObj);
      fixture.detectChanges();
      await sleep(0);

      const div: HTMLElement = fixture.nativeElement.querySelector('div');
      const computedStyle = window.getComputedStyle(div);
      expect(computedStyle.backgroundColor).toBe('rgb(52, 152, 219)');
    });

    it('should clear cache on theme version change', async () => {
      component.styleInput.set({ backgroundColor: 'primary.main' });
      fixture.detectChanges();
      await sleep(0);

      // Change theme
      themeService.setTheme({
        ...themeService.sjTheme(),
        palette: {
          ...themeService.sjTheme().palette,
          primary: { main: 'purple' },
        },
      });
      fixture.detectChanges();
      await sleep(0);

      const div: HTMLElement = fixture.nativeElement.querySelector('div');
      const computedStyle = window.getComputedStyle(div);
      expect(computedStyle.backgroundColor).toBe('rgb(128, 0, 128)');
    });
  });

  describe('DOM Application', () => {
    it('should add classes to element', async () => {
      component.styleInput.set({ backgroundColor: 'primary.main' });
      fixture.detectChanges();
      await sleep(0);

      const div: HTMLElement = fixture.nativeElement.querySelector('div');
      expect(div.classList.length).toBeGreaterThan(0);
    });

    it('should remove old classes when styles change', async () => {
      component.styleInput.set({ backgroundColor: 'primary.main' });
      fixture.detectChanges();
      await sleep(0);

      const div: HTMLElement = fixture.nativeElement.querySelector('div');
      const initialClasses = Array.from(div.classList);

      component.styleInput.set({ backgroundColor: 'secondary.main' });
      fixture.detectChanges();
      await sleep(0);

      const newClasses = Array.from(div.classList);
      expect(initialClasses).not.toEqual(newClasses);
    });

    it('should handle empty styles gracefully', async () => {
      component.styleInput.set({});
      fixture.detectChanges();
      await sleep(0);

      const div: HTMLElement = fixture.nativeElement.querySelector('div');
      // Should not crash and element should still be present
      expect(div).toBeTruthy();
    });
  });

  it('should handle color shorthands', async () => {
    component.styleInput.set({ color: 'blue.500' });
    fixture.detectChanges();
    await sleep(0);

    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    const computedStyle = window.getComputedStyle(div);
    expect(computedStyle.color).toBe('rgb(52, 152, 219)');
  });

  describe('Shortcuts', () => {
    describe('Padding shortcuts', () => {
      it('should handle p (padding) shortcut', async () => {
        component.styleInput.set({ p: 2 });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const computedStyle = window.getComputedStyle(div);
        expect(computedStyle.padding).toBe('16px'); // 2 * 8px
      });

      it('should handle pt, pr, pb, pl shortcuts', async () => {
        component.styleInput.set({ pt: 1, pr: 2, pb: 3, pl: 4 });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const computedStyle = window.getComputedStyle(div);
        expect(computedStyle.paddingTop).toBe('8px'); // 1 * 8px
        expect(computedStyle.paddingRight).toBe('16px'); // 2 * 8px
        expect(computedStyle.paddingBottom).toBe('24px'); // 3 * 8px
        expect(computedStyle.paddingLeft).toBe('32px'); // 4 * 8px
      });
    });

    describe('Margin shortcuts', () => {
      it('should handle m (margin) shortcut', async () => {
        component.styleInput.set({ m: 1 });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const computedStyle = window.getComputedStyle(div);
        expect(computedStyle.margin).toBe('8px');
      });

      it('should handle mt, mr, mb, ml shortcuts', async () => {
        component.styleInput.set({ mt: 1, mr: 2, mb: 3, ml: 4 });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const computedStyle = window.getComputedStyle(div);
        expect(computedStyle.marginTop).toBe('8px');
        expect(computedStyle.marginRight).toBe('16px');
        expect(computedStyle.marginBottom).toBe('24px');
        expect(computedStyle.marginLeft).toBe('32px');
      });
    });

    describe('Border shortcuts', () => {
      it('should handle bt, br, bb, bl shortcuts', async () => {
        component.styleInput.set({
          bt: '2px solid blue',
          br: '3px solid red',
          bb: '4px solid green',
          bl: '5px solid yellow',
        });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const computedStyle = window.getComputedStyle(div);
        expect(computedStyle.borderTop).toBe('2px solid rgb(0, 0, 255)');
        expect(computedStyle.borderRight).toBe('3px solid rgb(255, 0, 0)');
        expect(computedStyle.borderBottom).toBe('4px solid rgb(0, 128, 0)');
        expect(computedStyle.borderLeft).toBe('5px solid rgb(255, 255, 0)');
      });

      it('should handle bw, bc, bs shortcuts', async () => {
        component.styleInput.set({
          bw: '3px',
          bc: 'purple',
          bs: 'dashed',
        });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const computedStyle = window.getComputedStyle(div);
        expect(computedStyle.borderWidth).toBe('3px');
        expect(computedStyle.borderColor).toBe('rgb(156, 39, 176)');
        expect(computedStyle.borderStyle).toBe('dashed');
      });
    });

    describe('Flexbox shortcuts', () => {
      it('should handle d (display) shortcut', async () => {
        component.styleInput.set({ d: 'flex' });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const computedStyle = window.getComputedStyle(div);
        expect(computedStyle.display).toBe('flex');
      });

      it('should handle fxDir, fxJustify, fxAItems shortcuts', async () => {
        component.styleInput.set({
          fxDir: 'column',
          fxJustify: 'center',
          fxAItems: 'flex-end',
        });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const computedStyle = window.getComputedStyle(div);
        expect(computedStyle.flexDirection).toBe('column');
        expect(computedStyle.justifyContent).toBe('center');
        expect(computedStyle.alignItems).toBe('flex-end');
      });
    });

    describe('Color and background shortcuts', () => {
      it('should handle bg and c shortcuts', async () => {
        component.styleInput.set({
          bg: 'secondary.main',
          c: 'primary.contrast',
        });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const computedStyle = window.getComputedStyle(div);
        expect(computedStyle.backgroundColor).toBe('rgb(243, 156, 18)'); // secondary.main
        expect(computedStyle.color).toBe('rgb(255, 255, 255)'); // primary.contrast
      });
    });

    describe('Generated class names', () => {
      it('should generate classes with sj- prefix for atomic styles', async () => {
        component.styleInput.set({ backgroundColor: 'red' });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const className = div.className;
        expect(className).toMatch(/^(sj|sjb|v1-sjb)-[a-z0-9-]+$/);
      });

      it('should generate consistent class names for same styles', async () => {
        component.styleInput.set({ backgroundColor: 'blue', padding: 1 });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const firstClass = div.className;

        // Reset and apply same styles again
        component.styleInput.set(null);
        fixture.detectChanges();
        await sleep(0);

        component.styleInput.set({ backgroundColor: 'blue', padding: 1 });
        fixture.detectChanges();
        await sleep(0);

        const secondClass = div.className;
        expect(firstClass).toBe(secondClass);
      });
    });

    describe('Typography shortcuts', () => {
      it('should handle fs (fontSize) shortcut', async () => {
        component.styleInput.set({ fs: '1.5rem' });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const computedStyle = window.getComputedStyle(div);
        expect(computedStyle.fontSize).toBe('1.5rem');
      });

      it('should handle fw (fontWeight) shortcut', async () => {
        component.styleInput.set({ fw: 'bold' });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const computedStyle = window.getComputedStyle(div);
        expect(computedStyle.fontWeight).toBe('700');
      });

      it('should handle lh (lineHeight) shortcut', async () => {
        component.styleInput.set({ lh: 1.5 });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const computedStyle = window.getComputedStyle(div);
        expect(computedStyle.lineHeight).toBe('1.5');
      });

      it('should handle ta (textAlign) shortcut', async () => {
        component.styleInput.set({ ta: 'center' });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const computedStyle = window.getComputedStyle(div);
        expect(computedStyle.textAlign).toBe('center');
      });

      it('should handle td (textDecoration) shortcut', async () => {
        component.styleInput.set({ td: 'underline' });
        fixture.detectChanges();
        await sleep(0);

        const div: HTMLElement = fixture.nativeElement.querySelector('div');
        const computedStyle = window.getComputedStyle(div);
        expect(computedStyle.textDecoration).toBe(
          'underline solid rgb(52, 152, 219)'
        );
      });
    });
  });
});
