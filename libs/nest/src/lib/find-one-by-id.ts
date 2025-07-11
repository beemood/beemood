import { Get, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export type FindOneByIdOptions = {
  returnType: Type;
};

export function FindOneById(options: FindOneByIdOptions): MethodDecorator {
  return (...args) => {
    Get(':id')(...args);
    ApiOperation({ summary: 'Find one by id' })(...args);
    ApiOkResponse({ type: options.returnType, description: 'Success' })(
      ...args
    );
  };
}
