import type { Type } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

/**
 * Create a validation class with dto class
 * @param expectedType dto class to validate
 * @returns
 */
export function getValidationPipe(expectedType?: Type): ValidationPipe {
  return new ValidationPipe({
    transform: true,
    expectedType,
    transformOptions: {
      exposeUnsetFields: false,
    },
    validationError: {
      target: false,
      value: false,
    },
  });
}
