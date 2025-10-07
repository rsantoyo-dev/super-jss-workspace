import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SjDirective } from './sj.directive';
import { SjCssGeneratorService, SjThemeService } from '../services';

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

    const fixture: ComponentFixture<H1WithSjComponent> =
      TestBed.createComponent(H1WithSjComponent);
    fixture.detectChanges();
    await sleep(0);

    const h1: HTMLElement = fixture.nativeElement.querySelector('h1');
    // With typography auto-application removed, the heading should not
    // automatically receive theme typography classes unless [sj] provides them.
    expect(h1.className).toBe('');
  });

  it('does not apply default typography on non-text elements', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [DivWithSjComponent],
      providers: [SjThemeService],
    }).compileComponents();

    const fixture: ComponentFixture<DivWithSjComponent> =
      TestBed.createComponent(DivWithSjComponent);
    fixture.detectChanges();
    await sleep(0);

    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    const style = getComputedStyle(div);
    // padding 1 -> spacing(1)
    const toPx = (rem: string) => `${parseFloat(rem) * 16}px`;
    const theme = TestBed.inject(SjThemeService).sjTheme();
    expect(style.paddingTop).toBe(toPx(theme.spacing(1)));
  });
});
