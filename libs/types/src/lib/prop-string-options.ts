import { PropCommonOptions } from './prop-common-options.js';
import { PropDefaultValueOptions } from './prop-default-value-options.js';
import { PropType } from './prop-type.js';
import { Casing } from './types.js';

export type PropStringFormat =
  | 'email'
  | 'password'
  | 'uuid'
  | 'date'
  | 'ean'
  | 'jwt'
  | 'currency';

export type PropStringOptions = {
  __type: PropType.String;
  minlen?: number;
  maxlen?: number;
  format?: PropStringFormat;
  isIn?: ReadonlyArray<string>;
  transform?: Casing;
} & PropCommonOptions &
  PropDefaultValueOptions<string>;
