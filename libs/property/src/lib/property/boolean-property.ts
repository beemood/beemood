import type { BooleanPropertyOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import { IsBoolean } from 'class-validator';
import { CommonProperty } from './common-property.js';

/**
 * Dto model property decorator ( use Property decorator instead )
 * @param options PropertyOptions
 * @param validationOptions ValidationOptions
 * @returns PropertyDecorator
 */
export function BooleanProperty(
  options: BooleanPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    CommonProperty(options, validationOptions)(...args);
    IsBoolean(validationOptions)(...args);
  };
}
