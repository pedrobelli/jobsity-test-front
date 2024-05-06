import { TestBed } from '@angular/core/testing';

import { RequestFormatService } from './request-format.service';

describe('RequestFormatService', () => {
  let service: RequestFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
