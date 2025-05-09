import type { IntegerPropertyOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import { IsInt } from 'class-validator';
import { CommonNumberProperty } from './common-number-property.js';

/**
 * Dto model property decorator ( use Property decorator instead )
 * @param options PropertyOptions
 * @param validationOptions ValidationOptions
 * @returns PropertyDecorator
 */
export function IntegerProperty(
  options: IntegerPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    CommonNumberProperty(options, validationOptions)(...args);
    IsInt(validationOptions)(...args);
  };
}
