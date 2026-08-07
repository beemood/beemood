import { Some } from '@beemood/types';
import { isDefinedThen } from './is-defined-then.js';

export class Collector<T> {
  private readonly collectedData: T[] = [];
  constructor() {}

  addIf<V>(conditionalValue: V, value: T) {
    isDefinedThen<V>(conditionalValue, () => this.collectedData.push(value));

    return this;
  }
  addIfDefined<V>(value: Some<V>, handler: (value: V) => T) {
    isDefinedThen(value, (value) => this.collectedData.push(handler(value)));
    return this;
  }

  collect() {
    return [...this.collectedData];
  }
}
