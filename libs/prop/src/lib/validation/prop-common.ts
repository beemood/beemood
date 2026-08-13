import { FactoryCollector } from '@beemood/utils';
import {
  Equals,
  IsDefined,
  IsIn,
  IsOptional,
  NotEquals,
  ValidationOptions,
} from 'class-validator';
import { NormalizedOptions } from './to-normalized-options.js';
import { ComputedTransformer } from './transformers/computed-transformer.js';
import { DefaultValueTransformer } from './transformers/default-value-transformer.js';

export function __PropCommon(
  options: NormalizedOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const acc = new FactoryCollector<PropertyDecorator>();

    acc.addIfDefined(options.computed, (value) => {
      return ComputedTransformer(value);
    });

    acc.addIfDefined(options.defaultValue, (value) =>
      DefaultValueTransformer(value),
    );

    acc.addIf(
      options.required,
      () => IsDefined(validationOptions),
      () => IsOptional(validationOptions),
    );

    acc.addIfDefined(options.isIn, (constraint) =>
      IsIn(constraint, validationOptions),
    );

    acc.addIfDefined(options.equalsTo, (constraint) =>
      Equals(constraint, validationOptions),
    );

    acc.addIfDefined(options.not?.equalsTo, (constraint) =>
      NotEquals(constraint, validationOptions),
    );

    acc.collect.forEach((decorator) => decorator(...args));
  };
}
