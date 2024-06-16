import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (!value) { return null; }
  const isValidName = /^[A-Za-z]+$/.test(value);
  return isValidName ? null : { nameValidator: true };
}

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value as string);
  if (!value) { return null; }
  const isValidEmail = /^[a-zA-Z0-9\.-]{6,}@\w+\.(com|bg)$/.test(value);
  return isValidEmail ? null : { emailValidator: true };
}