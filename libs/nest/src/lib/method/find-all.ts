import { Get, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export type FindAllMethodOptions = {
  responseType: () => Type;
};
/**
 * HTTP GET method decorator to find all items
 * @returns MethodDecorator
 */
export function FindAll(options: FindAllMethodOptions): MethodDecorator {
  return (...args) => {
    ApiOperation({ summary: 'Find all' })(...args);
    ApiOkResponse({ type: options.responseType(), isArray: true })(...args);
    Get()(...args);
  };
}
