import { UndefinedError } from '@beemood/errors';
import { isNotDefined } from './is-defined.js';

export function definedOrThrow<T>(value: T | undefined | null): T {
  if (isNotDefined(value)) {
    debug(`The value is not defined! ${value} `);
    throw new UndefinedError();
  }

  return value;
}
