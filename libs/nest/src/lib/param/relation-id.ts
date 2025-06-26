import { Param, ParseIntPipe } from '@nestjs/common';

/**
 * Check nestjs Param decorator
 * @returns
 */
export function ParamRelationId(): ParameterDecorator {
  return (...args) => {
    Param('rid', ParseIntPipe)(...args);
  };
}
