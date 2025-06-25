import type { CommonPropertyOptions } from './common-property-options.js';
import type { ValueOptions } from './value-options.js';

export type BooleanPropertyOptions = {
  type: 'boolean';
} & CommonPropertyOptions &
  ValueOptions<boolean>;
