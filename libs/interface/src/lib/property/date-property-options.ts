import type { CommonPropertyOptions } from './common-property-options.js';
import type { ValueOptions } from './value-options.js';

export type DatePropertyOptions = {
  type: 'date';
  futureDate?: boolean;
  pastDate?: boolean;
} & CommonPropertyOptions &
  ValueOptions<Date>;
