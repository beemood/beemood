import { Param, ParseIntPipe } from '@nestjs/common';

/**
 * Inject the url ":id" parameter
 * @returns ParameterDecorator
 */
export function ParamId(): ParameterDecorator {
  return (...args) => {
    Param('id', ParseIntPipe)(...args);
  };
}
