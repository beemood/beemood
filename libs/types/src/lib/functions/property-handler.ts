import type { KeyOf } from '../objects/key-of.js';

export type PropertyHandler<T extends object, Value extends T[KeyOf<T>]> = (
  value: Value,
  obj: T
) => void | Promise<void>;
