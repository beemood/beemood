import {
  Any,
  PropBooleanOptions,
  PropBufferOptions,
  PropCommonOptions,
  PropDateOptions,
  PropertyDecoratorPropertyKey,
  PropertyDecoratorTarget,
  PropNumberFormatType,
  PropNumberOptions,
  PropObjectOptions,
  PropStringOptions,
} from '@beemood/types';
import { isDefined, isNotDefined } from '@beemood/utils';
import { ClassConstructor, Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsEmail,
  IsInstance,
  IsInt,
  IsISO8601,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  Max,
  MaxDate,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
  ValidationOptions,
} from 'class-validator';
import { getPropType } from './get-prop-type.js';
import { BooleanTransformer } from './transformers/boolean-transformer.js';
import { CasingTransformer } from './transformers/casing-transformer.js';
import { DateTransformer } from './transformers/date-transformer.js';
import { NumberTransformer } from './transformers/number-transformer.js';
import { BufferMaxLength } from './validations/buffer-max-length.js';
import { BufferMinLength } from './validations/buffer-min-length.js';

export function PropCommon(
  options: PropCommonOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];

    if (options.required) {
      acc.push(IsDefined(validationOptions));
    } else {
      acc.push(IsOptional(validationOptions));
    }

    if (options.exclude) {
      acc.push(Exclude());
    } else {
      acc.push(Expose());
    }

    acc.forEach((d) => d(...args));
  };
}

export function PropDate(
  options: PropDateOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];

    acc.push(IsDate(validationOptions));
    options.minDate && acc.push(MaxDate(options.minDate, validationOptions));
    options.maxDate && acc.push(MaxDate(options.maxDate, validationOptions));

    acc.push(DateTransformer());

    acc.forEach((d) => d(...args));
  };
}

export function PropBuffer(
  options: PropBufferOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];

    acc.push(IsInstance(Buffer, validationOptions));
    options.minBufferSize &&
      acc.push(BufferMinLength(options.minBufferSize, validationOptions));
    options.maxBufferSize &&
      acc.push(BufferMaxLength(options.maxBufferSize, validationOptions));

    acc.forEach((d) => d(...args));
  };
}

export function PropObject(
  options: PropObjectOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];

    acc.push(IsObject(validationOptions));
    options.target && acc.push(IsInstance(options.target, validationOptions));

    acc.forEach((d) => d(...args));
  };
}

export function PropBoolean(
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];
    acc.push(IsBoolean(validationOptions));

    if (!validationOptions.each) acc.push(BooleanTransformer());

    acc.forEach((d) => d(...args));
  };
}

export function PropNumberFormat(
  numberFormat: PropNumberFormatType,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];

    switch (numberFormat) {
      case 'int':
        acc.push(IsInt(validationOptions));
        break;
    }

    acc.forEach((d) => d(...args));
  };
}
export function PropNumber(
  options: PropNumberOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];
    acc.push(IsNumber({}, validationOptions));

    isDefined(options.minimum) &&
      acc.push(Min(options.minimum, validationOptions));

    isDefined(options.maximum) &&
      acc.push(Max(options.maximum, validationOptions));

    isDefined(options.numberFormat) &&
      acc.push(PropNumberFormat(options.numberFormat));

    acc.push(NumberTransformer());

    acc.forEach((d) => d(...args));
  };
}

export function StringFormat(
  options: PropStringOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];

    if (options.stringFormat)
      switch (options.stringFormat) {
        case 'email': {
          acc.push(IsEmail({}, validationOptions));
          break;
        }
        case 'password': {
          acc.push(IsStrongPassword({}, validationOptions));
          break;
        }
        case 'uuid': {
          acc.push(IsUUID(undefined, validationOptions));
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
      }

    if (options.casing) {
      acc.push(CasingTransformer(options.casing));
    }

    acc.forEach((d) => d(...args));
  };
}

export function PropString(
  options: PropStringOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];

    acc.push(IsString(validationOptions));

    isDefined(options.minLength) &&
      acc.push(MinLength(options.minLength, validationOptions));

    isDefined(options.maxLength) &&
      acc.push(MaxLength(options.maxLength, validationOptions));

    isDefined(options.stringFormat) &&
      acc.push(StringFormat(options, validationOptions));

    acc.forEach((d) => d(...args));
  };
}

export type NormalizedPropOptions = PropCommonOptions &
  PropStringOptions &
  PropNumberOptions &
  PropBooleanOptions &
  PropDateOptions &
  PropBufferOptions &
  PropObjectOptions & {
    /**
     * Name of the type
     */
    __typeName: string;

    /**
     * Class reference of the property type such as String, Number, Boolean, SampleObject, Array etc.
     */
    __type: ClassConstructor<Any>;
  };

export type PropOptions = Partial<NormalizedPropOptions>;

export function normalizePropOptions(
  options: PropOptions,
  target: PropertyDecoratorTarget,
  propertyKey: PropertyDecoratorPropertyKey,
): NormalizedPropOptions {
  const __type = getPropType(target, propertyKey);
  return {
    ...options,
    __type,
    __typeName: __type.name,
  };
}

export function __Prop(
  options: NormalizedPropOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];

    switch (options.__typeName) {
      case String.name: {
        acc.push(PropString({ ...options }, validationOptions));
        break;
      }
      case Number.name: {
        acc.push(PropNumber({ ...options }, validationOptions));
        break;
      }
      case Boolean.name: {
        acc.push(PropBoolean(validationOptions));
        break;
      }
      case Date.name: {
        acc.push(PropDate({ ...options }, validationOptions));
        break;
      }
      case Buffer.name: {
        acc.push(PropBuffer({ ...options }, validationOptions));
        break;
      }
      case Object.name: {
        acc.push(ValidateNested(validationOptions));
        acc.push(Type(options.type));
        break;
      }
      case Array.name: {
        acc.push(IsArray(validationOptions));

        if (isNotDefined(options.type)) {
          throw new Error(`type is required for array properties`);
        }
        const __typeName = options.type().name;
        acc.push(__Prop({ ...options, __typeName }, { each: true }));
        break;
      }
      default: {
        acc.push(
          __Prop({
            ...options,
            __typeName: Object.name,
            type: () => options.__type,
          }),
        );
        break;
      }
    }

    acc.forEach((d) => d(...args));
  };
}

export function Prop(options: PropOptions = {}): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];

    const nOptions = normalizePropOptions(options, ...args);

    const validationOptions: ValidationOptions = {
      each: nOptions.__typeName === 'Array',
    };
    acc.push(PropCommon(options, validationOptions));

    acc.push(__Prop(nOptions));

    acc.forEach((d) => d(...args));
  };
}
