import type { Optional, Undefined } from '@bmod/types';

/**
 * Check the {@link value} is undefined
 * @param value any value
 */
export function isUndefined<T>(value: Optional<T>): value is Undefined {
  return value == undefined;
}
