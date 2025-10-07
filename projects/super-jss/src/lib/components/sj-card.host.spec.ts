import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SjCardComponent } from './sj-card.component';
import { SjThemeService } from '../services';

@Component({
  standalone: true,
  imports: [SjCardComponent],
  template: `
    <div id="parent">
      <sj-card host useSurface [variant]="'flat'">
        <span id="content">CardChild</span>
      </sj-card>
    </div>
  `,
})
class HostCardSpecComponent {}

describe('SjCardComponent host mode', () => {
  let fixture: ComponentFixture<HostCardSpecComponent>;
  let theme: SjThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostCardSpecComponent],
    }).compileComponents();
    theme = TestBed.inject(SjThemeService);
    fixture = TestBed.createComponent(HostCardSpecComponent);
  });

  it('applies classes to parent and removes wrapper', () => {
    fixture.detectChanges();

    const parent: HTMLElement = fixture.nativeElement.querySelector('#parent');
    const cardEl: HTMLElement | null = fixture.nativeElement.querySelector('sj-card');
    const content: HTMLElement = fixture.nativeElement.querySelector('#content');

    expect(cardEl).toBeNull();
    expect(content).toBeTruthy();
    expect(content.parentElement).toBe(parent);
    const classes = Array.from(parent.classList);
    expect(classes.some((c: string) => /(^|-)sjb-/.test(c))).toBeTrue();
  });

  it('prefixes class with version when theme changes', () => {
    fixture.detectChanges();
    const parent: HTMLElement = fixture.nativeElement.querySelector('#parent');
    theme.setTheme({ spacing: (n: number) => `${n * 8}px` });
    fixture.detectChanges();
    const classes = Array.from(parent.classList);
    expect(classes.some((c: string) => /^v\d+-sjb-/.test(c))).toBeTrue();
  });
});
