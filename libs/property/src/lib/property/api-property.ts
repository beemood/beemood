/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropertyOptions } from '@bmod/types';
import { ApiProperty as __ApiProperty } from '@nestjs/swagger';
import type { ValidationOptions } from 'class-validator';
import { toApiPropertyOptions } from '../transformers/to-api-property-options.js';

export function ApiProperty(
  options: PropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    if (validationOptions?.each == true) {
      if (options.type === 'object') {
        __ApiProperty({ type: options.target, isArray: true })(...args);
      } else {
        __ApiProperty({
          type: 'array',
          items: toApiPropertyOptions(options) as any,
        })(...args);
      }
    } else {
      if (options.type == 'object') {
        __ApiProperty({ type: options.target, isArray: true })(...args);
      }
      __ApiProperty(toApiPropertyOptions(options))(...args);
    }
  };
}
