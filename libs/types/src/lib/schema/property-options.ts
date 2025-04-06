import type { ArrayOptions } from './array/array-options.js';
import type { BooleanOptions } from './boolean/boolean-options.js';
import type { IntegerOptions, NumberOptions } from './number/number-options.js';
import type { ObjectOptions } from './object/object-options.js';
import type { StringOptions } from './string/string.options.js';

export type PropertyOptions =
  | StringOptions
  | NumberOptions
  | IntegerOptions
  | BooleanOptions
  | ObjectOptions
  | ArrayOptions;
