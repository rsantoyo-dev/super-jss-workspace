import { TestBed } from '@angular/core/testing';

import { SjThemeService } from './sj-theme.service';
import {SjPalette, SjTypography} from "super-jss";
import {SjBreakPoints} from "../models/interfaces";

describe('SjThemeServiceService', () => {
  let service: SjThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SjThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set a Palette', () => {
    const palette: Partial<SjPalette> = {primary: {main: '#003366', light: '#006699', dark: '#001133', contrast: '#ffaaaa'}};
    service.setPalette(palette);
    expect(service.sjTheme().palette.primary.main).toBe('#003366');
  });

  it('should set a Breakpoint', () => {
    const bp: Partial<SjBreakPoints> = {md: 920};
    service.setBreakpoints(bp);
    expect(service.sjTheme().breakpoints.md).toBe(920);
  });

it('should set a Typography', () => {
    const typo: Partial<SjTypography> = {default: {fontFamily: 'Arial'}};
    service.setTypography(typo);
    expect(service.sjTheme().typography.default.fontFamily).toBe('Arial');
  });

  it('should update render on window resize', () => {
    const spy = spyOn(service, 'updateRender');
    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalled();

  });
  it('should update render on window load', () => {
    const spy = spyOn(service, 'updateRender');
    window.dispatchEvent(new Event('load'));
    expect(spy).toHaveBeenCalled();
  });

  it('should set current breakpoint', () => {
    const bp: Partial<SjBreakPoints> = {md: 920};
    service.setBreakpoints(bp);
    window.dispatchEvent(new Event('load'));
    expect(service.currentBreakpoint()).toBe('md');
  });


});
