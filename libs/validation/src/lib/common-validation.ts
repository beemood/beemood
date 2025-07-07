import {
  IsDefined,
  IsOptional,
  ValidationOptions,
} from 'class-validator';
import { DefaultValueTransformer } from './default-value-transformer.js';
import { JsonTransformer } from './json-tranfromer.js';

export type PropertyType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array';

export type CommonOptions = {
  type: PropertyType;
  required?: boolean;
  transform?: boolean;
  defaultValue?: any;
};

export function CommonValidation(
  options: CommonOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const { required } = options;

    if (validationOptions?.each !== true) {
      if (required === true) {
        IsDefined(validationOptions)(...args);
      } else {
        IsOptional(validationOptions)(...args);
      }
    }
    if (options.defaultValue != undefined) {
      DefaultValueTransformer(options.defaultValue)(...args);
    }

    if (options.transform) {
      JsonTransformer()(...args);
    }
  };
}
