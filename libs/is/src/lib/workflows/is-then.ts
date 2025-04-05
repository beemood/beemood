import type { Handler, Optional, ValueHandler } from '@bmod/types';
import { isDefined } from '../checks/is-defined.js';
import { isFunction } from '../checks/is-function.js';

/**
 * Run {@link handler} if the {@link value}  is defined else (optionally) run {@link elseHandler}.
 * @param value any value
 * @param handler function that runs if the value is defined
 * @param elseHandler function that runs if the value is not defined
 */
export function isThen<T>(
  value: Optional<T>,
  handler: ValueHandler<T, void>,
  elseHandler?: Handler
) {
  if (isDefined(value)) {
    handler(value);
  } else {
    if (isFunction(elseHandler)) {
      elseHandler();
    }
  }
}
