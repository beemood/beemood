import type { CommonPropertyOptions } from '@bmod/types';
import { Expose } from 'class-transformer';
import type { ValidationOptions } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { JSONTransformer } from '../transformers/json-transformer.js';

/**
 * Common property decorator that covers the common options
 * @param options PropertyOptions
 * @param validationOptions ValidationOptions
 * @returns PropertyDecorator
 */
export function CommonProperty(
  options: CommonPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const { required, expose, transform } = options;

    if (required != true) {
      IsOptional(validationOptions)(...args);
    } else {
      IsNotEmpty(validationOptions)(...args);
    }

    if (expose != false) {
      Expose()(...args);
    }

    if (transform == true) {
      JSONTransformer()(...args);
    }
  };
}
