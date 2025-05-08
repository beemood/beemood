import { Get, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export type FindOneByIdMethodOptions = {
  responseType: () => Type;
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
    Get(':id')(...args);
  };
}
