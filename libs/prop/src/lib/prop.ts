import { PropOptions, PropType } from '@beemood/types';
import { FactoryCollector } from '@beemood/utils';
import { Expose } from 'class-transformer';
import { ValidationOptions } from 'class-validator';
import { __BooleanValidation } from './prop-boolean.js';
import { __PropBuffer } from './prop-buffer.js';
import { __PropCommon } from './prop-common.js';
import { __PropDate } from './prop-date.js';
import { __PropNumber } from './prop-number.js';
import { __PropString } from './prop-string.js';
import {
  NormalizedOptions,
  toNormalizedOptions,
} from './to-normalized-options.js';

export function PropValidation(
  options: NormalizedOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const acc = new FactoryCollector<PropertyDecorator>();

    switch (options.__typeName as PropType) {
      case 'String': {
        acc.add(__PropString(options, validationOptions));
        break;
      }
      case 'Number': {
        acc.add(__PropNumber(options, validationOptions));
        break;
      }
      case 'Boolean': {
        acc.add(__BooleanValidation(options, validationOptions));
        break;
      }
      case 'Date': {
        acc.add(__PropDate(options, validationOptions));
        break;
      }
      case 'Buffer': {
        acc.add(__PropBuffer(options, validationOptions));
        break;
      }
      case 'BigInt':
      case 'Array': {
        // -  [ ]
      }
    }

    acc.collect.forEach((d) => d(...args));
  };
}

export function Prop(options: PropOptions = {}): PropertyDecorator {
  return (...args) => {
    const acc = new FactoryCollector<PropertyDecorator>();
    const nOptions = toNormalizedOptions(options, ...args);

    const validationOptions: ValidationOptions = { each: nOptions.isArray };

    acc.add(__PropCommon(nOptions, validationOptions));

    acc.add(PropValidation(nOptions));

    if (options.exclude !== true) {
      acc.add(Expose({ groups: options.groups }));
    }

    acc.collect.forEach((d) => d(...args));
  };
}
