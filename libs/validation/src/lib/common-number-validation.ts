import { Max, Min, ValidationOptions } from 'class-validator';
import { CommonOptions } from './common-validation.js';

export type NumberFormat = 'rate' | 'fraction' | 'percent';

export type CommonNumberOptions = {
  minimum?: number;
  maximum?: number;
  format?: NumberFormat;
  defaultValue?: number;
} & CommonOptions;

export function CommonNumberValidation(
  options: CommonNumberOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const { minimum, maximum, format } = options;

    if (minimum != undefined) Min(minimum, validationOptions)(...args);
    if (maximum != undefined) Max(maximum, validationOptions)(...args);

    if (format != undefined) {
      switch (format) {
        case 'rate': {
          Min(0, validationOptions)(...args);
          Max(5, validationOptions)(...args);
          break;
        }
        case 'fraction': {
          Min(0, validationOptions)(...args);
          Max(1, validationOptions)(...args);
          break;
        }
        case 'percent': {
          Min(0, validationOptions)(...args);
          Max(100, validationOptions)(...args);
          break;
        }
      }
    }
  };
}
