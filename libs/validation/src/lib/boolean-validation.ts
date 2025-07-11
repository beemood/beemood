import { IsBoolean, ValidationOptions } from 'class-validator';
import { CommonOptions, CommonValidation } from './common-validation.js';

export type BooleanOptions = {
  type: 'boolean';
  defaultValue?: boolean;
  example?: boolean;
  examples?: boolean[];
} & CommonOptions;

export function BooleanValidation(
  _options: BooleanOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    IsBoolean(validationOptions)(...args);
    CommonValidation(_options, validationOptions)(...args);
  };
}
