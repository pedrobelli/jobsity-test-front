import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import { LoginComponent } from './login.component';
import { AlertService } from '../../../core/services/alert.service';
import { FormFieldValidatorComponent } from '../../../core/components/form-field-validator/form-field-validator.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        FormFieldValidatorComponent,
      ],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
      ],
      providers: [
        AlertService,
        ToastrService,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
