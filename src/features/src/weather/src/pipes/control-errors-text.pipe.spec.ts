import { ControlErrorsTextPipe } from './control-errors-text.pipe';

describe('ControlErrorsTextPipe', () => {
  let pipe: ControlErrorsTextPipe;

  beforeEach(() => {
    pipe = new ControlErrorsTextPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform single error correctly', () => {
    const errors = { required: true };
    const result = pipe.transform(errors);
    expect(result).toBe('This field is required');
  });

  it('should transform multiple errors correctly', () => {
    const errors = {
      required: true,
      minlength: true,
    };
    const result = pipe.transform(errors);
    expect(result).toBe(
      'This field is required<br>This field must be at least 3 characters long',
    );
  });

  it('should handle unknown error keys', () => {
    const errors = {
      unknown: true,
    };
    const result = pipe.transform(errors);
    expect(result).toBe('');
  });

  it('should handle empty error object', () => {
    const errors = {};
    const result = pipe.transform(errors);
    expect(result).toBe('');
  });
});
