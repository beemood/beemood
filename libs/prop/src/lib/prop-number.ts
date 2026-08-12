import { PropTypes } from '@beemood/types';
import { FactoryCollector } from '@beemood/utils';
import { IsInt, Max, Min, ValidatorOptions, isDefined } from 'class-validator';
import { NormalizedOptions } from './to-normalized-options.js';
import { LessThanOrEqualTo } from './validations/less-than-or-equal-to.js';
import { LessThan } from './validations/less-than.js';
import { MoreThanOrEqualTo } from './validations/more-than-or-equal-to.js';
import { MoreThan } from './validations/more-than.js';
import { __RangeValidation } from './validations/range.js';

export function __PropNumber(
  options: NormalizedOptions,
  validationOptions: ValidatorOptions,
): PropertyDecorator {
  return (...args) => {
    if (options.__typeName !== PropTypes.Number) {
      throw new Error(`${options.__typeName} is not Number`);
    }

    const acc = new FactoryCollector<PropertyDecorator>();

    // Minlegnth
    if (isDefined(options.moreThan)) {
      if (typeof options.moreThan === 'number') {
        acc.add(Min(options.moreThan - 1, validationOptions));
      } else if (typeof options.moreThan === 'string') {
        acc.add(MoreThan(options.moreThan, validationOptions));
      }
    }

    // Max length
    if (isDefined(options.lessThan)) {
      if (typeof options.lessThan === 'number') {
        acc.add(Max(options.lessThan - 1, validationOptions));
      } else if (typeof options.lessThan === 'string') {
        acc.add(LessThan(options.lessThan, validationOptions));
      }
    }

    // Minlegnth
    if (isDefined(options.moreThanOrEqualTo)) {
      if (typeof options.moreThanOrEqualTo === 'number') {
        acc.add(Min(options.moreThanOrEqualTo, validationOptions));
      } else if (typeof options.moreThanOrEqualTo === 'string') {
        acc.add(
          MoreThanOrEqualTo(options.moreThanOrEqualTo, validationOptions),
        );
      }
    }

    // Max length
    if (isDefined(options.lessThanOrEqualTo)) {
      if (typeof options.lessThanOrEqualTo === 'number') {
        acc.add(Max(options.lessThanOrEqualTo, validationOptions));
      } else if (typeof options.lessThanOrEqualTo === 'string') {
        acc.add(
          LessThanOrEqualTo(options.lessThanOrEqualTo, validationOptions),
        );
      }
    }

    if (options.format) {
      switch (options.format) {
        case 'int': {
          acc.add(IsInt(validationOptions));

          break;
        }
        case 'rate': {
          acc.add(__RangeValidation(0, 5, validationOptions));

          break;
        }
        case 'percent': {
          acc.add(__RangeValidation(0, 100, validationOptions));
          break;
        }
        case 'fraction': {
          acc.add(__RangeValidation(0, 1, validationOptions));
          break;
        }

        case 'json':
        case 'email':
        case 'password':
        case 'uuid4':
        case 'uuid7':
        case 'iso8601':
        case 'date':
        case 'time': {
          throw new Error(
            `${options.format} is not supported by ${options.__typeName}`,
          );
        }
      }
    }

    acc.collect.forEach((d) => d(...args));
  };
}
