import type { KeyOf } from './key-of.js';

export type SetRequired<T extends object, K extends KeyOf<T>> = Omit<T, K> &
  Required<Pick<T, K>>;
