import type { KeyOf } from '../objects/key-of.js';

export type SingleType<T extends object, PT> = Partial<Record<KeyOf<T>, PT>>;
