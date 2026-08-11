import { ObjectType, PropOptions, PropType, PropTypes } from '@beemood/types';
import { isNotDefined } from '@beemood/utils';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  Equals,
  IsBoolean,
  IsDefined,
  isDefined,
  IsEmail,
  IsIn,
  IsInt,
  IsISO8601,
  IsJSON,
  IsOptional,
  IsStrongPassword,
  IsUUID,
  Matches,
  Max,
  MaxDate,
  MaxLength,
  Min,
  MinDate,
  MinLength,
  NotEquals,
  ValidationOptions,
  ValidatorOptions,
} from 'class-validator';
import { getPropType } from './get-prop-type.js';
import { BufferMaxLength } from './validations/buffer-max-length.js';
import { BufferMinLength } from './validations/buffer-min-length.js';
import { LessThanOrEqualTo } from './validations/less-than-or-equal-to.js';
import { LessThan } from './validations/less-than.js';
import { MoreThanOrEqualTo } from './validations/more-than-or-equal-to.js';
import { MoreThan } from './validations/more-than.js';

export type NormalizedOptions = PropOptions & {
  __typeName: string;
  type: () => ObjectType;
};

export class __TypeError extends Error {
  constructor() {
    super('Type is not defined');
    throw this;
  }
}

/**
 * Infer the property type and check required type options.
 * @param options
 * @param args
 * @returns
 */
export function toNormalizedOptions(
  options: Readonly<PropOptions>,
  ...args: Parameters<PropertyDecorator>
): NormalizedOptions {
  const inferedType = getPropType(...args);
  const inferedTypeName = inferedType.name;
  const nOptions: NormalizedOptions = {
    ...options,
    type: () => __TypeError,
    __typeName: inferedTypeName,
  };

  nOptions.required ??= false;

  if (inferedTypeName === PropTypes.Array) {
    if (isNotDefined(options.type)) {
      throw new Error(`type is required for arrary properties`);
    }
    nOptions.isArray = true;
  } else {
    nOptions.type = () => inferedType;
  }

  return nOptions;
}

export function toApiPropertyOptions(
  options: NormalizedOptions,
): ApiPropertyOptions {
  const nOptions: ApiPropertyOptions = {
    type: options.type,
    required: !!options.required,
    isArray: !!options.isArray,
  };

  return nOptions;
}

export function __RangeValidation(
  min: number,
  max: number,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    Min(min, validationOptions)(...args);
    Max(max, validationOptions)(...args);
  };
}

export function __CommonValidation(
  options: NormalizedOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];

    if (options.required) {
      acc.push(IsDefined(validationOptions));
    } else {
      acc.push(IsOptional(validationOptions));
    }

    if (isDefined(options.isIn)) {
      acc.push(IsIn(options.isIn, validationOptions));
    }

    if (isDefined(options.equalsTo)) {
      acc.push(Equals(options.equalsTo, validationOptions));
    }

    if (isDefined(options.not?.equalsTo)) {
      acc.push(NotEquals(options.not.equalsTo));
    }

    acc.forEach((decorator) => decorator(...args));
  };
}
/**
 * String property decorator
 */
export function __StringValidation(
  options: NormalizedOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    if (options.__typeName !== PropTypes.String) {
      throw new Error(`__typeName is not String`);
    }

    const acc: PropertyDecorator[] = [];

    // Minlegnth
    if (isDefined(options.moreThan)) {
      if (typeof options.moreThan === 'number') {
        acc.push(MinLength(options.moreThan - 1, validationOptions));
      }
    }

    // Max length
    if (isDefined(options.lessThan)) {
      if (typeof options.lessThan === 'number') {
        acc.push(MaxLength(options.lessThan - 1, validationOptions));
      }
    }

    // Minlegnth
    if (isDefined(options.moreThanOrEqualTo)) {
      if (typeof options.moreThanOrEqualTo === 'number') {
        acc.push(MinLength(options.moreThanOrEqualTo, validationOptions));
      }
    }

    // Max length
    if (isDefined(options.lessThanOrEqualTo)) {
      if (typeof options.lessThanOrEqualTo === 'number') {
        acc.push(MaxLength(options.lessThanOrEqualTo, validationOptions));
      }
    }

    // String format validation
    if (options.format)
      switch (options.format) {
        case 'json': {
          acc.push(IsJSON(validationOptions));
          break;
        }
        case 'email': {
          acc.push(IsEmail(undefined, validationOptions));
          break;
        }
        case 'password': {
          acc.push(
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
          acc.push(IsUUID('4', validationOptions));
          break;
        }
        case 'uuid7': {
          acc.push(IsUUID('7', validationOptions));
          break;
        }
        case 'iso8601': {
          acc.push(IsISO8601({ strict: true }, validationOptions));
          break;
        }
        case 'date': {
          // Matches MM-DD-YYYY (01-12 for month, 01-31 for day, 1000-9999 for year)
          acc.push(
            Matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/, {
              message: `$property should be a valid date format "MM-DD-YYYY"`,
            }),
          );
          break;
        }
        case 'time': {
          // Matches 12-hour format HH:MM AM/PM (01-12 for hour, 00-59 for minute)
          acc.push(
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
          throw new Error(
            `${options.format} is not supported by ${options.__typeName}`,
          );
        }
      }

    acc.forEach((decorator) => decorator(...args));
  };
}

export function __NumberValidation(
  options: NormalizedOptions,
  validationOptions: ValidatorOptions,
): PropertyDecorator {
  return (...args) => {
    if (options.__typeName !== PropTypes.Number) {
      throw new Error(`${options.__typeName} is not Number`);
    }

    const acc: PropertyDecorator[] = [];

    // Minlegnth
    if (isDefined(options.moreThan)) {
      if (typeof options.moreThan === 'number') {
        acc.push(Min(options.moreThan - 1, validationOptions));
      } else if (typeof options.moreThan === 'string') {
        acc.push(MoreThan(options.moreThan, validationOptions));
      }
    }

    // Max length
    if (isDefined(options.lessThan)) {
      if (typeof options.lessThan === 'number') {
        acc.push(Max(options.lessThan - 1, validationOptions));
      } else if (typeof options.lessThan === 'string') {
        acc.push(LessThan(options.lessThan, validationOptions));
      }
    }

    // Minlegnth
    if (isDefined(options.moreThanOrEqualTo)) {
      if (typeof options.moreThanOrEqualTo === 'number') {
        acc.push(Min(options.moreThanOrEqualTo, validationOptions));
      } else if (typeof options.moreThanOrEqualTo === 'string') {
        acc.push(
          MoreThanOrEqualTo(options.moreThanOrEqualTo, validationOptions),
        );
      }
    }

    // Max length
    if (isDefined(options.lessThanOrEqualTo)) {
      if (typeof options.lessThanOrEqualTo === 'number') {
        acc.push(Max(options.lessThanOrEqualTo, validationOptions));
      } else if (typeof options.lessThanOrEqualTo === 'string') {
        acc.push(
          LessThanOrEqualTo(options.lessThanOrEqualTo, validationOptions),
        );
      }
    }

    if (options.format) {
      switch (options.format) {
        case 'int': {
          acc.push(IsInt(validationOptions));

          break;
        }
        case 'rate': {
          acc.push(__RangeValidation(0, 5, validationOptions));

          break;
        }
        case 'percent': {
          acc.push(__RangeValidation(0, 100, validationOptions));
          break;
        }
        case 'fraction': {
          acc.push(__RangeValidation(0, 1, validationOptions));
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

    acc.forEach((decorator) => decorator(...args));
  };
}

export function __BooleanValidation(
  _options: NormalizedOptions,
  _validationOptions: ValidationOptions,
): PropertyDecorator {
  return () => {
    // IsBoolean(validationOptions)(...args);
  };
}

export function __DateValidation(
  options: NormalizedOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];

    acc.push(IsBoolean(validationOptions));

    if (isDefined(options.moreThan)) {
      if (typeof options.moreThan === 'function') {
        acc.push(MinDate(options.moreThan, validationOptions));
      } else {
        // - [ ] add More than date vlidation decorator
      }
    }

    if (isDefined(options.lessThan)) {
      if (typeof options.lessThan === 'function') {
        acc.push(MaxDate(options.lessThan, validationOptions));
      } else if (typeof options.lessThan === 'string') {
        // - [ ] Add LessThan property valition decoartor
      }
    }
    acc.forEach((decorator) => decorator(...args));
  };
}

export function __BufferValidation(
  options: NormalizedOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    if (options.__typeName !== PropTypes.Buffer) {
      throw new Error(`${options.__typeName} is not Buffer`);
    }

    const acc: PropertyDecorator[] = [];

    if (isDefined(options.moreThan)) {
      if (typeof options.moreThan === 'number') {
        acc.push(BufferMinLength(options.moreThan + 1, validationOptions));
      }
    }

    if (isDefined(options.lessThan)) {
      if (typeof options.lessThan === 'number') {
        acc.push(BufferMaxLength(options.lessThan + 1, validationOptions));
      }
    }

    if (isDefined(options.moreThanOrEqualTo)) {
      if (typeof options.moreThanOrEqualTo === 'number') {
        acc.push(BufferMinLength(options.moreThanOrEqualTo, validationOptions));
      }
    }

    if (isDefined(options.lessThanOrEqualTo)) {
      if (typeof options.lessThanOrEqualTo === 'number') {
        acc.push(BufferMaxLength(options.lessThanOrEqualTo, validationOptions));
      }
    }

    acc.forEach((decorator) => decorator(...args));
  };
}

export function PropValidation(
  options: NormalizedOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];

    switch (options.__typeName as PropType) {
      case 'String': {
        acc.push(__StringValidation(options, validationOptions));
        break;
      }
      case 'Number': {
        acc.push(__NumberValidation(options, validationOptions));
        break;
      }
      case 'Boolean': {
        acc.push(__BooleanValidation(options, validationOptions));
        break;
      }
      case 'Date': {
        acc.push(__DateValidation(options, validationOptions));
        break;
      }
      case 'Buffer': {
        acc.push(__BufferValidation(options, validationOptions));
        break;
      }
      case 'BigInt':
      case 'Array': {
        // -  [ ]
      }
    }

    acc.forEach((decorator) => decorator(...args));
  };
}

export function Prop(options: PropOptions = {}): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];
    const nOptions = toNormalizedOptions(options, ...args);

    const validationOptions: ValidationOptions = { each: nOptions.isArray };

    acc.push(__CommonValidation(nOptions, validationOptions));

    acc.push(PropValidation(nOptions));
    acc.push(ApiProperty(toApiPropertyOptions(nOptions)));
    if (options.exclude !== true) {
      acc.push(Expose({ groups: options.groups }));
    }

    acc.forEach((d) => d(...args));
  };
}
