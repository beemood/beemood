import { isThen, isTrueThen } from '@bmod/is';
import type { ArrayOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import { ArrayMaxSize, ArrayMinSize, IsArray } from 'class-validator';
import { JSONTransformer } from './transformers/json.transformer.js';

export function ArrayValidation(
  options: ArrayOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const vo = validationOptions;
    IsArray(validationOptions)(...args);
    isThen(options.minItems, (v) => ArrayMinSize(v, vo)(...args));
    isThen(options.maxItems, (v) => ArrayMaxSize(v, vo)(...args));
    isTrueThen(options.transform, () => JSONTransformer()(...args));
  };
}
