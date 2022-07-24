import { TestBed } from '@angular/core/testing';

import { ThemeHandlerService } from './theme-handler.service';

describe('ThemeHandlerService', () => {
  let service: ThemeHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
