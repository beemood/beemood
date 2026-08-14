import { ApiPropertyOptions } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';
import {
    IsArray,
    IsEnum,
    Max,
    MaxLength,
    Min,
    MinLength,
    ValidationOptions,
} from 'class-validator';

export type DependencyValidationOptions = {
  moreThan?: string[];
  lessThan?: string[];
  equalTo?: string[];
  notEqualTo?: string[];
  isDefined?: string[];
  isNotDefined?: string[];
};

export type CustomPropValidationOptions = {
  dependencies?: DependencyValidationOptions;
};

export type PropValidationOptions = Omit<ApiPropertyOptions, 'type'> &
  CustomPropValidationOptions & {
    type?: <T>() => ClassConstructor<T>;
  };

export function validatePropValidationOptions(
  options: PropValidationOptions,
  ...args: Parameters<PropertyDecorator>
) {
  // If options.type is undefined
  if (options.type == undefined) {
    // Then get the type from reflection
    const inferedType = Reflect.getMetadata('design:type', args[0], args[1]);

    const primitiveTypes = new Set([String, Number, Boolean, Date, Buffer]);

    // If the infered type is not one of the allowed primitive types,
    // then throw error.
    if (!primitiveTypes.has(inferedType)) {
      throw new Error(
        `Unkown type, ${inferedType.name}, must be provided in options.type.`,
      );
    }
  } else {
    // Type must be function
    if (typeof options.type != 'function') {
      throw new Error('type must be a function');
    }
  }
}

function __PropValidation(
  options: PropValidationOptions = {},
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const acc: PropertyDecorator[] = [];

    const push = (...decorators: PropertyDecorator[]) =>
      acc.push(...decorators);

    if (options.minLength != undefined)
      push(MinLength(options.minLength, validationOptions));

    if (options.maxLength != undefined)
      push(MaxLength(options.maxLength, validationOptions));

    if (options.minimum != undefined)
      push(Min(options.minimum, validationOptions));

    if (options.maximum != undefined)
      push(Max(options.maximum, validationOptions));

    if (options.enum) push(IsEnum(options.enum, validationOptions));

    acc.forEach((d) => d(...args));
  };
}

export function PropValidation(
  options: PropValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    validatePropValidationOptions(options, ...args);

    const acc: PropertyDecorator[] = [];
    const push = (decorator: PropertyDecorator) => acc.push(decorator);

    const { isArray } = options;

    if (isArray) {
      push(IsArray());
      push(__PropValidation(options, { each: true }));
    } else {
      push(__PropValidation(options));
    }

    acc.forEach((d) => d(...args));
  };
}
