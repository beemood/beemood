import { Some } from '@beemood/types';
import { isDefined } from './is-defined.js';

/**
 * Check the {@link value} is defined or not then run {@link thenHandler} or {@link elseHandler} accordingly.
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
