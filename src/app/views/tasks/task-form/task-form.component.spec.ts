import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../../shared/services/task.service';
import { AlertService } from '../../../core/services/alert.service';
import { FormFieldValidatorComponent } from '../../../core/components/form-field-validator/form-field-validator.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TaskFormComponent,
        FormFieldValidatorComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        ToastrModule.forRoot(),
        ReactiveFormsModule,
      ],
      providers: [
        TaskService,
        AlertService,
        ToastrService,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
