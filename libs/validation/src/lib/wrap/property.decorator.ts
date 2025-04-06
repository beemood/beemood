import type { PropertyOptions } from '@bmod/types';
import { Validation } from '@bmod/validation';
import { Expose } from 'class-transformer';
import { toApiPropertyOptions } from '../helpers/to-api-property-options.js';

export function Property(options: PropertyOptions): PropertyDecorator {
  return (...args) => {
    if (options.expose !== false) Expose()(...args);
    Validation(options)(...args);
    try {
      const { ApiProperty } = require('@nestjs/swagger');
      ApiProperty(toApiPropertyOptions(options))(...args);
    } catch (err) {
      console.error(err);
    }
  };
}
