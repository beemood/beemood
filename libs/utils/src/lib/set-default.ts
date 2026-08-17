import { isDefined } from './is-defined.js';
import { keys } from './keys.js';

/**
 * Set the default value is the target property is not defined
 *
 * @param value
 * @param defaultValues default values to set if the target {@link value} does not define them.
 * @returns
 */
export function setDefualtValue<T extends object, D extends object>(
  value: T,
  defaultValues: D,
): T & Required<D> {
  const __keys = keys(defaultValues);
  for (const k of __keys) {
    const defaultValue = defaultValues[k] as any;

    if (isDefined(defaultValue)) {
      (value as any)[k] ??= defaultValue;
    }
  }

  return value as any;
}
