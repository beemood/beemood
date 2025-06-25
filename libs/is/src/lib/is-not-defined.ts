import type { Optional } from '@beemood/interface';

export function isNotDefined<T>(value: Optional<T>): value is Optional<T> {
  return value == undefined;
}
