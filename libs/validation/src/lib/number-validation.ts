import type { NumberPropertyOptions } from '@beemood/interface';
import { IsNumber, type ValidationOptions } from 'class-validator';
import { CommonNumberValidation } from './common-number-validation.js';

export function NumberValidation(
  options: NumberPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    CommonNumberValidation(options, validationOptions)(...args);
    IsNumber({}, validationOptions)(...args);
  };
}
