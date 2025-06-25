import type { CommonPropertyOptions } from './common-property-options.js';
import type { ValueOptions } from './value-options.js';

export type CommonNumberPropertyOptions = {
  minimum?: number;
  maximum?: number;
} & CommonPropertyOptions &
  ValueOptions<number>;

export type NumberPropertyOptions = {
  type: 'number';
} & CommonNumberPropertyOptions;

export type IntegerPropertyOptions = {
  type: 'integer';
} & CommonNumberPropertyOptions;
