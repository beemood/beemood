import type { Optional } from '@beemood/interface';

/**
 * Check the given {@link value} is defined or not and return true or false accordingly.
 * @param value optional value
 * @returns boolean
 */
export function isDefined<T>(value: Optional<T>): value is T {
  return value != undefined;
}
