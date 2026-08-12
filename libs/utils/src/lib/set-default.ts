import { Any } from '@beemood/types';
import { isDefined } from './is-defined.js';
import { keys } from './keys.js';

/**
 * Set the default value is the target property is not defined
 *
 * @param value
 * @param defaultValues default values to set if the target {@link value} does not define them.
 * @returns
 */
export function setDefualtValue<T extends object>(
  value: T,
  defaultValues: Partial<T>,
): T {
  const __keys = keys(defaultValues);
  for (const k of __keys) {
    const defaultValue = defaultValues[k] as Any;

    if (isDefined(defaultValue)) {
      value[k] ??= defaultValue;
    } else {
    }
  }

  return value;
}
