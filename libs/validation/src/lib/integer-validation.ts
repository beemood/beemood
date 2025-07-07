import { IsInt, ValidatorOptions } from 'class-validator';
import {
  CommonNumberOptions,
  CommonNumberValidation,
} from './common-number-validation.js';

export type IntegerOptions = {
  type: 'integer';
} & CommonNumberOptions;

export function IntegerValidation(
  options: IntegerOptions,
  validationOptions?: ValidatorOptions
): PropertyDecorator {
  return (...args) => {
    IsInt(validationOptions)(...args);
    CommonNumberValidation(options, validationOptions)(...args);
  };
}
