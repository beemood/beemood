import { Param, ParseIntPipe } from '@nestjs/common';

/**
 * Check nestjs Param decorator
 */
export function ParamId(): ParameterDecorator {
  return (...args) => {
    Param('id', ParseIntPipe)(...args);
  };
}
