import type { Optional } from '@bmod/types';

/**
 * Creates a deep clone of an object, preserving its structure and values without shared references.
 * This function recursively copies all properties, including nested objects, arrays, and special types
 * like `Date`, while handling circular references to prevent infinite recursion. The clone is fully
 * independent, ensuring no side effects on the original object.
 *
 * @template T - The type of the object to clone.
 * @param - obj - The object to deep clone (can be any value, including primitives).
 * @returns - A deep-cloned copy of the input object.
 *
 * @example
 * ```typescript
 * const original = { a: 1, b: { c: 2 }, d: [3, 4] };
 * const clone = deepClone(original);
 * clone.b.c = 99;
 * console.log(original.b.c); // 2 (original unchanged)
 * console.log(clone.b.c);    // 99 (clone modified)
 * ```
 *
 * @example
 * ```typescript
 * const circular = { a: 1 };
 * circular.self = circular;
 * const clone = deepClone(circular);
 * clone.self.a = 99;
 * console.log(original.a); // 1 (original unchanged)
 * ```
 */
export function deepClone<T>(obj: T): T {
  // Handle null or primitives (no cloning needed)
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Map to track circular references
  const seen = new WeakMap<object, any>();

  function cloneInternal(value: any): any {
    // Return primitives directly
    if (value === null || typeof value !== 'object') {
      return value;
    }

    // Check for circular reference
    if (seen.has(value)) {
      return seen.get(value);
    }

    // Handle special object types
    if (value instanceof Date) {
      const clone = new Date(value.toISOString());
      seen.set(value, clone);
      return clone;
    }

    if (value instanceof RegExp) {
      const clone = new RegExp(value.source, value.flags);
      seen.set(value, clone);
      return clone;
    }
    if (value instanceof Map) {
      const clone = new Map();
      seen.set(value, clone);
      value.forEach((v, k) => {
        clone.set(cloneInternal(k), cloneInternal(v));
      });
      return clone;
    }

    if (value instanceof Set) {
      const clone = new Set();
      seen.set(value, clone);
      value.forEach((v) => clone.add(cloneInternal(v)));
      return clone;
    }

    // Handle arrays
    if (Array.isArray(value)) {
      const clone: Optional[] = [];
      seen.set(value, clone);
      value.forEach((item, index) => {
        clone[index] = cloneInternal(item);
      });
      return clone;
    }

    // Handle plain objects
    const clone = Object.create(Object.getPrototypeOf(value));
    seen.set(value, clone);
    Object.keys(value).forEach((key) => {
      clone[key] = cloneInternal(value[key]);
    });
    return clone;
  }

  return cloneInternal(obj);
}
