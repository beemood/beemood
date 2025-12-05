import { Stringable } from './stringable.js';

export interface Registry<T extends Stringable> {
  add(value: T, lifetime?: number): boolean;
  remove(value: T): boolean;
  has(value: T): boolean;
  values(): T[];
  clear(): void;
  size(): number;
}
