 
import type { CommonPropertyOptions } from './common-property-options.js';

export type CommonNumberPropertyOptions = CommonPropertyOptions<number> & {
  minimum?: number;
  maximum?: number;
};
