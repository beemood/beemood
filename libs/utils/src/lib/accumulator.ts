import { isDefinedThen } from './is-defined-then.js';

export class Collector<T> {
  private readonly collectedData: T[] = [];
  constructor() {}

  addIf<V>(conditionalValue: V, value: T) {
    isDefinedThen(conditionalValue, () => this.collectedData.push(value));

    return this;
  }

  collect() {
    return [...this.collectedData];
  }
}
