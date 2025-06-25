import { KeyOf } from './key-of.js';

export type SetOptional<T extends object, K extends KeyOf<T>> = Omit<T, K> &
  Partial<Pick<T, K>>;
