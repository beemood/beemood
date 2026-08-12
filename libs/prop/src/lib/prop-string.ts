import { NotSupportedError } from '@beemood/errors';
import { PropTypes } from '@beemood/types';
import { FactoryCollector } from '@beemood/utils';
import {
  isDefined,
  IsEmail,
  IsISO8601,
  IsJSON,
  IsStrongPassword,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
  ValidationOptions,
} from 'class-validator';
import { NormalizedOptions } from './to-normalized-options.js';

/**
 * String property decorator
 */
export function __PropString(
  options: NormalizedOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    if (options.__typeName !== PropTypes.String) {
      throw new Error(`__typeName is not String`);
    }

    const acc = new FactoryCollector<PropertyDecorator>();

    // Minlegnth
    if (isDefined(options.moreThan)) {
      if (typeof options.moreThan === 'number') {
        acc.add(MinLength(options.moreThan - 1, validationOptions));
      }
    }

    // Max length
    if (isDefined(options.lessThan)) {
      if (typeof options.lessThan === 'number') {
        acc.add(MaxLength(options.lessThan - 1, validationOptions));
      }
    }

    // Minlegnth
    if (isDefined(options.moreThanOrEqualTo)) {
      if (typeof options.moreThanOrEqualTo === 'number') {
        acc.add(MinLength(options.moreThanOrEqualTo, validationOptions));
      }
    }

    // Max length
    if (isDefined(options.lessThanOrEqualTo)) {
      if (typeof options.lessThanOrEqualTo === 'number') {
        acc.add(MaxLength(options.lessThanOrEqualTo, validationOptions));
      }
    }

    // String format validation
    if (options.format)
      switch (options.format) {
        case 'json': {
          acc.add(IsJSON(validationOptions));
          break;
        }
        case 'email': {
          acc.add(IsEmail(undefined, validationOptions));
          break;
        }
        case 'password': {
          acc.add(
            IsStrongPassword(
              {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
              },
              validationOptions,
            ),
          );
          break;
        }
        case 'uuid4': {
          acc.add(IsUUID('4', validationOptions));
          break;
        }
        case 'uuid7': {
          acc.add(IsUUID('7', validationOptions));
          break;
        }
        case 'iso8601': {
          acc.add(IsISO8601({ strict: true }, validationOptions));
          break;
        }
        case 'date': {
          // Matches MM-DD-YYYY (01-12 for month, 01-31 for day, 1000-9999 for year)
          acc.add(
            Matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/, {
              message: `$property should be a valid date format "MM-DD-YYYY"`,
            }),
          );
          break;
        }
        case 'time': {
          // Matches 12-hour format HH:MM AM/PM (01-12 for hour, 00-59 for minute)
          acc.add(
            Matches(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, {
              message: `$property should be a valid time format "HH:MM AM/PM"`,
            }),
          );
          break;
        }
        case 'int':
        case 'rate':
        case 'percent':
        case 'fraction': {
          throw new NotSupportedError(
            `${options.format} is not supported by the string prop`,
          );
        }
      }

    acc.collect.forEach((decorator) => decorator(...args));
  };
}
