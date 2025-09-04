import { TestBed } from '@angular/core/testing';
import { SjTheme } from '../models/interfaces';
import { SJ_THEME } from '../tokens';
import { SjThemeService } from './sj-theme.service';
import { defaultTheme } from '../themes';

describe('SjThemeService with SJ_THEME token', () => {
  it('applies the injected theme on construction', () => {
    const injected: SjTheme = {
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        primary: { ...defaultTheme.palette.primary, main: '#123456' },
      },
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: SJ_THEME, useValue: injected },
        SjThemeService,
      ],
    });

    const svc = TestBed.inject(SjThemeService);
    expect(svc.sjTheme().palette.primary.main).toBe('#123456');
  });
});

