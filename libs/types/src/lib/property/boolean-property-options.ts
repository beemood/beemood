import type { CommonPropertyOptions } from './common-property-options.js';

export type BooleanPropertyOptions = {
  type: 'boolean';
} & CommonPropertyOptions<boolean>;
