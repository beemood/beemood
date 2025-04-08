import type { Optional } from '../condition/optional.js';
import type { SingleType } from '../types/single-type.js';

export type OrderQueryType<T extends object> = SingleType<
  T,
  Optional<'asc' | 'desc'>
>;
