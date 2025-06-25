import type { CommonPropertyOptions } from '@beemood/interface';
import { Expose } from 'class-transformer';
import type { ValidationOptions } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';

export function CommonValidation(
  options: CommonPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const { required, expose } = options;

    if (required === true) {
      IsNotEmpty(validationOptions)(...args);
    } else {
      IsOptional(validationOptions)(...args);
    }
    if (expose !== false) Expose()(...args);
  };
}
