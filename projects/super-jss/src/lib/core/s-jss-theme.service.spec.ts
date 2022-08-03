import { TestBed } from '@angular/core/testing';

import { SJssThemeService } from './s-jss-theme.service';

describe('SJssThemeService', () => {
  let service: SJssThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SJssThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
