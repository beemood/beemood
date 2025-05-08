import { Post, Type } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

export type CreateOneMethodOptions = {
  responseType: () => Type;
};

/**
 * HTTP POST method decorator to create one item
 * @returns MethodDecorator
 */
export function CreateOne(options: CreateOneMethodOptions): MethodDecorator {
  return (...args) => {
    ApiOperation({ summary: 'Create one item' })(...args);
    ApiCreatedResponse({ type: options.responseType() })(...args);
    Post()(...args);
  };
}
