import type { Type } from '@nestjs/common';
import { Query as __Query } from '@nestjs/common';
import { getValidationPipe } from '../pipe/get-validation-pipe.js';

/**
 * Provide a validation and transformation capability to to the nestjs Query decorator
 * @param expectedType expected dto type for the query object
 * @returns {@link ParameterDecorator}
 */
export function Query(expectedType?: Type): ParameterDecorator {
  return (...args) => {
    __Query(getValidationPipe(expectedType))(...args);
  };
}
