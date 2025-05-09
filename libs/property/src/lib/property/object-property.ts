import type { ObjectPropertyOptions } from '@bmod/types';
import { Type } from 'class-transformer';
import type { ValidationOptions } from 'class-validator';
import { IsObject, ValidateNested } from 'class-validator';
import { CommonProperty } from './common-property.js';
/**
 * Dto model property decorator ( use Property decorator instead )
 * @param options PropertyOptions
 * @param validationOptions ValidationOptions
 * @returns PropertyDecorator
 */
export function ObjectProperty(
  options: ObjectPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    CommonProperty(options, validationOptions)(...args);
    IsObject(validationOptions)(...args);
    Type(options.target)(...args);
    ValidateNested(validationOptions)(...args);
  };
}
