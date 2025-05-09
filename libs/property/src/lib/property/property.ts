import type { PropertyOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import { ApiProperty } from './api-property.js';
import { ArrayProperty } from './array-property.js';
import { BooleanProperty } from './boolean-property.js';
import { IntegerProperty } from './integer-property.js';
import { NumberProperty } from './number-property.js';
import { ObjectProperty } from './object-property.js';
import { StringProperty } from './string-property.js';
/**
 * Dto model property decorator
 * @param options PropertyOptions
 * @param validationOptions ValidationOptions
 * @returns PropertyDecorator
 */
export function Prop<T extends PropertyOptions<T>>(
  options: PropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const { type } = options;

    if (!validationOptions) ApiProperty(options)(...args);

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
        ArrayProperty(options, validationOptions)(...args);
        Prop(options.items, { ...validationOptions, each: true })(...args);
        break;
      }
    }
  };
}
