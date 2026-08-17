import type { Keys } from '@beemood/types';

export function keys<T extends object>(value: T): Keys<T> {
  return Object.keys(value) as Keys<T>;
}
