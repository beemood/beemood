import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  MinLength,
  ValidationOptions,
} from 'class-validator';
import { CommonOptions } from './common-validation.js';

export type StringFormat = 'email' | 'password' | 'uuid' | 'phone';

export type StringOptions = {
  type: 'string';
  minLengty?: number;
  maxLength?: number;
  format?: StringFormat;
  defaultValue?: string;
} & CommonOptions;

export function StringValidation(
  options: StringOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    IsString(validationOptions)(...args);

    const { minLengty, maxLength, format } = options;

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
  };
}
