import type { Any } from './any.js';

export interface ClassLike<T extends object = Any> {
  new (...args: Any[]): T;
}
