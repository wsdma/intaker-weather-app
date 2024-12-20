import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

const ERRORS_TEXTS: Record<string, string> = {
  required: 'This field is required',
  minlength: 'This field must be at least 3 characters long',
  maxlength: 'This field must be less than 100 characters long',
  apiError: 'Something went wrong, please try again later',
};

@Pipe({
  name: 'controlErrorsText',
})
export class ControlErrorsTextPipe implements PipeTransform {
  transform(value: ValidationErrors): string {
    return Object.keys(value)
      .map((key) => ERRORS_TEXTS[key])
      .join('<br>');
  }
}
