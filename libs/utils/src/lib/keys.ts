import { Keys } from '@beemood/types';

export function keys<T extends object>(obj: T): Keys<T> {
  return Object.keys(obj) as Keys<T>;
}
