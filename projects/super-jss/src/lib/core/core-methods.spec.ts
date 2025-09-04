import { getCurrentBreakpoint } from './core-methods';
import { SjBreakPoints } from '../models/interfaces';

describe('getCurrentBreakpoint', () => {
  const bps: SjBreakPoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560,
  };

  it('returns the correct key for various widths', () => {
    expect(getCurrentBreakpoint(bps, 0)).toBe('xs');
    expect(getCurrentBreakpoint(bps, 599)).toBe('xs');
    expect(getCurrentBreakpoint(bps, 600)).toBe('sm');
    expect(getCurrentBreakpoint(bps, 961)).toBe('md');
    expect(getCurrentBreakpoint(bps, 1500)).toBe('lg');
    expect(getCurrentBreakpoint(bps, 1920)).toBe('xl');
    expect(getCurrentBreakpoint(bps, 4000)).toBe('xxl');
  });
});

