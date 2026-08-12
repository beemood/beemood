import { UndefinedError } from './errors.js';

export function throwUndefined(message?: string): any {
  throw new UndefinedError(message);
}

export function mustDefined<T>(): () => T {
  return throwUndefined;
}
