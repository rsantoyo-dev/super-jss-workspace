
import {Breakpoints, SJssTheme} from "../model";
import {SJssThemeService} from "./s-jss-theme.service";
describe('SJssThemeService', () => {
  let service: SJssThemeService;

  beforeEach(() => {
    service = new SJssThemeService();
  });

  afterEach(() => {
    service.ngOnDestroy(); // Ensure subscriptions are cleaned up after each test
  });

  it('should return a default theme', () => {
    const defaultTheme = service.defaultTheme();
    expect(defaultTheme.breakpoints).toEqual({xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536});
    expect(defaultTheme.spacing(1)).toEqual('1rem'); // Compare the results of the spacing function
    // Add more assertions for other properties of the default theme if needed
  });

  // Test to check if a new theme can be set correctly
  it('should set a new theme', () => {
    const theme: SJssTheme = service.defaultTheme();
    theme.palette.primary.main = 'red';
    // ts-ignore
    service.setTheme(theme);
    expect(service.theme.palette.primary.main).toEqual('red');
  });

  // Test to observe theme changes
  it('should observe breakpoint changes', (done) => {
    service.breakpointChanges().subscribe(bp => {
      expect(service.breakPoint).toEqual(bp);
      done();
    });
    service.breakPointChanges$.next(service.breakPoint);
  });


  it('should determine the correct breakpoint', () => {
    spyOn(service, 'getInnerWidth').and.returnValue(650);
    expect(service.determineBreakpoint()).toEqual(Breakpoints.SM);
  });

  it('should update breakpoint on resize', () => {
    service.theme = service.defaultTheme();
    service.breakPoint = Breakpoints.XS;
    spyOn(service, 'getInnerWidth').and.returnValue(1000);
    service.onResize();
    expect(service.breakPoint).toEqual(Breakpoints.MD);
  });

  it('should observe breakpoint changes', (done) => {
    service.breakpointChanges().subscribe(bp => {
      expect(service.breakPoint).toEqual(bp);
      done();
    });
    service.breakPointChanges$.next(service.breakPoint);
  });

  it('should unsubscribe from all active subscriptions on destroy', () => {
    const unsubscribeSpy = spyOn(service.subscriptions, 'unsubscribe');
    service.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
