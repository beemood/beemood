import { Some, Undefined } from '@beemood/types';

/**
 * Check the given {@link value} is NOT `undefined` or `null`
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

export function isNotDefined<T>(value: Some<T>): value is Undefined {
  if (isDefined(value)) {
    return false;
  }

  return true;
}
