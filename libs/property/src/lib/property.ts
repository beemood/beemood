import type { PropertyOptions } from '@bmod/types';
import { ApiProperty } from '@nestjs/swagger';
import type { ValidationOptions } from 'class-validator';
import { ArrayProperty } from './array-property.js';
import { BooleanProperty } from './boolean-property.js';
import { IntegerProperty } from './integer-property.js';
import { NumberProperty } from './number-property.js';
import { ObjectProperty } from './object-property.js';
import { StringProperty } from './string-property.js';
import { toApiPropertyOptions } from './transformers/to-api-property-options.js';

/**
 * Dto model property decorator
 * @param options PropertyOptions
 * @param validationOptions ValidationOptions
 * @returns PropertyDecorator
 */
export function Property<T extends PropertyOptions<T>>(
  options: PropertyOptions<T>,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const { type } = options;

    if (validationOptions?.each != true) {
      ApiProperty(toApiPropertyOptions(options))(...args);
    }

    switch (type) {
      case 'string': {
        StringProperty(options, validationOptions)(...args);
        break;
      }
      case 'number': {
        NumberProperty(options, validationOptions)(...args);
        break;
      }
      case 'integer': {
        IntegerProperty(options, validationOptions)(...args);

        break;
      }
      case 'boolean': {
        BooleanProperty(options, validationOptions)(...args);
        break;
      }
      case 'object': {
        ObjectProperty(options, validationOptions)(...args);
        break;
      }
      case 'array': {
        ApiProperty(toApiPropertyOptions(options))(...args);
        ArrayProperty<T>(options, validationOptions)(...args);
        Property(options.items, { ...validationOptions, each: true })(...args);
        break;
      }
    }
  };
}
