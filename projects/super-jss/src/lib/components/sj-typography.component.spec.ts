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
        <sj-typography variant="span">Home</sj-typography>
      </a>
    </sj-host>
  `,
})
class TypographyInSidenavComponent {
  protected readonly sjApi = sj;
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
  });

  it('re-renders font families when the theme changes', async () => {
    fixture.detectChanges();
    await sleep(0);

    const typographyEl: HTMLElement =
      fixture.nativeElement.querySelector('sj-typography');
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
});
