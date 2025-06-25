import type { PropertyOptions } from '@beemood/interface';
import type { ValidationOptions } from 'class-validator';
import { ArrayValidation } from './array-validation.js';
import { BooleanValidation } from './boolean-validation.js';
import { CommonValidation } from './common-validation.js';
import { DateValidation } from './date-validation.js';
import { IntegerValidation } from './integer-validation.js';
import { NumberValidation } from './number-validation.js';
import { ObjectValidation } from './object-validation.js';
import { StringValidation } from './string-validation.js';

export function Validation(
  options: PropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const { type } = options;

    if (!validationOptions) {
      CommonValidation(options, validationOptions)(...args);
    }

    switch (type) {
      case 'string': {
        StringValidation(options, validationOptions)(...args);
        break;
      }
      case 'integer': {
        IntegerValidation(options, validationOptions)(...args);
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
      case 'date': {
        DateValidation(options, validationOptions)(...args);
        break;
      }
      case 'array': {
        ArrayValidation(options, validationOptions)(...args);
        Validation(options.items, { each: true })(...args);
        break;
      }
    }
  };
}
