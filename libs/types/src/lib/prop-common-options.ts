import { PropType } from './prop-type.js';

export type PropCommonOptions = {
  __type: PropType;
  required?: boolean;
  exclude?: boolean;
};
