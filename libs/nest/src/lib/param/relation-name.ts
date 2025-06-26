import { Param } from '@nestjs/common';

/**
 * Check nestjs Param decorator
 * @returns
 */
export function ParamRelationName(): ParameterDecorator {
  return (...args) => {
    Param('rn')(...args);
  };
}
