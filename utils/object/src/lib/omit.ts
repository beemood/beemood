import type { KeyOf } from '@beemood/types';
import { diff } from './diff.js';
import { keys } from './keys.js';
import { pick } from './pick.js';

export function __omit<T extends object, K extends KeyOf<T>>(
  value: T,
  keyToOmit: K,
): Pick<T, K> {
  return { [keyToOmit]: value[keyToOmit] } as Pick<T, K>;
}

export function omit<T extends object, K extends KeyOf<T>>(
  value: T,
  keysToOmit: K[],
): Omit<T, K> {
  const objectKeys = keys(value);
  const keysNotToOmit = diff(objectKeys, keysToOmit);

  return pick(value, keysNotToOmit);
}
