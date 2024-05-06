import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-form-field-validator',
    template: '<small class="form-text text-danger">{{errorMessage}}</small>'
  })
export class FormFieldValidatorComponent {
  @Input() control: AbstractControl | null;

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

  private mustShowErrorMessage(): boolean {
    return !!this.control && this.control.invalid && this.control.touched;
  }

  private getErrorMessage(): any {
    if (this.control && this.control.errors) {
      if (this.control.errors['required']) {
        return 'Required';
      } else if (this.control.errors['minlength']) {
        const requiredLength = this.control.errors['minlength'].requiredLength;
        return `Min ${requiredLength} characters`;
      }
    } else {
      return null;
    }
  }
}
