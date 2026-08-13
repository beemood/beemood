import { InvalidInputError } from '@beemood/errors';

export function isInOrThrow<T>(value: T, list: T[]): T {
  if (new Set(list).has(value)) {
    return value;
  }

  throw new InvalidInputError(`${value} is not in the given list, ${list}`);
}
