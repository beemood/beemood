import type { Optional } from '@beemood/interface';

export function isDefined<T>(value: Optional<T>): value is T {
  return value != undefined;
}
