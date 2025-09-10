import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SjDirective } from './sj.directive';
import { SjCssGeneratorService, SjThemeService } from '../services';
import { defaultTheme } from '../themes';

@Component({
  standalone: true,
  imports: [SjDirective],
  template: `<h1 [sj]="{}">Title</h1>`,
})
class H1WithSjComponent {}

@Component({
  standalone: true,
  imports: [SjDirective],
  template: `<div [sj]="{ p: 1 }">Box</div>`,
})
class DivWithSjComponent {}

describe('SjDirective extra scenarios', () => {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  it('applies default + H1 typography only when [sj] is present', async () => {
    TestBed.configureTestingModule({
      imports: [H1WithSjComponent],
      providers: [SjThemeService],
    }).compileComponents();

    const fixture: ComponentFixture<H1WithSjComponent> = TestBed.createComponent(H1WithSjComponent);
    fixture.detectChanges();
    await sleep(0);

    const h1: HTMLElement = fixture.nativeElement.querySelector('h1');
    // Element should receive the generated class for xs line-height
    expect(h1.className).toMatch(/sj-line-height-xs-2_3/);
    // And the style tag should have the rule
    const cssSvc = TestBed.inject(SjCssGeneratorService) as any;
    const cssText: string = (cssSvc.styleEl as HTMLStyleElement).textContent || '';
    expect(cssText).toContain('.sj-line-height-xs-2_3');
    expect(cssText).toContain('line-height: 2.3rem');
  });

  it('uses default typography when element tag has no specific entry', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [DivWithSjComponent],
      providers: [SjThemeService],
    }).compileComponents();

    const fixture: ComponentFixture<DivWithSjComponent> = TestBed.createComponent(DivWithSjComponent);
    fixture.detectChanges();
    await sleep(0);

    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    const style = getComputedStyle(div);
    // default color is palette.dark.dark (black)
    expect(style.color).toBe('rgb(0, 0, 0)');
    // padding 1 -> spacing(1)
    const toPx = (rem: string) => `${parseFloat(rem) * 16}px`;
    expect(style.paddingTop).toBe(toPx(defaultTheme.spacing(1)));
  });
});
