import { PropertyValidationOptions, Validation } from '@beemood/validation';
import { ApiProperty } from '@nestjs/swagger';
import { toApiPropertyOptions } from './to-api-property-options.js';

export type PropertyOptions = PropertyValidationOptions;

export function Property(options: PropertyOptions): PropertyDecorator {
  return (...args) => {
    Validation(options)(...args);
    ApiProperty(toApiPropertyOptions(options))(...args);
  };
}
