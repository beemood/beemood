import { FactoryCollector } from '@beemood/utils';
import { IsBoolean, ValidationOptions } from 'class-validator';
import { NormalizedOptions } from './to-normalized-options.js';

export function __BooleanValidation(
  _options: NormalizedOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const acc = new FactoryCollector();

    acc.add(IsBoolean(validationOptions));

    acc.collect.forEach((d) => d(...args));
  };
}
