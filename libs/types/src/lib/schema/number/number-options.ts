import type { CommonOptions } from '../common/common-options.js';

export type NumberFormat =
  | 'positive'
  | 'fraction'
  | 'rate'
  | 'percent'
  | 'currency';

export type IntegerFormat = 'rate' | 'percent' | 'positive';

export type CommonNumberOptions = {
  type: 'number' | 'integer';
  minimum?: number;
  maximum?: number;
  enum?: object;
};

export type NumberOptions = CommonOptions<number> &
  CommonNumberOptions & {
    type: 'number';
    numberFormat?: NumberFormat;
  };

export type IntegerOptions = CommonOptions<number> &
  CommonNumberOptions & {
    type: 'integer';
    numberFormat?: IntegerFormat;
  };
