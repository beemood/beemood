import { PropOptions } from '@beemood/types';
import { __PropValidation } from '../validation/prop.js';
import {
  NormalizedOptions,
  toNormalizedOptions,
} from '../validation/to-normalized-options.js';

import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { toApiPropertyOptions } from './to-api-property-options.js';

export function __Prop(options: NormalizedOptions): PropertyDecorator {
  return (...args) => {
    __PropValidation(options)(...args);
    ApiProperty(toApiPropertyOptions(options))(...args);
  };
}

/**
 * Restapi property decorator
 * @param options
 * @returns
 */
export function Prop(options: PropOptions = {}): PropertyDecorator {
  return (...args) => {
    const nOptions = toNormalizedOptions(options, ...args);
    __Prop(nOptions)(...args);
  };
}

export function Dto(): ClassDecorator {
  return (...args) => {
    Exclude()(...args);
  };
}
