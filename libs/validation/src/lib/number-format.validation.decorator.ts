import { isThen } from '@bmod/is';
import type { IntegerOptions, NumberOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import { Max, Min } from 'class-validator';

export function NumberFormatValidation(
  options: NumberOptions | IntegerOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const vo = validationOptions;
    const numberFormat = options.numberFormat;
    isThen(numberFormat, (format) => {
      switch (format) {
        case 'positive':
          Min(0, vo)(...args);
          break;
        case 'fraction':
          Max(1, vo)(...args);
          Min(-1, vo)(...args);
          break;
        case 'rate':
          Max(5, vo)(...args);
          Min(0, vo)(...args);
          break;
        case 'percent':
          Max(100, vo)(...args);
          Min(0, vo)(...args);
          break;
        case 'currency':
          Min(0, vo)(...args);
          break;
      }
    });
  };
}
