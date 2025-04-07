import type { KeyOf } from './key-of.js';

export type SelectProperty<T extends object> = Partial<
  Record<KeyOf<T>, boolean>
>;
