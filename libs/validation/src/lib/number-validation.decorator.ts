import { isTrueThen } from '@bmod/is';
import type { NumberOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import { IsNumber } from 'class-validator';
import { CommonNumberValidation } from './common-number-validation.decorator.js';
import { NumberFormatValidation } from './number-format.validation.decorator.js';
import { NumberTransformer } from './transformers/number.transformer.js';

export function NumberValidation(
  options: NumberOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const vo = validationOptions;
    IsNumber(undefined, vo)(...args);
    CommonNumberValidation(options, vo)(...args);
    NumberFormatValidation(options, vo)(...args);

    isTrueThen(options.transform, () => NumberTransformer()(...args));
  };
}
