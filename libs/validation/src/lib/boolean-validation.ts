import type { BooleanPropertyOptions } from '@beemood/interface';
import { IsBoolean, type ValidationOptions } from 'class-validator';

export function BooleanValidation(
  _options: BooleanPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    IsBoolean(validationOptions)(...args);
  };
}
