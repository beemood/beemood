import { PropCommonOptions } from './prop-common-options.js';
import { PropDefaultValueOptions } from './prop-default-value-options.js';
import { PropType } from './prop-type.js';

export type PropBooleanOptions = {
  __type: PropType.Boolean;
} & PropCommonOptions &
  PropDefaultValueOptions<boolean>;
