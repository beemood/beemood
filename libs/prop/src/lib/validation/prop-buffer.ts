import { PropTypes } from '@beemood/types';
import { FactoryCollector } from '@beemood/utils';
import { ValidationOptions, isDefined } from 'class-validator';
import { BufferMaxLength } from './validations/buffer-max-length.js';
import { BufferMinLength } from './validations/buffer-min-length.js';
import { NormalizedOptions } from './to-normalized-options.js';

export function __PropBuffer(
  options: NormalizedOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    if (options.__typeName !== PropTypes.Buffer) {
      throw new Error(`${options.__typeName} is not Buffer`);
    }

    const acc = new FactoryCollector<PropertyDecorator>();

    if (isDefined(options.moreThan)) {
      if (typeof options.moreThan === 'number') {
        acc.add(BufferMinLength(options.moreThan + 1, validationOptions));
      }
    }

    if (isDefined(options.lessThan)) {
      if (typeof options.lessThan === 'number') {
        acc.add(BufferMaxLength(options.lessThan + 1, validationOptions));
      }
    }

    if (isDefined(options.moreThanOrEqualTo)) {
      if (typeof options.moreThanOrEqualTo === 'number') {
        acc.add(BufferMinLength(options.moreThanOrEqualTo, validationOptions));
      }
    }

    if (isDefined(options.lessThanOrEqualTo)) {
      if (typeof options.lessThanOrEqualTo === 'number') {
        acc.add(BufferMaxLength(options.lessThanOrEqualTo, validationOptions));
      }
    }

    acc.collect.forEach((d) => d(...args));
  };
}
