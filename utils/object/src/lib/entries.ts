import { keys } from './keys.js';

export function entries<T extends object>(value: T): [keyof T, unknown][] {
  return Object.entries(value) as [keyof T, unknown][];
}

/**
 * Yields key-value pairs of an object one by one.
 */
export function* entriesGenerator<T extends object>(
  obj: T,
): Generator<[keyof T, T[keyof T]], void, unknown> {
  const objKeys = keys(obj);
  for (const key of objKeys) {
    yield [key, obj[key]];
  }
}

export class Entries<T> {
  constructor(protected readonly value: T) {}

  each<K extends keyof T>(
    key: K,
    handler: (key: K, value: T[K]) => void,
  ): Entries<Omit<T, K>> {
    handler(key, this.value[key]);
    return this as unknown as Entries<Omit<T, K>>;
  }

  map<K extends keyof T>(
    key: K,
    handler: (key: K, value: T[K]) => T[K],
  ): Entries<Omit<T, K>> {
    this.value[key] = handler(key, this.value[key]);
    return this as unknown as Entries<Omit<T, K>>;
  }
}
