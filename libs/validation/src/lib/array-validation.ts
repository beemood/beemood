import type { ArrayPropertyOptions } from '@beemood/interface';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  isDefined,
  type ValidationOptions,
} from 'class-validator';

export function ArrayValidation(
  options: ArrayPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    IsArray(validationOptions)(...args);

    const { maxSize, minSize } = options;

    if (isDefined(maxSize)) ArrayMaxSize(maxSize, validationOptions)(...args);
    if (isDefined(minSize)) ArrayMinSize(minSize, validationOptions)(...args);
  };
}
