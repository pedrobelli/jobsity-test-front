import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import { TaskService } from './task.service';
import { AlertService } from '../../core/services/alert.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        TaskService,
        AlertService,
        ToastrService,
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
