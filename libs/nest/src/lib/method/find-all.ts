import type { Type } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ReadOperation } from '../metadata/set-operation-name.js';

export type FindAllMethodOptions = {
  responseType: () => Type;
  queryDto?: () => Type;
};
/**
 * HTTP GET method decorator to find all items
 * @returns MethodDecorator
 */
export function FindAll(options: FindAllMethodOptions): MethodDecorator {
  return (...args) => {
    ApiOperation({ summary: 'Find all' })(...args);
    ApiOkResponse({ type: options.responseType(), isArray: true })(...args);
    ReadOperation()(...args);
    Get()(...args);
  };
}
