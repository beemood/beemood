import type { CommonOptions } from '../common/common-options.js';
import type { StringFormat } from './string-format.js';

export type StringOptions = {
  type: 'string';
  stringFormat?: StringFormat;
  minLength?: number;
  maxLength?: number;
  startsWith?: string;
  notStartsWith?: string;
  endsWith?: string;
  notEndsWith?: string;
  contains?: string;
  notContains?: string;
  pattern?: string | RegExp;
  enum?: object;
} & CommonOptions<string>;
