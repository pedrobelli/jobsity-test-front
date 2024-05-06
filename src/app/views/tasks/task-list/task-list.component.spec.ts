import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../../shared/services/task.service';
import { AlertService } from '../../../core/services/alert.service';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListComponent ],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        FormsModule,
        NgbPaginationModule,
      ],
      providers: [
        TaskService,
        AlertService,
        ToastrService,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
