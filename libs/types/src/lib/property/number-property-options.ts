import type { CommonNumberPropertyOptions } from './common-number-options.js';

export type NumberPropertyOptions = {
  type: 'number';
  numberFormat?: string;
} & CommonNumberPropertyOptions;
