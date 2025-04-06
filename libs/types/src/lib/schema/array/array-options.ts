import type { BooleanOptions } from '../boolean/boolean-options.js';
import type { CommonOptions } from '../common/common-options.js';
import type { ActualPropertyType } from '../common/property-type.js';
import type {
  IntegerOptions,
  NumberOptions,
} from '../number/number-options.js';
import type { ObjectOptions } from '../object/object-options.js';
import type { StringOptions } from '../string/string.options.js';

export type __ArrayOptions<T = ActualPropertyType, S = unknown> = CommonOptions<
  T[]
> & {
  type: 'array';
  minItems?: number;
  maxItems?: number;
  items: S;
};

export type ____ArrayOptions<T = object, S = unknown> =
  | __ArrayOptions<string, StringOptions>
  | __ArrayOptions<number, NumberOptions>
  | __ArrayOptions<number, IntegerOptions>
  | __ArrayOptions<boolean, BooleanOptions>
  | __ArrayOptions<T, ObjectOptions>
  | __ArrayOptions<T, S>;

export type ArrayOptions = ____ArrayOptions<
  ActualPropertyType,
  ____ArrayOptions<
    ActualPropertyType,
    ____ArrayOptions<
      ActualPropertyType,
      ____ArrayOptions<
        ActualPropertyType,
        ____ArrayOptions<
          ActualPropertyType,
          ____ArrayOptions<
            ActualPropertyType,
            ____ArrayOptions<ActualPropertyType, ____ArrayOptions>
          >
        >
      >
    >
  >
>;
