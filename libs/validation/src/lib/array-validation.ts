import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  ValidationOptions,
} from 'class-validator';
import { StringOptions } from './string-validation.js';
import { NumberOptions } from './number-validation.js';
import { IntegerOptions } from './integer-validation.js';
import { BooleanOptions } from './boolean-validation.js';
import { ObjectOptions } from './object-validation.js';
import { CommonOptions, CommonValidation } from './common-validation.js';

export type PropertyValidationOptions =
  | StringOptions
  | NumberOptions
  | IntegerOptions
  | BooleanOptions
  | ObjectOptions
  | ArrayOptions;

export type ArrayOptions = {
  type: 'array';
  minSize?: number;
  maxSize?: number;
  items: PropertyValidationOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  example?: any;
  examples?: any[];
} & CommonOptions;

/**
 *
 * @param options options {@link ArrayOptions}
 * @param validationOptions valiation options from class-valiator
 * @returns
 */
export function ArrayValidation(
  options: ArrayOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    IsArray(validationOptions)(...args);
    CommonValidation(options, validationOptions)(...args);
    const { minSize, maxSize } = options;
    if (minSize != undefined) ArrayMinSize(minSize, validationOptions)(...args);
    if (maxSize != undefined) ArrayMaxSize(maxSize, validationOptions)(...args);
  };
}
