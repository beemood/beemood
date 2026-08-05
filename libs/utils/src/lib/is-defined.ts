import { Some } from '@beemood/types';

/**
 * Null and undefined guard
 *
 * @param value
 * @returns
 */
export function isDefined<T>(value: Some<T>): value is T {
  if (value === undefined || value === null) {
    return false;
  }
  return true;
}
