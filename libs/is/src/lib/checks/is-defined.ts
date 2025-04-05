import type { Optional } from '@bmod/types';

/**
 * Check the {@link value} is defined.
 * @param value any value
 */
export function isDefined<T>(value: Optional<T>): value is T {
  return value != undefined;
}
