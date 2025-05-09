import type { CommonNumberPropertyOptions } from './common-number-options.js';

export type IntegerPropertyOptions = {
  type: 'integer';
  integerFormat?: string;
} & CommonNumberPropertyOptions;
