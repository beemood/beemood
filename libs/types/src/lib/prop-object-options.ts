import { PropCommonOptions } from './prop-common-options.js';
import { PropDefaultValueOptions } from './prop-default-value-options.js';
import { PropType } from './prop-type.js';
import { Any } from './types.js';

export type PropObjectOptions = {
  __type: PropType.Object;
} & PropCommonOptions &
  PropDefaultValueOptions<Any>;
