import { IsObject, ValidateNested, ValidationOptions } from 'class-validator';
import { ClassConstructor, Type } from 'class-transformer';
import { CommonOptions } from './common-validation.js';

export type ObjectOptions = {
  type: 'object';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: () => ClassConstructor<any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
} & CommonOptions;

export function ObjectValidation(
  options: ObjectOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    IsObject(validationOptions)(...args);
    Type(options.target)(...args);
    ValidateNested(validationOptions)(...args);
  };
}
