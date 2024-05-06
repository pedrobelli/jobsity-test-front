import { Injectable } from '@angular/core';

import { Pagination } from '../interfaces/pagination';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestFormatService {
  constructor() { }

  private isNotEmpty(value: any): boolean {
    return value !== undefined && value !== null && value !== '';
  }

  buildDataSourceParams(paginationOptions: Pagination) {
    let params: HttpParams = new HttpParams();
    [
      'skip',
      'take',
    ].forEach((i: string) => {
      if (i in paginationOptions && this.isNotEmpty(paginationOptions[i as keyof Pagination])) {
        params = params.set(i, JSON.stringify(paginationOptions[i as keyof Pagination]));
      }
    });

    return params;
  }
}
