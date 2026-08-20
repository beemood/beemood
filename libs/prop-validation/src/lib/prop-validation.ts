import { EnumMatcher, PropertyMatcher } from '@beemood/utils';
import * as CT from 'class-transformer';
import * as CV from 'class-validator';
import { normalizePropValidationOptions } from './normalize-prop-validation-options.js';
import {
  type DependencyValidationOptions,
  type NormalizedPropValidationOptions,
  type PropValidationOptions,
} from './prop-validation-options.js';
import { MoreThan } from './validators/more-than.js';

function __IsString(
  validationOptions: CV.ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    CV.IsString(validationOptions)(...args);
    CT.Transform(({ value }) => {
      if (typeof value === 'string') {
        return value.replace(/[\s]{1,}/g, ' ').trim();
      }
      return value;
    })(...args);
  };
}

function __IsNumber(vo: CV.ValidationOptions): PropertyDecorator {
  return (...args) => {
    CT.Transform(({ value }) => {
      if (typeof value === 'string') {
        return Number(value);
      }
      return value;
    })(...args);

    CV.IsNumber({ allowNaN: false, allowInfinity: false }, vo)(...args);
  };
}

function __IsBoolean(vo: CV.ValidationOptions): PropertyDecorator {
  return (...args) => {
    CT.Transform(({ value }) => {
      if (typeof value === 'boolean') {
        return value;
      } else if (typeof value === 'string') {
        value = value.trim();
        if (/^y|true$/i.test(value)) {
          return true;
        } else if (/^n|false$/i.test(value)) {
          return false;
        } else if (!isNaN(Number(value))) {
          return Number(value) > 0;
        }
      } else if (typeof value === 'number') {
        return value > 0;
      }
      return value;
    })(...args);

    CV.IsBoolean(vo)(...args);
  };
}

function __IsDate(vo: CV.ValidationOptions): PropertyDecorator {
  return (...args) => {
    CT.Transform(({ value }) => {
      if (typeof value === 'string') {
        if (/^now$/i.test(value)) {
          return new Date();
        }
        return new Date(value);
      } else if (
        typeof value === 'number' &&
        /^\d{13}$/.test(value.toString())
      ) {
        return new Date(value);
      }
      return value;
    })(...args);

    CV.IsDate(vo)(...args);
  };
}

function __PropValidation(
  options: NormalizedPropValidationOptions = {},
  validationOptions: CV.ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const o = options;
    const vo = validationOptions;

    const matcher = new PropertyMatcher<
      NormalizedPropValidationOptions,
      PropertyDecorator
    >(o);

    if (o.type !== undefined) {
      if (o.__primitiveTypeName) {
        if (
          !['String', 'Number', 'Boolean', 'Date', 'Buffer'].includes(
            o.__primitiveTypeName,
          )
        ) {
          CV.ValidateNested(vo)(...args);
          CT.Type(o.type)(...args);
        } else {
          CT.Type(o.type)(...args);
        }
      }
    }

    matcher
      .isDefined('maxItems', (v) => CV.ArrayMaxSize(v))
      .isDefined('minItems', (v) => CV.ArrayMinSize(v))
      .isDefined('default', (v) =>
        CT.Transform(({ value }) => (value ??= v), o.transformOptions),
      )
      .isDefined('__primitiveTypeName', (v) => {
        return new EnumMatcher<
          'String' | 'Number' | 'Boolean' | 'Date' | 'Buffer',
          PropertyDecorator
        >(v)
          .isEqual('String', () => __IsString(vo))
          .isEqual('Number', () => __IsNumber(vo))
          .isEqual('Boolean', () => __IsBoolean(vo))
          .isEqual('Date', () => __IsDate(vo))
          .isEqual('Buffer', () => CV.IsInstance(Buffer, vo))
          .collect();
      })
      .isDefined('dependencies', (dependencies) => {
        return new PropertyMatcher<
          DependencyValidationOptions,
          PropertyDecorator
        >(dependencies)
          .isDefined('moreThan', (properties: string[]) =>
            properties.map((e) => MoreThan(e, vo)),
          )
          .isDefined('lessThan', (properties: string[]) =>
            properties.map((e) => MoreThan(e, vo)),
          )

          .collect();
      })
      .isDefined('minLength', (v) => CV.MinLength(v, vo))
      .isDefined('maxLength', (v) => CV.MaxLength(v, vo))
      .isDefined('minimum', (v) => CV.Min(v, vo))
      .isDefined('maximum', (v) => CV.Max(v, vo))
      .isDefined('isIn', (v) => {
        if (Array.isArray(v)) {
          return CV.IsIn(v, vo);
        } else {
          return CV.IsIn(Object.values(v));
        }
      })
      .isDefined('isNotIn', (v) => {
        if (Array.isArray(v)) {
          return CV.IsNotIn(v, vo);
        } else {
          return CV.IsNotIn(Object.values(v));
        }
      })
      .isDefined('pattern', (v) => CV.Matches(new RegExp(v), vo))
      .isDefined('format', (v) =>
        new EnumMatcher<PropValidationOptions['format'], PropertyDecorator>(v)
          .isEqual('email', () => CV.IsEmail(undefined, vo))
          .isEqual('password', () => CV.IsStrongPassword(undefined, vo))
          .isEqual('json', () => CV.IsJSON(vo))
          .isEqual('ean', () => CV.IsEAN(vo))
          .isEqual('uuid', () => CV.IsUUID('all', vo))
          .isEqual('uuid7', () => CV.IsUUID('4', vo))
          .isEqual('uuid4', () => CV.IsUUID('7', vo))
          .isEqual('date', () => CV.IsDateString(undefined, vo))
          .isEqual('date-time', () => CV.IsDateString(undefined, vo))
          .isEqual('time', () => CV.IsDateString(undefined, vo))
          .isEqual('uri', () => CV.IsUrl(undefined, vo))
          .isEqual('url', () => CV.IsUrl(undefined, vo))
          .isEqual('iban', () => CV.IsIBAN(undefined, vo))
          .isEqual('alpha', () => CV.IsAlpha(undefined, vo))
          .isEqual('alphanumeric', () => CV.IsAlphanumeric(undefined, vo))
          .isEqual('boolean', () => CV.IsBooleanString(vo))
          .isEqual('btc', () => CV.IsBtcAddress(vo))
          .isEqual('credit-card', () => CV.IsCreditCard(vo))
          .isEqual('hex-color', () => CV.IsHexColor(vo))
          .isEqual('hsl-color', () => CV.IsHSL(vo))
          .isEqual('hex-color', () => CV.IsHexColor(vo))
          .isEqual('lot-long', () => CV.IsLatLong(vo))
          .isEqual('latitude', () => CV.IsLatitude(vo))
          .isEqual('longitude', () => CV.IsLongitude(vo))
          .isEqual('mac', () => CV.IsMACAddress(vo))
          .isEqual('mac-address', () => CV.IsMACAddress(vo))
          .isEqual('magnet-uri', () => CV.IsMagnetURI(vo))
          .isEqual('passport', () => CV.IsPassportNumber('', vo))
          .isEqual('negative', () => CV.IsPositive(vo))
          .isEqual('positive', () => CV.IsNegative(vo))
          .isEqual('postal-code', () => CV.IsPostalCode('any', vo))
          .isEqual('semver', () => CV.IsSemVer(vo))
          .isEqual('taxid', () => CV.IsTaxId(undefined, vo))
          .isEqual('timezone', () => CV.IsTimeZone(vo))

          .collect(),
      )
      .collect()
      .forEach((d) => d(...args));
  };
}

export function PropValidation(
  options: PropValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const o = normalizePropValidationOptions(options, ...args);
    const isArray = o.isArray;

    if (o.exlude !== true) {
      CT.Expose(o.transformOptions)(...args);
    }

    if (o.required === true) {
      CV.IsDefined()(...args);
    } else {
      CV.IsOptional()(...args);
    }

    if (isArray === true) {
      __PropValidation(o, { each: true })(...args);
    } else {
      __PropValidation(o)(...args);
    }
  };
}
