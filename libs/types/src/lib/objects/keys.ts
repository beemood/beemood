import type { KeyOf } from './key-of.js';

export type Keys<T extends object> = KeyOf<T>[];
