import { isTrueThen } from '@bmod/is';
import type { BooleanOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import { IsBoolean } from 'class-validator';
import { BooleanTransformer } from './transformers/boolean.transformer.js';

export function BooleanValidation(
  options: BooleanOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    // - [ ] add string validation
    const _v = validationOptions;
    IsBoolean(_v)(...args);
    isTrueThen(options.transform, () => BooleanTransformer()(...args));
  };
}
