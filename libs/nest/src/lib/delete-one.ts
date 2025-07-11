import { Delete, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export type DeleteOneOptions = {
  returnType: Type;
};

export function DeleteOne(options: DeleteOneOptions): MethodDecorator {
  return (...args) => {
    Delete(':id')(...args);
    ApiOperation({ summary: 'Delete one by id' })(...args);
    ApiOkResponse({ type: options.returnType })(...args);
  };
}
