import type { Type } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

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
