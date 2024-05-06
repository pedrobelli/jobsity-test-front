import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import { BaseService } from './base.service';
import { AlertService } from '../../core/services/alert.service';

describe('BaseService', () => {
  let service: BaseService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        BaseService,
        AlertService,
        ToastrService,
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
