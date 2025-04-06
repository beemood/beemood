import type { CommonOptions } from '../common/common-options.js';

export type BooleanOptions = CommonOptions<boolean> & {
  type: 'boolean';
};
