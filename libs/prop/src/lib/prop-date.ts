import { FactoryCollector } from '@beemood/utils';
import {
  IsDate,
  isDefined,
  MaxDate,
  MinDate,
  ValidationOptions,
} from 'class-validator';
import { NormalizedOptions } from './to-normalized-options.js';
import { LessThan } from './validations/less-than.js';
import { MoreThan } from './validations/more-than.js';

export function __PropDate(
  options: NormalizedOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const acc = new FactoryCollector<PropertyDecorator>();

    acc.add(IsDate(validationOptions));

    if (isDefined(options.moreThan)) {
      if (typeof options.moreThan === 'function') {
        acc.add(MinDate(options.moreThan, validationOptions));
      } else if (typeof options.moreThan === 'string') {
        acc.add(MoreThan(options.moreThan, validationOptions));
      }
    }

    if (isDefined(options.lessThan)) {
      if (typeof options.lessThan === 'function') {
        acc.add(MaxDate(options.lessThan, validationOptions));
      } else if (typeof options.lessThan === 'string') {
        acc.add(LessThan(options.lessThan, validationOptions));
      }
    }
    acc.collect.forEach((d) => d(...args));
  };
}
