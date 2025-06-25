import type { StringPropertyOptions } from '@beemood/interface';
import type { ValidationOptions } from 'class-validator';
import {
  isDefined,
  IsEmail,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export function StringValidation(
  options: StringPropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    IsString(validationOptions)(...args);

    const { minLength, maxLength, stringFormat } = options;

    if (isDefined(maxLength)) MaxLength(maxLength)(...args);
    if (isDefined(minLength)) MinLength(minLength)(...args);

    if (stringFormat === 'email') {
      IsEmail()(...args);
    } else if (stringFormat === 'barcode') {
      MinLength(8, validationOptions)(...args);
      MaxLength(13, validationOptions)(...args);
      IsNumberString({}, validationOptions)(...args);
    } else if (stringFormat === 'password') {
      IsStrongPassword({}, validationOptions)(...args);
    } else if (stringFormat === 'phone') {
      IsPhoneNumber(undefined, validationOptions)(...args);
    } else if (stringFormat === 'uuid4') {
      IsUUID('4', validationOptions)(...args);
    }
  };
}
