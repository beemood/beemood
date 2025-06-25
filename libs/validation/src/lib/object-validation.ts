import type { ObjectPropertyOptions } from '@beemood/interface';
import { Type } from 'class-transformer';
import { ValidateNested, type ValidationOptions } from 'class-validator';

export function ObjectValidation(
  _options: ObjectPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    Type(_options.target)(...args);
    ValidateNested(validationOptions)(...args);
  };
}
