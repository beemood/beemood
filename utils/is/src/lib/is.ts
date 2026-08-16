import type { Optional, Undefined } from '@beemood/types';

export function isDefined<T>(value: Optional<T>): value is T {
  return value != undefined;
}

export function isNotDefined<T>(value: Optional<T>): value is Undefined {
  return value == undefined;
}

export function isString(value: unknown): value is string {
  if (typeof value === 'string') {
    return true;
  }

  return false;
}

export function isNumber(value: unknown): value is number {
  if (typeof value == 'number') {
    return !isNaN(value);
  }
  return false;
}
