import type { Type } from '@nestjs/common';
import { Query as __Query } from '@nestjs/common';
import { getValidationPipe } from '../pipe/get-validation-pipe.js';

export function Query(expectedType?: Type): ParameterDecorator {
  return (...args) => {
    __Query(getValidationPipe(expectedType))(...args);
  };
}
