import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AlertService } from 'src/app/core/services/alert.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected baseUrl: string;

  protected httpClient: HttpClient;
  protected alertService: AlertService;
  protected router: Router;

  constructor(
    injector: Injector
  ) {
    this.httpClient = injector.get(HttpClient);
    this.alertService = injector.get(AlertService);
    this.router = injector.get(Router);

    this.baseUrl = environment.baseUrl;
  }

  protected handleError(error: any) {
    if (error.status === 401) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }

    if (error != null && error.error != null && error.error.data != null && Array.isArray(error.error.data)) {
      const message = error.error.data.join('\r\n');
      this.alertService.error(message);
    } else if (error != null && error.error != null && error.error.message != null) {
      this.alertService.error(error.error.message);
    } else {
      this.alertService.error(error.message);
    }

    return throwError(() => error);
  }
}
