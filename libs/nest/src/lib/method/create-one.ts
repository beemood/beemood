import { Post, Type } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { WriteOperation } from '../metadata/set-operation-name.js';

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
    WriteOperation()(...args);
    Post()(...args);
  };
}
