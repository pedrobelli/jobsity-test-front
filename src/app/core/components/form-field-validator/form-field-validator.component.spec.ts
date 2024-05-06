import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldValidatorComponent } from './form-field-validator.component';

describe('FormFieldValidatorComponent', () => {
  let component: FormFieldValidatorComponent;
  let fixture: ComponentFixture<FormFieldValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFieldValidatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
