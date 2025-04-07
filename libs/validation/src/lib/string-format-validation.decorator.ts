import { isThen } from '@bmod/is';
import type { StringOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import {
  IsAlpha,
  IsAlphanumeric,
  IsBase32,
  IsBase64,
  IsBooleanString,
  IsCreditCard,
  IsCurrency,
  IsDataURI,
  IsDateString,
  IsEAN,
  IsEmail,
  IsHSL,
  IsHash,
  IsHexColor,
  IsIBAN,
  IsIP,
  IsISBN,
  IsISIN,
  IsISO8601,
  IsISSN,
  IsNumberString,
  IsPhoneNumber,
  IsStrongPassword,
  IsTaxId,
  IsUUID,
  IsUrl,
  MaxLength,
} from 'class-validator';

export function StringFormatValidation(
  options: StringOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const vo = validationOptions;
    const { stringFormat } = options;

    isThen(stringFormat, (format) => {
      switch (format) {
        case 'date':
          IsISO8601({ strict: true }, vo)(...args);
          break;
        case 'email':
          IsEmail({}, vo)(...args);
          break;
        case 'password':
          IsStrongPassword({}, vo)(...args);
          break;
        case 'uuid':
          IsUUID('4', vo)(...args);
          break;
        case 'phone':
          IsPhoneNumber(undefined, vo)(...args);
          break;
        case 'credit-card':
          IsCreditCard(vo)(...args);
          break;
        case 'url':
          IsUrl({}, vo)(...args);
          break;
        case 'ip4':
          IsIP('4', vo)(...args);
          break;
        case 'ip6':
          IsIP('6', vo)(...args);
          break;

        case 'alpha':
          IsAlpha(undefined, vo)(...args);
          break;
        case 'alphanumeric':
          IsAlphanumeric(undefined, vo)(...args);
          break;
        case 'base32':
          IsBase32(vo)(...args);
          break;
        case 'base64':
          IsBase64(undefined, vo)(...args);
          break;
        case 'boolean-string':
          IsBooleanString(vo)(...args);
          break;
        case 'number-string':
          IsNumberString(undefined, vo)(...args);
          break;
        case 'date-string':
          IsDateString({ strict: true }, vo)(...args);
          break;
        case 'data-uri':
          IsDataURI(vo)(...args);
          break;
        case 'currency':
          IsCurrency(undefined, vo)(...args);
          break;
        case 'ean':
          IsEAN(vo)(...args);
          break;
        case 'hsl':
          IsHSL(vo)(...args);
          break;
        case 'hash':
          IsHash('sha256', vo)(...args);
          break;
        case 'hexcolor':
          IsHexColor(vo)(...args);
          break;
        case 'iban':
          IsIBAN(vo)(...args);
          break;
        case 'isin':
          IsISIN(vo)(...args);
          break;
        case 'isbn':
          IsISBN(undefined, vo)(...args);
          break;
        case 'issn':
          IsISSN(undefined, vo)(...args);
          break;
        case 'taxid':
          IsTaxId(undefined, vo)(...args);
          break;

        case 'name': {
          MaxLength(50)(...args);
          break;
        }
        case 'description': {
          MaxLength(400)(...args);
          break;
        }
        case 'article': {
          MaxLength(1000)(...args);
          break;
        }
        default:
          throw new Error(
            `The format, ${format}, does not match any defined format `
          );
      }
    });
  };
}
