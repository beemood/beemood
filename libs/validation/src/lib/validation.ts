import { ValidationOptions } from 'class-validator';
import {
  ArrayValidation,
  PropertyValidationOptions,
} from './array-validation.js';
import { StringValidation } from './string-validation.js';
import { NumberValidation } from './number-validation.js';
import { BooleanValidation } from './boolean-validation.js';
import { ObjectValidation } from './object-validation.js';
import { IntegerValidation } from './integer-validation.js';

export function Validation(
  options: PropertyValidationOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const { type } = options;

    switch (type) {
      case 'string': {
        StringValidation(options, validationOptions)(...args);
        break;
      }
      case 'number': {
        NumberValidation(options, validationOptions)(...args);
        break;
      }
      case 'boolean': {
        BooleanValidation(options, validationOptions)(...args);
        break;
      }
      case 'object': {
        ObjectValidation(options, validationOptions)(...args);
        break;
      }
      case 'integer': {
        IntegerValidation(options, validationOptions)(...args);
        break;
      }
      case 'array': {
        ArrayValidation(options, validationOptions)(...args);
        Validation(options.items, { ...validationOptions, each: true })(
          ...args
        );
        break;
      }
    }
  };
}
