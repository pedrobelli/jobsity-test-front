import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';

import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { TaskStatusPipe } from './pipes/task-status.pipe';
import { AlertService } from './services/alert.service';
import { RequestFormatService } from './services/request-format.service';
import { FormFieldValidatorComponent } from './components/form-field-validator/form-field-validator.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    HeaderComponent,
    FormFieldValidatorComponent,
    TaskStatusPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AlertService,
    RequestFormatService,
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ],
  exports: [
    BaseLayoutComponent,
    FormFieldValidatorComponent,
    TaskStatusPipe,
  ]
})
export class CoreModule { }
