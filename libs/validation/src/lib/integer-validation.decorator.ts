import { isTrueThen } from '@bmod/is';
import type { IntegerOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import { IsInt } from 'class-validator';
import { CommonNumberValidation } from './common-number-validation.decorator.js';
import { NumberFormatValidation } from './number-format.validation.decorator.js';
import { IntegerTransformer } from './transformers/integer.transformer.js';

export function IntegerValidation(
  options: IntegerOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const vo = validationOptions;
    IsInt(vo)(...args);
    CommonNumberValidation(options, vo)(...args);
    NumberFormatValidation(options, vo)(...args);
    isTrueThen(options.transform, () => IntegerTransformer()(...args));
  };
}
