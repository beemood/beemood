/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ArrayPropertyOptions } from './array-property-options.js';
import type { BooleanPropertyOptions } from './boolean-property-options.js';
import type { IntegerPropertyOptions } from './integer-property-options.js';
import type { NumberPropertyOptions } from './number-property-options.js';
import type { ObjectPropertyOptions } from './object-property-options.js';
import type { StringPropertyOptions } from './string-property-options.js';

export type __PropertyOptions<T extends __PropertyOptions<any>> =
  | StringPropertyOptions
  | NumberPropertyOptions
  | IntegerPropertyOptions
  | BooleanPropertyOptions
  | ObjectPropertyOptions
  | ArrayPropertyOptions<T>;

export type PropertyOptions<
  T extends __PropertyOptions<T> = __PropertyOptions<any>
> = __PropertyOptions<T>;
