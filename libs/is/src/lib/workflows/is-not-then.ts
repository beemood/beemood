import type { Handler, Optional, ValueHandler } from '@bmod/types';
import { isFunction } from '../checks/is-function.js';
import { isUndefined } from '../checks/is-undefined.js';

/**
 * Run {@link handler} if the {@link value}  is defined else (optionally) run {@link elseHandler}.
 * @param value any value
 * @param handler function that runs if the value is defined
 * @param elseHandler function that runs if the value is not defined
 */
export function isNotThen<T>(
  value: Optional<T>,
  handler: Handler,
  elseHandler?: Optional<ValueHandler<T, void>>
) {
  if (isUndefined(value)) {
    handler();
  } else {
    if (isFunction(elseHandler)) elseHandler(value);
  }
}
