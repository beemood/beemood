import type { PropertyOptions } from '@bmod/types';
import { Validation } from '@bmod/validation';
import { ApiProperty } from '@nestjs/swagger';
import { toApiPropertyOptions } from '../helpers/to-api-property-options.js';

export function Property(options: PropertyOptions): PropertyDecorator {
  return (...args) => {
    Validation(options)(...args);
    ApiProperty(toApiPropertyOptions(options))(...args);
  };
}
