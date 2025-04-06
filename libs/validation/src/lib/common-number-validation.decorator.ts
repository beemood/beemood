import { isThen } from '@bmod/is';
import type { IntegerOptions, NumberOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import { IsEnum, Max, Min } from 'class-validator';

export function CommonNumberValidation(
  options: NumberOptions | IntegerOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const _v = validationOptions;
    isThen(options.minimum, (v) => Min(v, _v)(...args));
    isThen(options.maximum, (v) => Max(v, _v)(...args));
    isThen(options.enum, (e) => IsEnum(e, _v)(...args));
  };
}
