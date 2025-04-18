import type { Optional } from '../condition/optional.js';
import type { SingleType } from '../types/single-type.js';

export type SelectQueryType<T extends object> = SingleType<
  T,
  Optional<boolean>
>;
