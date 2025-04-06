import { isThen, isTrueThen } from '@bmod/is';
import type { CommonOptions } from '@bmod/types';
import { Expose } from 'class-transformer';
import type { ValidationOptions } from 'class-validator';
import {
  IsIn,
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  NotEquals,
} from 'class-validator';
import { DependsOnProperties } from './custom/depends-on-properties.validation.js';
import { NotEqualToPropertiesProperties } from './custom/not-equal-to-properties.validation.js';
import { NotWithProperties } from './custom/not-with-properties.validation.js';

export function CommonValidation(
  options: CommonOptions<unknown>,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const vo = validationOptions;

    if (options.expose !== false) {
      Expose()(...args);
    }

    isTrueThen(
      options.required,
      () => IsNotEmpty(vo)(...args),
      () => IsOptional(vo)(...args)
    );

    isThen(options.dependsOnProperties, (propertyName) =>
      DependsOnProperties(propertyName, vo)(...args)
    );

    isThen(options.notWithProperties, (propertyName) =>
      NotWithProperties(propertyName, vo)(...args)
    );

    isThen(options.notEqualToProperties, (propertyName) =>
      NotEqualToPropertiesProperties(propertyName, vo)(...args)
    );

    isThen(options.isIn, (v) => IsIn(v, vo)(...args));
    isThen(options.isNotIn, (v) => IsNotIn(v, vo)(...args));
    isThen(options.notEqual, (v) => NotEquals(v, vo)(...args));
  };
}
