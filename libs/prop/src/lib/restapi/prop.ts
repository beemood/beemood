import {
  ApiProperty,
  ApiPropertyOptional,
  ApiPropertyOptions,
} from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDate,
  isDateString,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  ValidateNested,
  ValidationOptions,
} from 'class-validator';

function __PrimitiveProp(
  _optinos: ApiPropertyOptions = {},
  vo: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];
    const inferedType = Reflect.getMetadata('design:type', args[0], args[1]);

    switch (inferedType.name) {
      case 'String': {
        acc.push(IsString(vo));
        break;
      }
      case 'Number': {
        acc.push(IsNumber({}, vo));
        break;
      }
      case 'Boolean': {
        acc.push(IsBoolean(vo));
        break;
      }
      case 'Date': {
        acc.push(
          Transform(({ value }) => {
            if (value instanceof Date) {
              return value;
            } else if (typeof value === 'string') {
              if (isDateString(value)) {
                return new Date(value);
              }
            }
            return value;
          }),
        );
        acc.push(IsDate(vo));
        break;
      }
    }

    acc.forEach((d) => d(...args));
  };
}

export function Prop(options: ApiPropertyOptions = {}): PropertyDecorator {
  return (...args) => {
    const { type } = options;
    const isArray = !!options.isArray;
    const vo: ValidationOptions = { each: isArray };
    const isRequired = options.required === true;

    const acc: PropertyDecorator[] = [];

    if (options.default != undefined) {
      acc.push(
        Transform(({ value }) => {
          if (value == undefined) {
            value = options.default;
          }
          return value;
        }),
      );
    }

    if (isArray) {
      acc.push(IsArray());

      if (options.maxItems != undefined) {
        acc.push(ArrayMaxSize(options.maxItems));
      }

      if (options.minItems != undefined) {
        acc.push(ArrayMaxSize(options.minItems));
      }
    }

    acc.push(Expose());

    if (type) {
      acc.push(Type(type as any));
      acc.push(ValidateNested(vo));
    } else {
      acc.push(__PrimitiveProp(options, vo));
    }

    if (isRequired) {
      acc.push(IsDefined(vo));
      acc.push(ApiProperty(options));
    } else {
      acc.push(IsOptional(vo));
      acc.push(ApiPropertyOptional(options));
    }

    if (options.minLength != undefined) {
      acc.push(MinLength(options.minLength, vo));
    }

    if (options.maxLength != undefined) {
      acc.push(MinLength(options.maxLength, vo));
    }

    if (options.minimum != undefined) {
      acc.push(Min(options.minimum, vo));
    }

    if (options.maximum != undefined) {
      acc.push(Min(options.maximum, vo));
    }

    if (options.enum) {
      acc.push(IsEnum(options.enum, vo));
    }

    acc.forEach((d) => d(...args));
  };
}
