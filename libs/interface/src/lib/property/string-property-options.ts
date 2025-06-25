import type { CommonPropertyOptions } from './common-property-options.js';
import type { ValueOptions } from './value-options.js';

export type StringFormat = 'email' | 'password' | 'phone' | 'uuid4' | 'barcode';

export type StringPropertyOptions = {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  stringFormat?: StringFormat;
  isIn?: string[];
  isNotIn?: string[];
} & CommonPropertyOptions &
  ValueOptions<string>;
