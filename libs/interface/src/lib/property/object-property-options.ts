import type { ClassLike } from '../common/class-like.js';
import type { CommonPropertyOptions } from './common-property-options.js';
import type { ValueOptions } from './value-options.js';

export type ObjectPropertyOptions<T extends object = object> = {
  type: 'object';
  target: () => ClassLike;
} & CommonPropertyOptions &
  ValueOptions<T>;
