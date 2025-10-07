import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SjThemeService } from './sj-theme.service';
import { SjBreakPoints, SjPalette, SjTypography } from '../models/interfaces';
import { SjCssGeneratorService } from './sj-css-generator.service';

describe('SjThemeService', () => {
  let service: SjThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SjThemeService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set a Palette via setTheme', () => {
    const palette: Partial<SjPalette> = {
      primary: {
        main: '#003366',
        light: '#006699',
        dark: '#001133',
        contrast: '#ffaaaa',
      },
    };
    service.setTheme({ palette: palette as SjPalette });
    expect(service.sjTheme().palette.primary.main).toBe('#003366');
  });

  it('should set Breakpoints via setTheme', () => {
    const breakpoints: Partial<SjBreakPoints> = { md: 920 };
    service.setTheme({ breakpoints: breakpoints as SjBreakPoints });
    expect(service.sjTheme().breakpoints.md).toBe(920);
  });

  it('should set Typography via setTheme', () => {
    const typography: Partial<SjTypography> = { default: { fontFamily: 'Arial' } };
    service.setTheme({ typography: typography as SjTypography });
    expect(service.sjTheme().typography.default!.fontFamily).toBe('Arial');
  });

  it('should clear CSS cache and bump themeVersion when theme changes', () => {
    // Provide a spy for SjCssGeneratorService so SjThemeService.injector.get uses it
    const spy = jasmine.createSpyObj<SjCssGeneratorService>('SjCssGeneratorService', ['clearCache']);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        SjThemeService,
        { provide: SjCssGeneratorService, useValue: spy },
      ],
    });
    const svc = TestBed.inject(SjThemeService);
    const prevVersion = svc.themeVersion();
    svc.setTheme({ breakpoints: { xs: 0, sm: 640, md: 900, lg: 1200, xl: 1920, xxl: 2560 } as any });
    expect(spy.clearCache).toHaveBeenCalled();
    expect(svc.themeVersion()).toBe(prevVersion + 1);
  });

  it('should update currentBreakpoint on window resize', fakeAsync(() => {
    // Stop the listener that was created in the constructor
    service.ngOnDestroy();

    // Define breakpoints for the test
    const testBreakpoints = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1920, xxl: 2560 };
    service.setTheme({ breakpoints: testBreakpoints });

    // Set a starting width and initialize the listener
    Object.defineProperty(window, 'innerWidth', { value: 1000, writable: true });
    service.initResizeListener();
    // The initial value is set synchronously
    expect(service.currentBreakpoint()).withContext('should be md initially').toBe('md');

    // Change width and dispatch resize event
    Object.defineProperty(window, 'innerWidth', { value: 700, writable: true });
    window.dispatchEvent(new Event('resize'));
    // Advance the clock to cover the debounceTime
    tick(100);
    expect(service.currentBreakpoint()).withContext('should update to sm').toBe('sm');

    // Change width again
    Object.defineProperty(window, 'innerWidth', { value: 500, writable: true });
    window.dispatchEvent(new Event('resize'));
    tick(100);
    expect(service.currentBreakpoint()).withContext('should update to xs').toBe('xs');
  }));
});
