import type { BooleanPropertyOptions } from './boolean-property-options.js';
import type { CommonPropertyOptions } from './common-property-options.js';
import type { DatePropertyOptions } from './date-property-options.js';
import type {
  IntegerPropertyOptions,
  NumberPropertyOptions,
} from './number-property-options.js';
import type { ObjectPropertyOptions } from './object-property-options.js';
import type { StringPropertyOptions } from './string-property-options.js';

export type CommonArrayPropertyOptions = {
  type: 'array';
  maxSize?: number;
  minSize?: number;
} & CommonPropertyOptions;

export type ArrayStringPropertyOptions = CommonArrayPropertyOptions & {
  items: StringPropertyOptions;
};

export type ArrayNumberPropertyOptions = CommonArrayPropertyOptions & {
  items: NumberPropertyOptions;
};

export type ArrayIntegerPropertyOptions = CommonArrayPropertyOptions & {
  items: IntegerPropertyOptions;
};

export type ArrayBooleanPropertyOptions = CommonArrayPropertyOptions & {
  items: BooleanPropertyOptions;
};

export type ArrayDatePropertyOptions = CommonArrayPropertyOptions & {
  items: DatePropertyOptions;
};

export type ArrayObjectPropertyOptions = CommonArrayPropertyOptions & {
  items: ObjectPropertyOptions;
};

export type ArrayPropertyOptions =
  | ArrayStringPropertyOptions
  | ArrayNumberPropertyOptions
  | ArrayIntegerPropertyOptions
  | ArrayBooleanPropertyOptions
  | ArrayObjectPropertyOptions
  | ArrayDatePropertyOptions;
