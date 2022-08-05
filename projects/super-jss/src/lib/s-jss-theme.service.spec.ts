import {SJssThemeService} from "./s-jss-theme.service";
import {SJssTheme} from "./super-jss-model";

describe('SJssThemeService', () => {
  let service: SJssThemeService;
  beforeEach(() => {
    service = new SJssThemeService();
  });
  it('#should call onResize if window resize or load', ()=>{
    const spyOnResize = spyOn(service, 'onResize');
    window.dispatchEvent(new Event('resize'));
    expect(spyOnResize).toHaveBeenCalled();

  });
  it('#should call onResize if window  load', ()=>{
    const spyOnLoad = spyOn(service, 'onResize');
    window.dispatchEvent(new Event('load'));
    expect(spyOnLoad).toHaveBeenCalled();
  })

  it('#defaultTheme should return a default theme', () => {
    expect(service.defaultTheme().breakpoints).toEqual({xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536});
  });

  it('#should call onResize when window change', () => {
    let th:SJssTheme = service.defaultTheme();
    th.palette.primary.main = 'red';
    service.setTheme(th);
    expect(service.theme).toEqual(th);
  });

  it('#should set a new theme', () => {
    let th:SJssTheme = service.defaultTheme();
    th.palette.primary.main = 'red';
    service.setTheme(th);
    expect(service.theme).toEqual(th);
  });

  it('#should observe theme changes', async () => {
    service.breakpointChanges().subscribe(bp=>{
      expect(service.breakPoint).toEqual(bp);
    })
    service.breakPointChanges$.next(service.breakPoint);

  });
  it('#should update on resize', async () => {
    service.theme = service.defaultTheme();
    service.breakPoint = 'xs';
    spyOn(service, 'getInnerWidth').and.returnValue(1000);
    service.onResize();
    expect(service.breakPoint !== 'xs' ).toBeTruthy()
  });
  it('#should defaultTheme return correct spacing', async () => {
    expect(service.defaultTheme().spacing(2)).toEqual('0.5rem')
  });
});
