import type { IntegerPropertyOptions } from '@beemood/interface';
import { IsInt, type ValidationOptions } from 'class-validator';
import { CommonNumberValidation } from './common-number-validation.js';

export function IntegerValidation(
  options: IntegerPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    CommonNumberValidation(options, validationOptions)(...args);
    IsInt(validationOptions)(...args);
  };
}
