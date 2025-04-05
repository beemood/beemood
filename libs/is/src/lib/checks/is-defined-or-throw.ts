import type { Optional } from '@bmod/types';
import { isDefined } from './is-defined.js';

export function isDefinedOrThrow<T>(
  value: Optional<T>,
  msg = 'Value is not defined'
): T {
  if (isDefined(value)) return value;
  throw new Error(msg);
}
