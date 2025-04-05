import type { KeyOf, ValueHandler } from '@bmod/types';
import { isDefined } from '../checks/is-defined.js';

export class PropertyCase<T extends object> {
  constructor(protected readonly value: T) {}

  def<K extends KeyOf<T>, R extends PropertyCase<Omit<T, K>>>(
    key: K,
    handler: ValueHandler<T[K], void>
  ): R {
    const pValue = this.value[key];
    if (isDefined(pValue)) {
      handler(pValue);
    }
    return this as unknown as R;
  }
}

export function propertyCase<T extends object>(value: T): PropertyCase<T> {
  return new PropertyCase(value);
}
