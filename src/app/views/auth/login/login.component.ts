import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignInDto } from '../../../shared/dto/sign-in.dto';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public router: Router,
  ) {}

  private buildForm() {
    this.signInForm = this.formBuilder.group({
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
    const controls = this.signInForm.controls;
    if (this.signInForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return false;
    }

    return true;
  }

  async submitForm() {
    if (this.validateForm()) {
      const formData = this.signInForm.getRawValue() as SignInDto;

      this.authService.signIn(formData)
        .subscribe({
          next: (result) => {
            localStorage.setItem('token', result.token);
            this.router.navigate(['/tasks']);
          },
        });
    }
  }

}
