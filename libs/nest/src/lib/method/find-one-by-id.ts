import type { Type } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ReadOperation } from '../metadata/set-operation-name.js';

export type FindOneByIdMethodOptions = {
  responseType: () => Type;
  queryDto?: () => Type;
};

/**
 * HTTP GET method decorator to find one item by id
 * @returns MethodDecorator
 */
export function FindOneById(
  options: FindOneByIdMethodOptions
): MethodDecorator {
  return (...args) => {
    ApiOperation({ summary: 'Find one by id' })(...args);
    ApiOkResponse({ type: options.responseType() })(...args);
    ReadOperation()(...args);
    Get(':id')(...args);
  };
}
