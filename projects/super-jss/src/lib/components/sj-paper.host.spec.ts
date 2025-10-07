import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SjPaperComponent } from './sj-paper.component';
import { SjThemeService } from '../services';

@Component({
  standalone: true,
  imports: [SjPaperComponent],
  template: `
    <div id="parent">
      <sj-paper host useSurface [density]="2">
        <span id="content">Child</span>
      </sj-paper>
    </div>
  `,
})
class HostPaperSpecComponent {}

describe('SjPaperComponent host mode', () => {
  let fixture: ComponentFixture<HostPaperSpecComponent>;
  let theme: SjThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostPaperSpecComponent],
    }).compileComponents();

    theme = TestBed.inject(SjThemeService);
    fixture = TestBed.createComponent(HostPaperSpecComponent);
  });

  it('applies classes to parent and removes wrapper', () => {
    fixture.detectChanges();

    const parent: HTMLElement = fixture.nativeElement.querySelector('#parent');
    const paperEl: HTMLElement | null =
      fixture.nativeElement.querySelector('sj-paper');
    const content: HTMLElement = fixture.nativeElement.querySelector('#content');

    // wrapper removed in host mode
    expect(paperEl).toBeNull();
    // content still present under parent
    expect(content).toBeTruthy();
    expect(content.parentElement).toBe(parent);
    // parent should have a generated bundle class (sjb-... possibly with version prefix)
    const classes = Array.from(parent.classList);
    expect(classes.some((c: string) => /(^|-)sjb-/.test(c))).withContext('missing bundle class').toBeTrue();
  });

  it('re-applies class when theme version changes', () => {
    fixture.detectChanges();
    const parent: HTMLElement = fixture.nativeElement.querySelector('#parent');

    // bump theme version by setting any theme part
    theme.setTheme({ breakpoints: { xs: 0, sm: 640, md: 900, lg: 1200, xl: 1920, xxl: 2560 } as any });
    fixture.detectChanges();

    const classes = Array.from(parent.classList);
    // For version > 0 we prefix classes with v{n}-sjb-...
    expect(classes.some((c: string) => /^v\d+-sjb-/.test(c))).withContext('missing versioned bundle class').toBeTrue();
  });
});
