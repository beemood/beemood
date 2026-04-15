import { PropBooleanOptions } from './prop-boolean-options.js';
import { PropCommonOptions } from './prop-common-options.js';
import { PropDefaultValueOptions } from './prop-default-value-options.js';
import { PropNumberOptions } from './prop-number-options.js';
import { PropObjectOptions } from './prop-object-options.js';
import { PropStringOptions } from './prop-string-options.js';
import { PropType } from './prop-type.js';

export type __PropArrayOptions<T> = {
  __type: PropType.Array;
  minSize?: number;
  maxSize?: number;
} & PropCommonOptions &
  PropDefaultValueOptions<ReadonlyArray<T>>;

export type __PropArrayStringOptions = __PropArrayOptions<string> &
  Omit<PropStringOptions, '__type'>;
export type __PropArrayNumberOptions = __PropArrayOptions<Number> &
  Omit<PropNumberOptions, '__type'>;
export type __PropArrayBooleanOptions = __PropArrayOptions<Boolean> &
  Omit<PropBooleanOptions, '__type'>;
export type __PropArrayObjectOptions = __PropArrayOptions<Object> &
  Omit<PropObjectOptions, '__type'>;

export type PropArrayOptions =
  | __PropArrayBooleanOptions
  | __PropArrayNumberOptions
  | __PropArrayBooleanOptions
  | __PropArrayObjectOptions;
