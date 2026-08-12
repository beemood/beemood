import { Some } from '@beemood/types';
import { isDefinedThen } from './is-defined-then.js';

export class Collector<T> {
  private readonly _collect: T[] = [];
  constructor() {}

  add(value: T) {
    this._collect.push(value);
    return this;
  }

  addIfDefined<V>(conditionalValue: Some<V>, value: T) {
    isDefinedThen<V>(conditionalValue, () => this._collect.push(value));
    return this;
  }

  get collect() {
    return this._collect;
  }
}
