import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable, catchError, map } from 'rxjs';

import { BaseService } from './base.service';
import { Task } from '../models/task';
import { PaginatedResult } from '../../core/interfaces/paginated-result';

@Injectable()
export class TaskService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  public getDataTable(params: HttpParams): Observable<PaginatedResult<Task[]>> {
    return this.httpClient.get<PaginatedResult<Task[]>>(`${this.baseUrl}/tasks`, { params })
      .pipe(
        map((result) =>  result),
        catchError(this.handleError.bind(this))
      );
  }

  public getById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.baseUrl}/tasks/${id}`)
      .pipe(
        map((result) =>  result),
        catchError(this.handleError.bind(this))
      );
  }

  public create(obj: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.baseUrl}/tasks`, obj)
      .pipe(
        map((result) =>  result),
        catchError(this.handleError.bind(this))
      );
  }

  public update(obj: Task): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/tasks/${obj.id}`, obj)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/tasks/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public batchComplete(tasksIds: number[]): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/tasks/batch-complete`, { tasksIds })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
