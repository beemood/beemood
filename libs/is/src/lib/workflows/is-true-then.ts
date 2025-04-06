import type { Handler, Optional, ValueHandler } from '@bmod/types';
import { isFunction } from '../checks/is-function.js';

/**
 * Run {@link handler} if the {@link value}  is true else (optionally) run {@link elseHandler}.
 * @param value any value
 * @param handler function that runs if the value is true
 * @param elseHandler function that runs if the value is not true
 */
export function isTrueThen<T>(
  value: Optional<T>,
  handler: ValueHandler<T, void>,
  elseHandler?: Handler
) {
  if (value === true) {
    handler(value);
  } else {
    if (isFunction(elseHandler)) {
      elseHandler();
    }
  }
}
