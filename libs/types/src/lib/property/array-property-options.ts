/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CommonPropertyOptions } from './common-property-options.js';

export type ArrayPropertyOptions<S extends CommonPropertyOptions> = {
  type: 'array';
  items: S;
} & CommonPropertyOptions<any[]>;
