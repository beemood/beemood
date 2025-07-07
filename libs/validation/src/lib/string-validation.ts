import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  MinLength,
  ValidationOptions,
} from 'class-validator';
import { CommonOptions, CommonValidation } from './common-validation.js';
import { TrimTransformer } from './trim-transformer.js';

export type StringFormat = 'email' | 'password' | 'uuid' | 'phone';

export type StringOptions = {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  format?: StringFormat;
  defaultValue?: string;
  trim?: boolean;
} & CommonOptions;

export function StringValidation(
  options: StringOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    IsString(validationOptions)(...args);

    CommonValidation(options, validationOptions)(...args);

    const { minLength: minLengty, maxLength, format, trim, required } = options;

    if (required == true) {
      IsNotEmpty(validationOptions)(...args);
    }
    if (minLengty != undefined) {
      MinLength(minLengty, validationOptions)(...args);
    }

    if (maxLength != undefined) {
      MaxLength(maxLength, validationOptions)(...args);
    }

    if (format != undefined) {
      switch (format) {
        case 'email': {
          IsEmail({}, validationOptions)(...args);
          break;
        }
        case 'password': {
          IsStrongPassword({}, validationOptions)(...args);
          break;
        }
        case 'uuid': {
          IsUUID('4', validationOptions)(...args);
          break;
        }
        case 'phone': {
          IsPhoneNumber(undefined, validationOptions)(...args);
          break;
        }
      }
    }

    if (trim) {
      TrimTransformer()(...args);
    }
  };
}
