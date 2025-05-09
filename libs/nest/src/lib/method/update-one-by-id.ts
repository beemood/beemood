import type { Type } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export type UpdateOneByIdMethodOptions = {
  responseType: () => Type;
  updateDto?: () => Type;
  queryDto?: () => Type;
};

/**
 * HTTP PUT method decorator to update one item by id
 * @returns MethodDecorator
 */
export function UpdateOneById(
  options: UpdateOneByIdMethodOptions
): MethodDecorator {
  return (...args) => {
    ApiOperation({ summary: 'Update one item by id' })(...args);
    ApiOkResponse({ type: options.responseType() })(...args);
    Put(':id')(...args);
  };
}
