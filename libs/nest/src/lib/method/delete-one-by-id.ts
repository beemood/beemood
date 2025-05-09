import type { Type } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { DeleteOperation } from '../metadata/set-operation-name.js';

export type DeleteOneByIdMethodOptions = {
  responseType: () => Type;
  queryDto?: () => Type;
};

/**
 * HTTP PUT method decorator to update one item by id
 * @returns MethodDecorator
 */
export function DeleteOneById(
  options: DeleteOneByIdMethodOptions
): MethodDecorator {
  return (...args) => {
    ApiOperation({ summary: 'Delete one item by id' })(...args);
    ApiOkResponse({ type: options.responseType() })(...args);
    DeleteOperation()(...args);
    Delete(':id')(...args);
  };
}
