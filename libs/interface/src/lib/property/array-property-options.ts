import type { Any } from '../common/any.js';
import type { BooleanPropertyOptions } from './boolean-property-options.js';
import type { CommonPropertyOptions } from './common-property-options.js';
import type { DatePropertyOptions } from './date-property-options.js';
import type {
  IntegerPropertyOptions,
  NumberPropertyOptions,
} from './number-property-options.js';
import type { ObjectPropertyOptions } from './object-property-options.js';
import type { StringPropertyOptions } from './string-property-options.js';
import type { ValueOptions } from './value-options.js';

export type CommonArrayPropertyOptions = {
  type: 'array';
  maxSize?: number;
  minSize?: number;
} & CommonPropertyOptions;

export type ArrayStringPropertyOptions = CommonArrayPropertyOptions & {
  items: StringPropertyOptions;
} & ValueOptions<string[]>;

export type ArrayNumberPropertyOptions = CommonArrayPropertyOptions & {
  items: NumberPropertyOptions;
} & ValueOptions<number[]>;

export type ArrayIntegerPropertyOptions = CommonArrayPropertyOptions & {
  items: IntegerPropertyOptions;
} & ValueOptions<number[]>;

export type ArrayBooleanPropertyOptions = CommonArrayPropertyOptions & {
  items: BooleanPropertyOptions;
} & ValueOptions<boolean[]>;

export type ArrayDatePropertyOptions = CommonArrayPropertyOptions & {
  items: DatePropertyOptions;
} & ValueOptions<string[]>;

export type ArrayObjectPropertyOptions = CommonArrayPropertyOptions & {
  items: ObjectPropertyOptions;
} & ValueOptions<Any[]>;

export type ArrayPropertyOptions =
  | ArrayStringPropertyOptions
  | ArrayNumberPropertyOptions
  | ArrayIntegerPropertyOptions
  | ArrayBooleanPropertyOptions
  | ArrayObjectPropertyOptions
  | ArrayDatePropertyOptions;
