import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SjButtonComponent } from './sj-button.component';
import { SjTypographyComponent } from './sj-typography.component';
import { SjThemeService } from '../services';

@Component({
  standalone: true,
  imports: [SjButtonComponent, SjTypographyComponent],
  template: `
    <sj-button id="filled">
      <sj-typography variant="span">Filled</sj-typography>
    </sj-button>

    <sj-button id="outlined" [variant]="'outlined'" [color]="'secondary'">
      <sj-typography variant="span">Outlined</sj-typography>
    </sj-button>

    <sj-button id="flat" [variant]="'flat'">
      <sj-typography variant="span">Flat</sj-typography>
    </sj-button>
  `,
})
class ButtonHarnessComponent {}

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

describe('SjButtonComponent', () => {
  let fixture: ComponentFixture<ButtonHarnessComponent>;
  let theme: SjThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonHarnessComponent],
    }).compileComponents();
    theme = TestBed.inject(SjThemeService);
    fixture = TestBed.createComponent(ButtonHarnessComponent);
  });

  it('applies filled variant bg/contrast and selected (active) style', async () => {
    fixture.detectChanges();
    const filled: HTMLElement =
      fixture.nativeElement.querySelector('#filled button');

    const primary = theme.sjTheme().palette.primary;
    expect(getComputedStyle(filled).backgroundColor).toBe(
      hexToRgb(primary.main)
    );

    filled.classList.add('active');
    // active should darken background
    expect(getComputedStyle(filled).backgroundColor).toBe(
      hexToRgb(primary.dark)
    );
  });

  it('applies outlined border and active background', () => {
    fixture.detectChanges();
    const outlined: HTMLElement =
      fixture.nativeElement.querySelector('#outlined button');

    const secondary = theme.sjTheme().palette.secondary;
    expect(getComputedStyle(outlined).borderTopColor).toBe(
      hexToRgb(secondary.main)
    );

    outlined.classList.add('active');
    // outlined active uses light surface bg
    const light = theme.sjTheme().palette.light;
    expect(getComputedStyle(outlined).backgroundColor).toBe(
      hexToRgb(light.main)
    );
  });

  it('applies flat text color and active background', () => {
    fixture.detectChanges();
    const flat: HTMLElement =
      fixture.nativeElement.querySelector('#flat button');

    const primary = theme.sjTheme().palette.primary;
    expect(getComputedStyle(flat).color).toBe(hexToRgb(primary.main));

    flat.classList.add('active');
    const light = theme.sjTheme().palette.light;
    expect(getComputedStyle(flat).backgroundColor).toBe(hexToRgb(light.main));
  });
});
