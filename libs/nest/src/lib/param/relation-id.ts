import { Param, ParseIntPipe } from '@nestjs/common';

export function ParamRelationId(): ParameterDecorator {
  return (...args) => {
    Param('rid', ParseIntPipe)(...args);
  };
}
