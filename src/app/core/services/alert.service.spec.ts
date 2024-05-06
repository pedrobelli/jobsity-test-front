import { TestBed } from '@angular/core/testing';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
      ],
      providers: [
        AlertService,
        ToastrService,
      ],
    });
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
