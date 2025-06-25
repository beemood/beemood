import type { PropertyOptions } from '@beemood/interface';
import { Validation } from '@beemood/validation';
import { ApiProperty } from './api-property.js';

export function Property(options: PropertyOptions): PropertyDecorator {
  return (...args) => {
    Validation(options)(...args);
    ApiProperty(options)(...args);
  };
}
