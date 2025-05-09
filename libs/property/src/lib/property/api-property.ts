import type { PropertyOptions } from '@bmod/types';
import { ApiProperty as __ApiProperty } from '@nestjs/swagger';
import { toApiPropertyOptions } from '../transformers/to-api-property-options.js';

export function ApiProperty(options: PropertyOptions): PropertyDecorator {
  return (...args) => {
    __ApiProperty(toApiPropertyOptions(options))(...args);
  };
}
