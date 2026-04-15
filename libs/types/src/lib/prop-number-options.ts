import { PropCommonOptions } from './prop-common-options.js';
import { PropDefaultValueOptions } from './prop-default-value-options.js';
import { PropType } from './prop-type.js';

export type PropNumberFormat =
  | 'integer'
  | 'rate'
  | 'percent'
  | 'fraction'
  | 'byte'
  | 'short';

export type PropNumberOptions = {
  __type: PropType.Number;
  minimum?: number;
  maximum?: number;
  format?: PropNumberFormat;
  isIn?: ReadonlyArray<string>;
} & PropCommonOptions &
  PropDefaultValueOptions<number>;
