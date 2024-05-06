import { Injectable, Injector } from '@angular/core';

import { Observable, catchError, map } from 'rxjs';

import { BaseService } from './base.service';
import { Account } from '../models/account';
import { SignInDto } from '../dto/sign-in.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  public signIn(obj: SignInDto): Observable<LoginDto> {
    return this.httpClient.post<LoginDto>(`${this.baseUrl}/auth/sign-in`, obj)
      .pipe(
        map((result) =>  result),
        catchError(this.handleError.bind(this))
      );
  }

  public signUp(obj: Account): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/auth/sign-up`, obj)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  private getTokenData() {
    const token = localStorage.getItem('token');
    try {
      return token ? JSON.parse(atob(token.split('.')[1])) : undefined;
    } catch (e) {
      return undefined;
    }
  }

  public isAuthenticated() {
    try {
      const tokeValues = this.getTokenData();

      return tokeValues && tokeValues.id;
    } catch (e) {
      return false;
    }
  }

  public getToken() {
    return localStorage.getItem('token');
  }
}
