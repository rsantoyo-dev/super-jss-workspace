import { TestBed } from '@angular/core/testing';

import { SuperJssService } from './super-jss.service';

describe('SuperJssService', () => {
  let service: SuperJssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperJssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
