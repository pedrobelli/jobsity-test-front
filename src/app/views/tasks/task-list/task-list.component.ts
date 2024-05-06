import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '../../../shared/models/task';
import { Status } from '../../../shared/enums/status';
import { PaginationOption, PaginationOptionMap } from 'src/app/shared/enums/pagination-option';
import { TaskService } from '../../../shared/services/task.service';
import { RequestFormatService } from '../../../core/services/request-format.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  TASK_PENDING = Status.PENDING;

  tasks: Task[];
  collectionSize = 0;
  page = 1;
  pageSize = PaginationOption.OPTION_5
  paginationOptions = [
    {
      id: PaginationOption.OPTION_2,
      value: PaginationOptionMap.get(PaginationOption.OPTION_2),
    },
    {
      id: PaginationOption.OPTION_5,
      value: PaginationOptionMap.get(PaginationOption.OPTION_5),
    },
    {
      id: PaginationOption.OPTION_10,
      value: PaginationOptionMap.get(PaginationOption.OPTION_10),
    },
    {
      id: PaginationOption.OPTION_15,
      value: PaginationOptionMap.get(PaginationOption.OPTION_15),
    },
    {
      id: PaginationOption.OPTION_20,
      value: PaginationOptionMap.get(PaginationOption.OPTION_20),
    },
  ];

  constructor(
    private taskService: TaskService,
    private alertService: AlertService,
    private requestFormatService: RequestFormatService,
    public router: Router,
  ) { }

  loadDataTable() {
    const params = this.requestFormatService.buildDataSourceParams({
      skip: (this.page - 1) * this.pageSize,
      take: +this.pageSize,
    });
    this.taskService.getDataTable(params)
      .subscribe({
        next: (result) => {
          this.tasks = result.data;
          this.collectionSize = result.totalCount;
        },
      });
  }

  ngOnInit(): void {
    this.loadDataTable();
  }

  edit(id: number) {
    this.router.navigate(['/tasks', id, 'edit']);
  }

  delete(task: Task) {
    if (task.status === Status.COMPLETED) {
      return this.alertService.error('Completed tasks can\'t be deleted.')
    }

    return this.alertService
      .confirm(
        'Warning',
        'This action will delete the task.</br>Would you like to continue?'
      )
      .then((answer) => {
        if (answer.isConfirmed) {
          this.taskService.delete(task.id)
            .subscribe({
              next: () => {
                this.alertService.success('Task deleted successfully.')
                this.loadDataTable();
              },
            });
        }
      });
  }

  completeSelected() {
    const selectedTasks = this.tasks.filter((task) => task.selected).map((task) => task.id);

    if (selectedTasks.length === 0) {
      return this.alertService.alert('Select tasks to complete!');
    }

    return this.alertService
      .confirm(
        'Warning',
        'Would you like to complete all selected tasks?'
      )
      .then((answer) => {
        if (answer.isConfirmed) {
          this.taskService.batchComplete(selectedTasks)
            .subscribe({
              next: () => {
                this.alertService.success('Tasks completed successfully!');
                this.loadDataTable();
              },
            });
        }
      });
  }

  changedPageSize() {
    this.page = 1;
    this.loadDataTable();
  }

}
