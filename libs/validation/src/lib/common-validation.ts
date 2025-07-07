import { IsNotEmpty, IsOptional, ValidationOptions } from 'class-validator';

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
};

export function CommonValidation(
  options: CommonOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const { required } = options;

    if (validationOptions?.each !== true) {
      if (required === true) {
        IsNotEmpty(validationOptions)(...args);
      } else {
        IsOptional(validationOptions)(...args);
      }
    }
  };
}
