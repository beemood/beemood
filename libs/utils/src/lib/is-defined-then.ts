import { Some } from '@beemood/types';
import { isDefined } from './is-defined.js';

/**
 * Null and undefined guard with then and else handlers
 *
 * @param value
 * @param thenHandler
 * @param elseHandler
 * @returns
 */
export function isDefinedThen<T>(
  value: Some<T>,
  thenHandler: (value: T) => void,
  elseHandler?: () => void,
): value is T {
  if (isDefined(value)) {
    thenHandler(value);

    return true;
  } else {
    if (elseHandler) {
      elseHandler();
    }
    return false;
  }
}
