import type { KeyOf } from '../objects/key-of.js';

export type SingleType<T extends object, PT = any> = Partial<
  Record<KeyOf<T>, PT>
>;
