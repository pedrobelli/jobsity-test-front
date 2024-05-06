import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from '../../../shared/models/task';
import { Status, StatusMap } from '../../../shared/enums/status';
import { TaskService } from '../../../shared/services/task.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  NEW = 'NEW';
  EDIT = 'EDIT';
  DETAIL = 'DETAIL';

  taskForm: FormGroup;
  task: Task;
  currentId: number;
  currentAction: string;
  statuses = [
    {
      id: Status.PENDING,
      value: StatusMap.get(Status.PENDING)
    },
    {
      id: Status.COMPLETED,
      value: StatusMap.get(Status.COMPLETED)
    },
  ];

  constructor(
    private taskService: TaskService,
    private alertService: AlertService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public router: Router,
  ) { }

  private buildForm() {
    this.taskForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  private updateFormValues() {
    this.taskForm.patchValue(this.task);

    if (this.currentAction === this.DETAIL) {
      this.taskForm.get('title')?.disable();
    }

    if (this.currentAction !== this.NEW && this.statuses.find((item) => item.id === this.task.status)) {
      this.taskForm.get('status')?.disable();
    }
  }

  ngOnInit(): void {
    const id = +this.activeRoute.snapshot.params['id'];
    this.buildForm();

    if (id) {
      this.currentId = id;
      this.taskService.getById(this.currentId)
        .subscribe({
          next: (task) => {
            this.task = task;

            this.currentAction = this.task.status === Status.COMPLETED ? this.DETAIL : this.EDIT;

            this.updateFormValues();
          },
        });
    } else {
      this.currentAction = this.NEW;
    }
  }

  private validateForm(): boolean {
    const controls = this.taskForm.controls;
    if (this.taskForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return false;
    }

    return true;
  }

  async submitForm() {
    if (this.validateForm()) {
      const formData = this.taskForm.getRawValue() as Task;

      if (!this.currentId) {
        this.taskService.create(formData)
          .subscribe({
            next: () => {
              this.alertService.success('Task created successfully!');
              this.router.navigate(['/tasks']);
            },
          });
      } else {
        this.taskService.update(formData)
          .subscribe({
            next: () => {
              this.alertService.success('Task updated successfully!');
              this.router.navigate(['/tasks']);
            },
          });
      }
    } else {
      return this.alertService.error('Fill required fields!');
    }
  }

  back() {
    this.router.navigate(['/tasks'])
  }

}
