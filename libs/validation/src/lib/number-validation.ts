import { IsNumber, ValidationOptions } from 'class-validator';
import {
  CommonNumberOptions,
  CommonNumberValidation,
} from './common-number-validation.js';

export type NumberOptions = {
  type: 'number';
} & CommonNumberOptions;

export function NumberValidation(
  options: NumberOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    IsNumber()(...args);
    CommonNumberValidation(options, validationOptions)(...args);
  };
}
