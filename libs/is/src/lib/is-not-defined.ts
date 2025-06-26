import type { Optional } from '@beemood/interface';
/**
 * Check the given {@link value} is undefined or not and return false or true accordingly.
 * @param value optional value
 * @returns boolean
 */
export function isNotDefined<T>(value: Optional<T>): value is Optional<T> {
  return value == undefined;
}
