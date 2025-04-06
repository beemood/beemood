import type { PropertyOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import { ArrayValidation } from '../array-validation.decorator.js';
import { BooleanValidation } from '../boolean-validation.decorator.js';
import { CommonValidation } from '../common-validation.decorator.js';
import { IntegerValidation } from '../integer-validation.decorator.js';
import { NumberValidation } from '../number-validation.decorator.js';
import { ObjectValidation } from '../object-validation.decorator.js';
import { StringValidation } from '../string-validation.decorator.js';

export function Validation(
  options: PropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const type = options.type;
    const vo = validationOptions;
    CommonValidation(options, vo)(...args);

    switch (type) {
      case 'string':
        StringValidation(options, vo)(...args);
        break;
      case 'integer':
        IntegerValidation(options, vo)(...args);
        break;
      case 'number':
        NumberValidation(options, vo)(...args);
        break;
      case 'boolean':
        BooleanValidation(options, vo)(...args);
        break;
      case 'object':
        ObjectValidation(options, vo)(...args);
        break;
      case 'array':
        ArrayValidation(options, vo)(...args);
        Validation(options.items as PropertyOptions, { each: true })(...args);
        break;
    }
  };
}
