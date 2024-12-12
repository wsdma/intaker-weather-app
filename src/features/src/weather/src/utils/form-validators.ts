import { AbstractControl, ValidationErrors } from '@angular/forms';

export const inputIsEmptyValidator = (
  control: AbstractControl,
): ValidationErrors | null =>
  control.value?.trim().length === 0 ? { required: true } : null;
