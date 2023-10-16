import {SJssThemeService} from "./s-jss-theme.service";
import {Breakpoints, SJssTheme} from "./super-jss-model";

describe('SJssThemeService', () => {
  let service: SJssThemeService;

  beforeEach(() => {
    service = new SJssThemeService();
  });

  // Test to check if onResize is called during window resize
  it('should call onResize when window resizes', () => {
    const spyOnResize = spyOn(service, 'onResize');
    window.dispatchEvent(new Event('resize'));
    expect(spyOnResize).toHaveBeenCalled();
  });

  // Test to check if onResize is called during window load
  it('should call onResize when window loads', () => {
    const spyOnLoad = spyOn(service, 'onResize');
    window.dispatchEvent(new Event('load'));
    expect(spyOnLoad).toHaveBeenCalled();
  });

  // Test to check if the default theme is returned correctly
  it('should return a default theme', () => {
    expect(service.defaultTheme().breakpoints).toEqual({ xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 });
  });

  // Test to check if onResize is called when the theme changes
  it('should call onResize when theme changes', () => {
    const theme: SJssTheme = service.defaultTheme();
    theme.palette.primary.main = 'red';
    service.setTheme(theme);
    expect(service.theme).toEqual(theme);
  });

  // Test to check if a new theme can be set correctly
  it('should set a new theme', () => {
    const theme: SJssTheme = service.defaultTheme();
    theme.palette.primary.main = 'red';
    service.setTheme(theme);
    expect(service.theme).toEqual(theme);
  });

  // Test to observe theme changes
  it('should observe breakpoint changes', (done) => {
    service.breakpointChanges().subscribe(bp => {
      expect(service.breakPoint).toEqual(bp);
      done();
    });
    service.breakPointChanges$.next(service.breakPoint);
  });

  // Test to check if the breakpoint updates on resize
  it('should update breakpoint on resize', () => {
    service.theme = service.defaultTheme();
    service.breakPoint = Breakpoints.XS;
    spyOn(service, 'getInnerWidth').and.returnValue(1000);
    service.onResize();
    expect(service.breakPoint !== 'xs').toBeTruthy();
  });

  // Test to check if the default theme returns the correct spacing
  it('should return correct spacing from defaultTheme', () => {
    expect(service.defaultTheme().spacing(2)).toEqual('0.5rem');
  });

  it('should unsubscribe from all active subscriptions on destroy', () => {
    // Spy on the unsubscribe method of the subscriptions object
    const unsubscribeSpy = spyOn(service.subscriptions, 'unsubscribe');

    // Call the ngOnDestroy method
    service.ngOnDestroy();

    // Assert that the unsubscribe method has been called
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

});
