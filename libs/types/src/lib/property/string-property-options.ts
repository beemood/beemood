import type { CommonPropertyOptions } from './common-property-options.js';

export type StringPropertyOptions = {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  stringFormat?: string;
  defaultValue?: string;
  trim?: boolean;
  format?: string;
} & CommonPropertyOptions<string>;
