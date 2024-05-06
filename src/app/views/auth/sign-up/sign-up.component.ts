import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';
import { Account } from '../../../shared/models/account';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public router: Router,
  ) {}

  private buildForm() {
    this.signUpForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tasks']);
    }

    this.buildForm();
  }

  private validateForm(): boolean {
    const controls = this.signUpForm.controls;
    if (this.signUpForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return false;
    }

    return true;
  }

  async submitForm() {
    if (this.validateForm()) {
      const formData = this.signUpForm.getRawValue() as Account;

      this.authService.signUp(formData)
        .subscribe({
          next: () => {
            this.alertService.success('Account created successfully!');
            this.router.navigate(['/login']);
          },
        });
    } else {
      return this.alertService.error('Fill required fields!');
    }
  }

}
