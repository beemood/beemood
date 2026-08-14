import { EnumMatcher, PropertyMatcher } from '@beemood/matcher';
import * as CT from 'class-transformer';
import * as CV from 'class-validator';
import { normalizePropValidationOptions } from './normalize-prop-validation-options.js';
import {
  NormalizedPropValidationOptions,
  PropValidationOptions,
} from './prop-validation-options.js';

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

    matcher
      .isDefined('default', (v) =>
        CT.Transform(({ value }) => (value ??= v), o.transformOptions),
      )
      .isDefined('__primitiveTypeName', (v) =>
        new EnumMatcher<
          'String' | 'Number' | 'Boolean' | 'Date' | 'Buffer',
          PropertyDecorator
        >(v)
          .isEqual('String', () => CV.IsString(vo))
          .isEqual('Number', () => CV.IsNumber(undefined, vo))
          .isEqual('Boolean', () => CV.IsBoolean(vo))
          .isEqual('Date', () => CV.IsDateString(undefined, vo))
          .isEqual('Buffer', () => CV.IsInstance(Buffer, vo))
          .collect(),
      )
      .isDefined('minLength', (v) => CV.MinLength(v, vo))
      .isDefined('maxLength', (v) => CV.MaxLength(v, vo))
      .isDefined('minimum', (v) => CV.Min(v, vo))
      .isDefined('maximum', (v) => CV.Max(v, vo))
      .isDefined('enum', (v) => CV.IsEnum(v, vo))
      .isDefined('maxItems', (v) => CV.ArrayMaxSize(v))
      .isDefined('minItems', (v) => CV.ArrayMinSize(v))
      .isDefined('pattern', (v) => CV.Matches(new RegExp(v), vo))
      .isDefined('format', (v) =>
        new EnumMatcher<PropValidationOptions['format'], PropertyDecorator>(v)
          .isEqual('email', () => CV.IsEmail(undefined, vo))
          .isEqual('password', () => CV.IsStrongPassword(undefined, vo))
          .isEqual('ean', () => CV.IsEAN(vo))
          .isEqual('uuid', () => CV.IsUUID('all', vo))
          .isEqual('uuid7', () => CV.IsUUID('4', vo))
          .isEqual('uuid4', () => CV.IsUUID('7', vo))
          .isEqual('date', () => CV.IsDateString(undefined, vo))
          .isEqual('date-time', () => CV.IsDateString(undefined, vo))
          .isEqual('time', () => CV.IsDateString(undefined, vo))
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

    if (o.required == true) {
      if (isArray !== true) {
        CV.IsDefined()(...args);
        CV.IsNotEmpty()(...args);
      }
    } else {
      CV.IsOptional()(...args);
    }

    if (isArray === true) {
      CV.IsArray()(...args);
      __PropValidation(o, { each: true })(...args);
    } else {
      __PropValidation(o)(...args);
    }
  };
}
