import type { StringPropertyOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import {
  IsDateString,
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength
} from 'class-validator';
import { TrimTransformer } from '../transformers/trim-transformer.js';
import { CommonProperty } from './common-property.js';
/**
 * Dto model property decorator ( use Property decorator instead )
 * @param options PropertyOptions
 * @param validationOptions ValidationOptions
 * @returns PropertyDecorator
 */
export function StringProperty(
  options: StringPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    CommonProperty(options, validationOptions)(...args);
    IsString(validationOptions)(...args);

    const { minLength, maxLength, format } = options;

    if (minLength != undefined)
      MinLength(minLength, validationOptions)(...args);
    if (maxLength != undefined)
      MaxLength(maxLength, validationOptions)(...args);

    if (options.trim == true) {
      TrimTransformer()(...args);
    }

    if (format != undefined) {
      if (format == 'email') IsEmail({}, validationOptions)(...args);

      if (format == 'password')
        IsStrongPassword({}, validationOptions)(...args);

      if (format == 'date') IsDateString({}, validationOptions)(...args);
    }
  };
}
