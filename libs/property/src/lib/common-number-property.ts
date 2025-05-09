import type { CommonNumberPropertyOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import { Max, Min } from 'class-validator';
import { CommonProperty } from './common-property.js';

/**
 * Common property decorator that covers the common number options
 * @param options PropertyOptions
 * @param validationOptions ValidationOptions
 * @returns PropertyDecorator
 */
export function CommonNumberProperty(
  options: CommonNumberPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    CommonProperty(options, validationOptions)(...args);

    const { minimum, maximum } = options;

    if (minimum != undefined) Min(minimum, validationOptions)(...args);
    if (maximum != undefined) Max(maximum, validationOptions)(...args);
  };
}
