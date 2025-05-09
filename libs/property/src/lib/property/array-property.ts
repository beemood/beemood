import type { ArrayPropertyOptions, PropertyOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import { IsArray } from 'class-validator';
import { CommonProperty } from './common-property.js';

/**
 * Dto model property decorator ( use Property decorator instead )
 * @param options PropertyOptions
 * @param validationOptions ValidationOptions
 * @returns PropertyDecorator
 */
export function ArrayProperty<T extends PropertyOptions>(
  options: ArrayPropertyOptions<T>,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    CommonProperty(options, validationOptions)(...args);
    IsArray(validationOptions)(...args);
  };
}
