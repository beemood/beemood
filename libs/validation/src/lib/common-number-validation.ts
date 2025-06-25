import type { CommonNumberPropertyOptions } from '@beemood/interface';
import type { ValidationOptions } from 'class-validator';
import { isDefined, Max, Min } from 'class-validator';

export function CommonNumberValidation(
  options: CommonNumberPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const { minimum, maximum } = options;

    if (isDefined(minimum)) Min(minimum, validationOptions)(...args);
    if (isDefined(maximum)) Max(maximum, validationOptions)(...args);
  };
}
