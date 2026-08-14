import { ApiPropertyOptions } from '@nestjs/swagger';
import {
    IsDateString,
    IsEmail,
    IsIn,
    IsIP,
    IsNumberString,
    IsStrongPassword,
    IsUrl,
    IsUUID,
    ValidationOptions,
} from 'class-validator';

export function PropStringFormat(
  format: ApiPropertyOptions['format'],
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    switch (format) {
      case 'int64':
      case 'byte':
      case 'double':
      case 'float':
      case 'int32': {
        IsNumberString({}, validationOptions)(...args);
        break;
      }
      case 'binary': {
        IsIn(['1', '0'], validationOptions)(...args);
        break;
      }
      case 'time':
      case 'date-time':
      case 'date': {
        IsDateString({}, validationOptions)(...args);
        break;
      }
      case 'password': {
        IsStrongPassword({}, validationOptions)(...args);
        break;
      }
      case 'email': {
        IsEmail({}, validationOptions)(...args);
        break;
      }
      case 'ipv4': {
        IsIP('4', validationOptions)(...args);
        break;
      }
      case 'ipv6': {
        IsIP('6', validationOptions)(...args);
        break;
      }
      case 'uuid': {
        IsUUID('all')(...args);
        break;
      }
      case 'uri': {
        IsUrl(undefined, validationOptions)(...args);
        break;
      }
      case 'regex':
      case 'idn-email':
      case 'hostname':
      case 'idn-hostname':
      case 'duration':
      case 'uri-reference':
      case 'uri-template':
      case 'iri':
      case 'iri-reference':
      case 'json-pointer':
      case 'relative-json-pointer':
    }
  };
}
