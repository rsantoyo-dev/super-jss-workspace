import { TestBed } from '@angular/core/testing';
import { SjThemeService } from './sj-theme.service';

describe('SjThemeService DOM variables', () => {
  let theme: SjThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    theme = TestBed.inject(SjThemeService);
  });

  it('sets --sj-ff and --sj-app-bg on :root when theme applies', () => {
    const docEl = document.documentElement;

    // Force a theme application to ensure variables are set synchronously
    theme.setTheme({});

    // Read inline style variables first for robustness in test envs
    const ffVarInline = docEl.style.getPropertyValue('--sj-ff');
    const bgVarInline = docEl.style.getPropertyValue('--sj-app-bg');
    expect(ffVarInline).withContext('--sj-ff not set on :root').toBeTruthy();
    expect(bgVarInline).withContext('--sj-app-bg not set on :root').toBeTruthy();

    // Update typography and verify the font variable updates
    theme.setTheme({ typography: { default: { fontFamily: 'Arial' } } as any });
    const ffAfter = docEl.style.getPropertyValue('--sj-ff');
    expect(ffAfter).toContain('Arial');
  });
});
