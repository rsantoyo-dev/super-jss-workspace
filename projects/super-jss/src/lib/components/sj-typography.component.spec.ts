import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SjTypographyComponent } from './sj-typography.component';
import { SjDirective } from '../directives/sj.directive';
import { SjThemeService } from '../services';
import { sj } from '../api/sj';
import { SjHostComponent } from './sj-host.component';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Component({
  standalone: true,
  imports: [SjHostComponent, SjTypographyComponent, SjDirective],
  template: `
    <sj-host [sj]="[sjApi.sjCard]">
      <a id="nav-link" [sj]="sjApi.sjButton.light()">
        <sj-typography
          [variant]="typographyVariant"
          [align]="typographyAlign"
          [noWrap]="typographyNoWrap"
          [gutterBottom]="typographyGutterBottom"
          [paragraph]="typographyParagraph"
        >
          Home
        </sj-typography>
      </a>
    </sj-host>
  `,
})
class TypographyInSidenavComponent {
  protected readonly sjApi = sj;
  typographyVariant: string = 'span';
  typographyAlign?: string;
  typographyNoWrap = false;
  typographyGutterBottom = false;
  typographyParagraph = false;
}

describe('SjTypographyComponent theme updates', () => {
  let fixture: ComponentFixture<TypographyInSidenavComponent>;
  let theme: SjThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypographyInSidenavComponent],
      providers: [SjThemeService],
    }).compileComponents();

    theme = TestBed.inject(SjThemeService);
    fixture = TestBed.createComponent(TypographyInSidenavComponent);

    // Configure test theme with 8px spacing like directive tests
    const testTheme = {
      ...theme.sjTheme(),
      spacing: (factor: number) => `${factor * 8}px`, // 1 unit = 8px
    };
    theme.setTheme(testTheme);
  });

  it('re-renders font families when the theme changes', async () => {
    fixture.detectChanges();
    await sleep(0);

    const typographyEl: HTMLElement = fixture.nativeElement.querySelector(
      '[data-sj-component^="sj-typography"]'
    );
    const initialFont = getComputedStyle(typographyEl).fontFamily;

    expect(initialFont).toContain('Helvetica');

    theme.setTheme({
      typography: {
        default: {
          fontFamily: '"Courier New", monospace',
        },
      },
    });

    fixture.detectChanges();
    await sleep(0);

    const updatedFont = getComputedStyle(typographyEl).fontFamily;
    expect(updatedFont).toContain('Courier New');
  });

  it('should apply align property', async () => {
    const testComponent = fixture.componentInstance as any;
    testComponent.typographyAlign = 'center';
    fixture.detectChanges();
    await sleep(0);

    const typographyEl: HTMLElement = fixture.nativeElement.querySelector(
      '[data-sj-component^="sj-typography"]'
    );
    const computedStyle = getComputedStyle(typographyEl);
    expect(computedStyle.textAlign).toBe('center');
  });

  it('should apply noWrap property', async () => {
    const testComponent = fixture.componentInstance as any;
    testComponent.typographyNoWrap = true;
    fixture.detectChanges();
    await sleep(0);

    const typographyEl: HTMLElement = fixture.nativeElement.querySelector(
      '[data-sj-component^="sj-typography"]'
    );
    const computedStyle = getComputedStyle(typographyEl);
    expect(computedStyle.whiteSpace).toBe('nowrap');
    expect(computedStyle.overflow).toBe('hidden');
    expect(computedStyle.textOverflow).toBe('ellipsis');
  });

  it('should apply gutterBottom property', async () => {
    const testComponent = fixture.componentInstance as any;
    testComponent.typographyGutterBottom = true;
    fixture.detectChanges();
    await sleep(0);

    const typographyEl: HTMLElement = fixture.nativeElement.querySelector(
      '[data-sj-component^="sj-typography"]'
    );
    const computedStyle = getComputedStyle(typographyEl);
    expect(computedStyle.marginBottom).toBe('8px'); // 1 * 8px spacing unit
  });

  it('should support paragraph variant', async () => {
    const testComponent = fixture.componentInstance as any;
    testComponent.typographyVariant = 'paragraph';
    fixture.detectChanges();
    await sleep(0);

    const typographyEl: HTMLElement = fixture.nativeElement.querySelector(
      '[data-sj-component^="sj-typography"]'
    );
    expect(typographyEl.tagName.toLowerCase()).toBe('p');
  });

  it('should support p variant', async () => {
    const testComponent = fixture.componentInstance as any;
    testComponent.typographyVariant = 'p';
    fixture.detectChanges();
    await sleep(0);

    const typographyEl: HTMLElement = fixture.nativeElement.querySelector(
      '[data-sj-component^="sj-typography"]'
    );
    expect(typographyEl.tagName.toLowerCase()).toBe('p');
  });
});
