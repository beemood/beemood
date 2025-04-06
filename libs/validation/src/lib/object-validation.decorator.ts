import { isTrueThen } from '@bmod/is';
import type { ObjectOptions } from '@bmod/types';
import { Type } from 'class-transformer';
import type { ValidationOptions } from 'class-validator';
import { IsObject, ValidateNested } from 'class-validator';
import { JSONTransformer } from './transformers/json.transformer.js';

export function ObjectValidation(
  options: ObjectOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const vo = validationOptions;
    IsObject(vo)(...args);
    ValidateNested(vo)(...args);
    Type(options.target)(...args);
    isTrueThen(options.transform, () => JSONTransformer()(...args));
  };
}
