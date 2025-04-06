import type { Defined, KeyOf, PropertyHandler } from '@bmod/types';
import { isDefined } from '../checks/is-defined.js';

export class PropertyCase<T extends object> {
  constructor(protected readonly value: T) {}

  def<K extends KeyOf<T>, R extends PropertyCase<Omit<T, K>>>(
    key: K,
    handler: PropertyHandler<T, Defined<T[K]>>
  ): R {
    const pValue = this.value[key];
    if (isDefined(pValue)) {
      handler(pValue as Defined<T[K]>, this.value);
    }
    return this as unknown as R;
  }
}

export function propertyCase<T extends object>(value: T): PropertyCase<T> {
  return new PropertyCase(value);
}
