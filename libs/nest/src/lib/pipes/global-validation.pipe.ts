import {
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

/**
 * Parse validation errors
 * @param errors ValidationError[]
 * @returns a list of validation errors @see https://github.com/typestack/class-validator
 */
export function parseValiationErrors(errors: ValidationError[]) {
  return errors;
}

export const GlobalValidationPipe = new ValidationPipe({
  transform: true,
  transformOptions: {
    exposeUnsetFields: false,
    exposeDefaultValues: true,
    excludeExtraneousValues: true,
  },
  validationError: {
    target: false,
    value: false,
  },
  exceptionFactory(errors) {
    return new UnprocessableEntityException({
      errors: parseValiationErrors(errors),
    });
  },
});
