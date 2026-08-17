import type { KeyOf } from '@beemood/types';

export function __pick<T extends object, K extends KeyOf<T>>(
  value: T,
  keyToPick: K,
): Pick<T, K> {
  return { [keyToPick]: value[keyToPick] } as Pick<T, K>;
}

export function pick<T extends object, K extends KeyOf<T>>(
  value: T,
  keysToPick: K[],
): Pick<T, K> {
  return keysToPick.reduce(
    (acc, key) => {
      return { ...acc, ...__pick(value, key) };
    },
    {} as Pick<T, K>,
  );
}
