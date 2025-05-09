import type { NumberPropertyOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import { IsNumber } from 'class-validator';
import { CommonNumberProperty } from './common-number-property.js';

/**
 * Dto model property decorator ( use Property decorator instead )
 * @param options PropertyOptions
 * @param validationOptions ValidationOptions
 * @returns PropertyDecorator
 */
export function NumberProperty(
  options: NumberPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    CommonNumberProperty(options, validationOptions)(...args);
    IsNumber({}, validationOptions)(...args);
  };
}
